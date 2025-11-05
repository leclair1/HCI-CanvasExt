from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.course import Course as CourseModel
from app.schemas.course import Course, CourseCreate, CourseUpdate

router = APIRouter()

@router.get("/", response_model=list[Course])
def get_courses(db: Session = Depends(get_db)):
    """Get all courses"""
    return db.query(CourseModel).all()

@router.get("/{course_id}", response_model=Course)
def get_course(course_id: str, db: Session = Depends(get_db)):
    """Get a specific course by ID"""
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/", response_model=Course, status_code=201)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    """Create a new course"""
    # Check if course with same ID already exists
    existing = db.query(CourseModel).filter(CourseModel.id == course.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Course with this ID already exists")
    
    db_course = CourseModel(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.put("/{course_id}", response_model=Course)
def update_course(course_id: str, course: CourseUpdate, db: Session = Depends(get_db)):
    """Update an existing course"""
    db_course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    update_data = course.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_course, key, value)
    
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/{course_id}", status_code=204)
def delete_course(course_id: str, db: Session = Depends(get_db)):
    """Delete a course"""
    db_course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(db_course)
    db.commit()
    return None

