# Canvas Scraper API

The Canvas scraper has been integrated into the backend as an API endpoint.

## 🎯 How It Works

When users create an account, they provide their Canvas session cookie. The backend will:
1. Scrape all their active courses (F24, F25, S25, etc.)
2. Import courses into the database
3. Import all modules for each course
4. Associate everything with their user account

## 📡 API Endpoint

### POST `/api/v1/canvas/scrape-courses`

Scrape and import Canvas courses for a user.

**Request Body:**
```json
{
  "canvas_url": "https://usflearn.instructure.com",
  "session_cookie": "2bphp1Rq5npX_T_Nb...",
  "user_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "courses_imported": 12,
  "modules_imported": 145,
  "message": "Successfully imported 12 courses and 145 modules"
}
```

## 🚀 Usage Flow

### 1. User Signs Up / Logs In

```typescript
// Frontend: User provides Canvas session cookie
const sessionCookie = getUserCanvasCookie();

// Create user account first (or login)
const user = await createAccount(email, password);
```

### 2. Scrape Their Courses

```typescript
// Call the scraper endpoint
const response = await fetch('http://localhost:8000/api/v1/canvas/scrape-courses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    canvas_url: 'https://usflearn.instructure.com',
    session_cookie: sessionCookie,
    user_id: user.id
  })
});

const result = await response.json();
console.log(`Imported ${result.courses_imported} courses!`);
```

### 3. Display Courses in Dashboard

```typescript
// Fetch user's courses
const courses = await fetch('http://localhost:8000/api/v1/courses').then(r => r.json());

// Show in dashboard
courses.forEach(course => {
  displayCourseCard(course);
});
```

### 4. Show Modules When Course is Clicked

```typescript
// When user clicks a course
const modules = await fetch(
  `http://localhost:8000/api/v1/modules/course/${courseId}`
).then(r => r.json());

// Display modules
modules.forEach(module => {
  displayModule(module);
});
```

## 🔧 What Gets Scraped

### Courses
- ✅ All F24 (Fall 2024) courses
- ✅ All F25 (Fall 2025) courses
- ✅ All S25 (Spring 2025) courses
- ❌ Filters out templates, workshops, system courses

### For Each Course
- Canvas ID
- Course code (e.g., CIS4930)
- Full course name
- Modules with all items
- Each module item has:
  - Name
  - URL to Canvas resource

## 📊 Database Schema

### Courses Table
```sql
CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    canvas_id VARCHAR UNIQUE,
    user_id INTEGER,
    code VARCHAR,
    name VARCHAR,
    instructor VARCHAR,
    term VARCHAR,
    progress FLOAT,
    color VARCHAR,
    is_active INTEGER
);
```

### Modules Table
```sql
CREATE TABLE modules (
    id INTEGER PRIMARY KEY,
    course_id INTEGER,
    name VARCHAR,
    position INTEGER,
    items JSON  -- [{name: "...", url: "..."}]
);
```

## 🧪 Testing

### Using Swagger UI

1. Start backend: `cd backend && docker-compose up -d`
2. Open: http://localhost:8000/api/docs
3. Find **canvas-integration** → `POST /api/v1/canvas/scrape-courses`
4. Click **Try it out**
5. Fill in:
   ```json
   {
     "canvas_url": "https://usflearn.instructure.com",
     "session_cookie": "your-session-cookie-here",
     "user_id": 1
   }
   ```
6. Click **Execute**

### Using cURL

```bash
curl -X POST http://localhost:8000/api/v1/canvas/scrape-courses \
  -H "Content-Type: application/json" \
  -d '{
    "canvas_url": "https://usflearn.instructure.com",
    "session_cookie": "2bphp1Rq5npX...",
    "user_id": 1
  }'
```

## 📝 Frontend Integration Example

### SignUp Component

```typescript
async function handleSignup(email: string, password: string, canvasCookie: string) {
  // 1. Create user account
  const user = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }).then(r => r.json());
  
  // 2. Scrape their Canvas courses
  await fetch('/api/v1/canvas/scrape-courses', {
    method: 'POST',
    body: JSON.stringify({
      canvas_url: 'https://usflearn.instructure.com',
      session_cookie: canvasCookie,
      user_id: user.id
    })
  });
  
  // 3. Redirect to dashboard
  router.push('/dashboard');
}
```

### Dashboard Component

```typescript
function Dashboard() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    fetch('/api/v1/courses')
      .then(r => r.json())
      .then(data => setCourses(data));
  }, []);
  
  return (
    <div>
      {courses.map(course => (
        <CourseCard 
          key={course.id}
          course={course}
          onClick={() => showModules(course.id)}
        />
      ))}
    </div>
  );
}
```

### Course Detail Component

```typescript
function CourseDetail({ courseId }: { courseId: number }) {
  const [modules, setModules] = useState([]);
  
  useEffect(() => {
    fetch(`/api/v1/modules/course/${courseId}`)
      .then(r => r.json())
      .then(data => setModules(data));
  }, [courseId]);
  
  return (
    <div>
      <h2>Course Modules</h2>
      {modules.map(module => (
        <ModuleCard key={module.id} module={module}>
          {module.items.map(item => (
            <ModuleItem key={item.url} item={item} />
          ))}
        </ModuleCard>
      ))}
    </div>
  );
}
```

## 🎨 Features

- ✅ Automatic filtering of system/template courses
- ✅ Only imports current semester courses
- ✅ Prevents duplicate imports
- ✅ Color-codes courses automatically
- ✅ Preserves module order
- ✅ Stores module items with URLs
- ✅ Associates with user accounts

## 🔄 Re-scraping

Users can re-scrape their courses anytime to:
- Get new courses added to Canvas
- Update module content
- Refresh course data

Just call the endpoint again with the same user_id.

## 🚨 Error Handling

The API will return errors for:
- Invalid session cookie
- User not found
- Canvas network issues
- Database errors

Always check the `success` field in the response.

## 💡 Next Steps

1. Update frontend signup/login to collect Canvas session cookie
2. Call scraper endpoint after account creation
3. Build course card components in dashboard
4. Add module view when course is clicked
5. Integrate flashcards for each course


