# Changelog - Frontend V2 Backend Updates

## Summary

The backend has been completely updated to support Frontend V2 with authentication, user management, quizzes, saved decks, and dashboard functionality.

## Major Changes

### 🔐 Authentication System (NEW)
- **JWT-based authentication** using `python-jose`
- **Password hashing** with bcrypt
- **User registration and login** endpoints
- **Protected routes** requiring authentication
- **Token-based API access** with 30-day expiration

**Files Added:**
- `app/api/v1/auth.py` - Authentication endpoints
- `app/schemas/auth.py` - Auth request/response schemas

### 👤 User Profile Management (NEW)
- **Profile CRUD operations**
- **Notification settings** (email, push, reminders, alerts)
- **Appearance settings** (dark mode)
- **Password change** functionality
- **Study streak tracking**

**Files Added:**
- `app/api/v1/profile.py` - Profile management endpoints

### 📝 Quiz System (NEW)
- **Create custom quizzes** with multiple choice questions
- **Take quizzes** with instant grading
- **Quiz attempts** tracking and history
- **AI quiz generation** (mock implementation ready for real AI)
- **Answer validation** and scoring

**Files Added:**
- `app/models/quiz.py` - Quiz, QuizQuestion, QuizAttempt, QuizAnswer models
- `app/api/v1/quizzes.py` - Quiz management endpoints
- `app/schemas/quiz.py` - Quiz schemas

### 🗂️ Saved Flashcard Decks (NEW)
- **Save flashcard collections** for later study
- **Organize by course**
- **Track creation dates**
- **CRUD operations** for decks

**Files Added:**
- `app/models/saved_deck.py` - SavedFlashcardDeck, SavedFlashcard models
- `app/api/v1/saved_decks.py` - Saved deck endpoints
- `app/schemas/saved_deck.py` - Saved deck schemas

### 📊 Dashboard (NEW)
- **Due today items** across all courses
- **Study suggestions** based on deadlines
- **Course progress** tracking
- **Upcoming assignments** with priorities
- **Study streak** display
- **Today's tasks** aggregation

**Files Added:**
- `app/api/v1/dashboard.py` - Dashboard data endpoint

## Model Changes

### Updated Models

#### User Model (`app/models/user.py`)
**Breaking Changes:**
- `name` → Split into `first_name` and `last_name`
- Added `password_hash` (required)
- Made Canvas fields optional (`canvas_user_id`, `canvas_instance_url`, `canvas_access_token`)

**New Fields:**
- `email_notifications` (Boolean, default: True)
- `push_notifications` (Boolean, default: True)
- `study_reminders` (Boolean, default: True)
- `deadline_alerts` (Boolean, default: True)
- `dark_mode` (Boolean, default: False)
- `study_streak_days` (Integer, default: 0)
- `last_study_date` (DateTime, nullable)

#### Course Model (`app/models/course.py`)
**Breaking Changes:**
- `id`: String → Integer (auto-increment)
- Added `user_id` (Foreign Key, required)

**Changes:**
- Made `instructor` optional
- Made `term` optional
- Added `created_at` timestamp
- Added `updated_at` timestamp

#### Assignment Model (`app/models/assignment.py`)
**Breaking Changes:**
- `id`: String → Integer (auto-increment)
- `due_date`: String → DateTime
- `course_id`: String → Integer
- Added `user_id` (Foreign Key, required)

**New Fields:**
- `submitted` (Boolean, default: False)
- `updated_at` timestamp

### New Models

#### Quiz Models (`app/models/quiz.py`)
- `Quiz` - Main quiz container
- `QuizQuestion` - Multiple choice questions
- `QuizAttempt` - Student quiz attempts
- `QuizAnswer` - Individual question answers

#### Saved Deck Models (`app/models/saved_deck.py`)
- `SavedFlashcardDeck` - Flashcard deck container
- `SavedFlashcard` - Individual flashcards

## API Changes

### New Endpoints

#### Authentication (`/api/v1/auth/`)
- `POST /signup` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user info

#### Profile (`/api/v1/profile/`)
- `GET /` - Get profile
- `PUT /` - Update profile
- `PUT /notifications` - Update notification settings
- `PUT /appearance` - Update appearance settings
- `POST /change-password` - Change password

#### Dashboard (`/api/v1/dashboard/`)
- `GET /` - Get all dashboard data

#### Quizzes (`/api/v1/quizzes/`)
- `POST /` - Create quiz
- `GET /` - List quizzes
- `GET /{quiz_id}` - Get quiz
- `POST /submit` - Submit quiz answers
- `POST /generate` - Generate quiz with AI
- `DELETE /{quiz_id}` - Delete quiz

#### Saved Decks (`/api/v1/saved-decks/`)
- `POST /` - Create saved deck
- `GET /` - List saved decks
- `GET /{deck_id}` - Get saved deck
- `DELETE /{deck_id}` - Delete saved deck

### Updated Endpoints

Most existing endpoints now require authentication via JWT token.

## Configuration Changes

### Dependencies Added (`requirements.txt`)
```
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
```

### Environment Variables
No new required variables, but the following are now used:
- `SECRET_KEY` - For JWT token generation (already existed)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration (already existed)

## File Structure Changes

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py          # NEW
│   │       ├── profile.py       # NEW
│   │       ├── dashboard.py     # NEW
│   │       ├── quizzes.py       # NEW
│   │       ├── saved_decks.py   # NEW
│   │       └── ...
│   ├── models/
│   │   ├── user.py              # UPDATED
│   │   ├── course.py            # UPDATED
│   │   ├── assignment.py        # UPDATED
│   │   ├── quiz.py              # NEW
│   │   ├── saved_deck.py        # NEW
│   │   └── ...
│   └── schemas/
│       ├── auth.py              # NEW
│       ├── quiz.py              # NEW
│       ├── saved_deck.py        # NEW
│       └── ...
├── FRONTEND_V2_UPDATES.md       # NEW
├── API_REFERENCE_V2.md          # NEW
├── SETUP_GUIDE_V2.md            # NEW
├── CHANGELOG_V2.md              # NEW (this file)
└── ...
```

## Migration Guide

### For Development (Recommended)

```bash
# 1. Pull latest code
git pull

