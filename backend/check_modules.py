"""Check modules in database"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.db.database import SessionLocal
from app.models.module import Module
from app.models.course import Course

db = SessionLocal()

courses = db.query(Course).all()
print(f'Total Courses: {len(courses)}')
print()

for c in courses[:5]:
    print(f'Course ID: {c.id}')
    print(f'  Name: {c.name}')
    print(f'  User ID: {c.user_id}')
    
    modules = db.query(Module).filter(Module.course_id == c.id).all()
    print(f'  Modules: {len(modules)}')
    
    for m in modules[:3]:
        print(f'    - {m.name}')
    
    if len(modules) > 3:
        print(f'    ... and {len(modules) - 3} more')
    print()

db.close()

