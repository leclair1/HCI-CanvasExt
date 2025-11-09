# API Reference - Frontend V2

Quick reference guide for all API endpoints in the updated backend.

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication Flow

### 1. Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "student@university.edu",
  "password": "securePassword123",
  "canvas_api_key": "your_canvas_api_key_optional"
}
```

### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "student@university.edu",
  "password": "securePassword123"
}
```

**Response (both signup and login):**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "student@university.edu",
    ...
  }
}
```

### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### 4. Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

## Dashboard

### Get Dashboard Data
```http
GET /dashboard/
Authorization: Bearer <token>
```

**Response:**
```json
{
  "due_today": [
    {
      "id": 1,
      "title": "Assignment Name",
      "course_code": "CS 101",
      "course_name": "Intro to CS",
      "due_date": "2023-10-08T23:59:00",
      "type": "assignment",
      "priority": "urgent"
    }
  ],
  "study_suggestions": [
    {
      "message": "5 flashcards due today",
      "action": "review",
      "course_code": "CS 101"
    }
  ],
  "courses": [
    {
      "id": 1,
      "code": "CS 101",
      "name": "Introduction to Computer Science",
      "progress": 68.5
    }
  ],
  "upcoming_assignments": [...],
  "study_streak_days": 12,
  "todays_tasks": [...]
}
```

## Profile Management

### Get Profile
```http
GET /profile/
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /profile/
Authorization: Bearer <token>
Content-Type: application/json

{
  "first_name": "Jane",
  "last_name": "Smith"
}
```

### Update Notification Settings
```http
PUT /profile/notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "email_notifications": true,
  "push_notifications": false,
  "study_reminders": true,
  "deadline_alerts": true
}
```

### Update Appearance
```http
PUT /profile/appearance
Authorization: Bearer <token>
Content-Type: application/json

{
  "dark_mode": true
}
```

### Change Password
```http
POST /profile/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "current_password": "oldPassword123",
  "new_password": "newPassword456"
}
```

## Quizzes

### Create Quiz
```http
POST /quizzes/
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Practice Quiz 1",
  "description": "Test your knowledge",
  "course_id": 1,
  "questions": [
    {
      "question_text": "Which data structure uses LIFO?",
      "option_a": "Queue",
      "option_b": "Stack",
      "option_c": "Array",
      "option_d": "Linked List",
      "correct_answer": "B"
    }
  ]
}
```

### List Quizzes
```http
GET /quizzes/
Authorization: Bearer <token>

# Optional: filter by course
GET /quizzes/?course_id=1
```

### Get Quiz (for taking it)
```http
GET /quizzes/{quiz_id}
Authorization: Bearer <token>
```

**Response (questions without correct answers):**
```json
{
  "id": 1,
  "title": "Practice Quiz 1",
  "description": "Test your knowledge",
  "questions": [
    {
      "id": 1,
      "question_text": "Which data structure uses LIFO?",
      "options": ["Queue", "Stack", "Array", "Linked List"]
    }
  ]
}
```

### Submit Quiz
```http
POST /quizzes/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "quiz_id": 1,
  "answers": [
    {
      "question_id": 1,
      "user_answer": "B"
    }
  ]
}
```

**Response:**
```json
{
  "score": 1,
  "total": 1,
  "answers": [
    {
      "question": "Which data structure uses LIFO?",
      "user_answer": "Stack",
      "correct_answer": "Stack",
      "is_correct": true
    }
  ],
  "attempt_id": 1
}
```

### Generate Quiz (AI)
```http
POST /quizzes/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "course_id": 1,
  "num_questions": 5,
  "topics": ["arrays", "loops"]
}
```

### Delete Quiz
```http
DELETE /quizzes/{quiz_id}
Authorization: Bearer <token>
```

## Saved Flashcard Decks

### Create Saved Deck
```http
POST /saved-decks/
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "CS 101 Final Review",
  "description": "Important concepts for final exam",
  "course_id": 1,
  "cards": [
    {
      "question": "What is a variable?",
      "answer": "A container for storing data values",
      "order": 0
    },
    {
      "question": "What is a function?",
      "answer": "A reusable block of code",
      "order": 1
    }
  ]
}
```

### List Saved Decks
```http
GET /saved-decks/
Authorization: Bearer <token>

# Optional: filter by course
GET /saved-decks/?course_id=1
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "CS 101 Final Review",
    "description": "Important concepts",
    "card_count": 15,
    "created_at": "2023-10-01T12:00:00"
  }
]
```

### Get Saved Deck
```http
GET /saved-decks/{deck_id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "name": "CS 101 Final Review",
  "description": "Important concepts",
  "course_id": 1,
  "created_at": "2023-10-01T12:00:00",
  "updated_at": "2023-10-01T12:00:00",
  "cards": [
    {
      "id": 1,
      "deck_id": 1,
      "question": "What is a variable?",
      "answer": "A container for storing data values",
      "order": 0
    }
  ]
}
```

### Delete Saved Deck
```http
DELETE /saved-decks/{deck_id}
Authorization: Bearer <token>
```

## Courses

### List Courses
```http
GET /courses/
Authorization: Bearer <token>
```

### Get Course Details
```http
GET /courses/{course_id}
Authorization: Bearer <token>
```

## Assignments

### List Assignments
```http
GET /assignments/
Authorization: Bearer <token>

# Optional filters
GET /assignments/?course_id=1
GET /assignments/?status=pending
```

### Get Assignment Details
```http
GET /assignments/{assignment_id}
Authorization: Bearer <token>
```

## Flashcards

### Generate Flashcards
```http
POST /flashcards/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "course_id": 1,
  "topic": "Data Structures",
  "count": 10
}
```

### List Flashcard Sets
```http
GET /flashcards/
Authorization: Bearer <token>
```

## Study Sessions

### Start Study Session
```http
POST /study-sessions/
Authorization: Bearer <token>
Content-Type: application/json

{
  "course_id": 1,
  "type": "flashcards"
}
```

### End Study Session
```http
PUT /study-sessions/{session_id}/end
Authorization: Bearer <token>
```

## AI Chat

### Send Message
```http
POST /chat/
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Explain binary search",
  "context": {
    "course_id": 1,
    "topic": "algorithms"
  }
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 400 Bad Request
```json
{
  "detail": "Invalid request data"
}
```

## Tips for Frontend Integration

1. **Store the token securely** after login/signup
2. **Include Authorization header** in all authenticated requests
3. **Handle 401 errors** by redirecting to login
4. **Refresh data** after mutations (create, update, delete)
5. **Show loading states** during API calls
6. **Display error messages** from API responses

## Testing with cURL

### Example: Complete Authentication Flow
```bash
# 1. Sign up
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe","email":"john@university.edu","password":"test123456"}'

# 2. Login (save the token from response)
TOKEN=$(curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@university.edu","password":"test123456"}' \
  | jq -r '.access_token')

# 3. Get dashboard
curl http://localhost:8000/api/v1/dashboard/ \
  -H "Authorization: Bearer $TOKEN"

# 4. Create a saved deck
curl -X POST http://localhost:8000/api/v1/saved-decks/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Deck","cards":[{"question":"Q1","answer":"A1","order":0}]}'
```


