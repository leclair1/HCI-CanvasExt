from pydantic import BaseModel
from datetime import datetime

class ChatMessageBase(BaseModel):
    course_id: str
    role: str  # 'user' or 'assistant'
    content: str

class ChatMessage(ChatMessageBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    course_id: str
    message: str
    context: list[str] | None = None  # Optional context from course materials

class ChatResponse(BaseModel):
    message: str
    role: str = "assistant"
    references: list[str] = []  # References to course materials used

