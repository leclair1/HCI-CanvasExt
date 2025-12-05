from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.db.database import get_db
from app.models.chat_message import ChatMessage as ChatMessageModel
from app.models.user import User
from app.models.module import Module
from app.schemas.chat import ChatMessage, ChatRequest, ChatResponse
from app.core.config import settings
from app.core.encryption import decrypt_data
from app.services.flashcard_generator import (
    extract_text_from_url, 
    generate_chat_response_with_groq,
    generate_active_recall_question_with_groq,
    grade_active_recall_answer_with_groq
)
from app.services.canvas_scraper import CanvasScraper
from app.models.course import Course
from app.api.v1.auth import get_current_user
import random

router = APIRouter()

# Mock course content for AI responses (matches frontend mockData)
COURSE_CONTENT = {
    'crn4020': {
        'name': 'Software Engineering',
        'texts': [
            'Agile methodologies emphasize iterative delivery and close collaboration with stakeholders to respond to change quickly.',
            'A well-groomed product backlog provides prioritized work with clear acceptance criteria for the team.',
            'Software requirements include both functional capabilities and quality attributes such as performance and security.',
            'Continuous integration automates building and testing code whenever changes are merged.',
            'Retrospectives turn team observations into actionable improvements for the next iteration.',
        ]
    },
    'cop4600': {
        'name': 'Operating Systems',
        'texts': [
            'Operating systems provide an abstraction layer between hardware and user applications.',
            'Processes are isolated units of execution with their own address space and system resources.',
            'The scheduler decides which process should run on the CPU at any moment.',
            'Synchronization primitives like mutexes and semaphores prevent data races.',
            'Virtual memory lets processes use more memory than physically available by paging to disk.',
        ]
    },
    'cis4930': {
        'name': 'User Experience Design',
        'texts': [
            'User experience design begins with understanding the people, context, and goals behind a product.',
            'Research methods such as interviews and contextual inquiry uncover user motivations and pain points.',
            'Personas and journey maps communicate key user behaviors and scenarios to the team.',
            'Wireframes explore layout and hierarchy before visual styling is applied.',
            'Usability testing validates whether designs enable users to complete tasks successfully.',
        ]
    },
    'cis4931': {
        'name': 'Human-Computer Interaction',
        'texts': [
            'Human-computer interaction examines how people perceive, learn, and perform tasks with technology.',
            'Mental models influence how users expect an interface to behave.',
            'Interaction design balances discoverability, feedback, and consistency.',
            'Cognitive load should be minimized by reducing unnecessary choices and steps.',
            'Accessibility guidelines ensure interfaces work for people with sensory, motor, or cognitive differences.',
        ]
    }
}

