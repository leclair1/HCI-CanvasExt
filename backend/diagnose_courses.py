"""
Diagnose why courses aren't showing up
Run this in Docker: docker exec -it <container> python diagnose_courses.py
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.db.database import SessionLocal
from app.models.user import User
from app.models.course import Course

def diagnose():
    print("="*70)
    print(" DIAGNOSING COURSE VISIBILITY ISSUE")
    print("="*70)
    print()
    
    db = SessionLocal()
    
    # 1. Check all users
    print("1. All users in database:")
    users = db.query(User).all()
    if not users:
        print("   ❌ NO USERS FOUND!")
        db.close()
        return
    
    for user in users:
        print(f"   - ID: {user.id}, Email: {user.email}, Name: {user.first_name} {user.last_name}")
        print(f"     Canvas Cookie: {'Yes' if user.canvas_session_cookie else 'No'}")
        print(f"     Canvas URL: {user.canvas_instance_url or 'Not set'}")
    print()
    
    # 2. Check all courses
    print("2. All courses in database:")
    courses = db.query(Course).all()
    if not courses:
        print("   ❌ NO COURSES FOUND!")
        print()
        print("   This means courses were never imported during signup.")
        print("   You need to trigger a course import/scrape.")
        db.close()
        return
    
    print(f"   Found {len(courses)} courses total")
    print()
    
    # 3. Group courses by user_id
    print("3. Courses grouped by user:")
    courses_by_user = {}
    for course in courses:
        if course.user_id not in courses_by_user:
            courses_by_user[course.user_id] = []
        courses_by_user[course.user_id].append(course)
    
    for user_id, user_courses in courses_by_user.items():
        user = db.query(User).filter(User.id == user_id).first()
        user_email = user.email if user else "UNKNOWN USER"
        print(f"   User {user_id} ({user_email}): {len(user_courses)} courses")
        for course in user_courses[:3]:  # Show first 3
            print(f"     - {course.code}: {course.name}")
        if len(user_courses) > 3:
            print(f"     ... and {len(user_courses) - 3} more")
    print()
    
    # 4. Check for orphaned courses (shouldn't happen with foreign key)
    print("4. Checking for data integrity issues:")
    orphaned = 0
    for course in courses:
        user = db.query(User).filter(User.id == course.user_id).first()
        if not user:
            print(f"   ⚠️  Course {course.id} has user_id {course.user_id} but no such user exists!")
            orphaned += 1
    
    if orphaned == 0:
        print("   ✅ All courses are properly associated with valid users")
    print()
    
    # 5. Recommendations
    print("="*70)
    print(" RECOMMENDATIONS")
    print("="*70)
    print()
    
    if len(users) == 1 and len(courses) > 0:
        user = users[0]
        user_courses = [c for c in courses if c.user_id == user.id]
        if len(user_courses) == len(courses):
            print("✅ Everything looks good!")
            print(f"   User {user.email} has {len(user_courses)} courses.")
            print()
            print("   If you're not seeing courses in the frontend:")
            print("   1. Make sure you're logged in as this user")
            print("   2. Check the JWT token is valid")
            print("   3. Check browser console for errors")
        else:
            print(f"⚠️  User {user.email} only has {len(user_courses)} courses")
            print(f"   but there are {len(courses)} total courses in database")
    
    elif len(users) > 1:
        print("⚠️  Multiple users detected!")
        print("   Make sure you're logged in as the correct user.")
        print()
        for user_id, user_courses in courses_by_user.items():
            user = db.query(User).filter(User.id == user_id).first()
            print(f"   - {user.email} has {len(user_courses)} courses")
    
    if len(courses) == 0:
        print("❌ No courses found!")
        print("   The scraper didn't import any courses during signup.")
        print()
        print("   To fix:")
        print("   1. Log into the frontend")
        print("   2. Use the Canvas integration to re-scrape courses")
        print("   OR")
        print("   3. Delete your account and re-signup with valid Canvas cookie")
    
    db.close()

if __name__ == "__main__":
    try:
        diagnose()
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

