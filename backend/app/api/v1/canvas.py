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
from app.services.canvas_scraper import CanvasScraper
from app.models.user import User
from app.models.course import Course
from app.models.module import Module
from app.api.v1.auth import get_current_user
from datetime import datetime
from typing import List, Dict

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
        sync_service = CanvasSyncService(db=db, canvas_client=canvas, user_id=user.id)
        
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
        sync_service = CanvasSyncService(db=db, canvas_client=canvas, user_id=user.id)
        
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
        sync_service = CanvasSyncService(db=db, canvas_client=canvas, user_id=user.id)
        
        try:
            count = await sync_service.sync_assignments(course_id)
            return {"success": True, "assignments_synced": count}
        finally:
            await canvas.close()
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class CanvasScraperRequest(BaseModel):
    """Request model for Canvas scraping with session cookie"""
    canvas_url: str = Field(..., description="Canvas instance URL")
    session_cookie: str = Field(..., description="Canvas session cookie value")
    user_id: int = Field(..., description="User ID to associate courses with")


class CanvasScraperResponse(BaseModel):
    """Response model for Canvas scraping"""
    success: bool
    courses_imported: int
    modules_imported: int
    message: str


@router.post("/scrape-courses", response_model=CanvasScraperResponse)
def scrape_canvas_courses(
    request: CanvasScraperRequest,
    db: Session = Depends(get_db)
):
    """
    Scrape courses from Canvas using session cookie
    
    This endpoint:
    1. Scrapes all active courses from Canvas
    2. Imports them into the database
    3. Imports all modules for each course
    
    Use this when users create an account with their Canvas session cookie
    """
    try:
        # Verify user exists
        user = db.query(User).filter(User.id == request.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Create scraper
        scraper = CanvasScraper(
            base_url=request.canvas_url,
            session_cookie=request.session_cookie
        )
        
        # Scrape all active courses
        courses_data = scraper.scrape_all_active_courses()
        
        # Import colors for courses
        colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", 
                  "#06B6D4", "#F97316", "#84CC16", "#A855F7"]
        
        courses_imported = 0
        modules_imported = 0
        
        # Import each course
        for idx, course_data in enumerate(courses_data):
            canvas_id = course_data['id']
            name = course_data['name']
            
            # Check if course already exists
            existing = db.query(Course).filter(Course.canvas_id == canvas_id).first()
            
            if existing:
                course = existing
            else:
                # Extract course code from name
                code = name.split('.')[0] if '.' in name else name.split()[0]
                
                # Create new course
                course = Course(
                    canvas_id=canvas_id,
                    user_id=request.user_id,
                    code=code,
                    name=name,
                    instructor="TBD",
                    term="Current Semester",
                    progress=0.0,
                    color=colors[idx % len(colors)],
                    is_active=1
                )
                
                db.add(course)
                db.flush()
                courses_imported += 1
            
            # Import modules
            for pos, module_data in enumerate(course_data.get('modules', [])):
                module_name = module_data.get('name', 'Unnamed Module')
                
                # Check if module already exists
                existing_module = db.query(Module).filter(
                    Module.course_id == course.id,
                    Module.name == module_name
                ).first()
                
                if not existing_module:
                    module = Module(
                        course_id=course.id,
                        name=module_name,
                        position=pos,
                        items=module_data.get('items', [])
                    )
                    db.add(module)
                    modules_imported += 1
        
        db.commit()
        
        return CanvasScraperResponse(
            success=True,
            courses_imported=courses_imported,
            modules_imported=modules_imported,
            message=f"Successfully imported {courses_imported} courses and {modules_imported} modules"
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Scraping failed: {str(e)}"
        )


class CanvasSessionValidateRequest(BaseModel):
    """Request model for validating Canvas session"""
    canvas_url: str = Field(..., description="Canvas instance URL")
    session_cookie: str = Field(..., description="Canvas session cookie value")


class CanvasSessionValidateResponse(BaseModel):
    """Response model for session validation"""
    is_valid: bool
    message: str


@router.post("/validate-session", response_model=CanvasSessionValidateResponse)
def validate_canvas_session(
    request: CanvasSessionValidateRequest
):
    """
    Validate a Canvas session cookie by attempting to fetch courses
    
    Returns True if the session is valid, False otherwise
    """
    try:
        # Create scraper with the session cookie
        scraper = CanvasScraper(
            base_url=request.canvas_url,
            session_cookie=request.session_cookie
        )
        
        # Try to get courses (this will fail if session is invalid)
        courses = scraper.get_all_courses()
        
        # If we got here, session is valid
        if courses:
            return CanvasSessionValidateResponse(
                is_valid=True,
                message="Canvas session is valid"
            )
        else:
            return CanvasSessionValidateResponse(
                is_valid=False,
                message="Canvas session appears invalid or no courses found"
            )
    except Exception as e:
        return CanvasSessionValidateResponse(
            is_valid=False,
            message=f"Canvas session validation failed: {str(e)}"
        )


class CourseFilesRequest(BaseModel):
    """Request model for getting course files"""
    course_id: str = Field(..., description="Canvas course ID")
    canvas_url: str = Field(..., description="Canvas instance URL")
    session_cookie: str = Field(..., description="Canvas session cookie")


class CourseFile(BaseModel):
    """Model for a course file"""
    name: str
    url: str
    size: str | int | None = None
    content_type: str | None = None
    updated_at: str | None = None


class CourseFilesResponse(BaseModel):
    """Response model for course files"""
    success: bool
    files: List[CourseFile]
    count: int
    message: str


@router.post("/files", response_model=CourseFilesResponse)
def get_course_files(
    request: CourseFilesRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Get all files from the Files tab of a Canvas course
    
    This endpoint scans the Canvas Files tab and returns all available files
    that can be used for flashcards, quizzes, and AI tutor.
    """
    try:
        # Use provided session cookie or fall back to user's stored cookie
        session_cookie = request.session_cookie
        canvas_url = request.canvas_url
        
        if not session_cookie and current_user.canvas_session_cookie:
            from app.core.encryption import decrypt_data
            session_cookie = decrypt_data(current_user.canvas_session_cookie)
            canvas_url = current_user.canvas_instance_url or canvas_url
        
        if not session_cookie:
            raise HTTPException(
                status_code=400,
                detail="Canvas session cookie is required. Please provide a Canvas session cookie to access course files."
            )
        
        # Create scraper
        scraper = CanvasScraper(
            base_url=canvas_url,
            session_cookie=session_cookie
        )
        
        # Get files from the course
        try:
            files_data = scraper.get_course_files(request.course_id)
        except Exception as e:
            print(f"Error in get_course_files: {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch course files: {str(e)}"
            )
        
        # Convert to response format
        files = [
            CourseFile(
                name=f.get('name', 'Unknown'),
                url=f.get('url', ''),
                size=f.get('size'),
                content_type=f.get('content_type'),
                updated_at=f.get('updated_at')
            )
            for f in files_data if f.get('url')  # Only include files with valid URLs
        ]
        
        if len(files) == 0:
            return CourseFilesResponse(
                success=True,
                files=[],
                count=0,
                message="No files found in course. This may be because the course has no files, or the Canvas session may need to be refreshed."
            )
        
        return CourseFilesResponse(
            success=True,
            files=files,
            count=len(files),
            message=f"Found {len(files)} files in course"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch course files: {str(e)}"
        )





