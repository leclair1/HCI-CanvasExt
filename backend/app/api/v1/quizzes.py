from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.user import User
from app.models.quiz import Quiz, QuizQuestion, QuizAttempt, QuizAnswer
from app.schemas.quiz import (
    QuizCreate, Quiz as QuizSchema, QuizPublic, QuizQuestionPublic,
    QuizSubmit, QuizResult, QuizResultAnswer, GenerateQuizRequest
)
from app.api.v1.auth import get_current_user

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

@router.post("/generate", response_model=QuizPublic)
async def generate_quiz(
    request: GenerateQuizRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate a new quiz with AI (mock implementation)"""
    # This is a mock implementation - in production, you'd use AI to generate questions
    # For now, we'll return a sample quiz
    
    sample_questions = [
        {
            "question_text": "Which data structure uses LIFO (Last In, First Out)?",
            "option_a": "Queue",
            "option_b": "Stack",
            "option_c": "Array",
            "option_d": "Linked List",
            "correct_answer": "B"
        },
        {
            "question_text": "What is the time complexity of binary search?",
            "option_a": "O(n)",
            "option_b": "O(n^2)",
            "option_c": "O(log n)",
            "option_d": "O(1)",
            "correct_answer": "C"
        },
        {
            "question_text": "Which sorting algorithm has the best average case performance?",
            "option_a": "Bubble Sort",
            "option_b": "Selection Sort",
            "option_c": "Quick Sort",
            "option_d": "Insertion Sort",
            "correct_answer": "C"
        }
    ]
    
    # Create quiz
    new_quiz = Quiz(
        user_id=current_user.id,
        title="Generated Quiz",
        description="AI-generated practice quiz",
        course_id=request.course_id
    )
    db.add(new_quiz)
    db.flush()
    
    # Add questions
    questions_public = []
    for idx, q_data in enumerate(sample_questions[:request.num_questions]):
        question = QuizQuestion(
            quiz_id=new_quiz.id,
            question_text=q_data["question_text"],
            option_a=q_data["option_a"],
            option_b=q_data["option_b"],
            option_c=q_data["option_c"],
            option_d=q_data["option_d"],
            correct_answer=q_data["correct_answer"],
            order=idx
        )
        db.add(question)
        db.flush()
        
        questions_public.append(QuizQuestionPublic(
            id=question.id,
            question_text=question.question_text,
            options=[q_data["option_a"], q_data["option_b"], q_data["option_c"], q_data["option_d"]]
        ))
    
    db.commit()
    
    return QuizPublic(
        id=new_quiz.id,
        title=new_quiz.title,
        description=new_quiz.description,
        questions=questions_public
    )

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


