from pydantic import BaseModel
from datetime import datetime

class FlashcardSetBase(BaseModel):
    course_id: str
    title: str
    description: str | None = None

class FlashcardSetCreate(FlashcardSetBase):
    id: str

class FlashcardSet(FlashcardSetBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class FlashcardBase(BaseModel):
    course_id: str
    question: str
    answer: str
    difficulty: str = "medium"
    set_id: str | None = None

class FlashcardCreate(FlashcardBase):
    id: str

class FlashcardUpdate(BaseModel):
    question: str | None = None
    answer: str | None = None
    difficulty: str | None = None
    mastered: bool | None = None

class Flashcard(FlashcardBase):
    id: str
    last_reviewed: datetime | None = None
    times_reviewed: int = 0
    mastered: bool = False
    created_at: datetime
    
    class Config:
        from_attributes = True

class FlashcardReview(BaseModel):
    flashcard_id: str
    success: bool  # Did the user answer correctly?

