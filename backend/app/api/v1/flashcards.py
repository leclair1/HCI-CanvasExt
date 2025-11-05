from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from app.db.database import get_db
from app.models.flashcard import Flashcard as FlashcardModel, FlashcardSet as FlashcardSetModel
from app.schemas.flashcard import (
    Flashcard, FlashcardCreate, FlashcardUpdate, FlashcardReview,
    FlashcardSet, FlashcardSetCreate
)

router = APIRouter()

# Flashcard Sets
@router.get("/sets", response_model=list[FlashcardSet])
def get_flashcard_sets(
    course_id: str | None = Query(None, description="Filter by course ID"),
    db: Session = Depends(get_db)
):
    """Get all flashcard sets"""
    query = db.query(FlashcardSetModel)
    if course_id:
        query = query.filter(FlashcardSetModel.course_id == course_id)
    return query.all()

@router.post("/sets", response_model=FlashcardSet, status_code=201)
def create_flashcard_set(flashcard_set: FlashcardSetCreate, db: Session = Depends(get_db)):
    """Create a new flashcard set"""
    db_set = FlashcardSetModel(**flashcard_set.model_dump())
    db.add(db_set)
    db.commit()
    db.refresh(db_set)
    return db_set

# Flashcards
@router.get("/", response_model=list[Flashcard])
def get_flashcards(
    course_id: str | None = Query(None, description="Filter by course ID"),
    set_id: str | None = Query(None, description="Filter by set ID"),
    mastered: bool | None = Query(None, description="Filter by mastered status"),
    db: Session = Depends(get_db)
):
    """Get all flashcards with optional filters"""
    query = db.query(FlashcardModel)
    
    if course_id:
        query = query.filter(FlashcardModel.course_id == course_id)
    if set_id:
        query = query.filter(FlashcardModel.set_id == set_id)
    if mastered is not None:
        query = query.filter(FlashcardModel.mastered == mastered)
    
    return query.all()

@router.get("/{flashcard_id}", response_model=Flashcard)
def get_flashcard(flashcard_id: str, db: Session = Depends(get_db)):
    """Get a specific flashcard by ID"""
    flashcard = db.query(FlashcardModel).filter(FlashcardModel.id == flashcard_id).first()
    if not flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return flashcard

@router.post("/", response_model=Flashcard, status_code=201)
def create_flashcard(flashcard: FlashcardCreate, db: Session = Depends(get_db)):
    """Create a new flashcard"""
    db_flashcard = FlashcardModel(**flashcard.model_dump())
    db.add(db_flashcard)
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard

@router.put("/{flashcard_id}", response_model=Flashcard)
def update_flashcard(flashcard_id: str, flashcard: FlashcardUpdate, db: Session = Depends(get_db)):
    """Update an existing flashcard"""
    db_flashcard = db.query(FlashcardModel).filter(FlashcardModel.id == flashcard_id).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    
    update_data = flashcard.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_flashcard, key, value)
    
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard

@router.post("/review", response_model=Flashcard)
def review_flashcard(review: FlashcardReview, db: Session = Depends(get_db)):
    """Record a flashcard review"""
    db_flashcard = db.query(FlashcardModel).filter(FlashcardModel.id == review.flashcard_id).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    
    db_flashcard.last_reviewed = datetime.utcnow()
    db_flashcard.times_reviewed += 1
    
    # Mark as mastered if reviewed successfully 3+ times
    if review.success and db_flashcard.times_reviewed >= 3:
        db_flashcard.mastered = True
    
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard

@router.delete("/{flashcard_id}", status_code=204)
def delete_flashcard(flashcard_id: str, db: Session = Depends(get_db)):
    """Delete a flashcard"""
    db_flashcard = db.query(FlashcardModel).filter(FlashcardModel.id == flashcard_id).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    
    db.delete(db_flashcard)
    db.commit()
    return None



