from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import Optional
from pydantic import BaseModel, Field

from app.db.database import get_db
from app.models.user import User
from app.models.course import Course
from app.models.module import Module
from app.schemas.auth import UserSignup, UserLogin, UserResponse, Token, TokenData, LoginResponse
from app.core.config import settings
from app.core.encryption import encrypt_data, decrypt_data
from app.services.canvas_scraper import CanvasScraper

router = APIRouter()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

# JWT settings
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60  # 30 days

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    """Register a new user and optionally import their Canvas courses"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Encrypt Canvas session cookie if provided
    encrypted_session = ""
    if user_data.canvas_session_cookie:
        encrypted_session = encrypt_data(user_data.canvas_session_cookie)
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        email=user_data.email,
        password_hash=hashed_password,
        canvas_access_token=user_data.canvas_api_key,
        canvas_instance_url=user_data.canvas_instance_url,
        canvas_session_cookie=encrypted_session
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Auto-import Canvas courses if session cookie was provided
    if user_data.canvas_session_cookie and user_data.canvas_instance_url:
        try:
            scraper = CanvasScraper(
                base_url=user_data.canvas_instance_url,
                session_cookie=user_data.canvas_session_cookie
            )
            
            courses_data = scraper.scrape_all_active_courses()
            colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", 
                      "#06B6D4", "#F97316", "#84CC16", "#A855F7"]
            
            # Import courses for this user
            for idx, course_data in enumerate(courses_data):
                canvas_id = course_data['id']
                name = course_data['name']
                code = name.split('.')[0] if '.' in name else name.split()[0]
                
                course = Course(
                    canvas_id=canvas_id,
                    user_id=new_user.id,
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
                
                # Import modules
                for pos, module_data in enumerate(course_data.get('modules', [])):
                    module = Module(
                        course_id=course.id,
                        name=module_data.get('name', 'Unnamed Module'),
                        position=pos,
                        items=module_data.get('items', [])
                    )
                    db.add(module)
            
            db.commit()
            
        except Exception as e:
            # Don't fail signup if Canvas import fails
            print(f"Canvas import failed during signup: {e}")
    
    # Create access token
    access_token = create_access_token(data={"sub": new_user.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.from_orm(new_user)
    }

@router.post("/login", response_model=LoginResponse)
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """Login user and validate Canvas session"""
    from app.services.canvas_scraper import CanvasScraper
    
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not verify_password(user_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check Canvas session validity (non-blocking, quick check)
    canvas_session_valid = False
    has_canvas_session = False
    
    if user.canvas_session_cookie:
        has_canvas_session = True
        try:
            session_cookie = decrypt_data(user.canvas_session_cookie)
            canvas_url = user.canvas_instance_url or "https://usflearn.instructure.com"
            
            if session_cookie:
                import requests
                # Quick check - just try to access Canvas homepage
                test_url = f"{canvas_url}/courses"
                response = requests.get(
                    test_url, 
                    cookies={"canvas_session": session_cookie},
                    timeout=3,  # 3 second timeout
                    allow_redirects=False
                )
                # If we get 200 or 302 (redirect to login means invalid)
                canvas_session_valid = (response.status_code == 200)
        except Exception as e:
            # Don't block login if Canvas check fails
            print(f"Canvas session check failed: {e}")
            canvas_session_valid = False
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email})
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.from_orm(user),
        canvas_session_valid=canvas_session_valid,
        has_canvas_session=has_canvas_session
    )

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """Logout user (client should remove token)"""
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse.from_orm(current_user)


@router.post("/validate-canvas-session")
async def validate_user_canvas_session(current_user: User = Depends(get_current_user)):
    """
    Validate the current user's Canvas session cookie
    
    Returns:
        - is_valid: boolean indicating if session is valid
        - has_session: boolean indicating if user has a session cookie stored
        - message: status message
    """
    from app.services.canvas_scraper import CanvasScraper
    
    # Check if user has a Canvas session cookie
    if not current_user.canvas_session_cookie:
        return {
            "is_valid": False,
            "has_session": False,
            "message": "No Canvas session cookie found. Please provide one."
        }
    
    # Decrypt the session cookie
    session_cookie = decrypt_data(current_user.canvas_session_cookie)
    
    if not session_cookie:
        return {
            "is_valid": False,
            "has_session": False,
            "message": "Failed to decrypt Canvas session cookie"
        }
    
    # Use Canvas instance URL from settings if user doesn't have one
    canvas_url = current_user.canvas_instance_url or "https://usflearn.instructure.com"
    
    try:
        # Try to validate session by fetching courses
        scraper = CanvasScraper(
            base_url=canvas_url,
            session_cookie=session_cookie
        )
        
        courses = scraper.get_all_courses()
        
        if courses:
            return {
                "is_valid": True,
                "has_session": True,
                "message": "Canvas session is valid"
            }
        else:
            return {
                "is_valid": False,
                "has_session": True,
                "message": "Canvas session appears invalid or no courses found"
            }
    except Exception as e:
        return {
            "is_valid": False,
            "has_session": True,
            "message": f"Canvas session validation failed: {str(e)}"
        }


class UpdateCanvasSessionRequest(BaseModel):
    canvas_session_cookie: str = Field(..., min_length=1)
    canvas_instance_url: Optional[str] = "https://usflearn.instructure.com"


@router.post("/update-canvas-session")
async def update_canvas_session(
    request: UpdateCanvasSessionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update the user's Canvas session cookie
    
    This is used when the session expires and needs to be refreshed
    """
    from app.services.canvas_scraper import CanvasScraper
    from app.models.course import Course
    from app.models.module import Module
    
    # First validate the new session cookie
    try:
        scraper = CanvasScraper(
            base_url=request.canvas_instance_url,
            session_cookie=request.canvas_session_cookie
        )
        
        # Validate by fetching courses
        courses = scraper.get_all_courses()
        
        if not courses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Canvas session cookie - could not fetch courses"
            )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to validate Canvas session: {str(e)}"
        )
    
    # Encrypt and update the session cookie
    encrypted_session = encrypt_data(request.canvas_session_cookie)
    current_user.canvas_session_cookie = encrypted_session
    current_user.canvas_instance_url = request.canvas_instance_url
    
    db.commit()
    db.refresh(current_user)
    
    # Optionally re-sync courses
    try:
        courses_data = scraper.scrape_all_active_courses()
        colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", 
                  "#06B6D4", "#F97316", "#84CC16", "#A855F7"]
        
        courses_synced = 0
        modules_synced = 0
        
        # Import/update courses
        for idx, course_data in enumerate(courses_data):
            canvas_id = course_data['id']
            name = course_data['name']
            code = name.split('.')[0] if '.' in name else name.split()[0]
            
            # Check if course already exists
            existing_course = db.query(Course).filter(
                Course.canvas_id == canvas_id,
                Course.user_id == current_user.id
            ).first()
            
            if existing_course:
                course = existing_course
            else:
                course = Course(
                    canvas_id=canvas_id,
                    user_id=current_user.id,
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
                courses_synced += 1
            
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
                    modules_synced += 1
        
        db.commit()
        
        return {
            "success": True,
            "message": "Canvas session updated successfully",
            "courses_synced": courses_synced,
            "modules_synced": modules_synced
        }
        
    except Exception as e:
        # Session was updated, but sync failed
        return {
            "success": True,
            "message": f"Canvas session updated, but sync failed: {str(e)}",
            "courses_synced": 0,
            "modules_synced": 0
        }


