# Canvas Extension - Complete API Documentation

**Version:** 1.0.0  
**Last Updated:** November 10, 2025  
**Base URL:** `http://localhost:8000/api/v1`  
**Interactive API Docs:** `http://localhost:8000/api/docs` (Swagger UI)  
**Alternative Docs:** `http://localhost:8000/api/redoc` (ReDoc)

---

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints Reference](#api-endpoints-reference)
4. [Database Schema](#database-schema)
5. [Services & Business Logic](#services--business-logic)
6. [Environment Configuration](#environment-configuration)
7. [Request/Response Examples](#requestresponse-examples)
8. [Error Handling](#error-handling)
9. [Deployment Guide](#deployment-guide)

---

## Overview

### System Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend    │─────▶│  PostgreSQL │
│ React+Vite  │◀─────│   FastAPI    │◀─────│  Database   │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  External    │
                     │  Services    │
                     ├──────────────┤
                     │ Canvas LMS   │
                     │ Groq AI API  │
                     └──────────────┘
```

### Technology Stack

**Backend:**
- **Framework:** FastAPI 0.115.0
- **Database ORM:** SQLAlchemy 2.0.35
- **Authentication:** JWT (python-jose) + bcrypt
- **Encryption:** Fernet (cryptography 46.0.0)
- **HTTP Client:** httpx 0.27.2 (async) + requests 2.32.3 (sync)
- **HTML Parsing:** BeautifulSoup4 4.12.3
- **PDF Processing:** PyPDF2 3.0.1
- **AI:** Groq 0.9.0

**Frontend:**
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **UI:** Tailwind CSS + shadcn/ui components
- **State:** React hooks (useState, useEffect)

**Database:**
- **DBMS:** PostgreSQL 16
- **Driver:** psycopg2-binary 2.9.9

---

## Authentication

### JWT-Based Authentication

**Token Generation:**
```python
# Secret key from environment
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 43200  # 30 days

# Token payload
{
  "sub": "user@example.com",  # User email
  "exp": 1699876543  # Expiration timestamp
}
```

**Password Security:**
- Algorithm: bcrypt
- Rounds: 12 (default)
- Hashing via passlib CryptContext

**How to Use:**
1. Call `/auth/signup` or `/auth/login`
2. Store returned `access_token` in localStorage
3. Include in all requests: `Authorization: Bearer {token}`
4. Token expires after 30 days

---

## API Endpoints Reference

### Authentication (`/auth`)

#### `POST /auth/signup`
Create a new user account.

**Authentication:** None required

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "canvas_api_key": "optional_api_token",
  "canvas_instance_url": "https://usflearn.instructure.com",
  "canvas_session_cookie": "optional_session_cookie"
}
```

**Validation Rules:**
- `first_name`: Required, min length 1
- `last_name`: Required, min length 1
- `email`: Required, valid email format
- `password`: Required, min length 8
- `canvas_session_cookie`: Optional; if provided, courses auto-imported

**Response:** `201 Created`
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "canvas_user_id": null,
    "study_streak_days": 0,
    "dark_mode": false,
    "email_notifications": true,
    "push_notifications": true,
    "study_reminders": true,
    "deadline_alerts": true,
    "created_at": "2025-11-10T15:00:00"
  }
}
```

**Process Flow:**
1. Validates email not already registered
2. Hashes password with bcrypt
3. Encrypts Canvas session cookie (if provided)
4. Creates user in database
5. If `canvas_session_cookie` provided:
   - Initializes Canvas scraper
   - Scrapes all active courses
   - Imports courses and modules to database
6. Generates JWT token
7. Returns token + user data

---

#### `POST /auth/login`
Authenticate existing user and validate Canvas session.

**Authentication:** None required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "canvas_user_id": null,
    "study_streak_days": 0,
    "dark_mode": false,
    "email_notifications": true,
    "push_notifications": true,
    "study_reminders": true,
    "deadline_alerts": true,
    "created_at": "2025-11-10T15:00:00"
  },
  "canvas_session_valid": false,
  "has_canvas_session": true
}
```

**New Fields:**
- `canvas_session_valid`: Boolean indicating if user's Canvas session cookie is still valid
- `has_canvas_session`: Boolean indicating if user has a Canvas session cookie stored

**Process Flow:**
1. Validates email and password
2. Checks if user has Canvas session cookie stored
3. If present, attempts to validate by fetching courses from Canvas
4. Returns authentication token plus Canvas session status

**Errors:**
- `401 Unauthorized` - Invalid email or password

---

#### `POST /auth/validate-canvas-session`
Validate the current user's Canvas session cookie.

**Authentication:** Required

**Request Body:** None

**Response:** `200 OK`
```json
{
  "is_valid": true,
  "has_session": true,
  "message": "Canvas session is valid"
}
```

**Response Fields:**
- `is_valid`: Whether the Canvas session cookie is valid
- `has_session`: Whether the user has a Canvas session cookie stored
- `message`: Human-readable status message

**Use Cases:**
- Check if user needs to update Canvas session before making Canvas API calls
- Validate session periodically in the frontend
- Determine if Canvas features should be enabled

---

#### `POST /auth/update-canvas-session`
Update the user's Canvas session cookie and re-sync courses.

**Authentication:** Required

**Request Body:**
```json
{
  "canvas_session_cookie": "new_session_cookie_value_here",
  "canvas_instance_url": "https://usflearn.instructure.com"
}
```

**Validation:**
- `canvas_session_cookie`: Required, min length 1
- `canvas_instance_url`: Optional, defaults to "https://usflearn.instructure.com"

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Canvas session updated successfully",
  "courses_synced": 5,
  "modules_synced": 42
}
```

**Process Flow:**
1. Validates new Canvas session cookie by attempting to fetch courses
2. If invalid, returns `400 Bad Request`
3. If valid, encrypts and stores new session cookie
4. Updates Canvas instance URL
5. Automatically re-syncs all active courses and modules
6. Returns sync results

**Errors:**
- `400 Bad Request` - Invalid Canvas session cookie or validation failed
- `401 Unauthorized` - User not authenticated

**Use Case:**
- Called when Canvas session expires and user provides new cookie
- Automatically triggered by frontend modal when session validation fails

---

#### `POST /auth/logout`
Logout user (client-side token removal).

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "message": "Successfully logged out"
}
```

---

#### `GET /auth/me`
Get current authenticated user info.

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "canvas_user_id": "12345",
  "study_streak_days": 5,
  "dark_mode": false,
  "email_notifications": true,
  "push_notifications": true,
  "study_reminders": true,
  "deadline_alerts": true,
  "created_at": "2025-11-10T15:00:00"
}
```

---

### Profile Management (`/profile`)

#### `GET /profile`
Get user profile.

**Authentication:** Required

**Response:** Same as `/auth/me`

---

#### `PUT /profile`
Update user profile.

**Authentication:** Required

**Request Body:** (all fields optional)
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "canvas_api_key": "new_api_token",
  "canvas_instance_url": "https://canvas.instructure.com"
}
```

**Response:** Updated user object

---

#### `PUT /profile/notifications`
Update notification settings.

**Authentication:** Required

**Request Body:** (all fields optional)
```json
{
  "email_notifications": false,
  "push_notifications": true,
  "study_reminders": true,
  "deadline_alerts": false
}
```

---

#### `PUT /profile/appearance`
Update appearance settings.

**Authentication:** Required

**Request Body:**
```json
{
  "dark_mode": true
}
```

---

#### `POST /profile/change-password`
Change user password.

**Authentication:** Required

**Request Body:**
```json
{
  "current_password": "oldpassword123",
  "new_password": "newpassword456"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password changed successfully"
}
```

**Errors:**
- `400 Bad Request` - Current password is incorrect

---

### Courses (`/courses`)

#### `GET /courses`
Get all courses for authenticated user.

**Authentication:** Required

**Query Parameters:**
- `active_only` (boolean, default: true) - Filter to active courses only

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "canvas_id": "1991074",
    "code": "CIS4930",
    "name": "CIS4930.004F25.92007 Human-Computer Interaction",
    "instructor": "Dr. Julia Woodward",
    "term": "Fall 2025",
    "progress": 45.5,
    "color": "#3B82F6",
    "is_active": 1
  }
]
```

**Notes:**
- Automatically filters by `current_user.id`
- `progress` is 0-100 percentage
- `color` used for UI display

---

#### `GET /courses/{course_id}`
Get specific course by database ID.

**Authentication:** Required

**Response:** Single course object

**Errors:**
- `404 Not Found` - Course doesn't exist

---

#### `POST /courses`
Create a new course manually.

**Authentication:** Required

**Request Body:**
```json
{
  "id": "12345",
  "code": "CS101",
  "name": "Introduction to Computer Science",
  "instructor": "Dr. Smith",
  "term": "Fall 2025",
  "progress": 0.0,
  "color": "#3B82F6"
}
```

---

#### `PUT /courses/{course_id}`
Update a course.

**Authentication:** Required

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Course Name",
  "progress": 75.0
}
```

---

#### `DELETE /courses/{course_id}`
Delete a course.

**Authentication:** Required

**Response:** `204 No Content`

---

### Modules (`/modules`)

#### `GET /modules/course/{course_id}`
Get all modules for a course.

**Authentication:** Required

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "course_id": 1,
    "name": "Week 1: Welcome to HCI",
    "position": 0,
    "items": [
      {
        "title": "01 - Course Intro.pdf",
        "name": "01 - Course Intro",
        "type": "File",
        "url": "https://usflearn.instructure.com/courses/1994124/modules/items/42263147"
      },
      {
        "title": "Lecture Video",
        "type": "ExternalUrl",
        "url": "https://youtube.com/watch?v=abc123"
      }
    ]
  }
]
```

**Item Types:**
- `File` - PDF, DOC, TXT files
- `Page` - Canvas page content
- `ExternalUrl` - External links
- `Assignment` - Assignment links
- `Discussion` - Discussion topics

**Ordering:**
- Modules ordered by `position` field
- Items maintain order from Canvas

---

#### `GET /modules/{module_id}`
Get specific module.

**Authentication:** Required

**Response:** Single module object

**Errors:**
- `404 Not Found` - Module doesn't exist

---

#### `POST /modules`
Create a new module.

**Authentication:** Required

**Request Body:**
```json
{
  "course_id": 1,
  "name": "Week 5: Advanced Topics",
  "position": 4,
  "items": []
}
```

---

### Assignments (`/assignments`)

#### `GET /assignments`
Get assignments for authenticated user.

**Authentication:** Required

**Query Parameters:**
- `course_id` (string, optional) - Filter by course
- `status` (string, optional) - Filter by status: "pending", "submitted", "completed", "overdue"

**Response:** `200 OK`
```json
[
  {
    "id": "12345",
    "title": "HCI Project Proposal",
    "course": "CIS4930",
    "course_id": "3",
    "due_date": "Nov 15, 2025",
    "type": "Assignment",
    "priority": "high",
    "status": "pending",
    "description": "Submit your project proposal document...",
    "points": 100,
    "created_at": "2025-11-01T10:00:00"
  }
]
```

**Assignment Types:**
- `Assignment` - Regular assignment
- `Quiz` - Online quiz
- `Discussion` - Discussion post
- `External Tool` - External tool submission

**Priority Levels:**
- `low` - Due in 7+ days
- `medium` - Due in 2-7 days
- `high` - Due in < 2 days

**Status Values:**
- `pending` - Not submitted
- `submitted` - Submitted, not graded
- `completed` - Graded
- `overdue` - Past due date

---

#### `GET /assignments/{assignment_id}`
Get specific assignment.

**Authentication:** Required

---

#### `POST /assignments`
Create assignment.

**Authentication:** Required

---

#### `PUT /assignments/{assignment_id}`
Update assignment.

**Authentication:** Required

---

#### `DELETE /assignments/{assignment_id}`
Delete assignment.

**Authentication:** Required

**Response:** `204 No Content`

---

### Flashcards (`/flashcards`)

#### `POST /flashcards/generate`
Generate AI-powered flashcards from module content.

**Authentication:** Required

**Request Body:**
```json
{
  "module_id": 25,
  "num_cards": 15,
  "file_urls": [
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263147",
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263149"
  ]
}
```

**Field Constraints:**
- `num_cards`: 10-30 (enforced)
- `file_urls`: Optional; if empty, uses all module files

**Response:** `200 OK`
```json
{
  "flashcards": [
    {
      "question": "What is the primary goal of HCI?",
      "answer": "The primary goal of HCI is to design interactive systems that are effective, efficient, and satisfying for users.",
      "difficulty": "medium"
    }
  ],
  "module_name": "Week 1: Welcome to HCI",
  "count": 15
}
```

**Generation Process:**
1. Validates module exists
2. Checks user has Canvas session cookie
3. Decrypts session cookie
4. Extracts text from each file URL:
   - Fetches HTML page with session cookie
   - Parses for file download link
   - Downloads PDF
   - Extracts text with PyPDF2
5. Combines all text (up to 10 files)
6. Calls Groq AI with context
7. Parses JSON response
8. Returns flashcards

**Requirements:**
- User must have `canvas_session_cookie` in database
- Files must be accessible PDFs
- At least 200 characters of content required

**AI Configuration:**
- Model: `llama-3.1-8b-instant`
- Temperature: 0.7
- Max tokens: 2000

---

#### `GET /flashcards`
Get stored flashcards.

**Authentication:** Required

**Query Parameters:**
- `course_id` (string, optional)
- `set_id` (string, optional)
- `mastered` (boolean, optional)

**Response:**
```json
[
  {
    "id": "1",
    "course_id": "3",
    "question": "What is affordance?",
    "answer": "A property that suggests how an object should be used.",
    "difficulty": "medium",
    "set_id": "5",
    "last_reviewed": "2025-11-10T14:00:00",
    "times_reviewed": 2,
    "mastered": false,
    "created_at": "2025-11-10T12:00:00"
  }
]
```

---

#### `POST /flashcards`
Create a flashcard manually.

**Authentication:** Required

**Request Body:**
```json
{
  "id": "unique_id",
  "course_id": "3",
  "question": "What is HCI?",
  "answer": "Human-Computer Interaction",
  "difficulty": "easy",
  "set_id": "5"
}
```

---

#### `PUT /flashcards/{flashcard_id}`
Update a flashcard.

**Authentication:** Required

---

#### `POST /flashcards/review`
Record a flashcard review.

**Authentication:** Required

**Request Body:**
```json
{
  "flashcard_id": "123",
  "success": true
}
```

**Logic:**
- Increments `times_reviewed`
- Updates `last_reviewed` timestamp
- If success AND reviewed 3+ times → marks as `mastered`

---

#### `DELETE /flashcards/{flashcard_id}`
Delete a flashcard.

**Authentication:** Required

**Response:** `204 No Content`

---

#### `GET /flashcards/sets`
Get flashcard sets.

**Authentication:** Required

**Query Parameters:**
- `course_id` (string, optional)

---

#### `POST /flashcards/sets`
Create a flashcard set.

**Authentication:** Required

---

### Quizzes (`/quizzes`)

#### `POST /quizzes/generate`
Generate AI quiz questions from module content.

**Authentication:** Required

**Request Body:**
```json
{
  "module_id": 25,
  "num_questions": 10,
  "file_urls": [
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263147"
  ]
}
```

**Response:** `200 OK`
```json
{
  "questions": [
    {
      "question": "Which principle focuses on making interfaces intuitive?",
      "options": [
        "Affordance",
        "Feedback",
        "Consistency",
        "Mapping"
      ],
      "correct_answer": "Affordance",
      "explanation": "Affordance refers to the property of an object that suggests how it should be used."
    }
  ],
  "module_name": "Week 1: Welcome to HCI",
  "count": 10
}
```

**AI Configuration:**
- Model: `llama-3.1-8b-instant`
- Temperature: 0.7
- Max tokens: 2500
- Format: Multiple choice (4 options)

---

#### `POST /quizzes`
Create a quiz manually.

**Authentication:** Required

**Request Body:**
```json
{
  "title": "HCI Midterm",
  "description": "Covers weeks 1-5",
  "course_id": 3,
  "questions": [
    {
      "question_text": "What is HCI?",
      "option_a": "Hardware Control Interface",
      "option_b": "Human-Computer Interaction",
      "option_c": "High Computation Integration",
      "option_d": "None of the above",
      "correct_answer": "B"
    }
  ]
}
```

---

#### `GET /quizzes`
List all quizzes for current user.

**Authentication:** Required

**Query Parameters:**
- `course_id` (int, optional)

---

#### `GET /quizzes/{quiz_id}`
Get a quiz (without showing answers).

**Authentication:** Required

**Response:**
```json
{
  "id": 1,
  "title": "HCI Midterm",
  "description": "Covers weeks 1-5",
  "questions": [
    {
      "id": 1,
      "question_text": "What is HCI?",
      "options": [
        "Hardware Control Interface",
        "Human-Computer Interaction",
        "High Computation Integration",
        "None of the above"
      ]
    }
  ]
}
```

**Note:** Correct answers are hidden (for taking the quiz)

---

#### `POST /quizzes/submit`
Submit quiz answers and get results.

**Authentication:** Required

**Request Body:**
```json
{
  "quiz_id": 1,
  "answers": [
    {
      "question_id": 1,
      "user_answer": "B"
    },
    {
      "question_id": 2,
      "user_answer": "A"
    }
  ]
}
```

**Response:**
```json
{
  "score": 8,
  "total": 10,
  "attempt_id": 15,
  "answers": [
    {
      "question": "What is HCI?",
      "user_answer": "Human-Computer Interaction",
      "correct_answer": "Human-Computer Interaction",
      "is_correct": true
    }
  ]
}
```

**Process:**
1. Creates QuizAttempt record
2. Grades each answer
3. Stores QuizAnswer records
4. Returns detailed results

---

#### `DELETE /quizzes/{quiz_id}`
Delete a quiz.

**Authentication:** Required

**Response:** `204 No Content`

---

### Saved Decks (`/saved-decks`)

#### `POST /saved-decks`
Save a flashcard deck.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "HCI Week 1 Review",
  "description": "Flashcards for HCI fundamentals",
  "course_id": 3,
  "cards": [
    {
      "question": "What is HCI?",
      "answer": "Human-Computer Interaction",
      "order": 0
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "user_id": 1,
  "name": "HCI Week 1 Review",
  "description": "Flashcards for HCI fundamentals",
  "course_id": 3,
  "created_at": "2025-11-10T15:00:00",
  "updated_at": "2025-11-10T15:00:00",
  "cards": [...]
}
```

