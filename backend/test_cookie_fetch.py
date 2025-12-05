"""
Test fetching from Canvas API with the provided session cookie
"""
import asyncio
import httpx
from urllib.parse import urlparse

# Your session cookie
SESSION_COOKIE = "0MhAoQTf0_tZRhtRW4NzGQ+GbzP85SfkQi1ilIwveP7ZrSN4kv5nJuXumRIZlfBFWJ1dK4SD0IBxJgy0jKa3v94STGmHlwg-E4JqpsJZfsYgH2rEk7ZntuLu-AHnYq1_gImo8jPFg-UqoFTZ_-VAN0e5Z0NWUmEnnXCUumudHGD_B_YlV-JvTrx8Kt-gJbDSVkKMfk1-m4GXO8qlvCHri_GhNNF394rG5eAhf5vB3FZZENs5FLiR-4K3yLumr3iVySSRYF_kL242onqFLMKocM1hCQRqWQYvtr82AcPH5VQ7qN8uiq2RgjFfumd6FjcAGTDgYuREiT7XcPMd8mPy79m804C1PsWRs6LngwK9K8pi6eeWFm91U2pGfag_gn2JwDrT_dFlGIslRJ1-2Z_i6D3D4WXJPMmTrpumBBRsn6CMEXAzLaxosR6xEYz_ChNyEB2K-vRG-XK25Ym6Bf7LblrTs_3SEAKXBmw1G4JlMaRmzKBMEG4VHbo_csYO8IzX_xj9Cw7XbDeKnl52URa5vbsW2tIGbVOsAbMB5xWP6kx4Y0LrURC8hRQI-PNE0Z0idYAE0zGXAP4Ga24RJMo02oL7mgUFMI3s5Id4vdzL13w.UFA0BZ-S2-_vVIXu1MshXylwFkk.aTIlNQ"

CANVAS_URL = "https://usflearn.instructure.com"


async def test_fetch_with_cookie():
    """Test fetching from Canvas API with session cookie"""
    print("=" * 70)
    print("Testing Canvas API Fetch with Session Cookie")
    print("=" * 70)
    print(f"Canvas URL: {CANVAS_URL}")
    print(f"Session Cookie Length: {len(SESSION_COOKIE)} characters")
    print("-" * 70)
    
    # Parse domain from URL
    domain = urlparse(CANVAS_URL).hostname
    
    # Set up cookies
    cookies = httpx.Cookies()
    cookies.set("canvas_session", SESSION_COOKIE, domain=domain, path="/")
    
    # Set up headers
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    async with httpx.AsyncClient(cookies=cookies, headers=headers, timeout=30.0, follow_redirects=True) as client:
        # Test 1: Get current user
        print("\n[Test 1] Fetching /api/v1/users/self...")
        try:
            url = f"{CANVAS_URL}/api/v1/users/self"
            response = await client.get(url)
            
            print(f"  Status Code: {response.status_code}")
            print(f"  Response Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                user_data = response.json()
                print(f"  ✓ SUCCESS!")
                print(f"    User ID: {user_data.get('id')}")
                print(f"    Name: {user_data.get('name')}")
                print(f"    Email: {user_data.get('email') or user_data.get('primary_email', 'N/A')}")
            else:
                print(f"  ✗ FAILED")
                print(f"    Response: {response.text[:500]}")
        except Exception as e:
            print(f"  ✗ ERROR: {type(e).__name__}: {e}")
        
        # Test 2: Get courses
        print("\n[Test 2] Fetching /api/v1/courses...")
        try:
            url = f"{CANVAS_URL}/api/v1/courses"
            params = {"enrollment_state": "active", "per_page": 10}
            response = await client.get(url, params=params)
            
            print(f"  Status Code: {response.status_code}")
            
            if response.status_code == 200:
                courses = response.json()
                print(f"  ✓ SUCCESS! Found {len(courses)} courses")
                if courses:
                    print("    Sample courses:")
                    for course in courses[:3]:
                        print(f"      - {course.get('name')} (ID: {course.get('id')})")
            else:
                print(f"  ✗ FAILED")
                print(f"    Response: {response.text[:500]}")
        except Exception as e:
            print(f"  ✗ ERROR: {type(e).__name__}: {e}")
        
        # Test 3: Try web interface (should work with cookies)
        print("\n[Test 3] Fetching /courses (web interface)...")
        try:
            url = f"{CANVAS_URL}/courses"
            response = await client.get(url)
            
            print(f"  Status Code: {response.status_code}")
            print(f"  Final URL: {response.url}")
            
            if response.status_code == 200:
                # Check if redirected to login
                if "login" in str(response.url).lower() or "sign_in" in str(response.url).lower():
                    print(f"  ✗ FAILED - Redirected to login page")
                else:
                    print(f"  ✓ SUCCESS! Got courses page")
                    print(f"    Response length: {len(response.text)} characters")
            else:
                print(f"  ✗ FAILED")
        except Exception as e:
            print(f"  ✗ ERROR: {type(e).__name__}: {e}")
    
    print("\n" + "=" * 70)
    print("Test Complete")
    print("=" * 70)


if __name__ == "__main__":
    asyncio.run(test_fetch_with_cookie())


