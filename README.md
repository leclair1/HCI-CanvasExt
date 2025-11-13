# Canvas Extension - Study Platform

A multi-user web application that integrates with Canvas LMS to help students study more effectively using AI-generated flashcards.

## 🎯 Features

- **Canvas Integration**: Automatically scrapes and syncs course materials, modules, and assignments
- **Automatic Session Validation**: System automatically checks and prompts for Canvas session updates when expired
- **Assignment Tracking**: Assignments automatically sync on every login and display in real-time
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
# Canvas Session Cookie (NOT an API key - get from browser cookies)
# Login to Canvas → F12 → Application → Cookies → canvas_session
CANVAS_SESSION_COOKIE=your_canvas_session_cookie_here

# Groq AI API Key (free at https://console.groq.com/keys)
GROQ_API_KEY=your_groq_api_key_here
```

**Note**: You can also provide the Canvas session cookie during signup instead of in `.env`

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

1. Open http://localhost:5173 (or http://localhost:3000 depending on your setup)
2. Click "Sign Up"
3. Fill in your details:
   - Name and email
   - **Canvas Session Cookie** (optional, but required for flashcard generation)
   - Password
4. Your Canvas courses will sync automatically!

**Tip**: If you skip adding the Canvas session during signup, you'll need to sign up again with a fresh session later to enable flashcard generation.

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

**Important**: This is NOT an API key. It's a browser session cookie.

1. **Login to Canvas** in your browser (Chrome, Firefox, Edge, etc.)
2. **Open DevTools**: Press `F12` or right-click → Inspect
3. Navigate to the **Application** tab (Chrome) or **Storage** tab (Firefox)
4. In the sidebar, expand **Cookies** and click on your Canvas URL
5. Find the cookie named `canvas_session`
6. **Copy the entire value** (double-click to select all, then copy)
7. **Paste into**:
   - `backend/.env` file (for development/testing)
   - **OR** the signup form when creating an account (for production)

**Example cookie value**: `2bphp1Rq5npX_T_Nb-1P...` (long random string)

### 🔄 Canvas Session Validation (Automatic)

**NEW FEATURE**: The system now automatically validates your Canvas session when you log in!

#### How It Works

When you log in, the system:
1. **Checks** if your Canvas session cookie is still valid
2. **Alerts** you if it has expired
3. **Prompts** you to provide a new session cookie (with easy-to-follow instructions)
4. **Updates** your session and re-syncs your courses automatically

#### What You'll See

If your Canvas session expires, you'll see a modal prompt after login with:
- **Clear instructions** on how to get a new Canvas session cookie from your browser
- **Step-by-step guide** with screenshots descriptions
- **Validation** to ensure the new session works before saving
- **Option to skip** if you don't need Canvas features immediately

#### Updating Your Canvas Session

**Option 1: Automatic Prompt (Recommended)**
- Simply log in as usual
- If your session is expired, the prompt appears automatically
- Follow the instructions to update your session
- Done! Your courses will sync automatically

**Option 2: Manual Update via .env (For Development)**
1. Get a fresh Canvas session cookie from your browser (follow instructions above)
2. Edit `backend/.env` and update `CANVAS_SESSION_COOKIE`
3. Restart backend: `docker-compose restart backend`
4. Log in and the system will detect the change

**Note**: The automatic validation feature ensures you're always prompted to update your session when needed, without having to manually check or recreate your account.

### 📝 Assignment Tracking

**Automatic Assignment Syncing**

The system automatically syncs your Canvas assignments:

1. **On Signup**: When you create an account with a Canvas session cookie, all assignments from F25 courses are imported
2. **On Every Login**: Assignments are re-synced from Canvas to keep your data current
   - New assignments are added automatically
   - Due dates are updated if changed in Canvas
   - Existing assignments are matched by title to avoid duplicates

**Where Assignments Appear:**
- **Dashboard**: Shows top 3 upcoming assignments across all courses
- **Course Details**: Shows all assignments for a specific course
- **Automatic Urgency Detection**: Assignments due within 2 days are marked as "Urgent"

**Filtering:**
- Only **F25 (Fall 2025)** course assignments are synced
- Only **pending/not submitted** assignments show as "upcoming"
- Only assignments with **specific due dates** are displayed (no TBD/undefined dates)
- **Overdue assignments are hidden**
- Assignments are sorted by due date (soonest first = most urgent first)

**Technical Details:**
- Uses Canvas API (`/api/v1/courses/{id}/assignment_groups`) for reliable assignment fetching
- Includes assignment name, due date, points, and submission types
- Filters out assignments without due dates or with invalid dates

## 📚 Usage

### Study Flow

1. **Dashboard**: View all your Canvas courses and upcoming assignments
2. **Automatic Sync**: Every time you log in, assignments are automatically synced from Canvas
3. **Course Details**: See modules and course-specific assignments
4. **Generate Flashcards**: 
   - Select a module
   - Click "Generate Flashcards"
   - AI creates flashcards from PDFs and content
5. **Study**: Review flashcards with flip animations

### API Endpoints

Backend API documentation: http://localhost:8000/docs

Key endpoints:
- `POST /api/v1/auth/signup` - Create account (auto-syncs courses, modules, and assignments)
- `POST /api/v1/auth/login` - Login (auto-syncs assignments from Canvas)
- `GET /api/v1/courses` - Get user's courses
- `GET /api/v1/modules/course/{id}` - Get course modules
- `GET /api/v1/assignments?course_id={id}` - Get assignments (filtered by course)
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

### Canvas data not loading / "Sign in to your account" errors
- **Your Canvas session cookie has expired!**
- **Solution**: Simply log out and log back in - the system will automatically prompt you to update your Canvas session
- Follow the in-app instructions to get and paste a new Canvas session cookie
- The system will validate and update your session automatically
- Your courses will re-sync immediately after updating
- Session cookies typically expire after a few days/weeks

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

