# Canvas Extension API - Quick Reference

## 🚀 Quick Start

```bash
# Start backend
cd backend && docker-compose up -d

# Start frontend
cd frontendv2 && npm install && npm run dev

# Access
Frontend: http://localhost:5173
Backend:  http://localhost:8000
API Docs: http://localhost:8000/api/docs
```

---

## 🔐 Authentication

```typescript
// Signup
POST /auth/signup
{
  first_name, last_name, email, password,
  canvas_instance_url?, canvas_session_cookie?
}
→ { access_token, token_type, user }

// Login
POST /auth/login
{ email, password }
→ { access_token, token_type, user }

// All other requests
Headers: { Authorization: "Bearer {token}" }
```

---

## 📚 Core Endpoints

### Courses
```typescript
GET    /courses?active_only=true     // List courses
GET    /courses/{id}                 // Get course
POST   /courses                      // Create course
PUT    /courses/{id}                 // Update course
DELETE /courses/{id}                 // Delete course
```

### Modules
```typescript
GET    /modules/course/{course_id}   // List course modules
GET    /modules/{id}                 // Get module
POST   /modules                      // Create module
```

### Assignments
```typescript
GET    /assignments?course_id=&status=   // List assignments
GET    /assignments/{id}                 // Get assignment
POST   /assignments                      // Create
PUT    /assignments/{id}                 // Update
DELETE /assignments/{id}                 // Delete
```

---

## 🤖 AI Features

### Flashcards
```typescript
POST /flashcards/generate
{
  module_id: number,
  num_cards: number (10-30),
  file_urls: string[]
}
→ { flashcards: [], module_name, count }
```

### Quizzes
```typescript
POST /quizzes/generate
{
  module_id: number,
  num_questions: number,
  file_urls: string[]
}
→ { questions: [], module_name, count }
```

### AI Tutor Chat (RAG)
```typescript
POST /chat
{
  module_id: number,
  message: string,
  file_urls: string[]
}
→ { message, role, references }
```

### Active Recall
```typescript
// Generate question
POST /chat/active-recall/question
{
  module_id: number,
  file_urls: string[]
}
→ { question }

// Grade answer
POST /chat/active-recall/grade
{
  question: string,
  user_answer: string,
  module_id: number,
  file_urls: string[],
  difficulty: "easy" | "balanced" | "tough"
}
→ { score, feedback, correct_answer, passed }
```

---

## 💾 Data Management

### Saved Decks
```typescript
GET    /saved-decks?course_id=        // List decks
GET    /saved-decks/{id}              // Get deck
POST   /saved-decks                   // Save deck
DELETE /saved-decks/{id}              // Delete deck
```

### Study Sessions
```typescript
GET  /study-sessions?course_id=&days=  // List sessions
GET  /study-sessions/stats?days=30     // Get stats
POST /study-sessions                   // Log session
{
  course_id: number,
  duration_minutes: number,
  activity_type: string,
  notes?: string
}
```

---

## 🎯 Dashboard
```typescript
GET /dashboard
→ {
  due_today: [],
  study_suggestions: [],
  courses: [],
  upcoming_assignments: [],
  study_streak_days: number,
  todays_tasks: []
}
```

---

## 🔗 Canvas Integration

```typescript
// Authenticate with Canvas
POST /canvas/auth
{ canvas_url, access_token }
→ { success, user_id, canvas_user_id, name, email }

// Sync all data
POST /canvas/sync
{ user_id }
→ { success, courses_synced, assignments_synced, last_sync, errors }

// Scrape with cookie
POST /canvas/scrape-courses
{ canvas_url, session_cookie, user_id }
→ { success, courses_imported, modules_imported, message }
```

---

## 👤 Profile & Settings

```typescript
GET  /profile                    // Get profile
PUT  /profile                    // Update profile
PUT  /profile/notifications      // Update notifications
PUT  /profile/appearance         // Update appearance
POST /profile/change-password    // Change password

GET  /settings                   // Get app settings
PUT  /settings                   // Update settings
```

---

## 🗄️ Database Schema (Quick)

```sql
users
  ├─ id, email, password_hash, canvas_session_cookie
  ├─ study_streak_days, dark_mode, notifications...
  
courses
  ├─ id, canvas_id, user_id (FK)
  ├─ code, name, instructor, term, progress, color
  └─ UNIQUE(canvas_id, user_id)

modules
  ├─ id, course_id (FK), name, position
  └─ items (JSON array)

assignments
  ├─ id, user_id (FK), course_id (FK)
  ├─ title, due_date, type, priority, status
  
flashcards
  ├─ id, user_id (FK), course_id (FK), set_id (FK)
  ├─ question, answer, difficulty
  └─ last_reviewed, times_reviewed, mastered

saved_flashcard_decks
  ├─ id, user_id (FK), course_id (FK)
  └─ saved_flashcards (1-to-many)

quizzes
  ├─ id, user_id (FK), course_id (FK)
  ├─ quiz_questions (1-to-many)
  └─ quiz_attempts (1-to-many)

chat_messages
  ├─ id, user_id (FK), course_id (FK)
  └─ role, content, created_at

study_sessions
  ├─ id, user_id (FK), course_id (FK)
  └─ duration_minutes, activity_type, session_date
```