**Database Structure:**
- Creates `SavedFlashcardDeck` record
- Creates `SavedFlashcard` records for each card
- Cards have `order` field for sequencing

---

#### `GET /saved-decks`
List all saved decks for user.

**Authentication:** Required

**Query Parameters:**
- `course_id` (int, optional)

**Response:**
```json
[
  {
    "id": 1,
    "name": "HCI Week 1 Review",
    "description": "Flashcards for HCI fundamentals",
    "card_count": 15,
    "created_at": "2025-11-10T15:00:00"
  }
]
```

---

#### `GET /saved-decks/{deck_id}`
Get a specific saved deck with all cards.

**Authentication:** Required

---

#### `DELETE /saved-decks/{deck_id}`
Delete a saved deck (and all its cards).

**Authentication:** Required

**Response:** `204 No Content`

**Note:** Cascade delete removes all associated `SavedFlashcard` records

---

### Chat / AI Tutor (`/chat`)

#### `POST /chat`
Send message to AI tutor (RAG-based).

**Authentication:** Required

**Request Body:**
```json
{
  "module_id": 25,
  "message": "Explain the concept of affordance in HCI",
  "file_urls": [
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263147"
  ]
}
```

**Response:** `200 OK`
```json
{
  "message": "Affordance is a property of an object that indicates how it should be used. In HCI, affordances are visual or physical cues that suggest interaction possibilities. For example, a button's raised appearance affords clicking, while a text field affords typing...",
  "role": "assistant",
  "references": ["198134646", "198134642"]
}
```

