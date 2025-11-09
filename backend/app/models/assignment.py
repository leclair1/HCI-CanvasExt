from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class Assignment(Base):
    __tablename__ = "assignments"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    course = Column(String, nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    due_date = Column(DateTime, nullable=False)
    type = Column(String, nullable=False)
    priority = Column(String, default="medium")
    status = Column(String, default="pending")
    submitted = Column(Boolean, default=False)
    description = Column(String, nullable=True)
    points = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)



