from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, UniqueConstraint
from app.db.database import Base
from datetime import datetime

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    canvas_id = Column(String, index=True, nullable=True)  # Canvas course ID
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    instructor = Column(String, nullable=True)
    term = Column(String, nullable=True)
    progress = Column(Float, default=0.0)
    color = Column(String, nullable=False, default="#3B82F6")
    is_active = Column(Integer, default=1)  # 1 for active, 0 for inactive
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Unique constraint: Each user can only have each Canvas course once
    __table_args__ = (
        UniqueConstraint('canvas_id', 'user_id', name='uq_canvas_user'),
    )



