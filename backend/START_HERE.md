# 🚀 START HERE - Backend V2 with Docker

## Quick Start (Copy-Paste These Commands)

```bash
# 1. Navigate to backend directory
cd HCI-CanvasExt/backend

# 2. Start everything with Docker
docker-compose up -d

# 3. Open API documentation
# Visit: http://localhost:8000/api/docs
```

**That's it!** No Python installation needed. Everything runs in Docker.

---

## What You Just Did

✅ Started PostgreSQL database (port 5432)  
✅ Started FastAPI backend (port 8000)  
✅ Created database tables automatically  
✅ Enabled JWT authentication  
✅ Configured CORS for frontend  

## Test It Works

Open http://localhost:8000/api/docs and try the signup endpoint:

```json
{
  "first_name": "Test",
  "last_name": "User",
  "email": "test@university.edu",
  "password": "test123456"
}
```

You should receive a token!

## Useful Commands

```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Reset everything (fresh start)
docker-compose down -v
docker-compose up -d
```

## Connect Your Frontend

Update your frontend's API URL to:
```javascript
const API_BASE_URL = "http://localhost:8000/api/v1";
```

## Need Help?

- **Docker Setup Guide:** See `DOCKER_SETUP.md` (comprehensive guide)
- **API Documentation:** See `API_REFERENCE_V2.md`
- **Quick Reference:** See `QUICK_REFERENCE.md`
- **Technical Details:** See `FRONTEND_V2_UPDATES.md`

## What's New in V2?

✅ **Authentication** - JWT-based login/signup  
✅ **User Profiles** - Settings and preferences  
✅ **Quizzes** - Create, take, and grade quizzes  
✅ **Saved Decks** - Save flashcard collections  
✅ **Dashboard** - Study insights and task tracking  

## Troubleshooting

**Services won't start?**
- Make sure Docker Desktop is running
- Check logs: `docker-compose logs -f`

**Port already in use?**
- Change port in `docker-compose.yml`
- Or stop other services using port 8000

**Database errors?**
- Reset: `docker-compose down -v && docker-compose up -d`

---

## Using Start Scripts (Alternative)

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
./start.sh
```

---

🎉 **Backend is ready!** Start building with Frontend V2.