**RAG (Retrieval-Augmented Generation) Process:**
1. Gets module from database
2. Decrypts user's Canvas session cookie
3. Extracts text from selected files (up to 5 files, 15K chars total)
4. Constructs prompt with:
   - User's question
   - Extracted course material as context
   - Module name for reference
5. Calls Groq AI (model: `llama-3.1-8b-instant`, temp: 0.7)
6. Returns AI response + file references

**Prompt Style:**
- Direct and concise (no introductions)
- Context-aware (uses course materials)
- Specific to selected files

**Requirements:**
- Valid Canvas session cookie
- At least 100 characters extracted from files

**Errors:**
- `400 Bad Request` - No Canvas session cookie
- `400 Bad Request` - Could not extract enough content
- `404 Not Found` - Module not found

---

#### `POST /chat/active-recall/question`
Generate an active recall question.

**Authentication:** Required

**Request Body:**
```json
{
  "module_id": 25,
  "file_urls": [
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263147"
  ]
}
```

**Response:** `200 OK`
```json
{
  "question": "Explain how mental models influence user interface design and provide specific examples from the course materials."
}
```

**Generation Process:**
1. Extracts text from up to 3 selected files
2. Limits context to 10,000 characters
3. AI generates challenging, open-ended question
4. Questions test understanding (not memorization)

**AI Configuration:**
- Model: `llama-3.1-8b-instant`
- Temperature: 0.8 (higher for variety)
- Max tokens: 200

---

#### `POST /chat/active-recall/grade`
Grade a user's answer.

**Authentication:** Required

**Request Body:**
```json
{
  "question": "Explain how mental models influence...",
  "user_answer": "Mental models are what users think about how a system works...",
  "module_id": 25,
  "file_urls": ["..."],
  "difficulty": "balanced"
}
```

**Difficulty Modes:**
- `easy` - Lenient grading, 70%+ for reasonable attempts, partial credit
- `balanced` - Standard grading, 80%+ for solid answers, clear expectations
- `tough` - Strict grading, 90%+ only for excellent, thorough answers

**Response:** `200 OK`
```json
{
  "score": 75,
  "feedback": "Good basic understanding. You correctly identified that mental models are user expectations, but missed how designers can leverage existing models.",
  "correct_answer": "Mental models are users' internal representations of how a system works. Designers should align interfaces with existing mental models and provide feedback that reinforces the correct model...",
  "passed": true
}
```

**Grading Process:**
1. Extracts same files as question generation (for context)
2. Limits context to 10,000 characters
3. AI grades based on:
   - Question asked
   - User's answer
   - Course material context
   - Selected difficulty level
