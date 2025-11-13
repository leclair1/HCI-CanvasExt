from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.assignment import Assignment as AssignmentModel
from app.models.user import User
from app.schemas.assignment import Assignment, AssignmentCreate, AssignmentUpdate
from app.api.v1.auth import get_current_user
from typing import Optional

router = APIRouter()

@router.get("/", response_model=list[Assignment])
def get_assignments(
    course_id: int | None = Query(None, description="Filter by course ID"),
    status: str | None = Query(None, description="Filter by status"),
    upcoming_only: bool = Query(True, description="Only show upcoming assignments (not overdue)"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all assignments for the current user with optional filters"""
    from datetime import datetime
    
    query = db.query(AssignmentModel)
    
    # Always filter by current user for security
    query = query.filter(AssignmentModel.user_id == current_user.id)
    
    # Filter out assignments without due dates
    query = query.filter(AssignmentModel.due_date.isnot(None))
    
    # Filter to only upcoming (not overdue) if requested
    if upcoming_only:
        query = query.filter(AssignmentModel.due_date >= datetime.utcnow())
    
    if course_id:
        query = query.filter(AssignmentModel.course_id == course_id)
    if status:
        query = query.filter(AssignmentModel.status == status)
    
    # Order by due date (soonest first)
    query = query.order_by(AssignmentModel.due_date.asc())
    
    return query.all()

@router.get("/{assignment_id}", response_model=Assignment)
def get_assignment(assignment_id: str, db: Session = Depends(get_db)):
    """Get a specific assignment by ID"""
    assignment = db.query(AssignmentModel).filter(AssignmentModel.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment

@router.post("/", response_model=Assignment, status_code=201)
def create_assignment(assignment: AssignmentCreate, db: Session = Depends(get_db)):
    """Create a new assignment"""
    db_assignment = AssignmentModel(**assignment.model_dump())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

@router.put("/{assignment_id}", response_model=Assignment)
def update_assignment(assignment_id: str, assignment: AssignmentUpdate, db: Session = Depends(get_db)):
    """Update an existing assignment"""
    db_assignment = db.query(AssignmentModel).filter(AssignmentModel.id == assignment_id).first()
    if not db_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    update_data = assignment.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_assignment, key, value)
    
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

@router.delete("/{assignment_id}", status_code=204)
def delete_assignment(assignment_id: str, db: Session = Depends(get_db)):
    """Delete an assignment"""
    db_assignment = db.query(AssignmentModel).filter(AssignmentModel.id == assignment_id).first()
    if not db_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    db.delete(db_assignment)
    db.commit()
    return None





