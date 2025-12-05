from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from pydantic import BaseModel, Field
from typing import List, Optional
from app.db.database import get_db
from app.models.flashcard import Flashcard as FlashcardModel, FlashcardSet as FlashcardSetModel
from app.models.module import Module
from app.models.user import User
from app.models.course import Course
from app.schemas.flashcard import (
    Flashcard, FlashcardCreate, FlashcardUpdate, FlashcardReview,
    FlashcardSet, FlashcardSetCreate
)
from app.api.v1.auth import get_current_user
from app.core.encryption import decrypt_data
from app.services.flashcard_generator import generate_flashcards_with_groq, extract_text_from_url
from app.services.canvas_scraper import CanvasScraper

router = APIRouter()


class GenerateFlashcardsRequest(BaseModel):
    """Request model for generating flashcards"""
    module_id: Optional[int] = Field(default=None, description="Module ID to generate flashcards from (optional if using file_urls)")
    num_cards: int = Field(15, ge=10, le=30, description="Number of flashcards to generate")
    file_urls: List[str] = Field(default=[], description="Optional: Specific file URLs to process")
    include_files_tab: bool = Field(default=False, description="If True, scan and include files from Canvas Files tab")


class GenerateFlashcardsResponse(BaseModel):
    """Response model for generated flashcards"""
    flashcards: List[dict]
    module_name: str
    count: int

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


