# Canvas Extension - Study Platform

A multi-user web application that integrates with Canvas LMS to help students study more effectively using AI-generated flashcards.

## 🎯 Features

- **Canvas Integration**: Automatically scrapes and syncs course materials, modules, and assignments
- **AI Flashcard Generation**: Uses Groq AI to generate high-quality flashcards from course content
- **Multi-User Support**: Each user has their own courses, modules, and study materials
- **Secure Authentication**: JWT-based auth with encrypted Canvas session storage
- **Modern UI**: Built with React + TypeScript for a smooth user experience

## 🏗️ Project Structure

```
HCI-CanvasExt/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/v1/         # API endpoints
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic (Canvas scraper, AI generator)
│   │   └── core/           # Config, encryption, database
│   ├── docker-compose.yml  # Docker setup
│   └── requirements.txt
│
├── frontendv2/             # React frontend
│   └── src/
│       ├── components/     # UI components
│       └── lib/           # API client
│
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Canvas LMS account
- Groq API key (free at https://console.groq.com/keys)

### 1. Setup Environment Variables

```bash
cd backend
cp config.env.template .env
```

Edit `.env` and add your credentials:

```env
# Get Canvas session cookie from browser (F12 → Application → Cookies → canvas_session)
CANVAS_SESSION_COOKIE=your_canvas_session_cookie_here

# Get Groq API key from https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here
```

### 2. Start Backend (Docker)

```bash
cd backend
docker-compose up -d --build
```

Backend runs at: http://localhost:8000

### 3. Start Frontend

```bash
cd frontendv2
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### 4. Create Account & Login

1. Open http://localhost:5173
2. Sign up with email/password
3. Your Canvas courses will sync automatically!

## 🔧 Configuration

### Environment Variables

All sensitive config is in `backend/.env` (already in `.gitignore`):

| Variable | Description | Required |
|----------|-------------|----------|
| `CANVAS_INSTANCE_URL` | Your Canvas URL (default: usflearn.instructure.com) | Yes |
| `CANVAS_SESSION_COOKIE` | Session cookie from browser | Yes |
| `GROQ_API_KEY` | API key for AI flashcard generation | Yes |
| `DATABASE_URL` | PostgreSQL connection (auto-configured in Docker) | No |
| `SECRET_KEY` | JWT secret (change in production!) | No |

### Getting Canvas Session Cookie

1. Log into Canvas in your browser
2. Press F12 to open DevTools
3. Go to **Application** → **Cookies**
4. Find `canvas_session` cookie
5. Copy the entire value
6. Paste into `backend/.env`

## 📚 Usage

### Study Flow

1. **Dashboard**: View all your Canvas courses
2. **Course Details**: See modules and materials
3. **Generate Flashcards**: 
   - Select a module
   - Click "Generate Flashcards"
   - AI creates flashcards from PDFs and content
4. **Study**: Review flashcards with flip animations

### API Endpoints

Backend API documentation: http://localhost:8000/docs

Key endpoints:
- `POST /api/v1/auth/signup` - Create account
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/courses` - Get user's courses
- `GET /api/v1/modules/course/{id}` - Get course modules
- `POST /api/v1/flashcards/generate` - Generate flashcards from module

## 🔒 Security

- **Encrypted Storage**: Canvas session cookies are encrypted using Fernet
- **JWT Authentication**: Secure token-based auth for API access
- **Environment Variables**: All credentials in `.env` (not committed to git)
- **Password Hashing**: bcrypt for secure password storage

## 🐳 Docker Commands

```bash
# Start services
cd backend
docker-compose up -d

# View logs
docker-compose logs -f backend

# Restart backend
docker-compose restart backend

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

## 🛠️ Development

### Backend Structure

- **Models** (`app/models/`): SQLAlchemy ORM models
  - User, Course, Module, Flashcard, etc.
- **Services** (`app/services/`):
  - `canvas_scraper.py`: Scrapes Canvas for courses/modules
  - `flashcard_generator.py`: AI-powered flashcard generation
- **API** (`app/api/v1/`): FastAPI route handlers

### Frontend Components

- `Dashboard.tsx`: Course overview
- `CourseDetails.tsx`: Module list
- `FlashcardSelection.tsx`: Module selection for flashcard generation
- `FlashcardStudy.tsx`: Flashcard study interface

### Adding Features

1. **Backend**: Add endpoint in `app/api/v1/`
2. **Frontend**: Add API call in `src/lib/api.ts`
3. **UI**: Create/update component in `src/components/`

## 🧪 Database

PostgreSQL database (Docker container):
- Host: `localhost:5432`
- Database: `canvas_ext`
- User: `canvas_user`
- Password: `canvas_password`

Access with:
```bash
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext
```

## 📝 Scripts

### Backend Utility Scripts

```bash
# Import Canvas data (run in Docker)
docker exec -it canvas_ext_backend python import_canvas_data.py

# Create test user (run in Docker)
docker exec -it canvas_ext_backend python create_test_user.py

# Seed sample data (run in Docker)
docker exec -it canvas_ext_backend python seed_data.py
```

## 🤝 Contributing

1. Clone the repository
2. Create `backend/.env` with your credentials
3. Start Docker: `cd backend && docker-compose up -d`
4. Start frontend: `cd frontendv2 && npm run dev`
5. Make changes and test
6. Commit (`.env` is automatically excluded via `.gitignore`)

## 🐛 Troubleshooting

### Backend won't start
```bash
cd backend
docker-compose logs backend
# Check for missing environment variables
```

### Can't generate flashcards
- Verify `GROQ_API_KEY` is set in `backend/.env`
- Check Groq API rate limits (30 requests/minute on free tier)

### Canvas data not loading
- Verify `CANVAS_SESSION_COOKIE` is current and valid
- Session cookies expire - get a fresh one from browser

### Database errors
```bash
# Reset database
cd backend
docker-compose down -v
docker-compose up -d
```

## 📄 License

This project is for educational purposes.

## 🎓 Credits

Built for HCI coursework at University of South Florida.

---

**Need help?** Check the troubleshooting section or open an issue.

