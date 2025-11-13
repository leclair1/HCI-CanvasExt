from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.course import Course as CourseModel
from app.models.user import User
from app.schemas.course import Course, CourseCreate, CourseUpdate
from app.api.v1.auth import get_current_user
from typing import Optional

router = APIRouter()

@router.get("/", response_model=list[Course])
def get_courses(
    active_only: bool = True,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all courses for the current user (active by default)"""
    query = db.query(CourseModel)
    
    # Always filter by current user for security
    query = query.filter(CourseModel.user_id == current_user.id)
    
    if active_only:
        query = query.filter(CourseModel.is_active == 1)
    
    return query.all()

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





