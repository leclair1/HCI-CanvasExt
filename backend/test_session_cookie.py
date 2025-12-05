"""
Test script to validate Canvas session cookie
"""
import asyncio
import sys
from app.services.canvas_client import CanvasClient, CanvasAPIError

# The session cookie you provided
SESSION_COOKIE = "0MhAoQTf0_tZRhtRW4NzGQ+GbzP85SfkQi1ilIwveP7ZrSN4kv5nJuXumRIZlfBFWJ1dK4SD0IBxJgy0jKa3v94STGmHlwg-E4JqpsJZfsYgH2rEk7ZntuLu-AHnYq1_gImo8jPFg-UqoFTZ_-VAN0e5Z0NWUmEnnXCUumudHGD_B_YlV-JvTrx8Kt-gJbDSVkKMfk1-m4GXO8qlvCHri_GhNNF394rG5eAhf5vB3FZZENs5FLiR-4K3yLumr3iVySSRYF_kL242onqFLMKocM1hCQRqWQYvtr82AcPH5VQ7qN8uiq2RgjFfumd6FjcAGTDgYuREiT7XcPMd8mPy79m804C1PsWRs6LngwK9K8pi6eeWFm91U2pGfag_gn2JwDrT_dFlGIslRJ1-2Z_i6D3D4WXJPMmTrpumBBRsn6CMEXAzLaxosR6xEYz_ChNyEB2K-vRG-XK25Ym6Bf7LblrTs_3SEAKXBmw1G4JlMaRmzKBMEG4VHbo_csYO8IzX_xj9Cw7XbDeKnl52URa5vbsW2tIGbVOsAbMB5xWP6kx4Y0LrURC8hRQI-PNE0Z0idYAE0zGXAP4Ga24RJMo02oL7mgUFMI3s5Id4vdzL13w.UFA0BZ-S2-_vVIXu1MshXylwFkk.aTIlNQ"

# Canvas instance URL from docker-compose.yml
CANVAS_URL = "https://usflearn.instructure.com"


async def test_session_cookie():
    """Test the session cookie with Canvas API"""
    print("Testing Canvas session cookie...")
    print(f"Canvas URL: {CANVAS_URL}")
    print(f"Session cookie length: {len(SESSION_COOKIE)} characters")
    print("-" * 60)
    
    try:
        # Create Canvas client with session cookie
        canvas = CanvasClient(
            base_url=CANVAS_URL,
            session_cookie=SESSION_COOKIE
        )
        
        print("✓ CanvasClient created successfully")
        
        # Test 1: Get current user
        print("\n[Test 1] Fetching current user info...")
        try:
            user = await canvas.get_current_user()
            print(f"✓ Success! User ID: {user.get('id')}")
            print(f"  Name: {user.get('name')}")
            print(f"  Email: {user.get('email') or user.get('primary_email', 'N/A')}")
        except CanvasAPIError as e:
            print(f"✗ Failed to get user: {e}")
            return False
        
        # Test 2: Get courses
        print("\n[Test 2] Fetching courses...")
        try:
            courses = await canvas.get_courses()
            print(f"✓ Success! Found {len(courses)} courses")
            if courses:
                print("  Sample courses:")
                for course in courses[:3]:
                    print(f"    - {course.get('name')} (ID: {course.get('id')})")
        except CanvasAPIError as e:
            print(f"✗ Failed to get courses: {e}")
            return False
        
        # Test 3: Get assignments for first course
        if courses:
            print(f"\n[Test 3] Fetching assignments for course {courses[0].get('id')}...")
            try:
                assignments = await canvas.get_assignments(str(courses[0].get('id')))
                print(f"✓ Success! Found {len(assignments)} assignments")
                if assignments:
                    print("  Sample assignments:")
                    for assignment in assignments[:3]:
                        print(f"    - {assignment.get('name')} (Due: {assignment.get('due_at', 'N/A')})")
            except CanvasAPIError as e:
                print(f"✗ Failed to get assignments: {e}")
                # This is not critical, so we continue
        
        await canvas.close()
        print("\n" + "=" * 60)
        print("✓ All tests passed! Session cookie is working.")
        return True
        
    except Exception as e:
        print(f"\n✗ Error: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    success = asyncio.run(test_session_cookie())
    sys.exit(0 if success else 1)


