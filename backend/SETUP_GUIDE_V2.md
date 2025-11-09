# Quick Setup Guide for Frontend V2 Backend (Docker)

This guide will help you set up the updated backend using **Docker** (PostgreSQL + FastAPI) - no local Python installation needed!

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git (optional)

That's it! Everything else runs in Docker containers.

## Step 1: Start the Services

```bash
cd HCI-CanvasExt/backend

# Start PostgreSQL + Backend
docker-compose up -d
```

This command will:
1. Download PostgreSQL 16 image (if not already downloaded)
2. Build the FastAPI backend image
3. Start both services
4. Create the database automatically

**First time?** Building the backend image may take 2-3 minutes.

## Step 2: Verify Services are Running

```bash
# Check if containers are running
docker-compose ps

# You should see:
# - canvas_ext_db (postgres)
# - canvas_ext_backend (fastapi)
```

## Step 3: View Logs (Optional)

```bash
# View all logs
docker-compose logs -f

# View only backend logs
docker-compose logs -f backend

# View only database logs
docker-compose logs -f postgres
```

Press `Ctrl+C` to stop viewing logs.

## Step 4: Access the API

The backend is now running!

- **API Server:** http://localhost:8000
- **API Documentation (Swagger):** http://localhost:8000/api/docs
- **Alternative Docs (ReDoc):** http://localhost:8000/api/redoc

## Step 5: Test the API

### Option A: Using Swagger UI (Easiest)

1. Go to http://localhost:8000/api/docs
2. Find `/api/v1/auth/signup` endpoint
3. Click "Try it out"
4. Enter test data:
   ```json
   {
     "first_name": "Test",
     "last_name": "User",
     "email": "test@university.edu",
     "password": "test123456"
   }
   ```
5. Click "Execute"
6. You should receive a token!

### Option B: Using cURL

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

# You should receive a response with access_token and user data
```

## Configuration

### Default Settings

The docker-compose.yml is pre-configured with:
- **Database:** PostgreSQL on port 5432
- **Backend:** FastAPI on port 8000
- **CORS:** Allows http://localhost:5173, 5174, 3000
- **Auth Token:** 30-day expiration

### Custom Configuration (Optional)

Create a `.env` file in the backend directory:

```bash
# Create .env file
touch .env  # On Windows: type nul > .env
```

Add custom settings:

```env
# Generate a secure secret key for production
SECRET_KEY=your-generated-secret-key-here

# Optional: AI API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

To generate a secure SECRET_KEY:
```bash
# Using openssl
docker run --rm alpine/openssl rand -hex 32

# Or use Python
python -c "import secrets; print(secrets.token_hex(32))"
```

Restart services after creating .env:
```bash
docker-compose down
docker-compose up -d
```

## Database Management

### Access PostgreSQL Database

```bash
# Connect to PostgreSQL
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext
```

Inside psql:
```sql
-- List all tables
\dt

-- View users
SELECT id, first_name, last_name, email FROM users;

-- View courses
SELECT * FROM courses;

-- Exit
\q
```

### Reset Database (Fresh Start)

```bash
# Stop services
docker-compose down

# Remove database volume (deletes all data)
docker volume rm backend_postgres_data

# Start services (creates fresh database)
docker-compose up -d
```

## Common Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

### Rebuild Backend (after code changes)
```bash
docker-compose build backend
docker-compose up -d backend
```

### View Logs
```bash
# All logs
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100
```

### Check Service Health
```bash
# Container status
docker-compose ps

# Resource usage
docker stats
```

## Connect Frontend V2

Update your frontend's API base URL to:
```javascript
const API_BASE_URL = "http://localhost:8000/api/v1";
```

## Troubleshooting

### Issue: "Port 8000 already in use"

**Check what's using the port:**
```bash
# On Windows
netstat -ano | findstr :8000

# On Linux/Mac
lsof -i :8000
```

**Change the backend port in docker-compose.yml:**
```yaml
backend:
  ports:
    - "8001:8000"  # Use port 8001 instead
```

Then restart: `docker-compose up -d`

### Issue: "Cannot connect to database"

**Check PostgreSQL is running:**
```bash
docker-compose ps postgres
```

