"""
Import Canvas Data and Flashcards into Database
Run this script to populate your database with courses, modules, and flashcards from Canvas
"""

import sys
import json
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent))

from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine, Base
from app.models.course import Course
from app.models.module import Module
from app.models.flashcard import Flashcard, FlashcardSet

# Create tables
Base.metadata.create_all(bind=engine)

def load_json(filename):
    """Load JSON file"""
    # Try current directory first (Docker mounted files)
    file_path = Path(__file__).parent / filename
    if not file_path.exists():
        # Try parent directory (local run)
        file_path = Path(__file__).parent.parent / filename
    
    if not file_path.exists():
        print(f"[ERROR] File not found: {filename}")
        print(f"  Looked in: {file_path}")
        return None
    
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def import_courses_and_modules(db: Session, user_id: int = 1):
    """Import courses and modules from canvas_data.json"""
    
    print("\n" + "="*70)
    print(" IMPORTING COURSES AND MODULES")
    print("="*70)
    
    # Load canvas data
    canvas_data = load_json('canvas_data.json')
    if not canvas_data:
        return
    
    colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"]
    color_idx = 0
    
    imported_courses = 0
    imported_modules = 0
    
    for course_data in canvas_data:
        canvas_id = course_data.get('id')
        name = course_data.get('name', 'Unnamed Course')
        
        # Check if course already exists
        existing = db.query(Course).filter(Course.canvas_id == canvas_id).first()
        
        if existing:
            print(f"  [SKIP] Course already exists: {name}")
            course = existing
        else:
            # Extract course code from name (e.g., "CIS4930" from "CIS4930.004F25.92007...")
            code = name.split('.')[0] if '.' in name else name.split()[0]
            
            # Create new course
            course = Course(
                canvas_id=canvas_id,
                user_id=user_id,
                code=code,
                name=name,
                instructor="TBD",  # Will be updated later
                term="Fall 2025",
                progress=0.0,
                color=colors[color_idx % len(colors)],
                is_active=1
            )
            
            db.add(course)
            db.flush()  # Get the course ID
            
            color_idx += 1
            imported_courses += 1
            print(f"  [+] Imported course: {name}")
        
        # Import modules
        modules = course_data.get('modules', [])
        for idx, module_data in enumerate(modules):
            module_name = module_data.get('name', 'Unnamed Module')
            
            # Check if module already exists
            existing_module = db.query(Module).filter(
                Module.course_id == course.id,
                Module.name == module_name
            ).first()
            
            if existing_module:
                continue
            
            # Create module
            module = Module(
                course_id=course.id,
                name=module_name,
                position=idx,
                items=module_data.get('items', [])
            )
            
            db.add(module)
            imported_modules += 1
    
    db.commit()
    
    print(f"\n  Imported: {imported_courses} courses, {imported_modules} modules")
    print("="*70)


def import_flashcards(db: Session, user_id: int = 1):
    """Import flashcards from flashcards_groq.json"""
    
    print("\n" + "="*70)
    print(" IMPORTING FLASHCARDS")
    print("="*70)
    
    # Load flashcards
    flashcards_data = load_json('flashcards_groq.json')
    if not flashcards_data:
        print("  [INFO] No flashcards file found, skipping...")
        return
    
    # Group flashcards by course/module
    flashcard_groups = {}
    for card in flashcards_data:
        module_name = card.get('module', 'Unknown Module')
        if module_name not in flashcard_groups:
            flashcard_groups[module_name] = []
        flashcard_groups[module_name].append(card)
    
    imported_flashcards = 0
    
    # Get the first course (HCI course)
    course = db.query(Course).filter(Course.is_active == 1).first()
    if not course:
        print("  [ERROR] No active course found")
        return
    
    print(f"  Importing flashcards for: {course.name}")
    
    # Create flashcard sets for each module
    for module_name, cards in flashcard_groups.items():
        # Check if flashcard set already exists
        existing_set = db.query(FlashcardSet).filter(
            FlashcardSet.user_id == user_id,
            FlashcardSet.course_id == course.id,
            FlashcardSet.title == module_name
        ).first()
        
        if existing_set:
            print(f"  [SKIP] Flashcard set already exists: {module_name}")
            flashcard_set = existing_set
        else:
            # Create flashcard set
            flashcard_set = FlashcardSet(
                user_id=user_id,
                course_id=course.id,
                title=module_name,
                description=f"AI-generated flashcards from {module_name}"
            )
            db.add(flashcard_set)
            db.flush()
            print(f"  [+] Created flashcard set: {module_name}")
        
        # Import flashcards
        for card in cards:
            # Check if flashcard already exists
            existing_card = db.query(Flashcard).filter(
                Flashcard.set_id == flashcard_set.id,
                Flashcard.question == card['question']
            ).first()
            
            if existing_card:
                continue
            
            flashcard = Flashcard(
                set_id=flashcard_set.id,
                user_id=user_id,
                course_id=course.id,
                question=card['question'],
                answer=card['answer'],
                difficulty="medium",
                times_reviewed=0,
                mastered=False
            )
            db.add(flashcard)
            imported_flashcards += 1
    
    db.commit()
    
    print(f"\n  Imported: {imported_flashcards} flashcards")
    print("="*70)


def main():
    """Main import function"""
    print("\n" + "="*70)
    print(" CANVAS DATA IMPORT SCRIPT")
    print("="*70)
    print()
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Import courses and modules
        import_courses_and_modules(db, user_id=1)
        
        # Import flashcards
        import_flashcards(db, user_id=1)
        
        print("\n" + "="*70)
        print(" IMPORT COMPLETE!")
        print("="*70)
        print()
        print("Summary:")
        
        courses_count = db.query(Course).count()
        modules_count = db.query(Module).count()
        flashcards_count = db.query(Flashcard).count()
        
        print(f"  Total Courses: {courses_count}")
        print(f"  Total Modules: {modules_count}")
        print(f"  Total Flashcards: {flashcards_count}")
        print()
        print("Next steps:")
        print("  1. Start backend: cd backend && uvicorn app.main:app --reload")
        print("  2. Test API: http://localhost:8000/api/docs")
        print("  3. Start frontend: cd frontendv2 && npm run dev")
        print()
        
    except Exception as e:
        print(f"\n[ERROR] Import failed: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()

