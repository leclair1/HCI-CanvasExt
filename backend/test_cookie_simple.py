"""
Simple test using urllib (standard library) to test Canvas cookie
"""
import urllib.request
import urllib.parse
import json

# Your session cookie
SESSION_COOKIE = "0MhAoQTf0_tZRhtRW4NzGQ+GbzP85SfkQi1ilIwveP7ZrSN4kv5nJuXumRIZlfBFWJ1dK4SD0IBxJgy0jKa3v94STGmHlwg-E4JqpsJZfsYgH2rEk7ZntuLu-AHnYq1_gImo8jPFg-UqoFTZ_-VAN0e5Z0NWUmEnnXCUumudHGD_B_YlV-JvTrx8Kt-gJbDSVkKMfk1-m4GXO8qlvCHri_GhNNF394rG5eAhf5vB3FZZENs5FLiR-4K3yLumr3iVySSRYF_kL242onqFLMKocM1hCQRqWQYvtr82AcPH5VQ7qN8uiq2RgjFfumd6FjcAGTDgYuREiT7XcPMd8mPy79m804C1PsWRs6LngwK9K8pi6eeWFm91U2pGfag_gn2JwDrT_dFlGIslRJ1-2Z_i6D3D4WXJPMmTrpumBBRsn6CMEXAzLaxosR6xEYz_ChNyEB2K-vRG-XK25Ym6Bf7LblrTs_3SEAKXBmw1G4JlMaRmzKBMEG4VHbo_csYO8IzX_xj9Cw7XbDeKnl52URa5vbsW2tIGbVOsAbMB5xWP6kx4Y0LrURC8hRQI-PNE0Z0idYAE0zGXAP4Ga24RJMo02oL7mgUFMI3s5Id4vdzL13w.UFA0BZ-S2-_vVIXu1MshXylwFkk.aTIlNQ"

CANVAS_URL = "https://usflearn.instructure.com"

def test_fetch():
    print("=" * 70)
    print("Testing Canvas API Fetch with Session Cookie")
    print("=" * 70)
    print(f"Canvas URL: {CANVAS_URL}")
    print(f"Session Cookie Length: {len(SESSION_COOKIE)} characters")
    print("-" * 70)
    
    # Test 1: Get current user (try different endpoint variations)
    print("\n[Test 1] Fetching /api/v1/users/self...")
    try:
        # Try the standard endpoint
        url = f"{CANVAS_URL}/api/v1/users/self"
        req = urllib.request.Request(url)
        req.add_header("Cookie", f"canvas_session={SESSION_COOKIE}")
        req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        req.add_header("Content-Type", "application/json")
        
        with urllib.request.urlopen(req, timeout=10) as response:
            status = response.getcode()
            print(f"  Status Code: {status}")
            
            if status == 200:
                data = json.loads(response.read().decode())
                print(f"  [SUCCESS]")
                print(f"    User ID: {data.get('id')}")
                print(f"    Name: {data.get('name')}")
                print(f"    Email: {data.get('email') or data.get('primary_email', 'N/A')}")
                return True
            else:
                print(f"  [FAILED] with status {status}")
                return False
    except urllib.error.HTTPError as e:
        print(f"  [HTTP ERROR] {e.code} - {e.reason}")
        try:
            error_body = e.read().decode()[:500]
            print(f"    Response: {error_body}")
        except:
            pass
        return False
    except Exception as e:
        print(f"  [ERROR] {type(e).__name__}: {e}")
        return False
    
    # Test 2: Get courses
    print("\n[Test 2] Fetching /api/v1/courses...")
    try:
        url = f"{CANVAS_URL}/api/v1/courses?enrollment_state=active&per_page=10"
        req = urllib.request.Request(url)
        req.add_header("Cookie", f"canvas_session={SESSION_COOKIE}")
        req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        req.add_header("Content-Type", "application/json")
        
        with urllib.request.urlopen(req, timeout=10) as response:
            status = response.getcode()
            print(f"  Status Code: {status}")
            
            if status == 200:
                courses = json.loads(response.read().decode())
                print(f"  [SUCCESS] Found {len(courses)} courses")
                if courses:
                    print("    Sample courses:")
                    for course in courses[:3]:
                        print(f"      - {course.get('name')} (ID: {course.get('id')})")
                return True
            else:
                print(f"  [FAILED] with status {status}")
                return False
    except urllib.error.HTTPError as e:
        print(f"  [HTTP ERROR] {e.code} - {e.reason}")
        try:
            error_body = e.read().decode()[:500]
            print(f"    Response: {error_body}")
        except:
            pass
        return False
    except Exception as e:
        print(f"  ✗ ERROR: {type(e).__name__}: {e}")
        return False

if __name__ == "__main__":
    print("\n")
    test_fetch()
    print("\n" + "=" * 70)
    print("Test Complete")
    print("=" * 70)

