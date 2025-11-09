from pydantic import BaseModel
from datetime import datetime

class AssignmentBase(BaseModel):
    title: str
    course: str
    course_id: str
    due_date: str
    type: str
    priority: str = "medium"
    status: str = "pending"
    description: str | None = None
    points: int | None = None

class AssignmentCreate(AssignmentBase):
    id: str

class AssignmentUpdate(BaseModel):
    title: str | None = None
    due_date: str | None = None
    type: str | None = None
    priority: str | None = None
    status: str | None = None
    description: str | None = None
    points: int | None = None

class Assignment(AssignmentBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True