@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    AI Tutor chat endpoint - responds to student questions using RAG with selected course materials.
    
    This endpoint:
    1. Extracts text from selected PDF/document files
    2. Uses extracted text as context for AI (RAG - Retrieval Augmented Generation)
    3. Generates contextual responses using Groq API
    """
    print(f"\n=== AI Tutor Chat Request ===")
    print(f"Module ID: {request.module_id}")
    print(f"User Message: {request.message}")
    print(f"Selected Files: {len(request.file_urls)}")
    
    # Get module for context (optional)
    module = None
    if request.module_id:
        module = db.query(Module).filter(Module.id == request.module_id).first()
        if not module:
            raise HTTPException(status_code=404, detail="Module not found")
    
    module_name = module.name if module else "Selected Files"
    
    # Get user's Canvas session cookie for file access
    if not current_user.canvas_session_cookie:
        raise HTTPException(
            status_code=400,
            detail="Canvas session cookie not available. Please provide a Canvas session cookie to use the AI tutor."
        )
    
    # Decrypt session cookie
    session_cookie = decrypt_data(current_user.canvas_session_cookie)
    
    # If include_files_tab is True, fetch files from Canvas Files tab
    files_tab_urls = []
    if request.include_files_tab:
        try:
            # Get course ID from module or from first file URL (if we can extract it)
            course = None
            if module:
                course = db.query(Course).filter(Course.id == module.course_id).first()
            elif request.file_urls and len(request.file_urls) > 0:
                # Try to extract course ID from file URL
                import re
                for file_url in request.file_urls:
                    match = re.search(r'/courses/(\d+)/files/', file_url)
                    if match:
                        canvas_course_id = match.group(1)
                        # Find course by canvas_id
                        course = db.query(Course).filter(
                            Course.canvas_id == canvas_course_id,
                            Course.user_id == current_user.id
                        ).first()
                        if course:
                            break
            
            if course and course.canvas_id:
                print(f"Scanning Files tab for course {course.canvas_id}...")
                scraper = CanvasScraper(
                    base_url=current_user.canvas_instance_url or settings.CANVAS_INSTANCE_URL,
                    session_cookie=session_cookie
                )
                files_tab_files = scraper.get_course_files(course.canvas_id)
                files_tab_urls = [f.get('url', '') for f in files_tab_files if f.get('url')]
                print(f"Found {len(files_tab_urls)} files from Files tab")
        except Exception as e:
            print(f"Warning: Failed to scan Files tab: {e}")
    
    # Combine user-selected files with files tab files if requested
    all_file_urls = list(request.file_urls) if request.file_urls else []
    if files_tab_urls:
        all_file_urls.extend(files_tab_urls)
        # Remove duplicates
        all_file_urls = list(dict.fromkeys(all_file_urls))
    
    # Extract text from selected files (RAG context)
    context_text = ""
    references = []
    
    if all_file_urls and len(all_file_urls) > 0:
        print(f"\nExtracting text from {len(all_file_urls)} files for RAG context...")
        
        for file_url in all_file_urls[:5]:  # Limit to 5 files to avoid token limits
            try:
                print(f"  Processing: {file_url[:80]}...")
                text = extract_text_from_url(
                    file_url,
                    session_cookie,
                    current_user.canvas_instance_url or settings.CANVAS_INSTANCE_URL
                )
                
                if text and len(text) > 50:
                    context_text += text + "\n\n"
                    # Extract filename from URL for reference
                    filename = file_url.split('/')[-1].split('?')[0]
                    references.append(filename)
                    print(f"    ✓ Extracted {len(text)} characters")
            except Exception as e:
                print(f"    ✗ Failed to extract text: {e}")
                continue
    
    # Generate AI response using RAG
    if not context_text or len(context_text) < 100:
        response_text = (
            "I couldn't extract enough context from the selected files. "
            "This might be because the files are in an unsupported format or I don't have access to them. "
            "Please try selecting different files or check that the files contain text content."
        )
        references = []
    else:
        print(f"\nGenerating AI response with {len(context_text)} characters of context...")
        
        try:
            response_text = generate_chat_response_with_groq(
                question=request.message,
                context=context_text[:15000],  # Limit context to avoid token limits
                module_name=module_name
            )
            print("✓ AI response generated successfully")
        except Exception as e:
            print(f"✗ AI generation failed: {e}")
            response_text = (
                "I encountered an error generating a response. "
                "This might be due to API limits. Please try again in a moment."
            )
            references = []
    
    return ChatResponse(
        message=response_text,
        role="assistant",
        references=references if references else ["Course materials"]
    )

@router.get("/history/{course_id}", response_model=list[ChatMessage])
async def get_chat_history(course_id: str, limit: int = 50, db: Session = Depends(get_db)):
    """Get chat history for a specific course"""
    messages = db.query(ChatMessageModel).filter(
        ChatMessageModel.course_id == course_id
    ).order_by(ChatMessageModel.created_at.desc()).limit(limit).all()
    
    return reversed(messages)

@router.delete("/history/{course_id}", status_code=204)
async def clear_chat_history(course_id: str, db: Session = Depends(get_db)):
    """Clear chat history for a specific course"""
    db.query(ChatMessageModel).filter(
        ChatMessageModel.course_id == course_id
    ).delete()
    db.commit()
    return None


# Active Recall Endpoints

class ActiveRecallQuestionRequest(BaseModel):
    """Request to generate an active recall question"""
    module_id: Optional[int] = None
    file_urls: list[str] = []
    include_files_tab: bool = False  # If True, scan and include files from Canvas Files tab


class ActiveRecallQuestionResponse(BaseModel):
    """Response with generated question"""
    question: str


class ActiveRecallGradeRequest(BaseModel):
    """Request to grade an answer"""
    question: str
    user_answer: str
    module_id: Optional[int] = None
    file_urls: list[str] = []
    difficulty: str = "balanced"  # easy, balanced, tough
    include_files_tab: bool = False  # If True, scan and include files from Canvas Files tab


class ActiveRecallGradeResponse(BaseModel):
    """Response with grading results"""
    score: int
    feedback: str
    correct_answer: str
    passed: bool


@router.post("/active-recall/question", response_model=ActiveRecallQuestionResponse)
async def generate_question(
    request: ActiveRecallQuestionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Generate an active recall question from selected course materials"""
    print(f"\n=== Active Recall Question Generation ===")
    print(f"Module ID: {request.module_id}")
    print(f"Selected Files: {len(request.file_urls)}")
    
    # Get module (optional)
    module = None
    if request.module_id:
        module = db.query(Module).filter(Module.id == request.module_id).first()
        if not module:
            raise HTTPException(status_code=404, detail="Module not found")
    
    module_name = module.name if module else "Selected Files"
    
    # Get session cookie
    if not current_user.canvas_session_cookie:
        raise HTTPException(status_code=400, detail="No Canvas session cookie available")
    
    session_cookie = decrypt_data(current_user.canvas_session_cookie)
    
    # If include_files_tab is True, fetch files from Canvas Files tab
    files_tab_urls = []
    if request.include_files_tab:
        try:
            # Get course ID from module or from first file URL (if we can extract it)
            course = None
            if module:
                course = db.query(Course).filter(Course.id == module.course_id).first()
            elif request.file_urls and len(request.file_urls) > 0:
                # Try to extract course ID from file URL
                import re
                for file_url in request.file_urls:
                    match = re.search(r'/courses/(\d+)/files/', file_url)
                    if match:
                        canvas_course_id = match.group(1)
                        # Find course by canvas_id
                        course = db.query(Course).filter(
                            Course.canvas_id == canvas_course_id,
                            Course.user_id == current_user.id
                        ).first()
                        if course:
                            break
            
            if course and course.canvas_id:
                scraper = CanvasScraper(
                    base_url=current_user.canvas_instance_url or settings.CANVAS_INSTANCE_URL,
                    session_cookie=session_cookie
                )
                files_tab_files = scraper.get_course_files(course.canvas_id)
                files_tab_urls = [f.get('url', '') for f in files_tab_files if f.get('url')]
        except Exception as e:
            print(f"Warning: Failed to scan Files tab: {e}")
    
    # Combine user-selected files with files tab files if requested
    all_file_urls = list(request.file_urls) if request.file_urls else []
    if files_tab_urls:
        all_file_urls.extend(files_tab_urls)
        all_file_urls = list(dict.fromkeys(all_file_urls))
    
    # Extract text from selected files
    context_text = ""
    
    if all_file_urls and len(all_file_urls) > 0:
        print(f"Extracting text from {len(all_file_urls)} files...")
        
        for file_url in all_file_urls[:3]:  # Limit to 3 files
            try:
                text = extract_text_from_url(
                    file_url,
                    session_cookie,
                    current_user.canvas_instance_url or settings.CANVAS_INSTANCE_URL
                )
                
                if text and len(text) > 50:
                    context_text += text + "\n\n"
                    print(f"  ✓ Extracted {len(text)} characters")
            except Exception as e:
                print(f"  ✗ Failed to extract: {e}")
                continue
    
    if not context_text or len(context_text) < 100:
        raise HTTPException(
            status_code=400,
            detail="Could not extract enough content from files to generate question"
        )
    
    # Generate question
    print(f"Generating question from {len(context_text)} characters...")
    
    try:
        question = generate_active_recall_question_with_groq(
            context=context_text[:10000],  # Limit context
            module_name=module_name
        )
        print(f"✓ Question generated: {question[:80]}...")
        
        return ActiveRecallQuestionResponse(question=question)
        
    except Exception as e:
        print(f"✗ Question generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/active-recall/grade", response_model=ActiveRecallGradeResponse)
