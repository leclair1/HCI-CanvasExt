"""
Create test user with Canvas courses
"""

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.db.database import SessionLocal
from app.models.user import User
from app.models.course import Course
from app.models.module import Module
from passlib.context import CryptContext
from app.core.encryption import encrypt_data
from app.core.config import settings
import json

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Canvas session cookie from environment variable
SESSION_COOKIE = settings.CANVAS_SESSION_COOKIE
if not SESSION_COOKIE:
    print("ERROR: CANVAS_SESSION_COOKIE not found in environment variables!")
    print("Please ensure .env file exists with CANVAS_SESSION_COOKIE set.")
    sys.exit(1)

def main():
    print("="*70)
    print(" CREATING TEST USER WITH CANVAS DATA")
    print("="*70)
    print()
    
    db = SessionLocal()
    
    try:
        # Create user with encrypted session cookie
        hashed_password = pwd_context.hash("password123")
        encrypted_session = encrypt_data(SESSION_COOKIE)
        
        user = User(
            first_name="Test",
            last_name="User",
            email="test@example.com",
            password_hash=hashed_password,
            canvas_instance_url="https://usflearn.instructure.com",
            canvas_session_cookie=encrypted_session
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        print(f"[OK] User created!")
        print(f"  Email: test@example.com")
        print(f"  Password: password123")
        print(f"  User ID: {user.id}")
        print()
        
        # Load Canvas data
        canvas_file = Path(__file__).parent / "canvas_data.json"
        if not canvas_file.exists():
            print("[ERROR] canvas_data.json not found!")
            return
        
        with open(canvas_file, 'r', encoding='utf-8') as f:
            canvas_data = json.load(f)
        
        print(f"[OK] Loaded {len(canvas_data)} courses from Canvas data")
        print()
        
        # Import courses
        colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", 
                  "#06B6D4", "#F97316", "#84CC16", "#A855F7"]
        
        courses_imported = 0
        modules_imported = 0
        
        for idx, course_data in enumerate(canvas_data):
            canvas_id = course_data['id']
            name = course_data['name']
            code = name.split('.')[0] if '.' in name else name.split()[0]
            
            course = Course(
                canvas_id=canvas_id,
                user_id=user.id,
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
                module = Module(
                    course_id=course.id,
                    name=module_data.get('name', 'Unnamed Module'),
                    position=pos,
                    items=module_data.get('items', [])
                )
                db.add(module)
                modules_imported += 1
        
        db.commit()
        
        print(f"[OK] Imported {courses_imported} courses")
        print(f"[OK] Imported {modules_imported} modules")
        print()
        print("="*70)
        print(" SETUP COMPLETE!")
        print("="*70)
        print()
        print("Login credentials:")
        print("  Email: test@example.com")
        print("  Password: password123")
        print()
        print("Frontend: http://localhost:5173")
        print("Backend API: http://localhost:8000/api/docs")
        print()
        
    except Exception as e:
        print(f"[ERROR] {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    main()


