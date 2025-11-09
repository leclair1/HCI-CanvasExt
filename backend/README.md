# Canvas LMS Extension - Backend API

FastAPI backend for the Canvas LMS Browser Extension. Provides REST APIs for courses, assignments, flashcards, AI tutoring, and study tracking.

## ⚡ NEW: Frontend V2 Updates

The backend has been updated to fully support Frontend V2 with:
- **Authentication** (JWT-based login/signup)
- **User Profiles** with settings and preferences
- **Quizzes** with AI generation support
- **Saved Flashcard Decks**
- **Dashboard** with study insights and task tracking

📖 **See [FRONTEND_V2_UPDATES.md](./FRONTEND_V2_UPDATES.md) for detailed changes**
📖 **See [API_REFERENCE_V2.md](./API_REFERENCE_V2.md) for complete API documentation**

## 🚀 Quick Start with Docker (Recommended - No Local Python Needed!)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Setup (3 Commands!)

1. **Navigate to the backend directory**
```bash
cd HCI-CanvasExt/backend
```

2. **Start everything with Docker Compose**
```bash
docker-compose up -d
```

This will:
- Start PostgreSQL database on port 5432
- Build and start FastAPI backend on port 8000
- Set up networking between services
- Create the database schema automatically

3. **Verify it's running**
```bash
docker-compose ps
```

The API is now available at:
- **API Server**: http://localhost:8000
- **Interactive API Docs**: http://localhost:8000/api/docs
- **Alternative Docs**: http://localhost:8000/api/redoc

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

**✨ That's it!** No pip install, no Python environment setup needed. Everything runs in Docker.

## 🔧 Alternative: Local Development (If You Can't Use Docker)

If you cannot use Docker, you can run locally with SQLite:

**Note:** This requires Python 3.11+ installed on your machine.

1. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

2. **Create `.env` file**
```env
DATABASE_URL=sqlite:///./canvas_ext.db
SECRET_KEY=dev-secret-key-change-in-production
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

3. **Run server (database will be created automatically)**
```bash
uvicorn app.main:app --reload
```

⚠️ **Note:** SQLite is not recommended for production. Use PostgreSQL in Docker for best results.

## 🎓 Canvas LMS Integration

This backend integrates with **Canvas LMS** to fetch real student data (courses, assignments, files, etc.).

### Quick Setup:

1. **Get your Canvas Access Token:**
   - Log into Canvas → Account Settings → New Access Token
   - See [CANVAS_INTEGRATION.md](./CANVAS_INTEGRATION.md) for detailed instructions

2. **Authenticate with the API:**
```bash
curl -X POST http://localhost:8000/api/v1/canvas/auth \
  -H "Content-Type: application/json" \
  -d '{
    "canvas_url": "https://canvas.instructure.com",
    "access_token": "YOUR_CANVAS_TOKEN"
  }'
```

3. **Sync your Canvas data:**
```bash
curl -X POST "http://localhost:8000/api/v1/canvas/sync?user_id=1"
```

4. **Access your courses and assignments:**
```bash
curl http://localhost:8000/api/v1/courses
curl http://localhost:8000/api/v1/assignments
```

📖 **Full integration guide:** [CANVAS_INTEGRATION.md](./CANVAS_INTEGRATION.md)

## 📚 API Endpoints

For complete API documentation with examples, see [API_REFERENCE_V2.md](./API_REFERENCE_V2.md)

### Authentication (NEW)
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user info

### Profile & Settings (NEW)
- `GET /api/v1/profile/` - Get user profile
- `PUT /api/v1/profile/` - Update user profile
- `PUT /api/v1/profile/notifications` - Update notification settings
- `PUT /api/v1/profile/appearance` - Update appearance settings
- `POST /api/v1/profile/change-password` - Change password

### Dashboard (NEW)
- `GET /api/v1/dashboard/` - Get complete dashboard data

### Quizzes (NEW)
- `POST /api/v1/quizzes/` - Create quiz
- `GET /api/v1/quizzes/` - List all quizzes
- `GET /api/v1/quizzes/{quiz_id}` - Get quiz for taking
- `POST /api/v1/quizzes/submit` - Submit quiz answers
- `POST /api/v1/quizzes/generate` - Generate quiz with AI
- `DELETE /api/v1/quizzes/{quiz_id}` - Delete quiz

### Saved Decks (NEW)
- `POST /api/v1/saved-decks/` - Create saved flashcard deck
- `GET /api/v1/saved-decks/` - List all saved decks
- `GET /api/v1/saved-decks/{deck_id}` - Get saved deck
- `DELETE /api/v1/saved-decks/{deck_id}` - Delete saved deck

### Canvas Integration
- `POST /api/v1/canvas/auth` - Authenticate with Canvas LMS
- `POST /api/v1/canvas/sync` - Sync all data from Canvas
- `POST /api/v1/canvas/sync/courses/{user_id}` - Sync only courses
- `POST /api/v1/canvas/sync/assignments/{user_id}/{course_id}` - Sync course assignments
- `GET /api/v1/canvas/user/{user_id}` - Get user info and sync status

### Courses
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/{course_id}` - Get specific course
- `POST /api/v1/courses` - Create new course
- `PUT /api/v1/courses/{course_id}` - Update course
- `DELETE /api/v1/courses/{course_id}` - Delete course

### Assignments
- `GET /api/v1/assignments` - Get all assignments (filterable by course_id, status)
- `GET /api/v1/assignments/{assignment_id}` - Get specific assignment
- `POST /api/v1/assignments` - Create new assignment
- `PUT /api/v1/assignments/{assignment_id}` - Update assignment
- `DELETE /api/v1/assignments/{assignment_id}` - Delete assignment

