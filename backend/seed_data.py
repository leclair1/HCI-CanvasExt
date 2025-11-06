"""
Seed script to populate the database with initial mock data
Run this after setting up the database: python seed_data.py
"""
from app.db.database import SessionLocal, engine, Base
from app.models import Course, Assignment, Flashcard, FlashcardSet
from datetime import datetime

def seed_database():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        print("Seeding courses...")
        courses = [
            Course(
                id='crn4020',
                code='CRN4020',
                name='Software Engineering',
                instructor='Dr. Maya Patel',
                term='Fall 2025',
                progress=71.0,
                color='#3B82F6'
            ),
            Course(
                id='cop4600',
                code='COP4600',
                name='Operating Systems',
                instructor='Prof. Alan Richards',
                term='Fall 2025',
                progress=58.0,
                color='#10B981'
            ),
            Course(
                id='cis4930',
                code='CIS4930',
                name='User Experience Design',
                instructor='Dr. Elena Morales',
                term='Fall 2025',
                progress=77.0,
                color='#F59E0B'
            ),
            Course(
                id='cis4931',
                code='CIS4931',
                name='Human-Computer Interaction',
                instructor='Prof. James Liu',
                term='Fall 2025',
                progress=64.0,
                color='#8B5CF6'
            ),
        ]
        
        for course in courses:
            existing = db.query(Course).filter(Course.id == course.id).first()
            if not existing:
                db.add(course)
        
        db.commit()
        print(f"✓ Seeded {len(courses)} courses")
        
        print("Seeding assignments...")
        assignments = [
            Assignment(
                id='a1',
                title='Sprint Planning Deliverable',
                course='CRN4020',
                course_id='crn4020',
                due_date='Oct 8, 2025',
                type='Project',
                priority='high',
                status='pending'
            ),
            Assignment(
                id='a2',
                title='Process Synchronization Lab',
                course='COP4600',
                course_id='cop4600',
                due_date='Oct 10, 2025',
                type='Lab',
                priority='medium',
                status='pending'
            ),
            Assignment(
                id='a3',
                title='Persona Research Presentation',
                course='CIS4930',
                course_id='cis4930',
                due_date='Oct 12, 2025',
                type='Presentation',
                priority='high',
                status='pending'
            ),
            Assignment(
                id='a4',
                title='Heuristic Evaluation Report',
                course='CIS4931',
                course_id='cis4931',
                due_date='Oct 15, 2025',
                type='Report',
                priority='medium',
                status='pending'
            ),
        ]
        
        for assignment in assignments:
            existing = db.query(Assignment).filter(Assignment.id == assignment.id).first()
            if not existing:
                db.add(assignment)
        
        db.commit()
        print(f"✓ Seeded {len(assignments)} assignments")
        
        print("Seeding flashcards...")
        flashcards = [
            Flashcard(
                id='fc1',
                course_id='crn4020',
                question='What is the software development life cycle (SDLC)?',
                answer='The SDLC is the process for planning, creating, testing, and deploying software, typically covering discovery, requirements, design, implementation, validation, and maintenance.',
                difficulty='medium'
            ),
            Flashcard(
                id='fc2',
                course_id='cop4600',
                question='What responsibilities does an operating system kernel manage?',
                answer='The kernel handles core responsibilities such as process scheduling, memory management, I/O coordination, and system call handling.',
                difficulty='medium'
            ),
            Flashcard(
                id='fc3',
                course_id='cis4930',
                question='What is heuristic evaluation in UX?',
                answer='Heuristic evaluation is a usability inspection method where experts review a design against established usability principles to uncover issues quickly.',
                difficulty='medium'
            ),
            Flashcard(
                id='fc4',
                course_id='cis4931',
                question='When should you use a low-fidelity prototype?',
                answer='Use low-fidelity prototypes early to explore layout and task flows quickly, gather feedback, and iterate before investing in detailed visuals or code.',
                difficulty='easy'
            ),
            Flashcard(
                id='fc5',
                course_id='cis4930',
                question='What is an experience metric?',
                answer='Experience metrics, such as task success rate or time on task, quantify how effectively users achieve their goals and reveal where to improve the product.',
                difficulty='medium'
            ),
        ]
        
        for flashcard in flashcards:
            existing = db.query(Flashcard).filter(Flashcard.id == flashcard.id).first()
            if not existing:
                db.add(flashcard)
        
        db.commit()
        print(f"✓ Seeded {len(flashcards)} flashcards")
        
        print("\n✨ Database seeded successfully!")
        print("\nYou can now start the API server:")
        print("  uvicorn app.main:app --reload")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()




