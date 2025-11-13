from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserSignup(BaseModel):
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=8)
    canvas_api_key: Optional[str] = None
    canvas_instance_url: Optional[str] = "https://usflearn.instructure.com"
    canvas_session_cookie: Optional[str] = None  # Canvas session cookie for scraping

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    canvas_user_id: Optional[str]
    study_streak_days: int
    dark_mode: bool
    email_notifications: bool
    push_notifications: bool
    study_reminders: bool
    deadline_alerts: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
    canvas_session_valid: Optional[bool] = None
    has_canvas_session: Optional[bool] = None

class TokenData(BaseModel):
    email: Optional[str] = None


