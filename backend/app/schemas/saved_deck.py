from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class FlashcardBase(BaseModel):
    question: str
    answer: str

class FlashcardCreate(FlashcardBase):
    order: Optional[int] = 0

class Flashcard(FlashcardBase):
    id: int
    deck_id: int
    order: int
    
    class Config:
        from_attributes = True

class SavedDeckBase(BaseModel):
    name: str
    description: Optional[str] = None
    course_id: Optional[int] = None

class SavedDeckCreate(SavedDeckBase):
    cards: List[FlashcardCreate]

class SavedDeck(SavedDeckBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    cards: List[Flashcard]
    
    class Config:
        from_attributes = True

class SavedDeckList(BaseModel):
    id: int
    name: str
    description: Optional[str]
    card_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True

