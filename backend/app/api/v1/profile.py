from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.db.database import get_db
from app.models.user import User
from app.schemas.auth import UserResponse
from app.api.v1.auth import get_current_user, get_password_hash, verify_password

router = APIRouter()

class ProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    canvas_api_key: Optional[str] = None
    canvas_instance_url: Optional[str] = None

class NotificationSettings(BaseModel):
    email_notifications: Optional[bool] = None
    push_notifications: Optional[bool] = None
    study_reminders: Optional[bool] = None
    deadline_alerts: Optional[bool] = None

class AppearanceSettings(BaseModel):
    dark_mode: bool

class PasswordChange(BaseModel):
    current_password: str
    new_password: str

@router.get("/", response_model=UserResponse)
async def get_profile(
    current_user: User = Depends(get_current_user)
):
    """Get user profile"""
    return UserResponse.from_orm(current_user)

@router.put("/", response_model=UserResponse)
async def update_profile(
    profile_data: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user profile"""
    if profile_data.first_name is not None:
        current_user.first_name = profile_data.first_name
    if profile_data.last_name is not None:
        current_user.last_name = profile_data.last_name
    if profile_data.canvas_api_key is not None:
        current_user.canvas_access_token = profile_data.canvas_api_key
    if profile_data.canvas_instance_url is not None:
        current_user.canvas_instance_url = profile_data.canvas_instance_url
    
    db.commit()
    db.refresh(current_user)
    
    return UserResponse.from_orm(current_user)

@router.put("/notifications", response_model=UserResponse)
async def update_notification_settings(
    settings: NotificationSettings,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update notification settings"""
    if settings.email_notifications is not None:
        current_user.email_notifications = settings.email_notifications
    if settings.push_notifications is not None:
        current_user.push_notifications = settings.push_notifications
    if settings.study_reminders is not None:
        current_user.study_reminders = settings.study_reminders
    if settings.deadline_alerts is not None:
        current_user.deadline_alerts = settings.deadline_alerts
    
    db.commit()
    db.refresh(current_user)
    
    return UserResponse.from_orm(current_user)

@router.put("/appearance", response_model=UserResponse)
async def update_appearance_settings(
    settings: AppearanceSettings,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update appearance settings"""
    current_user.dark_mode = settings.dark_mode
    
    db.commit()
    db.refresh(current_user)
    
    return UserResponse.from_orm(current_user)

@router.post("/change-password")
async def change_password(
    password_data: PasswordChange,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Change user password"""
    # Verify current password
    if not verify_password(password_data.current_password, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Update password
    current_user.password_hash = get_password_hash(password_data.new_password)
    db.commit()
    
    return {"message": "Password changed successfully"}


