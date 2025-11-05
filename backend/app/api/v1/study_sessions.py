from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.db.database import get_db
from app.models.study_session import StudySession as StudySessionModel
from app.schemas.study_session import StudySession, StudySessionCreate, StudyStats

router = APIRouter()

@router.get("/", response_model=list[StudySession])
def get_study_sessions(
    course_id: str | None = Query(None, description="Filter by course ID"),
    days: int | None = Query(None, description="Filter by last N days"),
    db: Session = Depends(get_db)
):
    """Get all study sessions with optional filters"""
    query = db.query(StudySessionModel)
    
    if course_id:
        query = query.filter(StudySessionModel.course_id == course_id)
    if days:
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        query = query.filter(StudySessionModel.session_date >= cutoff_date)
    
    return query.order_by(StudySessionModel.session_date.desc()).all()

@router.get("/stats", response_model=StudyStats)
def get_study_stats(
    days: int | None = Query(30, description="Stats for last N days"),
    db: Session = Depends(get_db)
):
    """Get study statistics"""
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    
    sessions = db.query(StudySessionModel).filter(
        StudySessionModel.session_date >= cutoff_date
    ).all()
    
    total_minutes = sum(s.duration_minutes for s in sessions)
    total_sessions = len(sessions)
    
    # Group by course
    by_course = {}
    for session in sessions:
        by_course[session.course_id] = by_course.get(session.course_id, 0) + session.duration_minutes
    
    # Group by activity type
    by_activity = {}
    for session in sessions:
        by_activity[session.activity_type] = by_activity.get(session.activity_type, 0) + session.duration_minutes
    
    return StudyStats(
        total_minutes=total_minutes,
        total_sessions=total_sessions,
        by_course=by_course,
        by_activity=by_activity
    )

@router.post("/", response_model=StudySession, status_code=201)
def create_study_session(session: StudySessionCreate, db: Session = Depends(get_db)):
    """Log a new study session"""
    db_session = StudySessionModel(**session.model_dump())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@router.delete("/{session_id}", status_code=204)
def delete_study_session(session_id: int, db: Session = Depends(get_db)):
    """Delete a study session"""
    db_session = db.query(StudySessionModel).filter(StudySessionModel.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Study session not found")
    
    db.delete(db_session)
    db.commit()
    return None

