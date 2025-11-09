from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class SavedFlashcardDeck(Base):
    __tablename__ = "saved_flashcard_decks"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=True)
    
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    cards = relationship("SavedFlashcard", back_populates="deck", cascade="all, delete-orphan")


class SavedFlashcard(Base):
    __tablename__ = "saved_flashcards"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    deck_id = Column(Integer, ForeignKey("saved_flashcard_decks.id"), nullable=False)
    
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    
    order = Column(Integer, default=0)
    
    # Relationships
    deck = relationship("SavedFlashcardDeck", back_populates="cards")


