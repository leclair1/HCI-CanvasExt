from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.chat_message import ChatMessage as ChatMessageModel
from app.schemas.chat import ChatMessage, ChatRequest, ChatResponse
from app.core.config import settings
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
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """
    AI Tutor chat endpoint - responds to student questions based on course materials.
    
    Note: This is a simple implementation. For production, integrate with OpenAI or Anthropic APIs.
    """
    # Save user message
    user_message = ChatMessageModel(
        course_id=request.course_id,
        role="user",
        content=request.message
    )
    db.add(user_message)
    db.commit()
    
    # Get course content
    course_data = COURSE_CONTENT.get(request.course_id, {})
    course_name = course_data.get('name', 'this course')
    texts = course_data.get('texts', [])
    
    # Simple AI response (in production, use OpenAI/Anthropic API)
    if not texts:
        response_text = f"I can help you with {course_name}. What specific topic would you like to discuss?"
        references = []
    else:
        # Pick a random relevant text as "AI response"
        reference_text = random.choice(texts)
        response_text = f"Based on the course materials:\n\n{reference_text}\n\nWould you like me to elaborate on any specific aspect?"
        references = ["Module materials", "Course lectures"]
    
    # Save assistant response
    assistant_message = ChatMessageModel(
        course_id=request.course_id,
        role="assistant",
        content=response_text
    )
    db.add(assistant_message)
    db.commit()
    
    return ChatResponse(
        message=response_text,
        role="assistant",
        references=references
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