---

## 🔑 Environment Variables

```bash
# Required
GROQ_API_KEY=gsk_...
SECRET_KEY=your-secret-key

# Canvas (at least one)
CANVAS_INSTANCE_URL=https://canvas.instructure.com
CANVAS_SESSION_COOKIE=... (or provide during signup)

# Database (auto in Docker)
DATABASE_URL=postgresql://canvas_user:canvas_password@postgres:5432/canvas_ext

# Security
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# CORS
CORS_ORIGINS=["http://localhost:5173"]
```

---

## 🛠️ Common Tasks

### Add New User
```bash
# Via API
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe","email":"john@example.com","password":"password123"}'

# Via Docker
docker exec canvas_ext_backend python -c "
from app.db.database import SessionLocal
from app.models.user import User
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=['bcrypt'])
db = SessionLocal()
user = User(
    first_name='Test',
    last_name='User',
    email='test@example.com',
    password_hash=pwd_context.hash('password123')
)
db.add(user)
db.commit()
print(f'Created user {user.id}')
"
```

### Import Courses for Existing User
```bash
# Get session cookie from browser, then:
curl -X POST http://localhost:8000/api/v1/canvas/scrape-courses \
  -H "Content-Type: application/json" \
  -d '{
    "canvas_url": "https://canvas.instructure.com",
    "session_cookie": "your_session_cookie_here",
    "user_id": 1
  }'
```

### Test AI Generation
```bash
TOKEN="your_jwt_token"

# Generate flashcards
curl -X POST http://localhost:8000/api/v1/flashcards/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "module_id": 25,
    "num_cards": 5,
    "file_urls": ["https://canvas.../modules/items/123"]
  }'
```

---

## 📊 Data Relationships

```
User (1) ────┬──── (many) Courses
             ├──── (many) Assignments  
             ├──── (many) Flashcards
             ├──── (many) SavedDecks
             ├──── (many) Quizzes
             └──── (many) StudySessions

Course (1) ──┬──── (many) Modules
             ├──── (many) Assignments
             ├──── (many) Flashcards
             └──── (many) ChatMessages

Module (1) ──── (many) items (JSON array)
             ├──── (many) Flashcards (generated from)
             └──── (many) Quizzes (generated from)

FlashcardSet (1) ──── (many) Flashcards

SavedDeck (1) ──── (many) SavedFlashcards

Quiz (1) ────┬──── (many) QuizQuestions
             └──── (many) QuizAttempts

QuizAttempt (1) ──── (many) QuizAnswers
```

---

## 🎯 Typical User Journey

### 1. Onboarding
```
1. POST /auth/signup (with canvas_session_cookie)
   → Auto-imports courses & modules
   → Returns JWT token

2. Frontend stores token
3. Redirects to dashboard
```

### 2. View Courses
```
1. GET /courses?active_only=true
   → Returns user's courses

2. GET /modules/course/{id}
   → Returns modules for selected course
```

### 3. Generate Study Materials
```
1. User selects module & files
2. POST /flashcards/generate
   → AI generates flashcards from PDFs
   OR
2. POST /quizzes/generate
   → AI generates quiz questions
```

### 4. Study with AI Tutor
```
1. User selects module & files
2. POST /chat
   → AI answers using RAG (course content)
   
Active Recall Mode:
3. POST /chat/active-recall/question
   → AI generates question
4. User answers
5. POST /chat/active-recall/grade
   → AI grades answer
```

### 5. Track Progress
```
1. POST /study-sessions
   → Log study time

2. GET /dashboard
   → View progress, upcoming assignments

3. GET /study-sessions/stats
   → View study statistics
```

---

## ⚡ Performance Tips

### Backend
- Use async endpoints for I/O operations
- Limit file processing to 5 files max
- Cache Canvas data (sync every 6-12 hours)
- Implement request timeouts

### Frontend
- Store JWT in localStorage
- Cache course/module data
- Debounce API calls
- Show loading states

### AI Generation
- Limit context to 15K characters
- Use lower temperature (0.3) for grading
- Use higher temperature (0.8) for variety
- Handle rate limits gracefully

---

## 🐛 Debug Checklist

**Flashcards not generating?**
1. Check user has canvas_session_cookie: `SELECT canvas_session_cookie FROM users WHERE id=X`
2. Check file URLs are valid
3. Check Groq API key: `echo $GROQ_API_KEY`
4. Check backend logs: `docker logs canvas_ext_backend --tail 50`

**Courses not showing?**
1. Check courses exist: `SELECT * FROM courses WHERE user_id=X`
2. Check user_id matches logged-in user
3. Verify JWT token is valid
4. Check CORS settings if frontend can't connect

**Database issues?**
1. Check postgres is running: `docker ps | grep postgres`
2. Test connection: `docker exec canvas_ext_db psql -U canvas_user -d canvas_ext -c "SELECT 1"`
3. Check migrations applied: `docker exec canvas_ext_db psql -U canvas_user -d canvas_ext -c "\dt"`

