from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user_settings import UserSettings as UserSettingsModel
from app.schemas.settings import UserSettings, UserSettingsUpdate

router = APIRouter()

@router.get("/", response_model=UserSettings)
def get_settings(db: Session = Depends(get_db)):
    """Get user settings (creates default if not exists)"""
    settings = db.query(UserSettingsModel).first()
    if not settings:
        # Create default settings
        settings = UserSettingsModel()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings

@router.put("/", response_model=UserSettings)
def update_settings(settings: UserSettingsUpdate, db: Session = Depends(get_db)):
    """Update user settings"""
    db_settings = db.query(UserSettingsModel).first()
    if not db_settings:
        # Create if doesn't exist
        db_settings = UserSettingsModel()
        db.add(db_settings)
    
    update_data = settings.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_settings, key, value)
    
    db.commit()
    db.refresh(db_settings)
    return db_settings

