from sqlalchemy import Column, Integer, String, DateTime
from app.db.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    canvas_user_id = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    
    # Canvas API credentials
    canvas_instance_url = Column(String, nullable=False)  # e.g., https://canvas.instructure.com
    canvas_access_token = Column(String, nullable=False)  # Encrypted in production!
    
    # Metadata
    last_sync = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

