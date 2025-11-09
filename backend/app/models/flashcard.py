from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class FlashcardSet(Base):
    __tablename__ = "flashcard_sets"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Flashcard(Base):
    __tablename__ = "flashcards"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    set_id = Column(Integer, ForeignKey("flashcard_sets.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    difficulty = Column(String, default="medium")
    last_reviewed = Column(DateTime, nullable=True)
    times_reviewed = Column(Integer, default=0)
    mastered = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)



