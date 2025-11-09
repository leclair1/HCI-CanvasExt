# Backend Updates for Frontend V2

This document outlines all the backend changes made to support Frontend V2.

## Overview

The backend has been significantly updated to match the requirements of Frontend V2, including authentication, user profiles, quizzes, saved flashcard decks, and dashboard data.

## Database Schema Changes

### Updated Models

#### 1. User Model (`app/models/user.py`)
**Changes:**
- Added `first_name` and `last_name` fields (replacing single `name` field)
- Added `password_hash` for authentication
- Added notification settings:
  - `email_notifications`
  - `push_notifications`
  - `study_reminders`
  - `deadline_alerts`
- Added `dark_mode` for appearance settings
- Added `study_streak_days` and `last_study_date` for tracking
- Made Canvas fields optional (nullable)

#### 2. Course Model (`app/models/course.py`)
**Changes:**
- Changed `id` from String to Integer (auto-increment)
- Added `user_id` foreign key
- Made `instructor` and `term` optional
- Added `created_at` and `updated_at` timestamps

#### 3. Assignment Model (`app/models/assignment.py`)
**Changes:**
- Changed `id` from String to Integer (auto-increment)
- Added `user_id` foreign key
- Changed `course_id` from String to Integer
- Changed `due_date` from String to DateTime
- Added `submitted` boolean field
- Added `updated_at` timestamp

### New Models

#### 4. Quiz Models (`app/models/quiz.py`)
- **Quiz**: Main quiz container
  - `id`, `user_id`, `course_id`
  - `title`, `description`
  - Relationships to questions and attempts

- **QuizQuestion**: Individual quiz questions
  - `id`, `quiz_id`
  - `question_text`, `option_a`, `option_b`, `option_c`, `option_d`
  - `correct_answer`, `order`

- **QuizAttempt**: Record of quiz attempts
  - `id`, `quiz_id`, `user_id`
  - `score`, `total_questions`
  - `started_at`, `completed_at`

- **QuizAnswer**: Individual answers in an attempt
  - `id`, `attempt_id`, `question_id`
  - `user_answer`, `is_correct`

#### 5. Saved Deck Models (`app/models/saved_deck.py`)
- **SavedFlashcardDeck**: Container for saved flashcard decks
  - `id`, `user_id`, `course_id`
  - `name`, `description`
  - Relationship to cards

- **SavedFlashcard**: Individual flashcards in a deck
  - `id`, `deck_id`
  - `question`, `answer`, `order`

## New API Endpoints

### Authentication (`/api/v1/auth`)

#### POST `/auth/signup`
Register a new user
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "student@university.edu",
  "password": "password123",
  "canvas_api_key": "optional_api_key",
  "canvas_instance_url": "https://canvas.instructure.com"
}
```
**Response:** Token and user data

#### POST `/auth/login`
Login user
```json
{
  "email": "student@university.edu",
  "password": "password123"
}
```
**Response:** Token and user data

#### POST `/auth/logout`
Logout user (requires authentication)

#### GET `/auth/me`
Get current user information (requires authentication)

### Profile (`/api/v1/profile`)

#### GET `/profile/`
Get user profile (requires authentication)

#### PUT `/profile/`
Update user profile
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "canvas_api_key": "new_api_key"
}
```

#### PUT `/profile/notifications`
Update notification settings
```json
{
  "email_notifications": true,
  "push_notifications": true,
  "study_reminders": true,
  "deadline_alerts": true
}
```

#### PUT `/profile/appearance`
Update appearance settings
```json
{
  "dark_mode": true
}
```

#### POST `/profile/change-password`
Change user password
```json
{
  "current_password": "old_password",
  "new_password": "new_password"
}
```

### Dashboard (`/api/v1/dashboard`)

#### GET `/dashboard/`
Get complete dashboard data including:
- Due today items
- Study suggestions
- Courses with progress
- Upcoming assignments
- Study streak
- Today's tasks

### Quizzes (`/api/v1/quizzes`)

