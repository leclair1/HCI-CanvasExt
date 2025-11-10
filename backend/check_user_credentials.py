"""
Check what Canvas credentials are stored for a user
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.db.database import SessionLocal
from app.models.user import User
from app.core.encryption import decrypt_data
from app.core.config import settings

def check_credentials():
    print("="*70)
    print(" CHECKING CANVAS CREDENTIALS")
    print("="*70)
    print()
    
    db = SessionLocal()
    
    # Check .env settings
    print("1. Checking .env file settings:")
    print(f"   CANVAS_INSTANCE_URL: {settings.CANVAS_INSTANCE_URL}")
    print(f"   CANVAS_SESSION_COOKIE from .env: {settings.CANVAS_SESSION_COOKIE[:50] + '...' if settings.CANVAS_SESSION_COOKIE else 'NOT SET'}")
    print()
    
    # Get test user
    print("2. Checking database user credentials:")
    user = db.query(User).filter(User.email == "test@example.com").first()
    
    if not user:
        print("   ❌ No test user found with email 'test@example.com'")
        print()
        print("   Available users:")
        all_users = db.query(User).all()
        for u in all_users:
            print(f"     - {u.email} (ID: {u.id})")
        db.close()
        return
    
    print(f"   ✅ User found: {user.email} (ID: {user.id})")
    print(f"   Canvas Instance URL: {user.canvas_instance_url or 'NOT SET'}")
    print(f"   Canvas User ID: {user.canvas_user_id or 'NOT SET'}")
    print(f"   Canvas Access Token: {'SET (' + user.canvas_access_token[:20] + '...)' if user.canvas_access_token else 'NOT SET'}")
    print()
    
    # Check session cookie
    print("3. Checking Canvas session cookie:")
    if user.canvas_session_cookie:
        try:
            decrypted = decrypt_data(user.canvas_session_cookie)
            print(f"   ✅ Session cookie stored (encrypted)")
            print(f"   Cookie preview: {decrypted[:50]}...")
            
            # Compare with .env
            if settings.CANVAS_SESSION_COOKIE:
                if decrypted == settings.CANVAS_SESSION_COOKIE:
                    print("   ✅ Matches .env file cookie")
                else:
                    print("   ⚠️  DIFFERENT from .env file cookie!")
                    print(f"      .env starts with: {settings.CANVAS_SESSION_COOKIE[:50]}...")
        except Exception as e:
            print(f"   ❌ Failed to decrypt: {e}")
    else:
        print("   ❌ No session cookie stored")
        if settings.CANVAS_SESSION_COOKIE:
            print(f"   ⚠️  But .env has a cookie: {settings.CANVAS_SESSION_COOKIE[:50]}...")
    print()
    
    # Check courses
    from app.models.course import Course
    print("4. Checking stored courses:")
    courses = db.query(Course).filter(Course.user_id == user.id).all()
    print(f"   Found {len(courses)} courses for this user:")
    for course in courses[:5]:  # Show first 5
        print(f"     - {course.code}: {course.name}")
    if len(courses) > 5:
        print(f"     ... and {len(courses) - 5} more")
    print()
    
    # Recommendations
    print("="*70)
    print(" RECOMMENDATIONS")
    print("="*70)
    
    if not user.canvas_session_cookie and settings.CANVAS_SESSION_COOKIE:
        print("⚠️  Your user account doesn't have a Canvas session cookie stored,")
        print("   but one exists in .env.")
        print()
        print("   Solution: Update the user's cookie in the database:")
        print(f"   Run: python update_user_cookie.py {user.id}")
        
    elif user.canvas_session_cookie and settings.CANVAS_SESSION_COOKIE:
        try:
            decrypted = decrypt_data(user.canvas_session_cookie)
            if decrypted != settings.CANVAS_SESSION_COOKIE:
                print("⚠️  Your user's stored cookie is DIFFERENT from the .env cookie.")
                print("   This could cause issues if the stored cookie is expired.")
                print()
                print("   Solution: Update the user's cookie to match .env:")
                print(f"   Run: python update_user_cookie.py {user.id}")
        except:
            pass
    
    if not user.canvas_access_token:
        print("⚠️  No Canvas Access Token stored.")
        print("   The Canvas API sync requires an access token.")
        print("   Session cookies are only used for scraping, not API calls.")
        print()
        print("   Solution: You need to authenticate with Canvas API token")
    
    if len(courses) == 0:
        print("⚠️  No courses found for this user.")
        print("   Try syncing courses from Canvas.")
    
    db.close()

if __name__ == "__main__":
    check_credentials()

