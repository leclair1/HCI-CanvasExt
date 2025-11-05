from pydantic import BaseModel, Field

class CourseBase(BaseModel):
    code: str
    name: str
    instructor: str
    term: str
    progress: float = Field(default=0.0, ge=0.0, le=100.0)
    color: str = "#3B82F6"

class CourseCreate(CourseBase):
    id: str

class CourseUpdate(BaseModel):
    code: str | None = None
    name: str | None = None
    instructor: str | None = None
    term: str | None = None
    progress: float | None = Field(default=None, ge=0.0, le=100.0)
    color: str | None = None

class Course(CourseBase):
    id: str
    
    class Config:
        from_attributes = True

