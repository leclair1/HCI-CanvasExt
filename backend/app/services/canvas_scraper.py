"""
Canvas Course Scraper Service
Scrapes course structure and modules from Canvas using session cookie
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re
from typing import Dict, List, Optional


class CanvasScraper:
    """Canvas course scraper using web scraping"""
    
    def __init__(self, base_url: str, session_cookie: str, cookie_name: str = "canvas_session"):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        
        # Clean the cookie value (remove any whitespace or quotes)
        session_cookie = session_cookie.strip().strip('"').strip("'")
        
        domain = urlparse(base_url).hostname
        
        # Set cookie for the domain (Canvas requires exact domain match)
        # Try with domain first
        try:
            self.session.cookies.set(cookie_name, session_cookie, domain=domain)
        except Exception as e:
            # If domain setting fails, try without domain
            print(f"Warning: Failed to set cookie with domain: {e}")
        
        # Also set it without domain restriction for API calls
        self.session.cookies.set(cookie_name, session_cookie)
        
        # Verify cookie was set
        if cookie_name not in self.session.cookies:
            print(f"Warning: Cookie {cookie_name} was not set properly")
        else:
            print(f"Cookie {cookie_name} set successfully (length: {len(session_cookie)})")
        
        # Set headers to mimic a real browser
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json, text/html, */*",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive",
            "Referer": self.base_url
        })
        # Note: Removed Accept-Encoding: gzip, deflate, br as it might cause issues with response decoding
    
    def get_all_courses(self) -> Dict[str, str]:
        """Get all available courses"""
        courses = {}
        
        # First try Canvas API endpoint (more reliable with session cookies)
        try:
            api_url = urljoin(self.base_url, "/api/v1/courses")
            # Try with simpler params first
            api_resp = self.session.get(api_url, params={'per_page': 100}, allow_redirects=False)
            
            print(f"Canvas API response status: {api_resp.status_code}")
            print(f"Canvas API response Content-Type: {api_resp.headers.get('Content-Type', 'unknown')}")
            
            # Check for redirects (usually means session expired)
            if api_resp.status_code in [301, 302, 303, 307, 308]:
                location = api_resp.headers.get('Location', '')
                print(f"Redirect detected to: {location}")
                if 'login' in location.lower():
                    raise Exception("Canvas session expired - redirected to login page")
            
            # Check content type - be more lenient, some Canvas instances might not set it correctly
            content_type = api_resp.headers.get('Content-Type', '').lower()
            
            if api_resp.status_code == 200:
                # Try to parse as JSON first - don't rely on Content-Type header alone
                try:
                    # Check if response has content
                    if not api_resp.text or len(api_resp.text.strip()) == 0:
                        print("Warning: Empty response from Canvas API")
                        # Try HTML scraping as fallback
                        pass
                    else:
                        api_courses = api_resp.json()
                        # Successfully parsed JSON - session is valid!
                        for course in api_courses:
                            course_id = str(course.get('id', ''))
                            course_name = course.get('name', '')
                            if course_id and course_name:
                                courses[course_id] = course_name
                        
                        if courses:
                            print(f"Successfully fetched {len(courses)} courses from Canvas API")
                            return courses
                        else:
                            print("Canvas API returned empty courses list - session may be valid but no courses found")
                            # Don't raise error - empty list might be valid (user has no courses)
                            return courses
                except ValueError as json_err:
                    # JSON parsing failed - check if response is actually HTML (login page)
                    response_text = api_resp.text[:1000].lower() if api_resp.text else ""
                    print(f"JSON parsing error: {json_err}")
                    print(f"Response length: {len(api_resp.text) if api_resp.text else 0}")
                    print(f"Response preview: {api_resp.text[:200] if api_resp.text else 'EMPTY'}")
                    
                    # Only consider it expired if it's clearly a login page
                    if response_text and ('<html' in response_text or '<!doctype' in response_text) and ('login' in response_text or 'sign in' in response_text or ('canvas' in response_text and 'password' in response_text)):
                        print(f"Received HTML login page - session expired. Response preview: {api_resp.text[:200]}")
                        raise Exception("Canvas session expired - received HTML login page instead of JSON")
                    elif not response_text or len(response_text.strip()) == 0:
                        print("Empty response - might be a network issue, trying HTML scraping")
                        pass  # Continue to HTML scraping fallback
                    elif 'text/html' in content_type and len(response_text) > 100:
                        # If Content-Type says HTML and we have substantial content, might be a page
                        print(f"Received HTML response but doesn't look like login page. Content-Type: {content_type}")
                        # Don't raise error - might be a valid HTML response, try HTML scraping
                        pass
                    else:
                        # Might be empty response or malformed JSON, try HTML scraping
                        print(f"JSON parsing failed but doesn't look like HTML login page: {json_err}")
                        pass  # Continue to HTML scraping fallback
            elif api_resp.status_code == 401:
                raise Exception("401: Unauthorized - Canvas session cookie is invalid or expired")
            elif api_resp.status_code == 400:
                # Try to get more details from the response
                try:
                    if 'application/json' in content_type:
                        error_data = api_resp.json()
                        error_msg = error_data.get('message', 'Invalid Canvas session cookie')
                    else:
                        # Check if it's HTML
                        response_text = api_resp.text[:200].lower()
                        if '<html' in response_text or 'login' in response_text:
                            error_msg = "Canvas session expired - received HTML instead of JSON"
                        else:
                            error_msg = "Invalid Canvas session cookie - could not fetch courses"
                except:
                    error_msg = "Invalid Canvas session cookie - could not fetch courses"
                raise Exception(f"400: {error_msg}")
            else:
                # For other status codes, check if response is HTML
                response_text = api_resp.text[:200].lower() if api_resp.text else ""
                if '<html' in response_text or 'login' in response_text:
                    raise Exception(f"Canvas session expired - received HTML (status {api_resp.status_code})")
                raise Exception(f"Canvas API returned status {api_resp.status_code}")
        except Exception as api_error:
            # If API fails, try HTML scraping as fallback (unless it's clearly an auth error)
            error_str = str(api_error)
            if "401" in error_str or "400" in error_str or ("expired" in error_str.lower() and "HTML" in error_str):
                raise api_error  # Re-raise clear authentication errors
            print(f"Canvas API failed, trying HTML scraping: {api_error}")
        
        # Fallback to HTML scraping
        try:
            url = urljoin(self.base_url, "/courses")
            resp = self.session.get(url, allow_redirects=False)
            
            # Check if we got redirected to login (session expired)
            if resp.status_code in [301, 302, 303, 307, 308]:
                location = resp.headers.get('Location', '')
                if 'login' in location.lower():
                    raise Exception("Canvas session expired - redirected to login page")
            
            if resp.status_code == 401:
                raise Exception("401: Unauthorized - Canvas session cookie is invalid")
            if resp.status_code == 400:
                raise Exception("400: Invalid Canvas session cookie - could not fetch courses")
            
            resp.raise_for_status()
            
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            for a in soup.find_all("a", href=True):
                match = re.search(r"/courses/(\d+)", a['href'])
                if match:
                    course_id = match.group(1)
                    course_name = a.get_text(strip=True)
                    if course_name and course_id not in courses:
                        courses[course_id] = course_name
        except requests.exceptions.HTTPError as http_err:
            if http_err.response.status_code == 401:
                raise Exception("401: Unauthorized - Canvas session cookie is invalid or expired")
            elif http_err.response.status_code == 400:
                raise Exception("400: Invalid Canvas session cookie - could not fetch courses")
            raise
        except Exception as e:
            # Re-raise if it's already a formatted error
            if "Canvas session" in str(e) or "401" in str(e) or "400" in str(e):
                raise
            raise Exception(f"Failed to fetch courses: {str(e)}")
        
        return courses
    
    def filter_active_courses(self, all_courses: Dict[str, str]) -> Dict[str, str]:
        """Filter to get only current semester courses (Fall 2025 / F25)"""
        active_courses = {}
        
        keywords_to_skip = [
            'template', 'sandbox', 'test', 'demo', 'avoiding plagiarism', 
            'career readiness', 'data literacy', 'college of engineering',
            'bellini', 'canvas workshop', 'undergraduate'
        ]
        
        for cid, name in all_courses.items():
            name_lower = name.lower()
            
            # Skip non-course items
            if any(skip in name_lower for skip in keywords_to_skip):
                continue
            
            # Keep ONLY current semester courses (F25 or Fall 2025)
            if 'f25' in name_lower or 'fall 2025' in name_lower:
                active_courses[cid] = name
        
        return active_courses
    
    def get_course_assignments(self, course_id: str) -> List[Dict]:
        """Get assignments for a course using Canvas API"""
        # Canvas API endpoint for assignments (works with session cookie)
        api_url = urljoin(
            self.base_url, 
            f"/api/v1/courses/{course_id}/assignment_groups"
        )
        
        params = {
            'include[]': 'assignments',
            'exclude_assignment_submission_types[]': 'wiki_page',
            'override_assignment_dates': 'false'
        }
        
        try:
            resp = self.session.get(api_url, params=params)
            resp.raise_for_status()
            
            # Parse JSON response
            data = resp.json()
            
            assignments = []
            
            # Canvas returns assignment groups, each containing assignments
            for group in data:
                for assignment in group.get('assignments', []):
                    assignments.append({
                        'name': assignment.get('name', 'Unnamed Assignment'),
                        'due_date': assignment.get('due_at'),
                        'url': assignment.get('html_url'),
                        'points': assignment.get('points_possible'),
                        'submission_types': assignment.get('submission_types', []),
                        'id': assignment.get('id')
                    })
            
            return assignments
        except Exception as e:
            print(f"Error fetching assignments for course {course_id}: {e}")
            return []
    
    def get_course_modules(self, course_id: str) -> List[Dict]:
        """Get modules for a course"""
        url = urljoin(self.base_url, f"/courses/{course_id}/modules")
        
        try:
            resp = self.session.get(url)
            resp.raise_for_status()
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            modules = []
            
            for module_div in soup.find_all("div", class_=re.compile("context_module")):
                module = {}
                
                title_elem = module_div.find(["h2", "span"], class_=re.compile("name|title"))
                if title_elem:
                    module['name'] = title_elem.get_text(strip=True)
                
                items = []
                for item in module_div.find_all("li", class_=re.compile("context_module_item")):
                    item_data = {}
                    
                    link = item.find("a", class_=re.compile("title|ig-title"))
                    if link:
                        item_data['name'] = link.get_text(strip=True)
                        item_data['url'] = urljoin(self.base_url, link.get('href', ''))
                        items.append(item_data)
                
                module['items'] = items
                
                if module.get('name'):
                    modules.append(module)
            
            return modules
        except:
            return []
    
    def scrape_course(self, course_id: str, course_name: str) -> Dict:
        """Scrape all data for a single course"""
        course_data = {
            'id': course_id,
            'name': course_name,
            'assignments': self.get_course_assignments(course_id),
            'modules': self.get_course_modules(course_id)
        }
        
        return course_data
    
    def scrape_all_active_courses(self) -> List[Dict]:
        """Scrape all active courses"""
        # Get all courses
        all_courses = self.get_all_courses()
        
        # Filter to active courses
        active_courses = self.filter_active_courses(all_courses)
        
        # Scrape each course
        all_data = []
        for course_id, course_name in active_courses.items():
            course_data = self.scrape_course(course_id, course_name)
            all_data.append(course_data)
        
        return all_data
    
    def get_course_files(self, course_id: str) -> List[Dict]:
        """
        Get all files from the Files tab of a Canvas course
        
        Returns a list of file dictionaries with:
        - name: File name
        - url: Direct download URL
        - size: File size in bytes
        - content_type: MIME type
        - updated_at: Last modified date
        """
        files = []
        
        # Primary method: Use Canvas API endpoint (works with session cookie)
        try:
            api_url = urljoin(self.base_url, f"/api/v1/courses/{course_id}/files")
            print(f"Fetching files from Canvas API: {api_url}")
            api_resp = self.session.get(api_url, params={'per_page': 100})
            
            print(f"API response status: {api_resp.status_code}")
            
            # Check content type - if it's HTML, the session probably expired
            content_type = api_resp.headers.get('Content-Type', '').lower()
            if 'text/html' in content_type:
                print(f"Received HTML instead of JSON - Canvas session may be expired for course {course_id}")
                raise Exception("Canvas session expired - received HTML instead of JSON")
            
            if api_resp.status_code == 200:
                # Only try to parse as JSON if content type indicates JSON
                if 'application/json' in content_type or not content_type:
                    try:
                        api_files = api_resp.json()
                        print(f"Canvas API returned {len(api_files)} files for course {course_id}")
                        
                        for api_file in api_files:
                            # Get file URL - Canvas API provides different URL formats
                            file_url = api_file.get('url', '')
                            if not file_url:
                                # Construct download URL from file ID
                                file_id = api_file.get('id')
                                if file_id:
                                    file_url = urljoin(self.base_url, f"/courses/{course_id}/files/{file_id}/download")
                            
                            # Only add if we have a valid URL
                            if file_url:
                                files.append({
                                    'name': api_file.get('display_name', api_file.get('filename', 'Unknown')),
                                    'url': file_url,
                                    'size': api_file.get('size', 0),
                                    'content_type': api_file.get('content-type', api_file.get('content_type', 'application/octet-stream')),
                                    'updated_at': api_file.get('updated_at', '')
                                })
                        
                        # If we got files from API, return them (no need to scrape HTML)
                        if files:
                            print(f"Returning {len(files)} files from API")
                            return files
                    except ValueError as json_err:
                        # If JSON parsing fails, it might be HTML
                        raise Exception("Canvas session expired - received HTML instead of JSON")
                else:
                    raise Exception("Canvas session expired - received HTML instead of JSON")
            elif api_resp.status_code == 401:
                print(f"Unauthorized (401) - Canvas session may be expired for course {course_id}")
                raise Exception("401: Unauthorized - Canvas session cookie is invalid or expired")
            else:
                print(f"Canvas API returned status {api_resp.status_code} for course {course_id}")
                # Try to get error details
                try:
                    if 'application/json' in content_type:
                        error_data = api_resp.json()
                        print(f"API error details: {error_data}")
                    else:
                        print(f"API error response (HTML): {api_resp.text[:200]}")
                        raise Exception("Canvas session expired - received HTML instead of JSON")
                except ValueError:
                    print(f"API error response: {api_resp.text[:200]}")
                    raise Exception("Canvas session expired - received HTML instead of JSON")
        except Exception as api_error:
            print(f"Canvas API error for course {course_id}: {api_error}")
            import traceback
            traceback.print_exc()
        
        # Fallback method: Try HTML scraping if API fails
        try:
            url = urljoin(self.base_url, f"/courses/{course_id}/files")
            resp = self.session.get(url, allow_redirects=True)
            
            # Check if we got redirected to login (session expired)
            if 'login' in resp.url.lower() or resp.status_code == 401:
                print(f"Session expired or unauthorized for course {course_id}")
                return []
            
            if resp.status_code != 200:
                print(f"HTML page returned status {resp.status_code} for course {course_id}")
                return files  # Return whatever we got from API
            
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            # Canvas files are typically in a table or list
            # Look for file links in various possible structures
            file_links = soup.find_all("a", href=re.compile(r"/files/\d+"))
            
            # Track URLs we already have from API
            existing_urls = {f.get('url', '') for f in files}
            
            for link in file_links:
                file_data = {}
                
                # Get file name
                file_name = link.get_text(strip=True)
                if not file_name:
                    # Try to find name in parent or sibling elements
                    parent = link.find_parent(["tr", "li", "div"])
                    if parent:
                        name_elem = parent.find(["span", "div"], class_=re.compile("name|title|filename"))
                        if name_elem:
                            file_name = name_elem.get_text(strip=True)
                
                if not file_name:
                    continue
                
                file_data['name'] = file_name
                
                # Get file URL
                href = link.get('href', '')
                if href:
                    # Convert to direct download URL
                    if '/files/' in href:
                        file_id_match = re.search(r'/files/(\d+)', href)
                        if file_id_match:
                            file_id = file_id_match.group(1)
                            # Canvas file download URL format
                            file_url = urljoin(self.base_url, f"/courses/{course_id}/files/{file_id}/download")
                            file_data['url'] = file_url
                            
                            # Skip if we already have this URL from API
                            if file_url in existing_urls:
                                continue
                        else:
                            file_data['url'] = urljoin(self.base_url, href)
                    else:
                        file_data['url'] = urljoin(self.base_url, href)
                else:
                    continue
                
                # Try to get file size and other metadata
                parent = link.find_parent(["tr", "li", "div"])
                if parent:
                    # Look for size information
                    size_elem = parent.find(string=re.compile(r'\d+\.?\d*\s*(KB|MB|GB|bytes)', re.I))
                    if size_elem:
                        file_data['size'] = size_elem.strip()
                    
                    # Look for date information
                    date_elem = parent.find(string=re.compile(r'\d{1,2}[/-]\d{1,2}[/-]\d{2,4}'))
                    if date_elem:
                        file_data['updated_at'] = date_elem.strip()
                
                # Try to determine content type from file extension
                if '.' in file_name:
                    ext = file_name.split('.')[-1].lower()
                    content_types = {
                        'pdf': 'application/pdf',
                        'doc': 'application/msword',
                        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'ppt': 'application/vnd.ms-powerpoint',
                        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        'xls': 'application/vnd.ms-excel',
                        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'txt': 'text/plain',
                        'html': 'text/html',
                        'jpg': 'image/jpeg',
                        'jpeg': 'image/jpeg',
                        'png': 'image/png',
                        'gif': 'image/gif',
                    }
                    file_data['content_type'] = content_types.get(ext, 'application/octet-stream')
                else:
                    file_data['content_type'] = 'application/octet-stream'
                
                files.append(file_data)
            
        except Exception as html_error:
            print(f"HTML scraping error for course {course_id}: {html_error}")
        
        return files