4. Returns JSON with score, feedback, correct answer

**AI Configuration:**
- Model: `llama-3.1-8b-instant`
- Temperature: 0.3 (lower for consistent grading)
- Max tokens: 500

**Pass Threshold:** Score >= 70

---

#### `GET /chat/history/{course_id}`
Get chat message history.

**Authentication:** Required

**Query Parameters:**
- `limit` (int, default: 50)

**Response:**
```json
[
  {
    "id": 1,
    "course_id": "3",
    "role": "user",
    "content": "What is affordance?",
    "created_at": "2025-11-10T15:00:00"
  },
  {
    "id": 2,
    "course_id": "3",
    "role": "assistant",
    "content": "Affordance is...",
    "created_at": "2025-11-10T15:00:05"
  }
]
```

**Ordering:** Newest first (DESC by created_at), then reversed

---

#### `DELETE /chat/history/{course_id}`
Clear all chat messages for a course.

**Authentication:** Required

**Response:** `204 No Content`

---

### Dashboard (`/dashboard`)

#### `GET /dashboard`
Get aggregated dashboard data.

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "due_today": [
    {
      "id": 123,
      "title": "HCI Project Proposal",
      "course_code": "CIS4930",
      "course_name": "Human-Computer Interaction",
      "due_date": "2025-11-10T23:59:00",
      "type": "assignment",
      "priority": "urgent"
    }
  ],
  "study_suggestions": [
    {
      "message": "2 assignments due in 48 hours",
      "action": "review",
      "course_code": null
    }
  ],
  "courses": [
    {
      "id": 1,
      "code": "CIS4930",
      "name": "Human-Computer Interaction",
      "progress": 65.5
    }
  ],
  "upcoming_assignments": [
    {
      "id": 124,
      "title": "Chapter 5 Reading",
      "course_code": "CIS4930",
      "course_name": "Human-Computer Interaction",
      "due_date": "2025-11-12T23:59:00",
      "priority": "high",
      "type": "assignment"
    }
  ],
  "study_streak_days": 5,
  "todays_tasks": [
    {
      "id": 123,
      "title": "HCI Project Proposal",
      "course_code": "CIS4930",
      "due_date": "2025-11-10T23:59:00",
      "priority": "urgent",
      "completed": false
    }
  ]
}
```

**Calculation Logic:**

**Progress:**
- Per course: (completed_assignments / total_assignments) * 100

**Priority (Assignments):**
- `urgent` - Due in ≤ 1 day
- `high` - Due in 2-3 days
- `normal` - Due in > 3 days

**Study Suggestions:**
- Checks assignments due in next 48 hours
- Adds mock flashcard due reminder

**Due Today:**
- Filters assignments where `due_date.date() == today`

**Upcoming Assignments:**
- Assignments with `due_date > now`
- Ordered by due_date ASC
- Limited to 5 items

---

### Study Sessions (`/study-sessions`)

#### `POST /study-sessions`
Log a study session.

**Authentication:** Required

**Request Body:**
```json
{
  "course_id": 3,
  "duration_minutes": 45,
  "activity_type": "flashcards",
  "notes": "Reviewed HCI principles"
}
```

**Activity Types:**
- `flashcards`
- `reading`
- `practice`
- `quiz`
- `general`

**Response:** `201 Created`
```json
{
  "id": 1,
  "user_id": 1,
  "course_id": 3,
  "duration_minutes": 45,
  "session_date": "2025-11-10T15:45:00",
  "activity_type": "flashcards",
  "notes": "Reviewed HCI principles",
  "created_at": "2025-11-10T15:45:00"
}
```

---

#### `GET /study-sessions`
Get study session history.

**Authentication:** Required

**Query Parameters:**
- `course_id` (string, optional)
- `days` (int, optional) - Filter to last N days

**Response:** Array of study session objects

**Ordering:** Newest first (DESC by session_date)

---

#### `GET /study-sessions/stats`
Get study statistics.

**Authentication:** Required

**Query Parameters:**
- `days` (int, default: 30)

**Response:**
```json
{
  "total_minutes": 450,
  "total_sessions": 10,
  "by_course": {
    "3": 180,
    "5": 270
  },
  "by_activity": {
    "flashcards": 200,
    "reading": 150,
    "quiz": 100
  }
}
```

---

#### `DELETE /study-sessions/{session_id}`
Delete a study session.

**Authentication:** Required

**Response:** `204 No Content`

---

### Canvas Integration (`/canvas`)

#### `POST /canvas/auth`
Authenticate with Canvas LMS using API token.

**Authentication:** None required

**Request Body:**
```json
{
  "canvas_url": "https://usflearn.instructure.com",
  "access_token": "1234~abcdefghijklmnopqrstuvwxyz"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "user_id": 1,
  "canvas_user_id": "98765",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Successfully authenticated with Canvas"
}
```

**Process:**
1. Creates CanvasClient with provided credentials
2. Calls Canvas API `/users/self` to verify
3. Extracts user info (ID, name, email)
4. Creates or updates User in database
5. Stores canvas_access_token (TODO: encrypt in production)

**Errors:**
- `401 Unauthorized` - Invalid Canvas credentials

---

#### `POST /canvas/sync`
Sync all Canvas data for a user.

**Authentication:** None required

**Request Body:**
```json
{
  "user_id": 1
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "courses_synced": 5,
  "assignments_synced": 23,
  "last_sync": "2025-11-10T16:00:00",
  "errors": []
}
```

**Sync Process:**
1. Gets user from database
2. Creates CanvasClient with user's access_token
3. Calls CanvasSyncService.sync_all()
   - Syncs courses (creates/updates in DB)
   - For each course, syncs assignments
4. Updates user.last_sync timestamp
5. Returns summary

**Requirements:**
- User must have `canvas_access_token` in database
- Token must be valid

---

#### `POST /canvas/sync/courses/{user_id}`
Sync only courses for a user.

**Authentication:** None required

**Response:**
```json
{
  "success": true,
  "courses_synced": 5
}
```

---

#### `POST /canvas/sync/assignments/{user_id}/{course_id}`
Sync assignments for a specific course.

**Authentication:** None required

**Parameters:**
- `user_id` (int) - User ID
- `course_id` (string) - Canvas course ID

**Response:**
```json
{
  "success": true,
  "assignments_synced": 8
}
```

---

#### `POST /canvas/scrape-courses`
Scrape courses using session cookie (web scraping).

**Authentication:** None required

**Request Body:**
```json
{
  "canvas_url": "https://usflearn.instructure.com",
  "session_cookie": "long_base64_encoded_session_cookie",
  "user_id": 1
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "courses_imported": 5,
  "modules_imported": 47,
  "message": "Successfully imported 5 courses and 47 modules"
}
```

**Scraping Process:**
1. Creates CanvasScraper with session cookie
2. Scrapes `/courses` page for course list
3. Filters to active courses (F25, Fall 2025, etc.)
4. For each course:
   - Scrapes `/courses/{id}/modules` for module list
   - Parses module items (files, pages, etc.)
5. Imports to database:
   - Creates Course records (with user_id)
   - Creates Module records (with items as JSON)
6. Returns count summary

**Filtering Logic:**
Skips courses containing:
- "template", "sandbox", "test", "demo"

---

#### `POST /canvas/validate-session`
Validate a Canvas session cookie without authentication.

**Authentication:** None required

**Request Body:**
```json
{
  "canvas_url": "https://usflearn.instructure.com",
  "session_cookie": "session_cookie_value_to_validate"
}
```

**Response:** `200 OK`
```json
{
  "is_valid": true,
  "message": "Canvas session is valid"
}
```

**Validation Process:**
1. Creates CanvasScraper with provided session cookie
2. Attempts to fetch courses from Canvas
3. If successful and courses found, session is valid
4. Returns validation result with message

**Response Fields:**
- `is_valid`: Boolean indicating if session cookie works
- `message`: Human-readable validation result

**Use Cases:**
- Validate session cookie before signup
- Pre-validate session before updating user's session
- Check if session has expired before making Canvas requests

**Note:** This endpoint does not require authentication and can be used by anyone to validate their Canvas session cookie before providing it to the system
- "avoiding plagiarism", "career readiness"
- Other non-academic keywords

Keeps courses matching:
- F25, F24 (Fall 2025, 2024)
- S25 (Spring 2025)
- "fall 2025", "spring 2025"

---

#### `GET /canvas/user/{user_id}`
Get Canvas sync status for user.

**Authentication:** None required

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "canvas_user_id": "98765",
  "canvas_instance_url": "https://usflearn.instructure.com",
  "last_sync": "2025-11-10T16:00:00",
  "created_at": "2025-11-10T12:00:00"
}
```

