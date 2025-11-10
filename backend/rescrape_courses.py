"""
Re-scrape and import courses for a user using their stored Canvas session cookie
Run this in Docker: docker exec -it <container> python rescrape_courses.py <user_email>
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.db.database import SessionLocal
from app.models.user import User
from app.models.course import Course
from app.models.module import Module
from app.core.encryption import decrypt_data
from app.services.canvas_scraper import CanvasScraper

def rescrape_courses(email: str = None):
    db = SessionLocal()
    
    # Get user
    if email:
        user = db.query(User).filter(User.email == email).first()
    else:
        # Get first user with a canvas cookie
        user = db.query(User).filter(User.canvas_session_cookie.isnot(None)).first()
    
    if not user:
        print("❌ No user found!")
        if email:
            print(f"   No user with email: {email}")
        else:
            print("   No users with Canvas session cookies found")
        db.close()
        return False
    
    print(f"Re-scraping courses for: {user.email} (ID: {user.id})")
    print()
    
    # Check for canvas session cookie
    if not user.canvas_session_cookie:
        print("❌ User has no Canvas session cookie!")
        db.close()
        return False
    
    # Decrypt the cookie
    try:
        session_cookie = decrypt_data(user.canvas_session_cookie)
        print(f"✅ Session cookie decrypted: {session_cookie[:50]}...")
    except Exception as e:
        print(f"❌ Failed to decrypt session cookie: {e}")
        db.close()
        return False
    
    # Get Canvas URL
    canvas_url = user.canvas_instance_url or "https://usflearn.instructure.com"
    print(f"   Canvas URL: {canvas_url}")
    print()
    
    # Create scraper
    try:
        scraper = CanvasScraper(
            base_url=canvas_url,
            session_cookie=session_cookie
        )
        print("✅ Scraper initialized")
    except Exception as e:
        print(f"❌ Failed to create scraper: {e}")
        db.close()
        return False
    
    # Scrape courses
    print()
    print("Scraping Canvas courses...")
    try:
        courses_data = scraper.scrape_all_active_courses()
        print(f"✅ Found {len(courses_data)} active courses")
    except Exception as e:
        print(f"❌ Failed to scrape courses: {e}")
        import traceback
        traceback.print_exc()
        db.close()
        return False
    
    if len(courses_data) == 0:
        print()
        print("⚠️  No active courses found!")
        print("   This could mean:")
        print("   1. The session cookie is expired")
        print("   2. You have no active courses this semester")
        print("   3. The scraper filter is too strict")
        db.close()
        return False
    
    # Import courses
    print()
    print("Importing courses to database...")
    colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", 
              "#06B6D4", "#F97316", "#84CC16", "#A855F7"]
    
    courses_imported = 0
    modules_imported = 0
    courses_updated = 0
    
    for idx, course_data in enumerate(courses_data):
        canvas_id = course_data['id']
        name = course_data['name']
        code = name.split('.')[0] if '.' in name else name.split()[0]
        
        # Check if course exists
        existing = db.query(Course).filter(
            Course.canvas_id == canvas_id,
            Course.user_id == user.id
        ).first()
        
        if existing:
            # Update existing course
            existing.name = name
            existing.code = code
            print(f"   ↻ Updated: {code}")
            courses_updated += 1
            course = existing
        else:
            # Create new course
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
            print(f"   + Added: {code}")
            courses_imported += 1
        
        # Import modules
        for pos, module_data in enumerate(course_data.get('modules', [])):
            module_name = module_data.get('name', 'Unnamed Module')
            
            # Check if module exists
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
    
    print()
    print("="*70)
    print(" SUCCESS!")
    print("="*70)
    print(f"✅ Imported {courses_imported} new courses")
    print(f"✅ Updated {courses_updated} existing courses")
    print(f"✅ Imported {modules_imported} modules")
    print()
    print("You should now see your courses in the frontend!")
    
    db.close()
    return True

if __name__ == "__main__":
    email = sys.argv[1] if len(sys.argv) > 1 else None
    try:
        rescrape_courses(email)
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

