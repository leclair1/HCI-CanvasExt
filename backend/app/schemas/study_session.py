from pydantic import BaseModel, Field
from datetime import datetime

class StudySessionBase(BaseModel):
    course_id: str
    duration_minutes: int = Field(gt=0)
    activity_type: str = "general"
    notes: str | None = None

class StudySessionCreate(StudySessionBase):
    pass

class StudySession(StudySessionBase):
    id: int
    session_date: datetime
    
    class Config:
        from_attributes = True

class StudyStats(BaseModel):
    total_minutes: int
    total_sessions: int
    by_course: dict[str, int]
    by_activity: dict[str, int]