---

### Settings (`/settings`)

#### `GET /settings`
Get global application settings.

**Authentication:** Required

**Response:**
```json
{
  "id": 1,
  "theme": "light",
  "notifications_enabled": true,
  "created_at": "2025-11-10T12:00:00"
}
```

**Note:** Creates default settings if none exist

---

#### `PUT /settings`
Update application settings.

**Authentication:** Required

**Request Body:** (all fields optional)
```json
{
  "theme": "dark",
  "notifications_enabled": false
}
```

---

## Database Schema

### Complete Database Structure

```sql
-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    canvas_user_id VARCHAR UNIQUE,
    canvas_instance_url VARCHAR,
    canvas_access_token VARCHAR,
    canvas_session_cookie VARCHAR,  -- Encrypted
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    study_reminders BOOLEAN DEFAULT TRUE,
    deadline_alerts BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT FALSE,
    study_streak_days INTEGER DEFAULT 0,
    last_study_date TIMESTAMP,
    last_sync TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    canvas_id VARCHAR,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    code VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    instructor VARCHAR,
    term VARCHAR,
    progress FLOAT DEFAULT 0.0,
    color VARCHAR NOT NULL DEFAULT '#3B82F6',
    is_active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT uq_canvas_user UNIQUE (canvas_id, user_id)
);

CREATE INDEX idx_courses_canvas_id ON courses(canvas_id);
CREATE INDEX idx_courses_user_id ON courses(user_id);

-- Modules
CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) NOT NULL,
    name VARCHAR NOT NULL,
    position INTEGER DEFAULT 0,
    items JSON,  -- JSONB in PostgreSQL
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_modules_course_id ON modules(course_id);

-- Assignments
CREATE TABLE assignments (
    id INTEGER PRIMARY KEY,  -- Canvas assignment ID
    user_id INTEGER REFERENCES users(id) NOT NULL,
    title VARCHAR NOT NULL,
    course VARCHAR NOT NULL,
    course_id INTEGER REFERENCES courses(id) NOT NULL,
    due_date TIMESTAMP NOT NULL,
    type VARCHAR NOT NULL,
    priority VARCHAR DEFAULT 'medium',
    status VARCHAR DEFAULT 'pending',
    submitted BOOLEAN DEFAULT FALSE,
    description TEXT,
    points INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_assignments_user_id ON assignments(user_id);
CREATE INDEX idx_assignments_course_id ON assignments(course_id);

-- Flashcard Sets
CREATE TABLE flashcard_sets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    course_id INTEGER REFERENCES courses(id) NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Flashcards
CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    set_id INTEGER REFERENCES flashcard_sets(id),
    user_id INTEGER REFERENCES users(id) NOT NULL,
    course_id INTEGER REFERENCES courses(id) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty VARCHAR DEFAULT 'medium',
    last_reviewed TIMESTAMP,
    times_reviewed INTEGER DEFAULT 0,
    mastered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Saved Flashcard Decks
CREATE TABLE saved_flashcard_decks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    course_id INTEGER REFERENCES courses(id),
    name VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Saved Flashcards
CREATE TABLE saved_flashcards (
    id SERIAL PRIMARY KEY,
    deck_id INTEGER REFERENCES saved_flashcard_decks(id) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    FOREIGN KEY (deck_id) REFERENCES saved_flashcard_decks(id) ON DELETE CASCADE
);

-- Quizzes
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    course_id INTEGER REFERENCES courses(id),
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Quiz Questions
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR NOT NULL,
    option_b VARCHAR NOT NULL,
    option_c VARCHAR NOT NULL,
    option_d VARCHAR NOT NULL,
    correct_answer VARCHAR NOT NULL,  -- 'A', 'B', 'C', or 'D'
    "order" INTEGER DEFAULT 0,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Quiz Attempts
CREATE TABLE quiz_attempts (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Quiz Answers
CREATE TABLE quiz_answers (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER REFERENCES quiz_attempts(id) NOT NULL,
    question_id INTEGER REFERENCES quiz_questions(id) NOT NULL,
    user_answer VARCHAR NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE
);

-- Chat Messages
CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    course_id INTEGER REFERENCES courses(id),
    role VARCHAR NOT NULL,  -- 'user' or 'assistant'
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_course_id ON chat_messages(course_id);

-- Study Sessions
CREATE TABLE study_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    course_id INTEGER REFERENCES courses(id) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    session_date TIMESTAMP DEFAULT NOW(),
    activity_type VARCHAR DEFAULT 'general',
    notes VARCHAR,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);

-- User Settings
CREATE TABLE user_settings (
    id SERIAL PRIMARY KEY,
    theme VARCHAR DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Services & Business Logic

### 1. Canvas Client (`canvas_client.py`)

**Purpose:** Interact with Canvas LMS REST API

**Initialization:**
```python
client = CanvasClient(
    base_url="https://canvas.instructure.com",
    access_token="1234~abcdef..."
)
```

**Methods:**

```python
# User Info
async def get_current_user() -> Dict
    """GET /api/v1/users/self"""

# Courses
async def get_courses(enrollment_state="active") -> List[Dict]
    """GET /api/v1/courses?enrollment_state=active&include[]=term"""

async def get_course(course_id: str) -> Dict
    """GET /api/v1/courses/{course_id}"""

# Assignments
async def get_assignments(course_id: str) -> List[Dict]
    """GET /api/v1/courses/{course_id}/assignments"""

async def get_upcoming_assignments() -> List[Dict]
    """GET /api/v1/users/self/upcoming_events"""

# Modules
async def get_modules(course_id: str) -> List[Dict]
    """GET /api/v1/courses/{course_id}/modules?include[]=items"""

async def get_module_items(course_id: str, module_id: str) -> List[Dict]
    """GET /api/v1/courses/{course_id}/modules/{module_id}/items"""

# Files
async def get_course_files(course_id: str) -> List[Dict]
    """GET /api/v1/courses/{course_id}/files"""

async def download_file(file_url: str) -> bytes
    """Download file content"""

# Close connection
async def close()
    """Close HTTP client connection"""
```

**Usage Pattern:**
```python
async with CanvasClient(base_url, token) as client:
    courses = await client.get_courses()
    # ... use courses
