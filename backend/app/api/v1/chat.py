from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.chat_message import ChatMessage as ChatMessageModel
from app.models.user import User
from app.models.module import Module
from app.schemas.chat import ChatMessage, ChatRequest, ChatResponse
from app.core.config import settings
from app.core.encryption import decrypt_data
from app.services.flashcard_generator import extract_text_from_url, generate_chat_response_with_groq
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
    
    # Get module for context
    module = db.query(Module).filter(Module.id == request.module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    # Get user's Canvas session cookie for file access
    if not current_user.canvas_session_cookie:
        raise HTTPException(
            status_code=400,
            detail="No Canvas session cookie available. Please re-authenticate with Canvas."
        )
    
    # Decrypt session cookie
    session_cookie = decrypt_data(current_user.canvas_session_cookie)
    
    # Extract text from selected files (RAG context)
    context_text = ""
    references = []
    
    if request.file_urls and len(request.file_urls) > 0:
        print(f"\nExtracting text from {len(request.file_urls)} files for RAG context...")
        
        for file_url in request.file_urls[:5]:  # Limit to 5 files to avoid token limits
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
                module_name=module.name
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





