from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(String, primary_key=True, index=True)
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    instructor = Column(String, nullable=False)
    term = Column(String, nullable=False)
    progress = Column(Float, default=0.0)
    color = Column(String, nullable=False, default="#3B82F6")



