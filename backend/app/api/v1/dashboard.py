from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List, Dict, Any
from pydantic import BaseModel

from app.db.database import get_db
from app.models.user import User
from app.models.assignment import Assignment
from app.models.course import Course
from app.models.flashcard import Flashcard
from app.api.v1.auth import get_current_user

router = APIRouter()

class DueItem(BaseModel):
    id: int
    title: str
    course_code: str
    course_name: str
    due_date: datetime
    type: str  # "assignment" or "flashcard"
    priority: str  # "urgent", "high", "normal"

class StudySuggestion(BaseModel):
    message: str
    action: str
    course_code: str = None

class CourseProgress(BaseModel):
    id: int
    code: str
    name: str
    progress: float

class UpcomingAssignment(BaseModel):
    id: int
    title: str
    course_code: str
    course_name: str
    due_date: datetime
    priority: str
    type: str

class Task(BaseModel):
    id: int
    title: str
    course_code: str
    due_date: datetime
    priority: str
    completed: bool

class DashboardData(BaseModel):
    due_today: List[DueItem]
    study_suggestions: List[StudySuggestion]
    courses: List[CourseProgress]
    upcoming_assignments: List[UpcomingAssignment]
    study_streak_days: int
    todays_tasks: List[Task]

@router.get("/", response_model=DashboardData)
async def get_dashboard_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all dashboard data"""
    
    # Get due today items
    today = datetime.utcnow().date()
    tomorrow = today + timedelta(days=1)
    
    due_today_assignments = db.query(Assignment).filter(
        Assignment.user_id == current_user.id,
        func.date(Assignment.due_date) == today
    ).all()
    
    due_today = []
    for assignment in due_today_assignments:
        course = db.query(Course).filter(Course.id == assignment.course_id).first()
        due_today.append(DueItem(
            id=assignment.id,
            title=assignment.title,
            course_code=course.code if course else "Unknown",
            course_name=course.name if course else "Unknown Course",
            due_date=assignment.due_date,
            type="assignment",
            priority="urgent"
        ))
    
    # Get study suggestions
    study_suggestions = []
    
    # Check for assignments due in next 48 hours
    two_days_from_now = today + timedelta(days=2)
    upcoming_count = db.query(Assignment).filter(
        Assignment.user_id == current_user.id,
        func.date(Assignment.due_date) > today,
        func.date(Assignment.due_date) <= two_days_from_now
    ).count()
    
    if upcoming_count > 0:
        study_suggestions.append(StudySuggestion(
            message=f"{upcoming_count} assignments due in 48 hours",
            action="review"
        ))
    
    # Mock flashcards due
    study_suggestions.append(StudySuggestion(
        message="5 flashcards due today",
        action="review",
        course_code="CS 101"
    ))
    
    # Get courses with progress
    courses = db.query(Course).filter(Course.user_id == current_user.id).all()
    course_progress = []
    for course in courses:
        # Calculate progress based on completed assignments
        total_assignments = db.query(Assignment).filter(
            Assignment.course_id == course.id
        ).count()
        
        completed_assignments = db.query(Assignment).filter(
            Assignment.course_id == course.id,
            Assignment.submitted == True
        ).count()
        
        progress = (completed_assignments / total_assignments * 100) if total_assignments > 0 else 0
        
        course_progress.append(CourseProgress(
            id=course.id,
            code=course.code,
            name=course.name,
            progress=round(progress, 1)
        ))
    
    # Get upcoming assignments
    upcoming_assignments_query = db.query(Assignment).filter(
        Assignment.user_id == current_user.id,
        Assignment.due_date > datetime.utcnow()
    ).order_by(Assignment.due_date).limit(5).all()
    
    upcoming_assignments = []
    for assignment in upcoming_assignments_query:
        course = db.query(Course).filter(Course.id == assignment.course_id).first()
        
        # Determine priority based on due date
        days_until_due = (assignment.due_date.date() - today).days
        if days_until_due <= 1:
            priority = "urgent"
        elif days_until_due <= 3:
            priority = "high"
        else:
            priority = "normal"
        
        upcoming_assignments.append(UpcomingAssignment(
            id=assignment.id,
            title=assignment.title,
            course_code=course.code if course else "Unknown",
            course_name=course.name if course else "Unknown Course",
            due_date=assignment.due_date,
            priority=priority,
            type="assignment"
        ))
    
    # Get today's tasks (same as due today + some from upcoming)
    todays_tasks = []
    for item in due_today:
        todays_tasks.append(Task(
            id=item.id,
            title=item.title,
            course_code=item.course_code,
            due_date=item.due_date,
            priority=item.priority,
            completed=False
        ))
    
    # Add mock review task
    todays_tasks.append(Task(
        id=9999,
        title="Review Week Materials",
        course_code="All Courses",
        due_date=datetime.utcnow(),
        priority="normal",
        completed=False
    ))
    
    return DashboardData(
        due_today=due_today,
        study_suggestions=study_suggestions,
        courses=course_progress,
        upcoming_assignments=upcoming_assignments,
        study_streak_days=current_user.study_streak_days,
        todays_tasks=todays_tasks
    )