# Client auto-closes
```

---

### 2. Canvas Scraper (`canvas_scraper.py`)

**Purpose:** Web scraping Canvas (alternative to API)

**When to Use:**
- User signup with session cookie
- Accessing file content (API doesn't provide)
- Bypassing API rate limits

**Initialization:**
```python
scraper = CanvasScraper(
    base_url="https://canvas.instructure.com",
    session_cookie="B1X7EhGSv9g...",  # From browser
    cookie_name="canvas_session"
)
```

**Methods:**

```python
def get_all_courses() -> Dict[str, str]
    """
    Scrapes /courses page
    Returns: {course_id: course_name}
    """

def filter_active_courses(all_courses: Dict) -> Dict[str, str]
    """
    Filters to current semester courses
    Removes templates, sandboxes, etc.
    """

def get_course_modules(course_id: str) -> List[Dict]
    """
    Scrapes /courses/{id}/modules page
    Returns: [{name, items: [{name, url}]}]
    """

def scrape_all_active_courses() -> List[Dict]
    """
    Complete scrape workflow:
    1. Get all courses
    2. Filter to active
    3. Get modules for each
    Returns: [{id, name, modules: [...]}]
    """
```

**Scraping Strategy:**
- Uses requests.Session with cookie auth
- BeautifulSoup4 for HTML parsing
- Regex for extracting Canvas IDs
- Handles pagination if needed

---

### 3. Canvas Sync Service (`canvas_sync.py`)

**Purpose:** Sync Canvas data to local database

**Initialization:**
```python
sync = CanvasSyncService(
    db=database_session,
    canvas_client=canvas_client,
    user_id=1
)
```

**Methods:**

```python
async def sync_all() -> dict:
    """
    Syncs courses + assignments
    Returns: {
        "courses": 5,
        "assignments": 23,
        "errors": []
    }
    """

async def sync_courses() -> int:
    """
    1. Fetches courses from Canvas API
    2. Creates/updates Course records
    3. Associates with user_id
    Returns: count of synced courses
    """

async def sync_assignments(canvas_course_id: str) -> int:
    """
    1. Fetches assignments from Canvas API
    2. Creates/updates Assignment records
    3. Determines status (pending/overdue/completed)
    4. Calculates priority based on due date
    Returns: count of synced assignments
    """
```

**Data Transformations:**

**Course:**
```python
canvas_course = {
    "id": "1234567",
    "name": "CIS4930.004F25 HCI",
    "course_code": "CIS4930",
    "term": {"name": "Fall 2025"}
}
↓
db_course = {
    "canvas_id": "1234567",
    "user_id": 1,
    "code": "CIS4930",
    "name": "CIS4930.004F25 HCI",
    "instructor": "Unknown Instructor",  # From Canvas teachers field
    "term": "Fall 2025",
    "progress": 0.0,
    "color": "#3B82F6"  # Auto-assigned
}
```

**Assignment:**
```python
canvas_assignment = {
    "id": "98765",
    "name": "Project Proposal",
    "due_at": "2025-11-15T23:59:00Z",
    "submission_types": ["online_upload"],
    "points_possible": 100
}
↓
db_assignment = {
    "id": "98765",
    "user_id": 1,
    "title": "Project Proposal",
    "course": "CIS4930",
    "course_id": 3,
    "due_date": datetime(2025, 11, 15, 23, 59),
    "type": "Assignment",
    "priority": "high",  # Calculated from due_date
    "status": "pending",
    "points": 100
}
```

---

### 4. Flashcard Generator (`flashcard_generator.py`)

**Purpose:** AI content generation and PDF processing

**Functions:**

```python
def extract_text_from_url(
    url: str,
    session_cookie: str,
    canvas_url: str
) -> str:
    """
    Extract text from Canvas module item.
    
    Process:
    1. Fetch page HTML with session cookie
    2. Parse for file download link
    3. Download file
    4. If PDF: Extract text with PyPDF2
    5. If HTML page: Extract text from <div class="user_content">
    6. Return cleaned text
    
    Returns: Extracted text (string)
    """
    
def generate_flashcards_with_groq(
    content: str,
    module_name: str,
    num_cards: int = 15
) -> List[Dict]:
    """
    Generate flashcards using Groq AI.
    
    Prompt Structure:
    - Role: Expert educator
    - Task: Create {num_cards} flashcards
    - Format: JSON array
    - Content: Provided text
    
    Returns: [
        {
            "question": "...",
            "answer": "...",
            "difficulty": "easy|medium|hard"
        }
    ]
    
    Model: llama-3.1-8b-instant
    Temperature: 0.7
    Max tokens: 2000
    """

def generate_quiz_with_groq(
    content: str,
    module_name: str,
    num_questions: int = 10
) -> List[Dict]:
    """
    Generate multiple choice quiz.
    
    Returns: [
        {
            "question": "...",
            "options": ["A", "B", "C", "D"],
            "correct_answer": "B",
            "explanation": "..."
        }
    ]
    
    Model: llama-3.1-8b-instant
    Temperature: 0.7
    Max tokens: 2500
    """

def generate_chat_response_with_groq(
    question: str,
    context: str,
    module_name: str
) -> str:
    """
    Generate RAG chat response.
    
    Prompt Style: Direct, no-nonsense
    Context limit: 15,000 characters
    
    Returns: Direct answer string
    
    Model: llama-3.1-8b-instant
    Temperature: 0.7
    Max tokens: 1000
    """

def generate_active_recall_question_with_groq(
    context: str,
    module_name: str
) -> str:
    """
    Generate challenging question.
    
    Characteristics:
    - Tests understanding, not memorization
    - Requires explanation/analysis
    - Specific to provided material
    - Open-ended
    
    Model: llama-3.1-8b-instant
    Temperature: 0.8  # Higher for variety
    Max tokens: 200
    """

def grade_active_recall_answer_with_groq(
    question: str,
    user_answer: str,
    context: str,
    difficulty: str
) -> Dict:
    """
    Grade user's answer.
    
    Difficulty levels:
    - easy: 70%+ for reasonable attempts
    - balanced: 80%+ for solid answers
    - tough: 90%+ for excellent answers
    
    Returns: {
        "score": 0-100,
        "feedback": "...",
        "correct_answer": "...",
        "passed": true|false
    }
    
    Model: llama-3.1-8b-instant
    Temperature: 0.3  # Lower for consistency
    Max tokens: 500
    """
```

---

### 5. Encryption Service (`encryption.py`)

**Purpose:** Encrypt/decrypt sensitive data

```python
from cryptography.fernet import Fernet
import base64

# Generate key from SECRET_KEY
key = base64.urlsafe_b64encode(
    settings.SECRET_KEY.encode()[:32].ljust(32, b'0')
)
cipher = Fernet(key)

def encrypt_data(data: str) -> str:
    """Encrypt string, return base64 string"""
    encrypted = cipher.encrypt(data.encode())
    return encrypted.decode()

def decrypt_data(encrypted_data: str) -> str:
    """Decrypt base64 string, return original string"""
    decrypted = cipher.decrypt(encrypted_data.encode())
    return decrypted.decode()
```

**Used For:**
- Canvas session cookies storage
- Future: Canvas API tokens, sensitive user data

---

## Environment Configuration

### `.env` File Structure

```bash
# Canvas Configuration
CANVAS_INSTANCE_URL=https://usflearn.instructure.com
CANVAS_SESSION_COOKIE=optional_fallback_cookie

# AI API
GROQ_API_KEY=gsk_your_groq_api_key_here

# Database
DATABASE_URL=postgresql://canvas_user:canvas_password@postgres:5432/canvas_ext

# Security
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# CORS
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

---

### Docker Configuration

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: canvas_ext_db
    environment:
      POSTGRES_USER: canvas_user
      POSTGRES_PASSWORD: canvas_password
      POSTGRES_DB: canvas_ext
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U canvas_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: .
    container_name: canvas_ext_backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./app:/app/app

