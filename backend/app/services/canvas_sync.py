"""
Canvas Data Synchronization Service
Syncs data from Canvas LMS to local database
"""
from sqlalchemy.orm import Session
from app.services.canvas_client import CanvasClient
from app.models.course import Course
from app.models.assignment import Assignment
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class CanvasSyncService:
    """Service for syncing Canvas data to local database"""
    
    def __init__(self, db: Session, canvas_client: CanvasClient):
        self.db = db
        self.canvas = canvas_client
    
    async def sync_all(self) -> dict:
        """Sync all data from Canvas"""
        results = {
            "courses": 0,
            "assignments": 0,
            "errors": []
        }
        
        try:
            # Sync courses
            courses_count = await self.sync_courses()
            results["courses"] = courses_count
            
            # Sync assignments for each course
            courses = self.db.query(Course).all()
            for course in courses:
                try:
                    assignments_count = await self.sync_assignments(course.id)
                    results["assignments"] += assignments_count
                except Exception as e:
                    logger.error(f"Error syncing assignments for {course.id}: {e}")
                    results["errors"].append(f"Course {course.code}: {str(e)}")
            
        except Exception as e:
            logger.error(f"Sync error: {e}")
            results["errors"].append(str(e))
        
        return results
    
    async def sync_courses(self) -> int:
        """Sync courses from Canvas to database"""
        try:
            canvas_courses = await self.canvas.get_courses()
            count = 0
            
            for canvas_course in canvas_courses:
                course_id = str(canvas_course.get('id'))
                
                # Check if course exists
                db_course = self.db.query(Course).filter(Course.id == course_id).first()
                
                # Calculate progress from course_progress if available
                progress = 0.0
                if 'course_progress' in canvas_course:
                    progress = float(canvas_course['course_progress'].get('completion', 0.0))
                
                course_data = {
                    "id": course_id,
                    "code": canvas_course.get('course_code', 'UNKNOWN'),
                    "name": canvas_course.get('name', 'Unnamed Course'),
                    "instructor": self._extract_instructor(canvas_course),
                    "term": self._extract_term(canvas_course),
                    "progress": progress,
                    "color": self._assign_color(count)
                }
                
                if db_course:
                    # Update existing course
                    for key, value in course_data.items():
                        if key != 'id':
                            setattr(db_course, key, value)
                else:
                    # Create new course
                    db_course = Course(**course_data)
                    self.db.add(db_course)
                
                count += 1
            
            self.db.commit()
            logger.info(f"Synced {count} courses from Canvas")
            return count
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error syncing courses: {e}")
            raise
    
    async def sync_assignments(self, course_id: str) -> int:
        """Sync assignments for a specific course"""
        try:
            canvas_assignments = await self.canvas.get_assignments(course_id)
            count = 0
            
            for canvas_assignment in canvas_assignments:
                assignment_id = str(canvas_assignment.get('id'))
                
                # Check if assignment exists
                db_assignment = self.db.query(Assignment).filter(
                    Assignment.id == assignment_id
                ).first()
                
                # Get course info
                course = self.db.query(Course).filter(Course.id == course_id).first()
                course_code = course.code if course else "UNKNOWN"
                
                # Determine status
                status = self._determine_assignment_status(canvas_assignment)
                
                # Determine priority based on due date
                priority = self._determine_priority(canvas_assignment.get('due_at'))
                
                assignment_data = {
                    "id": assignment_id,
                    "title": canvas_assignment.get('name', 'Unnamed Assignment'),
                    "course": course_code,
                    "course_id": course_id,
                    "due_date": self._format_date(canvas_assignment.get('due_at')),
                    "type": self._determine_type(canvas_assignment),
                    "priority": priority,
                    "status": status,
                    "description": canvas_assignment.get('description', ''),
                    "points": canvas_assignment.get('points_possible')
                }
                
                if db_assignment:
                    # Update existing assignment
                    for key, value in assignment_data.items():
                        if key != 'id':
                            setattr(db_assignment, key, value)
                else:
                    # Create new assignment
                    db_assignment = Assignment(**assignment_data)
                    self.db.add(db_assignment)
                
                count += 1
            
            self.db.commit()
            logger.info(f"Synced {count} assignments for course {course_id}")
            return count
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error syncing assignments for course {course_id}: {e}")
            raise
    
    def _extract_instructor(self, canvas_course: dict) -> str:
        """Extract instructor name from course data"""
        # Canvas might include teacher info in enrollments or teachers field
        teachers = canvas_course.get('teachers', [])
        if teachers:
            return teachers[0].get('display_name', 'Unknown Instructor')
        return 'Unknown Instructor'
    
    def _extract_term(self, canvas_course: dict) -> str:
        """Extract term from course data"""
        term = canvas_course.get('term')
        if term:
            return term.get('name', 'Unknown Term')
        return 'Unknown Term'
    
    def _assign_color(self, index: int) -> str:
        """Assign a color based on course index"""
        colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4']
        return colors[index % len(colors)]
    
    def _determine_assignment_status(self, canvas_assignment: dict) -> str:
        """Determine assignment status from Canvas data"""
        submission = canvas_assignment.get('submission')
        if submission:
            workflow_state = submission.get('workflow_state')
            if workflow_state == 'graded':
                return 'completed'
            elif workflow_state == 'submitted':
                return 'submitted'
        
        # Check if past due
        due_at = canvas_assignment.get('due_at')
        if due_at:
            due_date = datetime.fromisoformat(due_at.replace('Z', '+00:00'))
            if due_date < datetime.now(due_date.tzinfo):
                return 'overdue'
        
        return 'pending'
    
    def _determine_priority(self, due_at: str | None) -> str:
        """Determine priority based on due date"""
        if not due_at:
            return 'low'
        
        try:
            due_date = datetime.fromisoformat(due_at.replace('Z', '+00:00'))
            now = datetime.now(due_date.tzinfo)
            days_until_due = (due_date - now).days
            
            if days_until_due < 2:
                return 'high'
            elif days_until_due < 7:
                return 'medium'
            else:
                return 'low'
        except:
            return 'medium'
    
    def _determine_type(self, canvas_assignment: dict) -> str:
        """Determine assignment type"""
        submission_types = canvas_assignment.get('submission_types', [])
        
        if 'online_quiz' in submission_types:
            return 'Quiz'
        elif 'online_upload' in submission_types:
            return 'Assignment'
        elif 'discussion_topic' in submission_types:
            return 'Discussion'
        elif 'external_tool' in submission_types:
            return 'External Tool'
        else:
            return 'Assignment'
    
    def _format_date(self, date_str: str | None) -> str:
        """Format ISO date to readable format"""
        if not date_str:
            return 'No due date'
        
        try:
            date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            return date.strftime('%b %d, %Y')
        except:
            return date_str




