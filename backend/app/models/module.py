from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON
from app.db.database import Base
from datetime import datetime

class Module(Base):
    __tablename__ = "modules"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    name = Column(String, nullable=False)
    position = Column(Integer, default=0)  # Order in the course
    items = Column(JSON, nullable=True)  # Store module items as JSON
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