async def grade_answer(
    request: ActiveRecallGradeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Grade a user's active recall answer"""
    print(f"\n=== Active Recall Grading ===")
    print(f"Question: {request.question[:80]}...")
    print(f"Answer length: {len(request.user_answer)} characters")
    print(f"Difficulty: {request.difficulty}")
    
    # Get module (optional)
    module = None
    if request.module_id:
        module = db.query(Module).filter(Module.id == request.module_id).first()
        if not module:
            raise HTTPException(status_code=404, detail="Module not found")
    
    # Get session cookie
    if not current_user.canvas_session_cookie:
        raise HTTPException(status_code=400, detail="No Canvas session cookie available")
    
    session_cookie = decrypt_data(current_user.canvas_session_cookie)
    
    # If include_files_tab is True, fetch files from Canvas Files tab
    files_tab_urls = []
    if request.include_files_tab:
        try:
            # Get course ID from module or from first file URL (if we can extract it)
            course = None
            if module:
                course = db.query(Course).filter(Course.id == module.course_id).first()
            elif request.file_urls and len(request.file_urls) > 0:
                # Try to extract course ID from file URL
                import re
                for file_url in request.file_urls:
                    match = re.search(r'/courses/(\d+)/files/', file_url)
                    if match:
                        canvas_course_id = match.group(1)
                        # Find course by canvas_id
                        course = db.query(Course).filter(
                            Course.canvas_id == canvas_course_id,
                            Course.user_id == current_user.id
                        ).first()
                        if course:
                            break
            
            if course and course.canvas_id:
                scraper = CanvasScraper(
                    base_url=current_user.canvas_instance_url or settings.CANVAS_INSTANCE_URL,
                    session_cookie=session_cookie
                )
                files_tab_files = scraper.get_course_files(course.canvas_id)
                files_tab_urls = [f.get('url', '') for f in files_tab_files if f.get('url')]
        except Exception as e:
            print(f"Warning: Failed to scan Files tab: {e}")
    
    # Combine user-selected files with files tab files if requested
    all_file_urls = list(request.file_urls) if request.file_urls else []
    if files_tab_urls:
        all_file_urls.extend(files_tab_urls)
        all_file_urls = list(dict.fromkeys(all_file_urls))
    
    # Extract text from selected files (same as question generation)
    context_text = ""
    
    if all_file_urls and len(all_file_urls) > 0:
        for file_url in all_file_urls[:3]:
            try:
                text = extract_text_from_url(
                    file_url,
                    session_cookie,
                    current_user.canvas_instance_url or settings.CANVAS_INSTANCE_URL
                )
                if text and len(text) > 50:
                    context_text += text + "\n\n"
            except:
                continue
    
    if not context_text or len(context_text) < 100:
        raise HTTPException(
            status_code=400,
            detail="Could not extract enough content from files to grade answer"
        )
    
    # Grade the answer
    print(f"Grading with {len(context_text)} characters of context...")
    
    try:
        result = grade_active_recall_answer_with_groq(
            question=request.question,
            user_answer=request.user_answer,
            context=context_text[:10000],
            difficulty=request.difficulty
        )
        print(f"✓ Grading complete: {result['score']}/100")
        
        return ActiveRecallGradeResponse(**result)
        
    except Exception as e:
        print(f"✗ Grading failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))





