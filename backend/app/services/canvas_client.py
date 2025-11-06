"""
Canvas LMS API Client
Handles authentication and data fetching from Canvas LMS
"""
import httpx
from typing import List, Dict, Any, Optional
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class CanvasClient:
    """Client for interacting with Canvas LMS API"""
    
    def __init__(self, base_url: str, access_token: str):
        """
        Initialize Canvas API client
        
        Args:
            base_url: Canvas instance URL (e.g., 'https://canvas.instructure.com')
            access_token: User's Canvas API access token
        """
        self.base_url = base_url.rstrip('/')
        self.api_base = f"{self.base_url}/api/v1"
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        self.client = httpx.AsyncClient(headers=self.headers, timeout=30.0)
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()
    
    async def _get(self, endpoint: str, params: Optional[Dict] = None) -> Any:
        """Make GET request to Canvas API"""
        url = f"{self.api_base}/{endpoint}"
        try:
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            logger.error(f"Canvas API error: {e}")
            raise
    
    async def _get_paginated(self, endpoint: str, params: Optional[Dict] = None) -> List[Any]:
        """Get all pages from a paginated Canvas API endpoint"""
        all_items = []
        url = f"{self.api_base}/{endpoint}"
        
        if params is None:
            params = {}
        params['per_page'] = 100  # Max items per page
        
        while url:
            try:
                response = await self.client.get(url, params=params)
                response.raise_for_status()
                
                items = response.json()
                all_items.extend(items)
                
                # Check for next page
                link_header = response.headers.get('Link', '')
                url = self._parse_next_link(link_header)
                params = None  # Don't send params again (they're in the URL)
                
            except httpx.HTTPError as e:
                logger.error(f"Canvas API pagination error: {e}")
                break
        
        return all_items
    
    def _parse_next_link(self, link_header: str) -> Optional[str]:
        """Parse the 'next' URL from Link header"""
        if not link_header:
            return None
        
        links = link_header.split(',')
        for link in links:
            if 'rel="next"' in link:
                url = link.split(';')[0].strip('<> ')
                return url
        return None
    
    # ===== User Info =====
    
    async def get_current_user(self) -> Dict[str, Any]:
        """Get current user information"""
        return await self._get("users/self")
    
    # ===== Courses =====
    
    async def get_courses(self, enrollment_state: str = "active") -> List[Dict[str, Any]]:
        """
        Get all courses for the current user
        
        Args:
            enrollment_state: Filter by enrollment state (active, invited, completed, etc.)
        """
        params = {
            "enrollment_state": enrollment_state,
            "include": ["term", "total_scores", "course_progress"]
        }
        return await self._get_paginated("courses", params)
    
    async def get_course(self, course_id: str) -> Dict[str, Any]:
        """Get detailed information about a specific course"""
        return await self._get(f"courses/{course_id}")
    
    # ===== Assignments =====
    
    async def get_assignments(self, course_id: str) -> List[Dict[str, Any]]:
        """Get all assignments for a course"""
        params = {"include": ["submission", "score_statistics"]}
        return await self._get_paginated(f"courses/{course_id}/assignments", params)
    
    async def get_assignment(self, course_id: str, assignment_id: str) -> Dict[str, Any]:
        """Get detailed information about a specific assignment"""
        return await self._get(f"courses/{course_id}/assignments/{assignment_id}")
    
    async def get_upcoming_assignments(self) -> List[Dict[str, Any]]:
        """Get upcoming assignments across all courses"""
        return await self._get("users/self/upcoming_events")
    
    # ===== Modules =====
    
    async def get_modules(self, course_id: str) -> List[Dict[str, Any]]:
        """Get all modules for a course"""
        params = {"include": ["items", "content_details"]}
        return await self._get_paginated(f"courses/{course_id}/modules", params)
    
    async def get_module_items(self, course_id: str, module_id: str) -> List[Dict[str, Any]]:
        """Get all items in a module"""
        params = {"include": ["content_details"]}
        return await self._get_paginated(
            f"courses/{course_id}/modules/{module_id}/items",
            params
        )
    
    # ===== Files =====
    
    async def get_course_files(self, course_id: str) -> List[Dict[str, Any]]:
        """Get all files for a course"""
        return await self._get_paginated(f"courses/{course_id}/files")
    
    async def get_file(self, file_id: str) -> Dict[str, Any]:
        """Get information about a specific file"""
        return await self._get(f"files/{file_id}")
    
    async def download_file(self, file_url: str) -> bytes:
        """Download a file from Canvas"""
        try:
            response = await self.client.get(file_url)
            response.raise_for_status()
            return response.content
        except httpx.HTTPError as e:
            logger.error(f"File download error: {e}")
            raise
    
    # ===== Announcements =====
    
    async def get_announcements(self, course_id: str) -> List[Dict[str, Any]]:
        """Get announcements for a course"""
        return await self._get_paginated(f"courses/{course_id}/discussion_topics", 
                                         {"only_announcements": True})
    
    # ===== Grades =====
    
    async def get_grades(self, course_id: str) -> Dict[str, Any]:
        """Get grades for a course"""
        return await self._get(f"courses/{course_id}/enrollments", 
                               {"user_id": "self"})
    
    # ===== Submissions =====
    
    async def get_submissions(self, course_id: str, assignment_id: str) -> List[Dict[str, Any]]:
        """Get submissions for an assignment"""
        return await self._get_paginated(
            f"courses/{course_id}/assignments/{assignment_id}/submissions",
            {"include": ["submission_history", "submission_comments"]}
        )
    
    # ===== Calendar Events =====
    
    async def get_calendar_events(self, start_date: Optional[str] = None, 
                                  end_date: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get calendar events"""
        params = {"type": "event"}
        if start_date:
            params["start_date"] = start_date
        if end_date:
            params["end_date"] = end_date
        
        return await self._get_paginated("calendar_events", params)
    
    # ===== Quiz =====
    
    async def get_quizzes(self, course_id: str) -> List[Dict[str, Any]]:
        """Get all quizzes for a course"""
        return await self._get_paginated(f"courses/{course_id}/quizzes")


class CanvasAuthError(Exception):
    """Raised when Canvas authentication fails"""
    pass


class CanvasAPIError(Exception):
    """Raised when Canvas API request fails"""
    pass




