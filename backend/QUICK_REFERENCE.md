# Quick Reference - Backend V2

## 🚀 Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload

# API Docs
http://localhost:8000/api/docs
```

## 🔑 Authentication Flow

### 1. Signup
```bash
POST /api/v1/auth/signup
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@university.edu",
  "password": "secure123"
}
# Returns: { "access_token": "...", "user": {...} }
```

### 2. Login
```bash
POST /api/v1/auth/login
{
  "email": "john@university.edu",
  "password": "secure123"
}
# Returns: { "access_token": "...", "user": {...} }
```

### 3. Use Token
```bash
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📍 Key Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/signup` | POST | No | Register user |
| `/auth/login` | POST | No | Login user |
| `/auth/me` | GET | Yes | Get current user |
| `/dashboard/` | GET | Yes | Get dashboard data |
| `/profile/` | GET/PUT | Yes | User profile |
| `/quizzes/` | POST/GET | Yes | Create/list quizzes |
| `/quizzes/{id}` | GET | Yes | Get quiz |
| `/quizzes/submit` | POST | Yes | Submit answers |
| `/saved-decks/` | POST/GET | Yes | Create/list decks |
| `/courses/` | GET | Yes | List courses |
| `/assignments/` | GET | Yes | List assignments |

## 🗄️ Database Models

### User (UPDATED)
- ✅ Added: `first_name`, `last_name`, `password_hash`
- ✅ Added: notification settings
- ✅ Added: `dark_mode`, `study_streak_days`
- ⚠️ Changed: Canvas fields now optional

### Course (UPDATED)
- ⚠️ Changed: `id` String → Integer
- ✅ Added: `user_id` foreign key

### Assignment (UPDATED)
- ⚠️ Changed: `id` String → Integer
- ⚠️ Changed: `due_date` String → DateTime
- ✅ Added: `user_id`, `submitted`

### NEW Models
- `Quiz`, `QuizQuestion`, `QuizAttempt`, `QuizAnswer`
- `SavedFlashcardDeck`, `SavedFlashcard`

## 🔐 Security

```python
# All protected routes require:
from app.api.v1.auth import get_current_user

@router.get("/protected")
async def protected(current_user: User = Depends(get_current_user)):
    return {"user_id": current_user.id}
```

## 📦 Response Formats

### Success (200/201)
```json
{
  "id": 1,
  "name": "Example",
  ...
}
```

### Error (400/401/404)
```json
{
  "detail": "Error message"
}
```

### Auth Response
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": { "id": 1, "email": "...", ... }
}
```

## 🐛 Common Issues

### "401 Unauthorized"
- Check token is included: `Authorization: Bearer TOKEN`
- Token may be expired (30 days)
- Login again to get new token

### "Module not found"
```bash
pip install -r requirements.txt --force-reinstall
```

### Database errors
```bash
# Delete and recreate
rm canvas_ext.db
uvicorn app.main:app --reload
```

### CORS errors
Add frontend URL to `.env`:
```env
CORS_ORIGINS=["http://localhost:5173"]
```

## 🧪 Testing

### Via cURL
```bash
# Signup
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Test","last_name":"User","email":"test@email.com","password":"test123456"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@email.com","password":"test123456"}'

# Get dashboard (with token)
curl http://localhost:8000/api/v1/dashboard/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Via Swagger UI
1. Go to http://localhost:8000/api/docs
2. Click "Authorize" button
3. Enter token: `Bearer YOUR_TOKEN`
4. Test any endpoint

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/v1/           # Endpoints
│   │   ├── auth.py       # ✨ NEW
│   │   ├── profile.py    # ✨ NEW
│   │   ├── dashboard.py  # ✨ NEW
│   │   ├── quizzes.py    # ✨ NEW
│   │   └── saved_decks.py # ✨ NEW
│   ├── models/           # Database models
│   │   ├── quiz.py       # ✨ NEW
│   │   └── saved_deck.py # ✨ NEW
│   └── schemas/          # Request/response schemas
│       ├── auth.py       # ✨ NEW
│       ├── quiz.py       # ✨ NEW
│       └── saved_deck.py # ✨ NEW
└── requirements.txt      # Dependencies
```

## 🔧 Configuration

### `.env` File
```env
DATABASE_URL=sqlite:///./canvas_ext.db
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=["http://localhost:5173"]
```

### Generate SECRET_KEY
```bash
openssl rand -hex 32
# or
python -c "import secrets; print(secrets.token_hex(32))"
```

## 📖 Full Documentation

- **Setup Guide:** `SETUP_GUIDE_V2.md`
- **API Reference:** `API_REFERENCE_V2.md`
- **Technical Details:** `FRONTEND_V2_UPDATES.md`
- **Changes:** `CHANGELOG_V2.md`

## 💡 Tips

1. **Token Storage:** Frontend should store in localStorage or secure storage
2. **Error Handling:** Always check for 401 and redirect to login
3. **Development:** Use Swagger UI for quick testing
4. **Production:** Change SECRET_KEY, use PostgreSQL, enable HTTPS

## 🆘 Get Help

1. Check API docs: http://localhost:8000/api/docs
2. Review `SETUP_GUIDE_V2.md` for common issues
3. See `API_REFERENCE_V2.md` for examples

---

**Status:** ✅ Ready for Frontend V2  
**Version:** 2.0.0  
**Last Updated:** November 2024

