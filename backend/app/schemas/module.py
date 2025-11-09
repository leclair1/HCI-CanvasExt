from pydantic import BaseModel
from typing import List, Dict, Any

class ModuleItem(BaseModel):
    name: str
    url: str

class ModuleBase(BaseModel):
    name: str
    position: int = 0
    items: List[Dict[str, Any]] = []

class ModuleCreate(ModuleBase):
    course_id: int

class Module(ModuleBase):
    id: int
    course_id: int
    
    class Config:
        from_attributes = True


