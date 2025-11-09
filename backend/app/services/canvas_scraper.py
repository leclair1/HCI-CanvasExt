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
        """Filter to get only active semester courses"""
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
            
            # Keep current semester courses (F25 Fall 2025, F24 Fall 2024, etc.)
            if ('f25' in name_lower or 'f24' in name_lower or 
                'fall 2025' in name_lower or 'fall 2024' in name_lower or
                's25' in name_lower or 'spring 2025' in name_lower):
                active_courses[cid] = name
        
        return active_courses
    
    def get_course_assignments(self, course_id: str) -> List[Dict]:
        """Get assignments for a course"""
        url = urljoin(self.base_url, f"/courses/{course_id}/assignments")
        
        try:
            resp = self.session.get(url)
            resp.raise_for_status()
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            assignments = []
            for item in soup.find_all("li", class_=re.compile("assignment")):
                assignment = {}
                
                title_elem = item.find("a", class_=re.compile("title|ig-title"))
                if title_elem:
                    assignment['name'] = title_elem.get_text(strip=True)
                    assignment['url'] = urljoin(self.base_url, title_elem.get('href', ''))
                
                date_elem = item.find(text=re.compile(r"Due:|due", re.I))
                if date_elem:
                    assignment['due_date'] = date_elem.strip()
                
                if assignment.get('name'):
                    assignments.append(assignment)
            
            return assignments
        except:
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


