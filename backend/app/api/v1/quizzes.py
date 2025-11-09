from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.user import User
from app.models.quiz import Quiz, QuizQuestion, QuizAttempt, QuizAnswer
from app.models.module import Module
from app.schemas.quiz import (
    QuizCreate, Quiz as QuizSchema, QuizPublic, QuizQuestionPublic,
    QuizSubmit, QuizResult, QuizResultAnswer, GenerateQuizRequest, GenerateQuizResponse
)
from app.api.v1.auth import get_current_user
from app.core.encryption import decrypt_data
from app.services.flashcard_generator import generate_quiz_with_groq, extract_text_from_url

router = APIRouter()

@router.post("/", response_model=QuizSchema, status_code=status.HTTP_201_CREATED)
async def create_quiz(
    quiz_data: QuizCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new quiz"""
    # Create quiz
    new_quiz = Quiz(
        user_id=current_user.id,
        title=quiz_data.title,
        description=quiz_data.description,
        course_id=quiz_data.course_id
    )
    db.add(new_quiz)
    db.flush()
    
    # Add questions
    for idx, question_data in enumerate(quiz_data.questions):
        question = QuizQuestion(
            quiz_id=new_quiz.id,
            question_text=question_data.question_text,
            option_a=question_data.option_a,
            option_b=question_data.option_b,
            option_c=question_data.option_c,
            option_d=question_data.option_d,
            correct_answer=question_data.correct_answer,
            order=idx
        )
        db.add(question)
    
    db.commit()
    db.refresh(new_quiz)
    
    return new_quiz

@router.get("/", response_model=List[QuizSchema])
async def list_quizzes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    course_id: int = None
):
    """List all quizzes for current user"""
    query = db.query(Quiz).filter(Quiz.user_id == current_user.id)
    if course_id:
        query = query.filter(Quiz.course_id == course_id)
    return query.all()

@router.get("/{quiz_id}", response_model=QuizPublic)
async def get_quiz(
    quiz_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a quiz (without answers for taking the quiz)"""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    # Format questions without revealing answers
    questions_public = []
    for q in quiz.questions:
        questions_public.append(QuizQuestionPublic(
            id=q.id,
            question_text=q.question_text,
            options=[q.option_a, q.option_b, q.option_c, q.option_d]
        ))
    
    return QuizPublic(
        id=quiz.id,
        title=quiz.title,
        description=quiz.description,
        questions=questions_public
    )

@router.post("/submit", response_model=QuizResult)
async def submit_quiz(
    submission: QuizSubmit,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit quiz answers and get results"""
    quiz = db.query(Quiz).filter(Quiz.id == submission.quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    # Create attempt
    attempt = QuizAttempt(
        quiz_id=quiz.id,
        user_id=current_user.id,
        score=0,
        total_questions=len(quiz.questions)
    )
    db.add(attempt)
    db.flush()
    
    # Grade answers
    score = 0
    results = []
    
    for answer_data in submission.answers:
        question = db.query(QuizQuestion).filter(QuizQuestion.id == answer_data.question_id).first()
        if not question:
            continue
        
        is_correct = answer_data.user_answer == question.correct_answer
        if is_correct:
            score += 1
        
        # Save answer
        answer = QuizAnswer(
            attempt_id=attempt.id,
            question_id=question.id,
            user_answer=answer_data.user_answer,
            is_correct=is_correct
        )
        db.add(answer)
        
        # Build result
        options = [question.option_a, question.option_b, question.option_c, question.option_d]
        correct_option_text = options[ord(question.correct_answer) - ord('A')]
        user_option_text = options[ord(answer_data.user_answer) - ord('A')] if len(answer_data.user_answer) == 1 else answer_data.user_answer
        
        results.append(QuizResultAnswer(
            question=question.question_text,
            user_answer=user_option_text,
            correct_answer=correct_option_text,
            is_correct=is_correct
        ))
    
    # Update attempt with score
    attempt.score = score
    db.commit()
    
    return QuizResult(
        score=score,
        total=len(quiz.questions),
        answers=results,
        attempt_id=attempt.id
    )

@router.post("/generate", response_model=GenerateQuizResponse)
async def generate_quiz(
    request: GenerateQuizRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate quiz questions from module content using AI"""
    
    # Get the module
    module = db.query(Module).filter(Module.id == request.module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    print(f"\n=== Generating quiz for module: {module.name} ===")
    
    # Get user's Canvas session cookie
    if not current_user.canvas_session_cookie:
        raise HTTPException(
            status_code=400,
            detail="Canvas session cookie not available"
        )
    
    # Decrypt session cookie
    session_cookie = decrypt_data(current_user.canvas_session_cookie)
    
    # Extract text from module items
    all_text = ""
    items_processed = 0
    
    print(f"\n=== Processing module: {module.name} ===")
    
    # Parse items if they're stored as JSON string
    import json as json_lib
    items = module.items
    if isinstance(items, str):
        items = json_lib.loads(items)
    elif items is None:
        items = []
    
    print(f"Module has {len(items)} items")
    
    # If specific file URLs were provided, use only those
    if request.file_urls and len(request.file_urls) > 0:
        print(f"Using {len(request.file_urls)} user-selected files")
        for file_url in request.file_urls:
            item_name = next((item.get('title', 'Unknown') for item in items if item.get('url') == file_url), 'Unknown')
            
            print(f"Processing selected file: {item_name}")
            text = extract_text_from_url(
                file_url,
                session_cookie,
                current_user.canvas_instance_url or "https://usflearn.instructure.com"
            )
            if text and len(text) > 50:
                print(f"  Extracted {len(text)} characters")
                all_text += text + "\n\n"
                items_processed += 1
            else:
                print(f"  Failed to extract text or too short")
    else:
        # Default behavior: process all items
        for item in items[:10]:
            item_url = item.get('url', '')
            item_name = item.get('title', '') or item.get('name', '')
            
            if item_url and '.pdf' in item_name.lower():
                print(f"  Extracting PDF: {item_name}")
                text = extract_text_from_url(
                    item_url,
                    session_cookie,
                    current_user.canvas_instance_url or "https://usflearn.instructure.com"
                )
                if text and len(text) > 50:
                    print(f"  Extracted {len(text)} characters")
                    all_text += text + "\n\n"
                    items_processed += 1
    
    print(f"Total text extracted: {len(all_text)} characters from {items_processed} items")
    
    if len(all_text) < 200:
        raise HTTPException(
            status_code=400,
            detail=f"Not enough content found in module '{module.name}'. Try a module with PDF files or more content."
        )
    
    # Generate quiz using Groq
    try:
        print(f"Sending to Groq for quiz generation...")
        questions = generate_quiz_with_groq(
            content=all_text,
            module_name=module.name,
            num_questions=request.num_questions
        )
        print(f"Generated {len(questions)} quiz questions")
        
        return GenerateQuizResponse(
            questions=questions,
            module_name=module.name,
            count=len(questions)
        )
        
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{quiz_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_quiz(
    quiz_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a quiz"""
    quiz = db.query(Quiz).filter(
        Quiz.id == quiz_id,
        Quiz.user_id == current_user.id
    ).first()
    
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    db.delete(quiz)
    db.commit()
    
    return None