# 2. Install new dependencies
pip install -r requirements.txt

# 3. Delete old database
rm canvas_ext.db

# 4. Restart server (creates new schema)
uvicorn app.main:app --reload
```

### For Production

1. **Backup your database** before migration
2. **Install new dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Add new columns to User table:**
   ```sql
   ALTER TABLE users ADD COLUMN first_name VARCHAR;
   ALTER TABLE users ADD COLUMN last_name VARCHAR;
   ALTER TABLE users ADD COLUMN password_hash VARCHAR NOT NULL DEFAULT '';
   ALTER TABLE users ADD COLUMN email_notifications BOOLEAN DEFAULT TRUE;
   ALTER TABLE users ADD COLUMN push_notifications BOOLEAN DEFAULT TRUE;
   ALTER TABLE users ADD COLUMN study_reminders BOOLEAN DEFAULT TRUE;
   ALTER TABLE users ADD COLUMN deadline_alerts BOOLEAN DEFAULT TRUE;
   ALTER TABLE users ADD COLUMN dark_mode BOOLEAN DEFAULT FALSE;
   ALTER TABLE users ADD COLUMN study_streak_days INTEGER DEFAULT 0;
   ALTER TABLE users ADD COLUMN last_study_date TIMESTAMP;
   
   -- Make Canvas fields nullable
   ALTER TABLE users ALTER COLUMN canvas_user_id DROP NOT NULL;
   ALTER TABLE users ALTER COLUMN canvas_instance_url DROP NOT NULL;
   ALTER TABLE users ALTER COLUMN canvas_access_token DROP NOT NULL;
   ```

4. **Create new tables:**
   ```sql
   -- Quiz tables
   CREATE TABLE quizzes (...);
   CREATE TABLE quiz_questions (...);
   CREATE TABLE quiz_attempts (...);
   CREATE TABLE quiz_answers (...);
   
   -- Saved deck tables
   CREATE TABLE saved_flashcard_decks (...);
   CREATE TABLE saved_flashcards (...);
   ```
   
   See model files for exact schemas.

5. **Restart your application**

## Breaking Changes

⚠️ **Important:** These changes require frontend updates

1. **Authentication Required**
   - Most endpoints now require JWT token
   - Frontend must implement login/signup flow
   - Store and send token with each request

2. **User Model Changes**
   - `name` field removed
   - Must use `first_name` and `last_name` instead
   - New user registration requires password

3. **ID Type Changes**
   - Course IDs: String → Integer
   - Assignment IDs: String → Integer
   - May affect existing API calls

4. **DateTime Changes**
   - Assignment `due_date`: String → DateTime ISO format
   - Frontend should format dates appropriately

## Compatibility

### Backward Compatibility
- ❌ **NOT backward compatible** with old frontend
- ❌ Old database schema incompatible
- ❌ Must update frontend to use new auth system

### Forward Compatibility
- ✅ Designed to work specifically with Frontend V2
- ✅ Follows Frontend V2 component requirements
- ✅ API matches Frontend V2 data structures

## Testing

### Manual Testing
```bash
# Start server
uvicorn app.main:app --reload

# Visit API docs
open http://localhost:8000/api/docs
```

### Automated Testing (To Be Implemented)
- Unit tests for models
- Integration tests for endpoints
- Authentication flow tests
- Quiz grading tests

## Security Improvements

✅ **Password Security**
- Bcrypt hashing with salt
- Minimum password length enforced
- Passwords never stored in plain text

✅ **Authentication**
- JWT tokens with expiration
- Secure token generation
- Protected routes

✅ **API Security**
- CORS properly configured
- Authorization headers required
- User-scoped data access

## Performance Considerations

- **Database Indexes:** Added on user.email for faster lookups
- **Query Optimization:** Dashboard aggregates multiple queries efficiently
- **Token Caching:** Consider implementing Redis for token validation in production

## Known Limitations

1. **AI Quiz Generation:** Currently returns mock data
   - Ready for real AI integration
   - Need to add OpenAI/Anthropic API calls

2. **Email Notifications:** Settings saved but not implemented
   - Need to add email service (SendGrid, etc.)

3. **Real-time Features:** No WebSocket support yet
   - Study sessions could benefit from live updates

4. **File Uploads:** Not implemented
   - Could add for flashcard images, attachments

## Future Enhancements

- [ ] Real AI integration for quiz generation
- [ ] Email verification and password reset
- [ ] OAuth providers (Google, Microsoft)
- [ ] Real-time notifications via WebSockets
- [ ] File upload support
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Mobile API optimizations
- [ ] Rate limiting
- [ ] API versioning

## Documentation

All documentation has been updated:
- ✅ README.md - Updated with V2 info
- ✅ FRONTEND_V2_UPDATES.md - Detailed technical changes
- ✅ API_REFERENCE_V2.md - Complete API documentation
- ✅ SETUP_GUIDE_V2.md - Quick setup guide
- ✅ CHANGELOG_V2.md - This file

## Support

For questions or issues:
1. Check API documentation: http://localhost:8000/api/docs
2. Review SETUP_GUIDE_V2.md for common issues
3. Check FRONTEND_V2_UPDATES.md for technical details

---

**Version:** 2.0.0  
**Date:** November 2024  
**Status:** ✅ Complete and Ready for Frontend V2