**View database logs:**
```bash
docker-compose logs postgres
```

**Restart database:**
```bash
docker-compose restart postgres
```

### Issue: Backend container keeps restarting

**View backend logs:**
```bash
docker-compose logs backend
```

**Common causes:**
- Database not ready (wait 10-15 seconds)
- Code errors (check logs for Python errors)
- Missing dependencies (rebuild: `docker-compose build backend`)

### Issue: CORS errors in browser

**Solution:** Add your frontend URL to docker-compose.yml:
```yaml
environment:
  CORS_ORIGINS: '["http://localhost:5173", "http://localhost:YOUR_PORT"]'
```

Restart: `docker-compose restart backend`

### Issue: Changes to code not reflecting

**Solution:** The code is volume-mounted for hot reload. If it's not working:
```bash
# Rebuild and restart
docker-compose build backend
docker-compose up -d backend
```

### Issue: Docker Desktop not running

**Solution:**
1. Start Docker Desktop application
2. Wait for it to fully start (green icon)
3. Run `docker-compose up -d` again

## Advanced: Development Tips

### Run Commands Inside Container

```bash
# Open bash in backend container
docker exec -it canvas_ext_backend bash

# Inside container, you can:
# - Run Python scripts
# - Check installed packages
# - Debug issues
```

### Database Backup

```bash
# Backup database
docker exec -t canvas_ext_db pg_dump -U canvas_user canvas_ext > backup.sql

# Restore database
docker exec -i canvas_ext_db psql -U canvas_user canvas_ext < backup.sql
```

### View Container Resource Usage

```bash
docker stats canvas_ext_backend canvas_ext_db
```

## What's Running?

### PostgreSQL Container
- **Name:** canvas_ext_db
- **Port:** 5432
- **User:** canvas_user
- **Password:** canvas_password
- **Database:** canvas_ext
- **Data:** Persisted in Docker volume `postgres_data`

### Backend Container
- **Name:** canvas_ext_backend
- **Port:** 8000
- **Base Image:** Python 3.11
- **Framework:** FastAPI
- **Auto-reload:** Enabled (code changes apply automatically)

## Testing the Complete Flow

```bash
# 1. Sign up
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe","email":"john@test.edu","password":"test123456"}' \
  | python -c "import sys, json; print(json.load(sys.stdin)['access_token'])" 2>/dev/null)

echo "Token: $TOKEN"

# 2. Get dashboard
curl http://localhost:8000/api/v1/dashboard/ \
  -H "Authorization: Bearer $TOKEN"

# 3. Create a saved deck
curl -X POST http://localhost:8000/api/v1/saved-decks/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Deck","cards":[{"question":"What is Docker?","answer":"A containerization platform","order":0}]}'

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
- Profile management
- Notification preferences
- Dark mode settings
- Study streak tracking

✅ **Quiz System**
- Create and take quizzes
- Instant grading
- Quiz history
- AI generation ready

✅ **Saved Flashcard Decks**
- Save custom decks
- Organize by course
- Full CRUD operations

✅ **Dashboard**
- Due today items
- Study suggestions
- Course progress
- Task tracking

## Production Deployment

For production, update docker-compose.yml:

```yaml
environment:
  # Use a secure random key
  SECRET_KEY: <generated-with-openssl-rand-hex-32>
  
  # Use production database
  DATABASE_URL: postgresql://user:pass@production-db:5432/dbname
  
  # Set proper CORS
  CORS_ORIGINS: '["https://yourdomain.com"]'
```

## Need Help?

- **API Docs:** http://localhost:8000/api/docs
- **Detailed Changes:** See `FRONTEND_V2_UPDATES.md`
- **API Examples:** See `API_REFERENCE_V2.md`
- **General Info:** See `README.md`

## Cleanup (Remove Everything)

To completely remove all containers, volumes, and images:

```bash
# Stop and remove containers
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v

# Remove backend image
docker rmi backend-canvas_ext_backend
```

---

🎉 **You're all set!** Your backend is running in Docker with PostgreSQL.

**Quick Start:**
```bash
docker-compose up -d              # Start everything
docker-compose logs -f            # View logs
docker-compose down              # Stop everything
```

Access API: http://localhost:8000/api/docs
