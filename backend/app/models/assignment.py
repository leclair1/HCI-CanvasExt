from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class Assignment(Base):
    __tablename__ = "assignments"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    course = Column(String, nullable=False)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    due_date = Column(String, nullable=False)
    type = Column(String, nullable=False)
    priority = Column(String, default="medium")
    status = Column(String, default="pending")
    description = Column(String, nullable=True)
    points = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)



