from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.db.database import Base
from datetime import datetime

class StudySession(Base):
    __tablename__ = "study_sessions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    session_date = Column(DateTime, default=datetime.utcnow)
    activity_type = Column(String, default="general")  # flashcards, reading, practice, etc.
    notes = Column(String, nullable=True)