### Flashcards
- `GET /api/v1/flashcards` - Get all flashcards (filterable by course_id, mastered)
- `GET /api/v1/flashcards/{flashcard_id}` - Get specific flashcard
- `POST /api/v1/flashcards` - Create new flashcard
- `PUT /api/v1/flashcards/{flashcard_id}` - Update flashcard
- `POST /api/v1/flashcards/review` - Record flashcard review
- `GET /api/v1/flashcards/sets` - Get flashcard sets
- `POST /api/v1/flashcards/sets` - Create flashcard set

### AI Tutor Chat
- `POST /api/v1/chat` - Send message to AI tutor
- `GET /api/v1/chat/history/{course_id}` - Get chat history
- `DELETE /api/v1/chat/history/{course_id}` - Clear chat history

### Study Sessions
- `GET /api/v1/study-sessions` - Get study sessions (filterable by course_id, days)
- `GET /api/v1/study-sessions/stats` - Get study statistics
- `POST /api/v1/study-sessions` - Log new study session
- `DELETE /api/v1/study-sessions/{session_id}` - Delete study session

### Settings
- `GET /api/v1/settings` - Get user settings
- `PUT /api/v1/settings` - Update user settings

## 🤖 AI Integration

The API supports integration with AI providers for enhanced tutoring:

### OpenAI (ChatGPT)
1. Get API key from https://platform.openai.com/api-keys
2. Add to `.env`:
```env
OPENAI_API_KEY=sk-...
```

### Anthropic (Claude)
1. Get API key from https://console.anthropic.com/
2. Add to `.env`:
```env
ANTHROPIC_API_KEY=sk-ant-...
```

> **Note**: The current implementation uses mock responses. To integrate real AI, modify `app/api/v1/chat.py` to call the OpenAI or Anthropic APIs.

## 🗄️ Database Management (Docker)

### Access PostgreSQL Database

Connect to the database:
```bash
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext
```

Useful SQL commands:
```sql
-- List all tables
\dt

-- View users
SELECT id, first_name, last_name, email FROM users;

-- View courses
SELECT * FROM courses;

-- View quizzes
SELECT * FROM quizzes;

-- Exit
\q
```

### Reset Database (Fresh Start)

```bash
# Stop services and remove volumes
docker-compose down -v

# Start services (creates fresh database)
docker-compose up -d
```

### Backup and Restore

Backup:
```bash
docker exec -t canvas_ext_db pg_dump -U canvas_user canvas_ext > backup.sql
```

Restore:
```bash
docker exec -i canvas_ext_db psql -U canvas_user canvas_ext < backup.sql
```

## 🔒 Security

✅ **Authentication is now implemented!** The API uses JWT tokens for secure authentication.

For production:
1. ✅ JWT authentication implemented
2. Change `SECRET_KEY` in `.env` to a strong random string (use `openssl rand -hex 32`)
3. Update database credentials
4. Configure proper CORS origins
5. Use HTTPS
6. Secure API keys (Canvas API tokens are stored per-user)

## 🧪 Testing

Run the server and visit http://localhost:8000/api/docs to test all endpoints interactively.

Example test with curl:
```bash
# Get all courses
curl http://localhost:8000/api/v1/courses

# Create a flashcard
curl -X POST http://localhost:8000/api/v1/flashcards \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test123",
    "course_id": "crn4020",
    "question": "What is REST?",
    "answer": "Representational State Transfer"
  }'
```

## 🛠️ Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/          # API route handlers
│   ├── core/            # Configuration
│   ├── db/              # Database setup
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   └── main.py          # FastAPI app
├── docker-compose.yml   # Docker services
├── Dockerfile          # Backend container
├── requirements.txt    # Python dependencies
├── seed_data.py       # Database seeder
└── .env               # Environment variables
```

## 🐛 Troubleshooting

**Services won't start**
```bash
# Check Docker Desktop is running
docker --version

# View all logs
docker-compose logs -f

# Restart everything
docker-compose restart
```

**Port already in use**
```bash
# Check what's using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Change port in docker-compose.yml
# Under backend -> ports:
# Change "8000:8000" to "8001:8000"
```

**Database connection errors**
```bash
# Check if containers are running
docker-compose ps

# View database logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

**Backend container keeps restarting**
```bash
# View backend logs
docker-compose logs backend

# Rebuild backend
docker-compose build backend
docker-compose up -d backend
```

**Database schema errors after update**
```bash
# Fresh start (removes all data)
docker-compose down -v
docker-compose up -d

# The new schema will be created automatically
```

**Changes to code not reflecting**
```bash
# Code is hot-reloaded automatically via volume mount
# If not working, rebuild:
docker-compose build backend
docker-compose up -d backend
```

## 📝 Next Steps

1. ✅ **Authentication**: JWT-based auth implemented
2. ✅ **User Profiles**: Profile management with settings
3. ✅ **Quizzes**: Quiz creation and grading system
4. ✅ **Dashboard**: Student dashboard with insights
5. **Real AI Integration**: Connect OpenAI/Anthropic APIs for real quiz generation
6. **File Uploads**: Support uploading course materials (PDFs, videos)
7. **Real-time Features**: Add WebSocket support for live chat
8. **Caching**: Implement Redis for better performance
9. **Monitoring**: Add logging and monitoring tools
10. **Email Service**: Password reset and notification emails

## 📖 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the HCI coursework.

