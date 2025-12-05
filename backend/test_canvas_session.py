#!/usr/bin/env python3
"""
Test script to validate Canvas session cookie
"""
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json

# Canvas session cookie to test
SESSION_COOKIE = "-0edAIRxUQ0QfpM7m3EPpg+Orr5Rp-0Jut3qdH1Frvl-CHd0-5QDSC1ccZmegLKKJzI6i9CuCpCwKsjgzgdY4Tgd-Su9mVjBOWqP8sq85_sHCIWqAipBjtfvT1vNlvJE_UkXDtJNZrO9FrXQ6qvX4nYZHfdJeYCZKN6r-f-IxiYrVpAq5gX4808h3grVSXNYAb0Aa1X73fS9FrzwM17kRpclLnGkXvbcjitct2cTTPSLM0nNGWVFQVdNsA3PIhaIZegMufu_mi36DTWhifDxZlk2UsqmSiXmGgLdK9Q_43rNmlZzMdxWG-cAA9DgiAp7TTnlv2IfIYsx02UFUBmRS6SWvprBeGHkRIJbnLOs-rVhzLHRkEM1EB8z1-NPq6PuLyiYAfwbUyevnoNBWkNRGhq2dhXOIXrEC_sGlhZ53aZQnQjdUHkcrQ4sFMsIcNo-TNzx1ybMwWSgmv9nMV6kR75ofcz2-qJDDPKRlM-zEJ3awD91uav_ebIytdAq-3XClTqL1TDqQZnOvc8twbLtXciOIbgc0AbH7FKl7xBt52GJVaRa2lMveuXqMPIAfPMvbpBpDqmeQLz3g9AWMlLSf6_.5gBgkbjVeFkIBYSuxEL9WwiK578.aTNHFQ"

BASE_URL = "https://usflearn.instructure.com"

def test_canvas_session():
    """Test Canvas session cookie"""
    session = requests.Session()
    
    # Clean the cookie
    cookie_value = SESSION_COOKIE.strip().strip('"').strip("'")
    
    # Set cookie
    domain = urlparse(BASE_URL).hostname
    session.cookies.set("canvas_session", cookie_value, domain=domain)
    session.cookies.set("canvas_session", cookie_value)  # Also set without domain
    
    # Set headers
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/html, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Referer": BASE_URL
    })
    
    print("=" * 80)
    print("Testing Canvas Session Cookie")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"Cookie length: {len(cookie_value)}")
    print(f"Domain: {domain}")
    print()
    
    # Test 1: Try Canvas API endpoint
    print("Test 1: Canvas API /api/v1/courses")
    print("-" * 80)
    try:
        api_url = urljoin(BASE_URL, "/api/v1/courses")
        print(f"Requesting: {api_url}")
        api_resp = session.get(api_url, params={'per_page': 100}, allow_redirects=False, timeout=10)
        
        print(f"Status Code: {api_resp.status_code}")
        print(f"Content-Type: {api_resp.headers.get('Content-Type', 'unknown')}")
        print(f"Response Length: {len(api_resp.text)}")
        
        if api_resp.status_code in [301, 302, 303, 307, 308]:
            location = api_resp.headers.get('Location', '')
            print(f"Redirect to: {location}")
        
        if api_resp.status_code == 200:
            try:
                courses = api_resp.json()
                print(f"✓ Successfully parsed JSON - Found {len(courses)} courses")
                if courses:
                    print("Sample courses:")
                    for i, course in enumerate(courses[:3]):
                        print(f"  {i+1}. {course.get('name', 'Unknown')} (ID: {course.get('id')})")
                return True
            except ValueError as e:
                print(f"✗ JSON parsing failed: {e}")
                print(f"Response preview (first 500 chars):")
                print(api_resp.text[:500])
                print()
                print("Checking if it's HTML...")
                if '<html' in api_resp.text.lower()[:200]:
                    print("✗ Response is HTML (likely login page)")
                else:
                    print("? Response doesn't look like HTML")
        else:
            print(f"✗ Status code {api_resp.status_code}")
            print(f"Response preview: {api_resp.text[:500]}")
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()
    
    print()
    
    # Test 2: Try HTML scraping
    print("Test 2: HTML /courses page")
    print("-" * 80)
    try:
        html_url = urljoin(BASE_URL, "/courses")
        print(f"Requesting: {html_url}")
        html_resp = session.get(html_url, allow_redirects=False, timeout=10)
        
        print(f"Status Code: {html_resp.status_code}")
        print(f"Content-Type: {html_resp.headers.get('Content-Type', 'unknown')}")
        print(f"Response Length: {len(html_resp.text)}")
        
        if html_resp.status_code in [301, 302, 303, 307, 308]:
            location = html_resp.headers.get('Location', '')
            print(f"Redirect to: {location}")
            if 'login' in location.lower():
                print("✗ Redirected to login page - session expired")
                return False
        
        if html_resp.status_code == 200:
            soup = BeautifulSoup(html_resp.text, 'html.parser')
            
            # Check if it's a login page
            if soup.find('form', {'id': 'login_form'}) or 'sign in' in html_resp.text.lower()[:500]:
                print("✗ This appears to be a login page")
                return False
            
            # Try to find courses
            courses_found = {}
            for a in soup.find_all("a", href=True):
                match = re.search(r"/courses/(\d+)", a['href'])
                if match:
                    course_id = match.group(1)
                    course_name = a.get_text(strip=True)
                    if course_name and course_id not in courses_found:
                        courses_found[course_id] = course_name
            
            if courses_found:
                print(f"✓ Found {len(courses_found)} courses via HTML scraping")
                print("Sample courses:")
                for i, (cid, name) in enumerate(list(courses_found.items())[:3]):
                    print(f"  {i+1}. {name} (ID: {cid})")
                return True
            else:
                print("? No courses found in HTML (might be valid but empty)")
                return True  # Session might be valid, just no courses
        else:
            print(f"✗ Status code {html_resp.status_code}")
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()
    
    print()
    print("=" * 80)
    print("Summary: Session validation failed")
    print("=" * 80)
    return False

if __name__ == "__main__":
    import re
    test_canvas_session()

