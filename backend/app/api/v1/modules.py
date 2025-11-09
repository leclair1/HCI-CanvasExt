from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.module import Module as ModuleModel
from app.schemas.module import Module, ModuleCreate
from typing import List

router = APIRouter()

@router.get("/course/{course_id}", response_model=List[Module])
def get_course_modules(course_id: int, db: Session = Depends(get_db)):
    """Get all modules for a specific course"""
    modules = db.query(ModuleModel).filter(
        ModuleModel.course_id == course_id
    ).order_by(ModuleModel.position).all()
    return modules

@router.get("/{module_id}", response_model=Module)
def get_module(module_id: int, db: Session = Depends(get_db)):
    """Get a specific module by ID"""
    module = db.query(ModuleModel).filter(ModuleModel.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

@router.post("/", response_model=Module, status_code=201)
def create_module(module: ModuleCreate, db: Session = Depends(get_db)):
    """Create a new module"""
    db_module = ModuleModel(**module.model_dump())
    db.add(db_module)
    db.commit()
    db.refresh(db_module)
    return db_module


