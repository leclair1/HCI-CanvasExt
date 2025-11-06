from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.db.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Basic user info
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    
    # Canvas integration (now optional for signup)
    canvas_user_id = Column(String, unique=True, nullable=True)
    canvas_instance_url = Column(String, nullable=True)  # e.g., https://canvas.instructure.com
    canvas_access_token = Column(String, nullable=True)  # Canvas API key
    
    # Notification settings
    email_notifications = Column(Boolean, default=True)
    push_notifications = Column(Boolean, default=True)
    study_reminders = Column(Boolean, default=True)
    deadline_alerts = Column(Boolean, default=True)
    
    # Appearance settings
    dark_mode = Column(Boolean, default=False)
    
    # Study tracking
    study_streak_days = Column(Integer, default=0)
    last_study_date = Column(DateTime, nullable=True)
    
    # Metadata
    last_sync = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)