#### POST `/quizzes/`
Create a new quiz
```json
{
  "title": "Practice Quiz",
  "description": "Test your knowledge",
  "course_id": 1,
  "questions": [
    {
      "question_text": "What is 2+2?",
      "option_a": "3",
      "option_b": "4",
      "option_c": "5",
      "option_d": "6",
      "correct_answer": "B"
    }
  ]
}
```

#### GET `/quizzes/`
List all quizzes for current user
- Optional query param: `course_id`

#### GET `/quizzes/{quiz_id}`
Get a specific quiz (without answers)

#### POST `/quizzes/submit`
Submit quiz answers and get results
```json
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

#### POST `/quizzes/generate`
Generate a new quiz with AI (mock implementation)
```json
{
  "course_id": 1,
  "num_questions": 5,
  "topics": ["arrays", "loops"]
}
```

#### DELETE `/quizzes/{quiz_id}`
Delete a quiz

### Saved Decks (`/api/v1/saved-decks`)

#### POST `/saved-decks/`
Create a saved flashcard deck
```json
{
  "name": "CS 101 Study Deck",
  "description": "Important concepts",
  "course_id": 1,
  "cards": [
    {
      "question": "What is a variable?",
      "answer": "A container for storing data",
      "order": 0
    }
  ]
}
```

#### GET `/saved-decks/`
List all saved decks for current user
- Optional query param: `course_id`

#### GET `/saved-decks/{deck_id}`
Get a specific saved deck with all cards

#### DELETE `/saved-decks/{deck_id}`
Delete a saved deck

## Authentication

All endpoints (except `/auth/signup` and `/auth/login`) require authentication using JWT Bearer tokens.

Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Dependencies Added

Updated `requirements.txt` with:
- `python-jose[cryptography]==3.3.0` - JWT token handling
- `passlib[bcrypt]==1.7.4` - Password hashing

## Configuration

The `SECRET_KEY` in `app/core/config.py` is used for JWT token generation. Make sure to change it in production!

## Migration Notes

**⚠️ IMPORTANT: Database Migration Required**

The database schema has changed significantly. You'll need to:

1. **Option 1 - Fresh Start (Recommended for Development):**
   ```bash
   # Delete the existing database
   rm canvas_ext.db
   
   # Restart the application - it will create a new database with updated schema
   python -m uvicorn app.main:app --reload
   ```

2. **Option 2 - Migration (For Production):**
   - Use Alembic or another migration tool to migrate existing data
   - Create migration scripts for each model change

## Testing the Updates

1. Install new dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

3. Access API documentation:
   - Swagger UI: http://localhost:8000/api/docs
   - ReDoc: http://localhost:8000/api/redoc

4. Test authentication flow:
   - Sign up: POST `/api/v1/auth/signup`
   - Login: POST `/api/v1/auth/login`
   - Get profile: GET `/api/v1/profile/` (with token)

## API Response Examples

### Signup/Login Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "student@university.edu",
    "study_streak_days": 0,
    "dark_mode": false,
    "email_notifications": true,
    "push_notifications": true,
    "study_reminders": true,
    "deadline_alerts": true,
    "created_at": "2023-10-01T12:00:00"
  }
}
```

### Dashboard Response
```json
{
  "due_today": [...],
  "study_suggestions": [...],
  "courses": [...],
  "upcoming_assignments": [...],
  "study_streak_days": 12,
  "todays_tasks": [...]
}
```

## Frontend Integration Notes

Frontend V2 should:
1. Store the JWT token after login/signup (localStorage or secure storage)
2. Include the token in all API requests
3. Handle 401 Unauthorized responses (redirect to login)
4. Use the provided endpoints for all user interactions

## Future Enhancements

Potential improvements:
- Add email verification
- Implement password reset flow
- Add OAuth providers (Google, Microsoft)
- Enhance AI quiz generation with real AI integration
- Add more dashboard customization options
- Implement real-time notifications using WebSockets

