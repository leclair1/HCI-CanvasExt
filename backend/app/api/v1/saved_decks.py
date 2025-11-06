from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.user import User
from app.models.saved_deck import SavedFlashcardDeck, SavedFlashcard
from app.schemas.saved_deck import SavedDeckCreate, SavedDeck, SavedDeckList
from app.api.v1.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=SavedDeck, status_code=status.HTTP_201_CREATED)
async def create_saved_deck(
    deck_data: SavedDeckCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new saved flashcard deck"""
    # Create deck
    new_deck = SavedFlashcardDeck(
        user_id=current_user.id,
        name=deck_data.name,
        description=deck_data.description,
        course_id=deck_data.course_id
    )
    db.add(new_deck)
    db.flush()
    
    # Add cards
    for card_data in deck_data.cards:
        card = SavedFlashcard(
            deck_id=new_deck.id,
            question=card_data.question,
            answer=card_data.answer,
            order=card_data.order
        )
        db.add(card)
    
    db.commit()
    db.refresh(new_deck)
    
    return new_deck

@router.get("/", response_model=List[SavedDeckList])
async def list_saved_decks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    course_id: int = None
):
    """List all saved flashcard decks for current user"""
    query = db.query(SavedFlashcardDeck).filter(SavedFlashcardDeck.user_id == current_user.id)
    if course_id:
        query = query.filter(SavedFlashcardDeck.course_id == course_id)
    
    decks = query.all()
    
    # Build response with card count
    result = []
    for deck in decks:
        result.append(SavedDeckList(
            id=deck.id,
            name=deck.name,
            description=deck.description,
            card_count=len(deck.cards),
            created_at=deck.created_at
        ))
    
    return result

@router.get("/{deck_id}", response_model=SavedDeck)
async def get_saved_deck(
    deck_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific saved flashcard deck"""
    deck = db.query(SavedFlashcardDeck).filter(
        SavedFlashcardDeck.id == deck_id,
        SavedFlashcardDeck.user_id == current_user.id
    ).first()
    
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")
    
    return deck

@router.delete("/{deck_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_saved_deck(
    deck_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a saved flashcard deck"""
    deck = db.query(SavedFlashcardDeck).filter(
        SavedFlashcardDeck.id == deck_id,
        SavedFlashcardDeck.user_id == current_user.id
    ).first()
    
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")
    
    db.delete(deck)
    db.commit()
    
    return None