volumes:
  postgres_data:
```

**Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

---

## Request/Response Examples

### Complete Flow: Generate Flashcards

**Step 1: Login**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "student@usf.edu",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHVkZW50QHVzZi5lZHUiLCJleHAiOjE3MDIzMTI4MDB9.xyz...",
  "token_type": "bearer",
  "user": { ... }
}
```

---

**Step 2: Get Courses**
```http
GET /api/v1/courses?active_only=true
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
[
  {
    "id": 3,
    "canvas_id": "1994124",
    "code": "CIS4930",
    "name": "CIS4930.004F25.92007 Human-Computer Interaction",
    "instructor": "Dr. Julia Woodward",
    "term": "Fall 2025",
    "progress": 65.0,
    "color": "#3B82F6",
    "is_active": 1
  }
]
```

---

**Step 3: Get Modules**
```http
GET /api/v1/modules/course/3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
[
  {
    "id": 25,
    "course_id": 3,
    "name": "Week 1: Welcome to HCI",
    "position": 0,
    "items": [
      {
        "title": "03 - HCI Project Overview.pdf",
        "type": "File",
        "url": "https://usflearn.instructure.com/courses/1994124/modules/items/42263147"
      },
      {
        "title": "02 - Introduction to HCI.pdf",
        "type": "File",
        "url": "https://usflearn.instructure.com/courses/1994124/modules/items/42263149"
      }
    ]
  }
]
```

---

**Step 4: Generate Flashcards**
```http
POST /api/v1/flashcards/generate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "module_id": 25,
  "num_cards": 15,
  "file_urls": [
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263147",
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263149"
  ]
}
```

**Backend Processing (logs):**
```
=== Generating flashcards for module: Week 1: Welcome to HCI ===
Module has 2 items
Using 2 user-selected files
Processing selected file: 03 - HCI Project Overview.pdf
  Fetching: https://usflearn.instructure.com/courses/1994124/modules/items/42263147
  Found file link: https://usflearn.instructure.com/courses/1994124/files/198134646/download
  PDF found! Size: 1049191 bytes
  Total extracted: 6826 characters from 22 pages
  ✓ Extracted 6826 characters
Processing selected file: 02 - Introduction to HCI.pdf
  Total extracted: 9388 characters from 37 pages
  ✓ Extracted 9388 characters
Total text: 16214 characters from 2 items
Sending to Groq for flashcard generation...
Generated 15 flashcards
```

**Response:**
```json
{
  "flashcards": [
    {
      "question": "What is the primary goal of Human-Computer Interaction (HCI)?",
      "answer": "The primary goal of HCI is to design interactive systems that are effective, efficient, and satisfying for users by understanding how people interact with technology.",
      "difficulty": "medium"
    },
    {
      "question": "Define affordance in the context of interface design",
      "answer": "Affordance is a property of an object that indicates how it should be used. In interface design, affordances are visual or physical cues that suggest possible actions, making interfaces more intuitive.",
      "difficulty": "medium"
    }
    // ... 13 more
  ],
  "module_name": "Week 1: Welcome to HCI",
  "count": 15
}
```

---

### Complete Flow: AI Tutor Chat

**Step 1-3:** Same as above (login, get courses, get modules)

**Step 4: Send Chat Message**
```http
POST /api/v1/chat
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "module_id": 25,
  "message": "What are the key principles of user-centered design?",
  "file_urls": [
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263147"
  ]
}
```

**Backend Processing:**
```
=== AI Tutor Chat Request ===
Module ID: 25
User Message: What are the key principles of user-centered design?
Selected Files: 1

Extracting text from 1 files for RAG context...
  Processing: https://usflearn.instructure.com/courses/1994124/modules/items/42263147...
  PDF found! Size: 1049191 bytes
  ✓ Extracted 6826 characters

Generating AI response with 6826 characters of context...
✓ AI response generated successfully
```

**Response:**
```json
{
  "message": "User-centered design focuses on three key principles:\n\n1. Early focus on users and tasks - Understanding who will use the system and what they need to accomplish\n\n2. Empirical measurement - Testing designs with real users and measuring performance\n\n3. Iterative design - Repeatedly refining the design based on user feedback\n\nThe course materials emphasize that UCD puts user needs at the center of the design process, involving users throughout development rather than just at the end.",
  "role": "assistant",
  "references": ["198134646"]
}
```

---

### Complete Flow: Active Recall

**Step 1: Generate Question**
```http
POST /api/v1/chat/active-recall/question
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "module_id": 25,
  "file_urls": [
    "https://usflearn.instructure.com/courses/1994124/modules/items/42263147"
  ]
}
```

**Response:**
```json
{
  "question": "Explain the difference between affordances and signifiers in interface design, providing concrete examples from physical and digital interfaces."
}
```

---

**Step 2: Submit Answer for Grading**
```http
POST /api/v1/chat/active-recall/grade
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "question": "Explain the difference between affordances and signifiers...",
  "user_answer": "Affordances are what you can do with an object, like a button can be clicked. Signifiers are visual cues that show you what to do, like making a button look raised so you know to click it.",
  "module_id": 25,
  "file_urls": ["..."],
  "difficulty": "balanced"
}
```

**Response:**
```json
{
  "score": 85,
  "feedback": "Strong answer. You correctly distinguished affordances (action possibilities) from signifiers (perceptual cues). Good use of the button example. Could improve by noting that affordances exist regardless of visibility, while signifiers communicate affordances to users.",
  "correct_answer": "Affordances are the action possibilities an object offers, which exist independent of perception (e.g., a door handle affords pulling even if hidden). Signifiers are perceptual cues that communicate these affordances to users (e.g., a 'Pull' sign, handle shape). Physical example: A door handle (affordance) with directional texture (signifier). Digital example: A clickable button (affordance) with hover effects and shadows (signifiers).",
  "passed": true
}
```

---

## Error Handling

### Standard Error Response

```json
{
  "detail": "Error message describing what went wrong"
}
```

### HTTP Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 204 | No Content | Successful deletion |
| 400 | Bad Request | Invalid input, validation failed |
| 401 | Unauthorized | Missing/invalid token, wrong password |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server error, AI API failure |

### Common Error Scenarios

**Authentication Failures:**
```json
// Invalid credentials
{
  "detail": "Incorrect email or password"
}

// Missing token
{
  "detail": "Could not validate credentials"
}

// Expired token
{
  "detail": "Could not validate credentials"
}
```

**Canvas Integration Errors:**
```json
// Session cookie expired
{
  "detail": "No Canvas session cookie available. Please re-authenticate with Canvas."
}

// Cannot access files
{
  "detail": "Could not extract enough content from files to generate flashcards"
}

// Invalid Canvas credentials
{
  "detail": "Invalid Canvas credentials: HTTP 401"
}
```

**AI Generation Errors:**
```json
// API rate limit
{
  "detail": "Chat response generation failed: Error code: 429 - Rate limit exceeded"
}

// Invalid model
{
  "detail": "Chat response generation failed: Error code: 400 - Model decommissioned"
}

// Insufficient content
{
  "detail": "Not enough content found in module 'Week 1'. Try a module with PDF files."
}
```

**Database Errors:**
```json
// Duplicate entry
{
  "detail": "Email already registered"
}

// Foreign key violation
{
  "detail": "Course not found"
}

// Not found
{
  "detail": "Module not found"
}
```

---

## Deployment Guide

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/your-org/HCI-CanvasExt.git
cd HCI-CanvasExt

# 2. Setup backend
cd backend
cp config.env.template .env
# Edit .env with your credentials

# 3. Start with Docker
docker-compose up -d --build