---

## 📖 Endpoint Summary Table

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/auth/signup` | POST | ❌ | Create account |
| `/auth/login` | POST | ❌ | Get JWT token |
| `/auth/me` | GET | ✅ | Get user info |
| `/courses` | GET | ✅ | List courses |
| `/modules/course/{id}` | GET | ✅ | List modules |
| `/flashcards/generate` | POST | ✅ | AI flashcards |
| `/quizzes/generate` | POST | ✅ | AI quiz |
| `/chat` | POST | ✅ | AI tutor (RAG) |
| `/chat/active-recall/question` | POST | ✅ | Generate question |
| `/chat/active-recall/grade` | POST | ✅ | Grade answer |
| `/saved-decks` | GET/POST | ✅ | Manage decks |
| `/dashboard` | GET | ✅ | Dashboard data |
| `/canvas/sync` | POST | ❌ | Sync Canvas |
| `/canvas/scrape-courses` | POST | ❌ | Scrape courses |
| `/study-sessions` | GET/POST | ✅ | Track studying |
| `/profile` | GET/PUT | ✅ | User profile |

**Total Endpoints:** 50+

---

## 🔄 Data Flow Diagrams

### Flashcard Generation
```
User → Select Files
  ↓
Frontend: POST /flashcards/generate
  ↓
Backend: Get user's canvas_session_cookie
  ↓
For each file_url:
  - Fetch HTML page
  - Parse for PDF link
  - Download PDF
  - Extract text (PyPDF2)
  ↓
Combine text → Send to Groq
  ↓
Groq AI: Generate flashcards (JSON)
  ↓
Backend: Parse & return
  ↓
Frontend: Display flashcards
```

### Active Recall
```
User → Switch to Active Recall mode
  ↓
Frontend: POST /chat/active-recall/question
  ↓
Backend: Extract text from files → Groq AI
  ↓
Frontend: Display question
  ↓
User → Types answer → Submit
  ↓
Frontend: POST /chat/active-recall/grade
  ↓
Backend: Groq AI grades (with difficulty level)
  ↓
Frontend: Display score, feedback, correct answer
```

---

## 🧪 Test Examples

### JavaScript/TypeScript
```typescript
const token = localStorage.getItem('token');

// Get courses
const courses = await fetch('http://localhost:8000/api/v1/courses', {
  headers: { Authorization: `Bearer ${token}` }
}).then(r => r.json());

// Generate flashcards
const flashcards = await fetch('http://localhost:8000/api/v1/flashcards/generate', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    module_id: 25,
    num_cards: 15,
    file_urls: ['https://...']
  })
}).then(r => r.json());
```

### Python
```python
import requests

BASE = "http://localhost:8000/api/v1"

# Login
r = requests.post(f"{BASE}/auth/login", json={
    "email": "user@example.com",
    "password": "password"
})
token = r.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# Get courses
courses = requests.get(f"{BASE}/courses", headers=headers).json()

# Generate flashcards
result = requests.post(
    f"{BASE}/flashcards/generate",
    headers=headers,
    json={
        "module_id": 25,
        "num_cards": 10,
        "file_urls": ["https://..."]
    }
).json()
```

---

## 🚨 Error Codes

| Code | Meaning | Fix |
|------|---------|-----|
| 400 | Bad Request | Check request body format |
| 401 | Unauthorized | Login again, check token |
| 404 | Not Found | Verify resource exists |
| 500 | Server Error | Check backend logs |

---

## 💡 Pro Tips

1. **Use Swagger UI** (`/api/docs`) to explore endpoints interactively
2. **Check logs** for detailed error messages: `docker logs canvas_ext_backend -f`
3. **Cache responses** to reduce API calls
4. **Handle rate limits** from Groq (30/min free tier)
5. **Refresh session cookie** when Canvas file access fails
6. **Test with curl** before implementing in frontend

---

## 📝 Model Information

**AI Model:** `llama-3.1-8b-instant` (Groq)
- Context window: 128K tokens
- Speed: ~500 tokens/second
- Free tier: 30 requests/minute

**Temperature Settings:**
- Flashcards: 0.7 (balanced)
- Quiz: 0.7
- Chat: 0.7
- Question Gen: 0.8 (variety)
- Grading: 0.3 (consistency)

---

## 🔧 Useful Commands

```bash
# Check backend status
docker ps | grep canvas_ext

# Restart backend
docker-compose restart backend

# View real-time logs
docker logs canvas_ext_backend -f

# Access database
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext

# Rebuild after code changes
docker-compose up -d --build

# Check user's courses
docker exec canvas_ext_backend python -c "
from app.db.database import SessionLocal
from app.models.course import Course
db = SessionLocal()
courses = db.query(Course).filter(Course.user_id==1).all()
for c in courses: print(c.code, c.name)
"
```

---

For complete documentation, see `API_DOCUMENTATION.md`

*Last updated: November 10, 2025*

