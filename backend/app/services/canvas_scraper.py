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
        
        domain = urlparse(base_url).hostname
        self.session.cookies.set(cookie_name, session_cookie, domain=domain)
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })
    
    def get_all_courses(self) -> Dict[str, str]:
        """Get all available courses"""
        url = urljoin(self.base_url, "/courses")
        resp = self.session.get(url)
        resp.raise_for_status()
        
        soup = BeautifulSoup(resp.text, 'html.parser')
        courses = {}
        
        for a in soup.find_all("a", href=True):
            match = re.search(r"/courses/(\d+)", a['href'])
            if match:
                course_id = match.group(1)
                course_name = a.get_text(strip=True)
                if course_name and course_id not in courses:
                    courses[course_id] = course_name
        
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


