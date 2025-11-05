from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from app.db.database import Base
from datetime import datetime

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    role = Column(String, nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

