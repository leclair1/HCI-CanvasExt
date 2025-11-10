"""
Migrate the Course model to allow multiple users to have the same Canvas courses
This removes the UNIQUE constraint on canvas_id and adds a composite constraint on (canvas_id, user_id)

Run in Docker: docker exec canvas_ext_backend python migrate_course_constraint.py
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.db.database import SessionLocal, engine
from sqlalchemy import text

def migrate():
    print("="*70)
    print(" MIGRATING COURSE CONSTRAINT")
    print("="*70)
    print()
    
    try:
        with engine.connect() as conn:
            # Start transaction
            trans = conn.begin()
            
            try:
                # 1. Drop the old unique constraint on canvas_id
                print("1. Dropping old unique constraint on canvas_id...")
                conn.execute(text("""
                    ALTER TABLE courses 
                    DROP CONSTRAINT IF EXISTS courses_canvas_id_key;
                """))
                print("   ✅ Old constraint dropped")
                print()
                
                # 2. Add new composite unique constraint on (canvas_id, user_id)
                print("2. Adding new composite unique constraint on (canvas_id, user_id)...")
                conn.execute(text("""
                    ALTER TABLE courses 
                    ADD CONSTRAINT uq_canvas_user UNIQUE (canvas_id, user_id);
                """))
                print("   ✅ New constraint added")
                print()
                
                # 3. Add index on canvas_id for performance
                print("3. Adding index on canvas_id...")
                conn.execute(text("""
                    CREATE INDEX IF NOT EXISTS idx_courses_canvas_id 
                    ON courses(canvas_id);
                """))
                print("   ✅ Index added")
                print()
                
                # Commit transaction
                trans.commit()
                
                print("="*70)
                print(" MIGRATION SUCCESSFUL!")
                print("="*70)
                print()
                print("✅ Multiple users can now have the same Canvas courses")
                print("✅ Each user can only have each Canvas course once (no duplicates)")
                
            except Exception as e:
                trans.rollback()
                raise e
                
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

if __name__ == "__main__":
    try:
        migrate()
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)

