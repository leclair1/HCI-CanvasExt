# Quick Setup Guide for Frontend V2 Backend

This guide will help you set up the updated backend that works with Frontend V2.

## Prerequisites

- Python 3.8+
- pip (Python package manager)

## Step 1: Install Dependencies

```bash
cd HCI-CanvasExt/backend
pip install -r requirements.txt
```

The following new packages will be installed:
- `python-jose[cryptography]` - JWT token handling
- `passlib[bcrypt]` - Password hashing

## Step 2: Configure Environment

Create a `.env` file in the backend directory:

```bash
# Create .env file
touch .env  # On Windows: type nul > .env
```

Add the following content to `.env`:

```env
# Database Configuration
DATABASE_URL=sqlite:///./canvas_ext.db

# Security Settings
SECRET_KEY=change-this-to-a-random-secret-key-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# CORS Settings
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000","http://localhost:5174"]

# AI API Keys (optional)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

**⚠️ IMPORTANT:** For production, generate a secure `SECRET_KEY`:
```bash
# On Linux/Mac
openssl rand -hex 32

# Or use Python
python -c "import secrets; print(secrets.token_hex(32))"
```

## Step 3: Initialize Database

### Option A: Fresh Database (Recommended)

If you have an old database, delete it and start fresh:

```bash
# Delete old database
rm canvas_ext.db  # On Windows: del canvas_ext.db

# The database will be created automatically when you start the server
```

### Option B: Keep Existing Data

If you have important data in your existing database, you'll need to manually update the schema. See `FRONTEND_V2_UPDATES.md` for all schema changes.

## Step 4: Start the Server

```bash
# Start the development server
python -m uvicorn app.main:app --reload
```

Or:

```bash
uvicorn app.main:app --reload
```

The server will start on `http://localhost:8000`

## Step 5: Verify Installation

1. **Check API Documentation:**
   - Open http://localhost:8000/api/docs
   - You should see all the new endpoints for auth, quizzes, saved-decks, etc.

2. **Test Authentication:**
   ```bash
   # Sign up a new user
   curl -X POST http://localhost:8000/api/v1/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "first_name": "Test",
       "last_name": "User",
       "email": "test@university.edu",
       "password": "test123456"
     }'
   ```

   You should receive a token in the response.

3. **Test Protected Endpoint:**
   ```bash
   # Get dashboard (requires token from above)
   curl http://localhost:8000/api/v1/dashboard/ \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## Step 6: Connect Frontend V2

Update your frontend's API base URL to point to:
```
http://localhost:8000/api/v1
```

## Common Issues & Solutions

### Issue: "Module not found" errors

**Solution:**
```bash
pip install -r requirements.txt --force-reinstall
```

### Issue: Database errors about missing columns

**Solution:**
```bash
# Delete the database and start fresh
rm canvas_ext.db
# Restart the server - it will create the new schema
python -m uvicorn app.main:app --reload
```

### Issue: "401 Unauthorized" on all requests

**Solution:**
- Make sure you're including the `Authorization: Bearer <token>` header
- Check that your token is valid (not expired)
- Try logging in again to get a new token

### Issue: Port 8000 already in use

**Solution:**
```bash
# Use a different port
uvicorn app.main:app --reload --port 8001

# Or find what's using port 8000
# Linux/Mac:
lsof -i :8000
# Windows:
netstat -ano | findstr :8000
```

### Issue: CORS errors in browser

**Solution:**
Add your frontend URL to `CORS_ORIGINS` in `.env`:
```env
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000","YOUR_FRONTEND_URL"]
```

## Quick Test Commands

### Test Complete Flow
```bash
# 1. Sign up
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Test","last_name":"User","email":"test@example.com","password":"test123456"}' \
  | python -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

# 2. Get dashboard
curl http://localhost:8000/api/v1/dashboard/ \
  -H "Authorization: Bearer $TOKEN"

# 3. Create a saved deck
curl -X POST http://localhost:8000/api/v1/saved-decks/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Deck","cards":[{"question":"Q1","answer":"A1","order":0}]}'

# 4. List saved decks
curl http://localhost:8000/api/v1/saved-decks/ \
  -H "Authorization: Bearer $TOKEN"
```

## What's New in V2?

✅ **Authentication System**
- JWT-based login/signup
- Secure password hashing
- Token-based API access

✅ **User Profiles**
- First name, last name fields
- Notification preferences
- Appearance settings (dark mode)
- Study streak tracking

✅ **Quiz System**
- Create custom quizzes
- AI-generated quizzes (mock for now)
- Submit and grade answers
- View quiz history

✅ **Saved Flashcard Decks**
- Save flashcard collections
- Organize by course
- Track study progress

✅ **Dashboard**
- Due today items
- Study suggestions
- Course progress
- Upcoming assignments
- Today's tasks

## Next Steps

1. ✅ Backend is running
2. Connect Frontend V2 to the API
3. Test authentication flow
4. Test all new features
5. (Optional) Set up PostgreSQL for production
6. (Optional) Add AI API keys for real AI features

## Need Help?

- **API Documentation:** http://localhost:8000/api/docs
- **Detailed Changes:** See `FRONTEND_V2_UPDATES.md`
- **API Examples:** See `API_REFERENCE_V2.md`
- **General Setup:** See `README.md`

## Production Deployment

Before deploying to production:

1. ✅ Change `SECRET_KEY` to a secure random value
2. ✅ Use PostgreSQL instead of SQLite
3. ✅ Enable HTTPS
4. ✅ Set proper CORS origins
5. ✅ Use environment variables for all secrets
6. ✅ Set up proper logging and monitoring
7. ✅ Implement rate limiting
8. ✅ Regular database backups

---

🎉 **You're all set!** Your backend is now ready for Frontend V2.

