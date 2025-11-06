"""
Canvas Integration API Endpoints
Handles authentication and data syncing with Canvas LMS
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from app.db.database import get_db
from app.services.canvas_client import CanvasClient, CanvasAuthError
from app.services.canvas_sync import CanvasSyncService
from app.models.user import User
from datetime import datetime

router = APIRouter()


class CanvasAuthRequest(BaseModel):
    """Request model for Canvas authentication"""
    canvas_url: str = Field(..., description="Canvas instance URL (e.g., https://canvas.instructure.com)")
    access_token: str = Field(..., description="Canvas API access token")


class CanvasAuthResponse(BaseModel):
    """Response model for Canvas authentication"""
    success: bool
    user_id: int
    canvas_user_id: str
    name: str
    email: str
    message: str


class SyncResponse(BaseModel):
    """Response model for data sync"""
    success: bool
    courses_synced: int
    assignments_synced: int
    last_sync: str
    errors: list[str] = []


@router.post("/auth", response_model=CanvasAuthResponse)
async def authenticate_canvas(
    auth_request: CanvasAuthRequest,
    db: Session = Depends(get_db)
):
    """
    Authenticate with Canvas LMS and save user credentials
    
    Steps:
    1. Validate Canvas credentials by fetching user info
    2. Create or update user in database
    3. Return user information
    """
    try:
        # Create Canvas client
        canvas = CanvasClient(
            base_url=auth_request.canvas_url,
            access_token=auth_request.access_token
        )
        
        # Verify credentials by getting user info
        try:
            canvas_user = await canvas.get_current_user()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid Canvas credentials: {str(e)}"
            )
        finally:
            await canvas.close()
        
        # Extract user information
        canvas_user_id = str(canvas_user.get('id'))
        name = canvas_user.get('name', 'Unknown')
        email = canvas_user.get('primary_email') or canvas_user.get('email', f"user{canvas_user_id}@canvas.local")
        
        # Check if user exists
        user = db.query(User).filter(User.canvas_user_id == canvas_user_id).first()
        
        if user:
            # Update existing user
            user.name = name
            user.email = email
            user.canvas_instance_url = auth_request.canvas_url
            user.canvas_access_token = auth_request.access_token  # TODO: Encrypt in production!
            user.updated_at = datetime.utcnow()
        else:
            # Create new user
            user = User(
                canvas_user_id=canvas_user_id,
                name=name,
                email=email,
                canvas_instance_url=auth_request.canvas_url,
                canvas_access_token=auth_request.access_token  # TODO: Encrypt in production!
            )
            db.add(user)
        
        db.commit()
        db.refresh(user)
        
        return CanvasAuthResponse(
            success=True,
            user_id=user.id,
            canvas_user_id=canvas_user_id,
            name=name,
            email=email,
            message="Successfully authenticated with Canvas"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Authentication error: {str(e)}"
        )


@router.post("/sync", response_model=SyncResponse)
async def sync_canvas_data(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Sync data from Canvas LMS to local database
    
    Fetches:
    - Courses
    - Assignments
    - Modules (future)
    - Files (future)
    """
    try:
        # Get user
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found. Please authenticate first."
            )
        
        # Create Canvas client
        canvas = CanvasClient(
            base_url=user.canvas_instance_url,
            access_token=user.canvas_access_token
        )
        
        # Create sync service
        sync_service = CanvasSyncService(db=db, canvas_client=canvas)
        
        # Perform sync
        try:
            results = await sync_service.sync_all()
        finally:
            await canvas.close()
        
        # Update last sync time
        user.last_sync = datetime.utcnow()
        db.commit()
        
        return SyncResponse(
            success=True,
            courses_synced=results.get('courses', 0),
            assignments_synced=results.get('assignments', 0),
            last_sync=user.last_sync.isoformat(),
            errors=results.get('errors', [])
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Sync error: {str(e)}"
        )


@router.get("/user/{user_id}")
async def get_user_info(user_id: int, db: Session = Depends(get_db)):
    """Get user information and last sync status"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "canvas_user_id": user.canvas_user_id,
        "canvas_instance_url": user.canvas_instance_url,
        "last_sync": user.last_sync.isoformat() if user.last_sync else None,
        "created_at": user.created_at.isoformat()
    }


@router.post("/sync/courses/{user_id}")
async def sync_courses_only(user_id: int, db: Session = Depends(get_db)):
    """Sync only courses from Canvas"""
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        canvas = CanvasClient(user.canvas_instance_url, user.canvas_access_token)
        sync_service = CanvasSyncService(db=db, canvas_client=canvas)
        
        try:
            count = await sync_service.sync_courses()
            return {"success": True, "courses_synced": count}
        finally:
            await canvas.close()
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/sync/assignments/{user_id}/{course_id}")
async def sync_assignments_only(
    user_id: int,
    course_id: str,
    db: Session = Depends(get_db)
):
    """Sync assignments for a specific course"""
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        canvas = CanvasClient(user.canvas_instance_url, user.canvas_access_token)
        sync_service = CanvasSyncService(db=db, canvas_client=canvas)
        
        try:
            count = await sync_service.sync_assignments(course_id)
            return {"success": True, "assignments_synced": count}
        finally:
            await canvas.close()
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




