# Canvas Integration Guide

Complete guide to integrate your Canvas data with the backend and frontend.

## 📦 What We Have

- ✅ Canvas data scraped (`canvas_data.json`)
- ✅ AI-generated flashcards (`flashcards_groq.json`)
- ✅ Backend models (Course, Module, Flashcard)
- ✅ API endpoints ready
- ✅ Import script created

## 🚀 Step-by-Step Integration

### Step 1: Start Docker Backend

```bash
cd backend
docker-compose up -d
```

Wait ~10 seconds for the database to initialize.

### Step 2: Import Canvas Data

Run the import script inside the Docker container:

```bash
docker exec canvas_ext_backend python import_canvas_data.py
```

This will:
- ✅ Import all courses from Canvas
- ✅ Import all modules for each course
- ✅ Import AI-generated flashcards

Expected output:
```
====================================================================================
 IMPORTING COURSES AND MODULES
================================================================================
  [+] Imported course: CIS4930.004F25.92007 Human-Computer Interaction
  [+] Imported course: CEN4020.001F25.91968 Software Engineering
  ...
  Imported: 2 courses, 30 modules
```

### Step 3: Verify Data

Check the API:

```bash
# View courses
curl http://localhost:8000/api/v1/courses

# View modules for a course (replace {course_id} with actual ID)
curl http://localhost:8000/api/v1/modules/course/1

# View flashcards
curl http://localhost:8000/api/v1/flashcards
```

Or visit: http://localhost:8000/api/docs

### Step 4: Frontend Integration

The frontend needs to be updated to:
1. Fetch courses from the API
2. Display them in the dashboard
3. Show modules when a course is clicked

## 📡 Available API Endpoints

### Courses
- `GET /api/v1/courses` - Get all active courses
- `GET /api/v1/courses?active_only=false` - Get all courses
- `GET /api/v1/courses/{course_id}` - Get specific course

### Modules
- `GET /api/v1/modules/course/{course_id}` - Get all modules for a course
- `GET /api/v1/modules/{module_id}` - Get specific module

### Flashcards
- `GET /api/v1/flashcards` - Get all flashcards
- `GET /api/v1/flashcards/course/{course_id}` - Get flashcards for a course

## 🎨 Frontend Components Needed

### 1. Update Dashboard to Show Canvas Courses

```typescript
// Fetch courses from API
const fetchCourses = async () => {
  const response = await fetch('http://localhost:8000/api/v1/courses');
  const courses = await response.json();
  setCourses(courses);
};
```

### 2. Course Card Component

```typescript
interface Course {
  id: number;
  canvas_id: string;
  code: string;
  name: string;
  instructor: string;
  term: string;
  progress: number;
  color: string;
  is_active: number;
}
```

### 3. Modules View

```typescript
// Fetch modules when course is clicked
const fetchModules = async (courseId: number) => {
  const response = await fetch(`http://localhost:8000/api/v1/modules/course/${courseId}`);
  const modules = await response.json();
  setModules(modules);
};
```

## 🔧 Troubleshooting

### Import Script Fails

```bash
# Check if containers are running
docker ps

# View backend logs
docker logs canvas_ext_backend

# Restart containers
docker-compose down
docker-compose up -d
```

### Database Connection Error

```bash
# Check database is ready
docker exec canvas_ext_db pg_isready -U canvas_user -d canvas_ext

# If not ready, wait and try again
```

### Files Not Found

```bash
# Verify files are copied
ls backend/canvas_data.json
ls backend/flashcards_groq.json

# If missing, copy them:
copy canvas_data.json backend\
copy flashcards_groq.json backend\
```

## 📝 Next Steps

1. ✅ Import data (run step 2 above)
2. ⏳ Update frontend to fetch from API
3. ⏳ Create course card components
4. ⏳ Add module view when course is clicked
5. ⏳ Integrate flashcards into study interface

## 🎯 Quick Commands

```bash
# Start backend
cd backend && docker-compose up -d

# Import Canvas data
docker exec canvas_ext_backend python import_canvas_data.py

# View logs
docker logs -f canvas_ext_backend

# Stop backend
cd backend && docker-compose down

# Start frontend
cd frontendv2 && npm run dev
```

## 📊 Database Schema

### Courses Table
- id (PK)
- canvas_id (unique)
- user_id (FK)
- code
- name
- instructor
- term
- progress
- color
- is_active

### Modules Table
- id (PK)
- course_id (FK)
- name
- position
- items (JSON)

### Flashcards Table
- id (PK)
- set_id (FK)
- user_id (FK)
- course_id (FK)
- question
- answer
- difficulty
- mastered


