from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.module import Module as ModuleModel
from app.models.course import Course
from app.schemas.module import Module, ModuleCreate
from app.api.v1.auth import get_current_user
from app.models.user import User
from app.core.encryption import decrypt_data
from app.services.canvas_scraper import CanvasScraper
from typing import List

router = APIRouter()

@router.get("/course/{course_id}", response_model=List[Module])
def get_course_modules(
    course_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all modules for a specific course. Fetches from Canvas if not in database."""
    # First check if modules exist in database
    modules = db.query(ModuleModel).filter(
        ModuleModel.course_id == course_id
    ).order_by(ModuleModel.position).all()
    
    # If no modules in database, try to fetch from Canvas
    if not modules:
        print(f"No modules found in database for course {course_id}, attempting to fetch from Canvas")
        
        # Get the course to find canvas_id
        course = db.query(Course).filter(Course.id == course_id).first()
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        
        # Check if user has Canvas session cookie
        if not current_user.canvas_session_cookie:
            print("No Canvas session cookie available")
            return []  # Return empty list if no session
        
        # Get Canvas session cookie
        try:
            session_cookie = decrypt_data(current_user.canvas_session_cookie)
            canvas_url = current_user.canvas_instance_url or "https://usflearn.instructure.com"
            
            if not session_cookie or not course.canvas_id:
                print("Missing session cookie or canvas_id")
                return []
            
            # Fetch modules from Canvas
            scraper = CanvasScraper(
                base_url=canvas_url,
                session_cookie=session_cookie
            )
            
            modules_data = scraper.get_course_modules(course.canvas_id)
            print(f"Fetched {len(modules_data)} modules from Canvas for course {course.canvas_id}")
            
            # Save modules to database
            for pos, module_data in enumerate(modules_data):
                module_name = module_data.get('name', 'Unnamed Module')
                
                # Check if module already exists
                existing_module = db.query(ModuleModel).filter(
                    ModuleModel.course_id == course_id,
                    ModuleModel.name == module_name
                ).first()
                
                if not existing_module:
                    module = ModuleModel(
                        course_id=course_id,
                        name=module_name,
                        position=pos,
                        items=module_data.get('items', [])
                    )
                    db.add(module)
            
            db.commit()
            
            # Query again to get saved modules
            modules = db.query(ModuleModel).filter(
                ModuleModel.course_id == course_id
            ).order_by(ModuleModel.position).all()
            
            print(f"Saved {len(modules)} modules to database")
            
        except Exception as e:
            print(f"Error fetching modules from Canvas: {e}")
            db.rollback()
            # Return empty list on error, don't fail the request
            return []
    
    return modules

@router.get("/{module_id}", response_model=Module)
def get_module(module_id: int, db: Session = Depends(get_db)):
    """Get a specific module by ID"""
    module = db.query(ModuleModel).filter(ModuleModel.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

@router.post("/", response_model=Module, status_code=201)
def create_module(module: ModuleCreate, db: Session = Depends(get_db)):
    """Create a new module"""
    db_module = ModuleModel(**module.model_dump())
    db.add(db_module)
    db.commit()
    db.refresh(db_module)
    return db_module


