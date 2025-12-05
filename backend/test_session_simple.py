"""
Simple test script to validate Canvas session cookie using requests
"""
import requests
import json

# The session cookie you provided
SESSION_COOKIE = "0MhAoQTf0_tZRhtRW4NzGQ+GbzP85SfkQi1ilIwveP7ZrSN4kv5nJuXumRIZlfBFWJ1dK4SD0IBxJgy0jKa3v94STGmHlwg-E4JqpsJZfsYgH2rEk7ZntuLu-AHnYq1_gImo8jPFg-UqoFTZ_-VAN0e5Z0NWUmEnnXCUumudHGD_B_YlV-JvTrx8Kt-gJbDSVkKMfk1-m4GXO8qlvCHri_GhNNF394rG5eAhf5vB3FZZENs5FLiR-4K3yLumr3iVySSRYF_kL242onqFLMKocM1hCQRqWQYvtr82AcPH5VQ7qN8uiq2RgjFfumd6FjcAGTDgYuREiT7XcPMd8mPy79m804C1PsWRs6LngwK9K8pi6eeWFm91U2pGfag_gn2JwDrT_dFlGIslRJ1-2Z_i6D3D4WXJPMmTrpumBBRsn6CMEXAzLaxosR6xEYz_ChNyEB2K-vRG-XK25Ym6Bf7LblrTs_3SEAKXBmw1G4JlMaRmzKBMEG4VHbo_csYO8IzX_xj9Cw7XbDeKnl52URa5vbsW2tIGbVOsAbMB5xWP6kx4Y0LrURC8hRQI-PNE0Z0idYAE0zGXAP4Ga24RJMo02oL7mgUFMI3s5Id4vdzL13w.UFA0BZ-S2-_vVIXu1MshXylwFkk.aTIlNQ"

CANVAS_URL = "https://usflearn.instructure.com"

def test_direct_canvas_api():
    """Test the session cookie directly with Canvas API"""
    print("Testing Canvas session cookie directly with Canvas API...")
    print(f"Canvas URL: {CANVAS_URL}")
    print(f"Session cookie length: {len(SESSION_COOKIE)} characters")
    print("-" * 60)
    
    # Test 1: Try to get user info using session cookie
    print("\n[Test 1] Testing Canvas API with session cookie...")
    api_url = f"{CANVAS_URL}/api/v1/users/self"
    
    headers = {
        "Cookie": f"canvas_session={SESSION_COOKIE}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        response = requests.get(api_url, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✓ Success! User ID: {user_data.get('id')}")
            print(f"  Name: {user_data.get('name')}")
            print(f"  Email: {user_data.get('email') or user_data.get('primary_email', 'N/A')}")
            return True
        else:
            print(f"✗ Failed with status {response.status_code}")
            print(f"  Response: {response.text[:500]}")
            return False
            
    except Exception as e:
        print(f"✗ Error: {type(e).__name__}: {e}")
        return False


def test_canvas_web():
    """Test the session cookie with Canvas web interface"""
    print("\n[Test 2] Testing Canvas web interface with session cookie...")
    web_url = f"{CANVAS_URL}/courses"
    
    headers = {
        "Cookie": f"canvas_session={SESSION_COOKIE}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        response = requests.get(web_url, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            # Check if we got redirected to login (session invalid)
            if "login" in response.url.lower() or "sign_in" in response.url.lower():
                print("✗ Session cookie appears invalid (redirected to login)")
                return False
            else:
                print(f"✓ Success! Got courses page (URL: {response.url})")
                print(f"  Response length: {len(response.text)} characters")
                return True
        else:
            print(f"✗ Failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"✗ Error: {type(e).__name__}: {e}")
        return False


if __name__ == "__main__":
    print("=" * 60)
    api_success = test_direct_canvas_api()
    web_success = test_canvas_web()
    
    print("\n" + "=" * 60)
    if api_success or web_success:
        print("✓ Session cookie is working!")
    else:
        print("✗ Session cookie appears to be invalid or expired")
    print("=" * 60)


