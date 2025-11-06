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

## 🚀 Quick Start with Docker (Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- [Git](https://git-scm.com/) (optional)

### Setup

1. **Clone or navigate to the backend directory**
```bash
cd HCI-CanvasExt/backend
```

2. **Start PostgreSQL database with Docker Compose**
```bash
docker-compose up -d postgres
```

This starts a PostgreSQL database on `localhost:5432`

3. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and update if needed (default values work for Docker setup)
```

5. **Seed the database with sample data**
```bash
python seed_data.py
```

6. **Start the FastAPI server**
```bash
uvicorn app.main:app --reload
```

The API will be available at:
- **API Server**: http://localhost:8000
- **Interactive API Docs**: http://localhost:8000/api/docs
- **Alternative Docs**: http://localhost:8000/api/redoc

## 🐳 Full Docker Setup (Backend + Database)

To run both the database and backend in Docker:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- FastAPI backend on port 8000

To view logs:
```bash
docker-compose logs -f
```

To stop all services:
```bash
docker-compose down
```

To reset everything (removes database data):
```bash
docker-compose down -v
```

## 🔧 Local Development (SQLite)

If you prefer not to use Docker, you can use SQLite:

1. **Update `.env` to use SQLite**
```env
DATABASE_URL=sqlite:///./canvas_ext.db
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Seed database**
```bash
python seed_data.py
```

4. **Run server**
```bash
uvicorn app.main:app --reload
```

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

## 🗄️ Database Management

### PostgreSQL Commands

Connect to the database:
```bash
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext
```

Useful SQL commands:
```sql
-- List all tables
\dt

-- View courses
SELECT * FROM courses;

-- View assignments
SELECT * FROM assignments;

-- Clear all data
TRUNCATE courses, assignments, flashcards, study_sessions, chat_messages CASCADE;
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

**Port already in use**
```bash
# Check what's using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Use a different port
uvicorn app.main:app --reload --port 8001
```

**Database connection errors**
```bash
# Check if PostgreSQL is running
docker ps

# Restart database
docker-compose restart postgres

# View database logs
docker-compose logs postgres
```

**Module not found errors**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

**Database schema errors after update**
```bash
# If you get errors about missing columns after updating to Frontend V2 support:

# Option 1: Fresh start (development only)
rm canvas_ext.db  # or drop PostgreSQL database
python seed_data.py  # Re-create with new schema

# Option 2: Manual migration (production)
# Use Alembic or manually add the new columns
# See FRONTEND_V2_UPDATES.md for schema changes
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