# 4. Check logs
docker logs canvas_ext_backend -f

# 5. Setup frontend
cd ../frontendv2
npm install
npm run dev

# 6. Access
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

---

### Production Deployment

**Security Checklist:**
- [ ] Generate secure SECRET_KEY: `openssl rand -hex 32`
- [ ] Update CORS_ORIGINS to production domain
- [ ] Use strong database password
- [ ] Enable HTTPS/SSL
- [ ] Encrypt Canvas API tokens
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Set up monitoring/logging

**docker-compose.prod.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: canvas_ext
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    restart: always
    # No port exposure (internal only)

  backend:
    build: .
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
    env_file:
      - .env.production
    depends_on:
      - postgres
    restart: always
    # Use nginx/traefik as reverse proxy
```

**Nginx Reverse Proxy:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

### Database Management

**Backup:**
```bash
# Backup database
docker exec canvas_ext_db pg_dump -U canvas_user canvas_ext > backup_$(date +%Y%m%d).sql

# Restore database
docker exec -i canvas_ext_db psql -U canvas_user canvas_ext < backup_20251110.sql
```

**Migrations:**
```bash
# If you modify models, you need to migrate the database
# Currently no automated migrations (Alembic not set up)
# Manual SQL migrations required

# Example: Add column
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext
ALTER TABLE courses ADD COLUMN new_field VARCHAR;
```

---

## Testing

### API Testing with curl

**Signup:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Courses (with token):**
```bash
TOKEN="your_jwt_token_here"

curl http://localhost:8000/api/v1/courses \
  -H "Authorization: Bearer $TOKEN"
```

**Generate Flashcards:**
```bash
curl -X POST http://localhost:8000/api/v1/flashcards/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "module_id": 25,
    "num_cards": 10,
    "file_urls": ["https://..."]
  }'
```

---

### Testing with Python

```python
import requests

BASE_URL = "http://localhost:8000/api/v1"

# Login
response = requests.post(f"{BASE_URL}/auth/login", json={
    "email": "test@example.com",
    "password": "password123"
})
token = response.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# Get courses
courses = requests.get(f"{BASE_URL}/courses", headers=headers).json()
print(f"Found {len(courses)} courses")

# Generate flashcards
result = requests.post(
    f"{BASE_URL}/flashcards/generate",
    headers=headers,
    json={
        "module_id": 25,
        "num_cards": 10,
        "file_urls": ["https://..."]
    }
).json()
print(f"Generated {result['count']} flashcards")
```

---

## Frontend Integration Guide

### API Client Implementation

See `frontendv2/src/lib/api.ts` for complete implementation.

**Key Exports:**
- `authAPI` - Authentication methods
- `coursesAPI` - Course management
- `modulesAPI` - Module access
- `flashcardsAPI` - Flashcard generation
- `chatAPI` - AI tutor and active recall
- `tokenManager` - JWT token management

**Usage Example:**
```typescript
import { authAPI, coursesAPI, flashcardsAPI, tokenManager } from './lib/api';

// Login
const { access_token, user } = await authAPI.login({
  email: 'user@example.com',
  password: 'password'
});
tokenManager.setToken(access_token);
tokenManager.setUser(user);

// Get courses
const courses = await coursesAPI.getCourses(true);

// Generate flashcards
const result = await flashcardsAPI.generateFromModule(
  moduleId,
  15,
  ['file_url_1', 'file_url_2']
);
```

---

## Rate Limits & Quotas

### Groq API (Free Tier)
- **Requests:** 30 per minute
- **Tokens:** Varies by model
- **Daily limit:** No hard limit on free tier

**Recommended Practices:**
- Cache generated flashcards
- Batch requests when possible
- Handle 429 errors gracefully
- Consider paid tier for production

### Canvas API
- **Rate Limit:** Typically 3000 requests/hour per token
- **Best Practices:**
  - Use pagination efficiently
  - Cache course data
  - Sync on schedule, not on-demand

---

## Appendix

### Getting Canvas Session Cookie

**Chrome/Edge:**
1. Login to Canvas
2. Press F12 (DevTools)
3. Application tab → Cookies
4. Find `canvas_session`
5. Copy value

**Firefox:**
1. Login to Canvas
2. Press F12
3. Storage tab → Cookies
4. Find `canvas_session`
5. Copy value

**Format:** Long base64-encoded string (~500+ characters)

---

### Getting Canvas API Token

**Method 1: Account Settings**
1. Login to Canvas
2. Account → Settings
3. "+ New Access Token"
4. Copy token (format: `1234~abcdef...`)

**Method 2: Admin (if available)**
1. Canvas admin panel
2. Generate token for user

**Note:** Session cookies expire faster than API tokens

---

### Groq API Setup

1. Visit https://console.groq.com/keys
2. Sign up (free)
3. Create new API key
4. Copy key (format: `gsk_...`)
5. Add to `.env` as `GROQ_API_KEY`

**Free Tier Limits:**
- 30 requests/minute
- Sufficient for development/testing

---

## Support & Troubleshooting

### Common Issues

**Issue: "No Canvas session cookie available"**
- **Cause:** User account missing canvas_session_cookie
- **Solution:** Re-signup with session cookie OR update user in database

**Issue: "Failed to generate flashcards"**
- **Cause:** Files not PDFs, cookie expired, or API limit
- **Solution:** Check file types, refresh cookie, wait for rate limit reset

**Issue: "Courses not showing"**
- **Cause:** User ID mismatch, no courses synced
- **Solution:** Verify courses in DB have correct user_id

**Issue: "Module has no attribute 'groq'"**
- **Cause:** groq library not installed
- **Solution:** Add to requirements.txt, rebuild Docker

---

### Database Queries for Debugging

```sql
-- Check users
SELECT id, email, canvas_user_id, 
       canvas_session_cookie IS NOT NULL as has_cookie
FROM users;

-- Check courses per user
SELECT u.email, COUNT(c.id) as course_count
FROM users u
LEFT JOIN courses c ON c.user_id = u.id
GROUP BY u.id, u.email;

-- Check modules per course
SELECT c.name as course, COUNT(m.id) as module_count
FROM courses c
LEFT JOIN modules m ON m.course_id = c.id
GROUP BY c.id, c.name;

-- Check recent flashcard generations
SELECT f.created_at, f.question, u.email
FROM flashcards f
JOIN users u ON u.id = f.user_id
ORDER BY f.created_at DESC
LIMIT 10;
```

---

### Useful Docker Commands

```bash
# View logs
docker logs canvas_ext_backend -f
docker logs canvas_ext_db

# Restart services
docker-compose restart backend
docker-compose restart postgres

# Rebuild after code changes
docker-compose up -d --build

# Execute commands in container
docker exec canvas_ext_backend python -c "from app.db.database import SessionLocal; print('DB connected')"

# Access database
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext

# Stop all services
docker-compose down

# Remove volumes (reset database)
docker-compose down -v
```

---

## Glossary

**Canvas LMS:** Learning Management System used by universities  
**RAG:** Retrieval-Augmented Generation - AI using external knowledge  
**JWT:** JSON Web Token - authentication token format  
**Groq:** AI inference platform (alternative to OpenAI)  
**Fernet:** Symmetric encryption (part of cryptography library)  
**Active Recall:** Learning technique of self-testing  
**Affordance:** Property indicating how an object should be used  
**Session Cookie:** Browser cookie for maintaining logged-in state  
**API Token:** Long-lived access token for Canvas API  

---

**End of Documentation**

For questions or issues, check logs and troubleshooting section, or open an issue on GitHub.

*This documentation reflects the actual implementation as of November 10, 2025*
