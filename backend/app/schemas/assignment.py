from pydantic import BaseModel, ConfigDict
from datetime import datetime

class AssignmentBase(BaseModel):
    title: str
    course: str
    course_id: int
    due_date: datetime
    type: str
    priority: str = "medium"
    status: str = "pending"
    submitted: bool = False
    description: str | None = None
    points: int | None = None

class AssignmentCreate(AssignmentBase):
    user_id: int

class AssignmentUpdate(BaseModel):
    title: str | None = None
    course: str | None = None
    due_date: datetime | None = None
    type: str | None = None
    priority: str | None = None
    status: str | None = None
    submitted: bool | None = None
    description: str | None = None
    points: int | None = None

class Assignment(AssignmentBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)





