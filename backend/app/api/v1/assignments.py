from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.assignment import Assignment as AssignmentModel
from app.schemas.assignment import Assignment, AssignmentCreate, AssignmentUpdate

router = APIRouter()

@router.get("/", response_model=list[Assignment])
def get_assignments(
    course_id: str | None = Query(None, description="Filter by course ID"),
    status: str | None = Query(None, description="Filter by status"),
    db: Session = Depends(get_db)
):
    """Get all assignments with optional filters"""
    query = db.query(AssignmentModel)
    
    if course_id:
        query = query.filter(AssignmentModel.course_id == course_id)
    if status:
        query = query.filter(AssignmentModel.status == status)
    
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

