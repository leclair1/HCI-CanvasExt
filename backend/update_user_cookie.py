"""
Update a user's Canvas session cookie to match the .env file
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.db.database import SessionLocal
from app.models.user import User
from app.core.encryption import encrypt_data, decrypt_data
from app.core.config import settings

def update_cookie(user_id: int = None, email: str = None):
    if not settings.CANVAS_SESSION_COOKIE:
        print("❌ No CANVAS_SESSION_COOKIE found in .env file!")
        return False
    
    db = SessionLocal()
    
    # Get user
    if user_id:
        user = db.query(User).filter(User.id == user_id).first()
    elif email:
        user = db.query(User).filter(User.email == email).first()
    else:
        user = db.query(User).filter(User.email == "test@example.com").first()
    
    if not user:
        print(f"❌ User not found")
        db.close()
        return False
    
    print(f"Updating Canvas session cookie for: {user.email}")
    print()
    
    # Show old cookie
    if user.canvas_session_cookie:
        try:
            old_cookie = decrypt_data(user.canvas_session_cookie)
            print(f"Old cookie: {old_cookie[:50]}...")
        except:
            print("Old cookie: (failed to decrypt)")
    else:
        print("Old cookie: (none)")
    
    # Encrypt and save new cookie
    encrypted_cookie = encrypt_data(settings.CANVAS_SESSION_COOKIE)
    user.canvas_session_cookie = encrypted_cookie
    
    # Also update canvas instance URL if not set
    if not user.canvas_instance_url:
        user.canvas_instance_url = settings.CANVAS_INSTANCE_URL
        print(f"Also setting canvas_instance_url to: {settings.CANVAS_INSTANCE_URL}")
    
    db.commit()
    
    print(f"New cookie: {settings.CANVAS_SESSION_COOKIE[:50]}...")
    print()
    print("✅ Cookie updated successfully!")
    
    db.close()
    return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            user_id = int(sys.argv[1])
            update_cookie(user_id=user_id)
        except ValueError:
            # Treat as email
            update_cookie(email=sys.argv[1])
    else:
        # Default to test@example.com
        update_cookie()