@router.post("/generate", response_model=GenerateFlashcardsResponse)
async def generate_flashcards_from_module(
    request: GenerateFlashcardsRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Generate flashcards from a module using pre-generated flashcards or AI
    
    This endpoint:
    1. Fetches the module
    2. Checks if we have pre-generated flashcards for this module
    3. If yes, returns them (filtered by count)
    4. If no, generates new ones using AI
    """
    # Get the module (may be None if using files only)
    module = None
    if request.module_id:
        module = db.query(Module).filter(Module.id == request.module_id).first()
        if not module:
            raise HTTPException(status_code=404, detail="Module not found")
    
    module_name = module.name if module else "Selected Files"
    print(f"\n=== Generating flashcards from: {module_name} ===")
    
    # Generate flashcards from module content using AI
    # Get user's Canvas session cookie
    if not current_user.canvas_session_cookie:
        # Generate generic flashcards if no session cookie
        raise HTTPException(
            status_code=400,
            detail="Canvas session cookie not available. Please provide a Canvas session cookie to generate flashcards."
        )
    
    # Decrypt session cookie
    session_cookie = decrypt_data(current_user.canvas_session_cookie)
    
    # Extract text from module items or selected files
    all_text = ""
    items_processed = 0
    
    # Parse items if they're stored as JSON string
    import json as json_lib
    items = []
    if module:
        print(f"\n=== Processing module: {module.name} ===")
        items = module.items
        if isinstance(items, str):
            items = json_lib.loads(items)
        elif items is None:
            items = []
        print(f"Module has {len(items)} items")
    else:
        print("\n=== Processing selected files (no module) ===")
    
    # If include_files_tab is True, fetch files from Canvas Files tab
    files_tab_urls = []
    if request.include_files_tab:
        try:
            # Get course ID from module or from first file URL (if we can extract it)
            course = None
            if module:
                course = db.query(Course).filter(Course.id == module.course_id).first()
            elif request.file_urls and len(request.file_urls) > 0:
                # Try to extract course ID from file URL
                # Canvas file URLs typically contain /courses/{course_id}/files/
                import re
                for file_url in request.file_urls:
                    match = re.search(r'/courses/(\d+)/files/', file_url)
                    if match:
                        canvas_course_id = match.group(1)
                        # Find course by canvas_id
                        course = db.query(Course).filter(
                            Course.canvas_id == canvas_course_id,
                            Course.user_id == current_user.id
                        ).first()
                        if course:
                            break
            
            if course and course.canvas_id:
                print(f"Scanning Files tab for course {course.canvas_id}...")
                scraper = CanvasScraper(
                    base_url=current_user.canvas_instance_url or "https://usflearn.instructure.com",
                    session_cookie=session_cookie
                )
                files_tab_files = scraper.get_course_files(course.canvas_id)
                files_tab_urls = [f.get('url', '') for f in files_tab_files if f.get('url')]
                print(f"Found {len(files_tab_urls)} files from Files tab")
        except Exception as e:
            print(f"Warning: Failed to scan Files tab: {e}")
    
    # Combine user-selected files with files tab files if requested
    all_file_urls = list(request.file_urls) if request.file_urls else []
    if files_tab_urls:
        all_file_urls.extend(files_tab_urls)
        # Remove duplicates
        all_file_urls = list(dict.fromkeys(all_file_urls))
    
    # If specific file URLs were provided (or from files tab), use those
    if all_file_urls and len(all_file_urls) > 0:
        print(f"Using {len(all_file_urls)} files (user-selected + files tab)")
        for file_url in all_file_urls:
            # Find the item name from the module items or use URL as fallback
            item_name = 'Unknown'
            if module and items:
                item_name = next((item.get('title', 'Unknown') for item in items if item.get('url') == file_url), 'Unknown')
            else:
                # Extract filename from URL
                import os
                from urllib.parse import urlparse, unquote
                parsed = urlparse(file_url)
                item_name = os.path.basename(unquote(parsed.path)) or 'File'
            
            print(f"Processing selected file: {item_name}")
            text = extract_text_from_url(
                file_url,
                session_cookie,
                current_user.canvas_instance_url or "https://usflearn.instructure.com"
            )
            if text and len(text) > 50:
                print(f"  Extracted {len(text)} characters")
                all_text += text + "\n\n"
                items_processed += 1
            else:
                print(f"  Failed to extract text or too short")
    elif module:
        # Default behavior: process all items
        for item in items[:10]:  # Try up to 10 items
            item_url = item.get('url', '')
            item_name = item.get('title', '') or item.get('name', '')
            
            print(f"Processing item: {item_name}")
            
            if item_url and '.pdf' in item_name.lower():  # Prioritize PDFs
                print(f"  Extracting PDF: {item_name}")
                text = extract_text_from_url(
                    item_url,
                    session_cookie,
                    current_user.canvas_instance_url or "https://usflearn.instructure.com"
                )
                if text and len(text) > 50:
                    print(f"  Extracted {len(text)} characters")
                    all_text += text + "\n\n"
                    items_processed += 1
                else:
                    print(f"  Failed to extract text or too short")
        
        # If not enough from PDFs, try HTML pages
        if len(all_text) < 500 and items_processed < 2:
            for item in items[:10]:
                item_url = item.get('url', '')
                item_name = item.get('title', '') or item.get('name', '')
                
                if item_url and '.pdf' not in item_name.lower():
                    text = extract_text_from_url(
                        item_url,
                        session_cookie,
                        current_user.canvas_instance_url or "https://usflearn.instructure.com"
                    )
                    if text:
                        all_text += text + "\n\n"
    
    print(f"Total text extracted: {len(all_text)} characters from {items_processed} items")
    print(f"Content preview: {all_text[:300]}...")
    
    if len(all_text) < 200:
        module_or_files = f"module '{module.name}'" if module else "selected files"
        raise HTTPException(
            status_code=400,
            detail=f"Not enough content found in {module_or_files}. Try selecting files with more content or ensure files are accessible."
        )
    
    # Generate flashcards using Groq
    try:
        print(f"Sending to Groq for flashcard generation...")
        flashcards = generate_flashcards_with_groq(
            content=all_text,
            module_name=module_name,
            num_cards=request.num_cards
        )
        print(f"Generated {len(flashcards)} flashcards")
        
        return GenerateFlashcardsResponse(
            flashcards=flashcards,
            module_name=module_name,
            count=len(flashcards)
        )
        
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))





