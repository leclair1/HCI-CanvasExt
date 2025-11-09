# Docker Setup Guide - Backend V2

Complete guide for running the Canvas LMS Extension Backend with Docker (PostgreSQL + FastAPI).

## Why Docker?

✅ **No Python installation needed** on your machine  
✅ **PostgreSQL included** - production-ready database  
✅ **Consistent environment** - works the same everywhere  
✅ **Easy cleanup** - remove everything with one command  
✅ **Hot reload** - code changes apply automatically  

## Prerequisites

**Only requirement:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- Windows: Docker Desktop for Windows
- Mac: Docker Desktop for Mac
- Linux: Docker Engine

## Quick Start (3 Steps)

### 1. Navigate to Backend Directory

```bash
cd HCI-CanvasExt/backend
```

### 2. Start Everything

**Option A: Using Docker Compose**
```bash
docker-compose up -d
```

**Option B: Using Start Scripts**

Windows:
```bash
start.bat
```

Linux/Mac:
```bash
chmod +x start.sh
./start.sh
```

### 3. Access the API

- **API Server:** http://localhost:8000
- **Interactive Docs:** http://localhost:8000/api/docs
- **Alternative Docs:** http://localhost:8000/api/redoc

**That's it!** 🎉 No pip install, no Python setup needed.

## What Just Happened?

When you ran `docker-compose up -d`, Docker:

1. ✅ Downloaded PostgreSQL 16 (if not already downloaded)
2. ✅ Built the FastAPI backend image with all dependencies
3. ✅ Started PostgreSQL database on port 5432
4. ✅ Started FastAPI backend on port 8000
5. ✅ Created database tables automatically
6. ✅ Set up networking between services

## Container Details

### PostgreSQL Container
- **Name:** `canvas_ext_db`
- **Port:** 5432
- **Database:** `canvas_ext`
- **User:** `canvas_user`
- **Password:** `canvas_password`
- **Data Storage:** Docker volume `postgres_data` (persists across restarts)

### Backend Container
- **Name:** `canvas_ext_backend`
- **Port:** 8000
- **Image:** Built from `Dockerfile`
- **Base:** Python 3.11
- **Features:**
  - Auto-reload on code changes
  - JWT authentication
  - PostgreSQL connection
  - CORS configured for common ports

## Essential Commands

### Start Services
```bash
docker-compose up -d
```
- `-d` = detached mode (runs in background)

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All logs (follow mode)
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# PostgreSQL only
docker-compose logs -f postgres

# Last 50 lines
docker-compose logs --tail=50

# Exit logs: Ctrl+C
```

### Check Status
```bash
# Container status
docker-compose ps

# Detailed info
docker ps

# Resource usage
docker stats
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart backend only
docker-compose restart backend

# Restart database only
docker-compose restart postgres
```

### Stop and Remove Everything
```bash
# Stop containers
docker-compose down

# Stop and remove volumes (deletes database data!)
docker-compose down -v

# Remove backend image
docker rmi backend-canvas_ext_backend
```

## Database Operations

### Access PostgreSQL CLI

```bash
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext
```

### Common SQL Commands

```sql
-- List all tables
\dt

-- View table schema
\d users

-- View users
SELECT id, first_name, last_name, email FROM users;

-- View courses
SELECT * FROM courses;

-- View quizzes
SELECT id, title, created_at FROM quizzes;

-- Count records
SELECT COUNT(*) FROM users;

-- Exit psql
\q
```

### Reset Database

```bash
# Stop services and delete database
docker-compose down -v

# Start services (creates fresh database)
docker-compose up -d
```

### Backup Database

```bash
# Backup to SQL file
docker exec -t canvas_ext_db pg_dump -U canvas_user canvas_ext > backup_$(date +%Y%m%d).sql

# Backup with timestamp
docker exec -t canvas_ext_db pg_dump -U canvas_user canvas_ext > backup.sql
```

### Restore Database

```bash
# Restore from SQL file
docker exec -i canvas_ext_db psql -U canvas_user canvas_ext < backup.sql
```

## Development Workflow

### Making Code Changes

1. **Edit code** in `app/` directory
2. **Save file**
3. **Wait 2-3 seconds** - backend auto-reloads
4. **Test changes** - no restart needed!

Code is mounted as a volume, so changes apply immediately.

### If Auto-Reload Doesn't Work

```bash
# Rebuild backend
docker-compose build backend

# Restart backend
docker-compose up -d backend
```

### Viewing Real-Time Logs While Developing

```bash
# In a separate terminal, watch logs
docker-compose logs -f backend
```

## Configuration

### Default Configuration

Everything works out of the box with these defaults:

- **Database URL:** `postgresql://canvas_user:canvas_password@postgres:5432/canvas_ext`
- **SECRET_KEY:** Development key (change for production!)
- **CORS Origins:** `localhost:5173`, `localhost:5174`, `localhost:3000`
- **Token Expiration:** 30 days

### Custom Configuration

Create a `.env` file in the `backend/` directory:

```env
# Security (IMPORTANT for production!)
SECRET_KEY=your-generated-secret-key

# AI API Keys (optional)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

Generate a secure SECRET_KEY:
```bash
docker run --rm alpine/openssl rand -hex 32
```

After creating/modifying `.env`:
```bash
docker-compose down
docker-compose up -d
```

### Changing Ports

Edit `docker-compose.yml`:

```yaml
services:
  postgres:
    ports:
      - "5433:5432"  # Change PostgreSQL port
  
  backend:
    ports:
      - "8001:8000"  # Change backend port
```

## Testing the API

### Using Swagger UI (Easiest)

1. Open http://localhost:8000/api/docs
2. Click "Try it out" on any endpoint
3. Fill in parameters
4. Click "Execute"
5. See the response

### Using cURL

```bash
# Health check
curl http://localhost:8000/health

# Sign up
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@university.edu",
    "password": "test123456"
  }'

# Save the token from the response, then:
TOKEN="your_token_here"

# Get dashboard
curl http://localhost:8000/api/v1/dashboard/ \
  -H "Authorization: Bearer $TOKEN"
```

### Using Postman

1. Import the API from http://localhost:8000/api/docs
2. Or manually create requests with:
   - Base URL: `http://localhost:8000/api/v1`
   - Headers: `Authorization: Bearer YOUR_TOKEN`

## Troubleshooting

### Services Won't Start

**Check Docker Desktop is running:**
```bash
docker --version
docker info
```

**View error logs:**
```bash
docker-compose logs
```

**Common fixes:**
```bash
# Restart Docker Desktop
# Then:
docker-compose down
docker-compose up -d
```

### Port Already in Use

**Find what's using the port:**
```bash
# Windows
netstat -ano | findstr :8000

# Mac/Linux
lsof -i :8000
```

**Change port in docker-compose.yml** (see Configuration section above)

### Database Connection Errors

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

**If still failing, recreate:**
```bash
docker-compose down -v
docker-compose up -d
```

### Backend Container Keeps Restarting

**View backend logs:**
```bash
docker-compose logs backend
```

**Common causes:**
- Database not ready: Wait 10-15 seconds
- Python errors: Check logs for traceback
- Missing files: Ensure all files are present

**Fix:**
```bash
docker-compose build backend
docker-compose up -d backend
```

### Changes Not Reflecting

**Verify volume mount:**
```bash
docker-compose config
# Check volumes section shows: ./app:/app/app
```

**Force rebuild:**
```bash
docker-compose build --no-cache backend
docker-compose up -d backend
```

### "Module not found" Errors

**Rebuild with new dependencies:**
```bash
docker-compose build --no-cache backend
docker-compose up -d backend
```

### Out of Disk Space

**Clean up Docker:**
```bash
# Remove unused containers, images, networks
docker system prune

# Also remove volumes (WARNING: deletes data!)
docker system prune --volumes
```

## Performance Tips

### View Resource Usage

```bash
docker stats
```

### Limit Resources (if needed)

Edit `docker-compose.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
```

## Production Deployment

### Before Deploying

1. **Generate secure SECRET_KEY:**
   ```bash
   docker run --rm alpine/openssl rand -hex 32
   ```

2. **Update docker-compose.yml:**
   ```yaml
   environment:
     SECRET_KEY: ${SECRET_KEY}
     DATABASE_URL: postgresql://user:pass@prod-db:5432/dbname
     CORS_ORIGINS: '["https://yourdomain.com"]'
   ```

3. **Use strong database password**

4. **Enable HTTPS** (use nginx/traefik reverse proxy)

5. **Set up backups** (automated pg_dump)

6. **Enable monitoring** (logging, metrics)

### Production Commands

```bash
# Start in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# View production logs
docker-compose logs --tail=100 -f
```

## Useful Docker Commands

```bash
# List all containers
docker ps -a

# List all images
docker images

# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# View Docker disk usage
docker system df

# Get container IP
docker inspect canvas_ext_backend | grep IPAddress

# Execute command in container
docker exec canvas_ext_backend ls -la

# Copy file from container
docker cp canvas_ext_backend:/app/file.txt ./

# Copy file to container
docker cp ./file.txt canvas_ext_backend:/app/
```

## Network Architecture

```
┌─────────────────────────────────────┐
│         Docker Network              │
│        (canvas_network)             │
│                                     │
│  ┌──────────────┐  ┌─────────────┐│
│  │  PostgreSQL  │  │   Backend   ││
│  │              │◄─┤             ││
│  │  Port: 5432  │  │  Port: 8000 ││
│  └──────────────┘  └─────────────┘│
│         ▲                ▲         │
└─────────┼────────────────┼─────────┘
          │                │
     Port 5432         Port 8000
          │                │
    ┌─────┴────────────────┴──────┐
    │      Host Machine           │
    │   (Your Computer)           │
    └─────────────────────────────┘
```

## FAQ

**Q: Do I need Python installed?**  
A: No! Everything runs in Docker containers.

**Q: Can I access the database from my machine?**  
A: Yes, port 5432 is exposed. Use any PostgreSQL client with:
- Host: localhost
- Port: 5432
- User: canvas_user
- Password: canvas_password
- Database: canvas_ext

**Q: Where is my data stored?**  
A: In a Docker volume named `postgres_data`. It persists across restarts.

**Q: How do I completely remove everything?**  
A: `docker-compose down -v` then `docker rmi backend-canvas_ext_backend`

**Q: Can I use SQLite instead?**  
A: Not recommended with Docker. PostgreSQL is better for production.

**Q: How much disk space needed?**  
A: ~1-2 GB for images + database data

**Q: Can I run multiple projects?**  
A: Yes, but change container names and ports in docker-compose.yml

## Next Steps

✅ Backend is running with Docker!

Now:
1. **Connect your Frontend V2** to http://localhost:8000/api/v1
2. **Test authentication** flow
3. **Explore API** at http://localhost:8000/api/docs
4. **Build features** - code changes apply automatically!

## Additional Resources

- **Docker Documentation:** https://docs.docker.com/
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/
- **FastAPI Documentation:** https://fastapi.tiangolo.com/
- **API Reference:** See `API_REFERENCE_V2.md`
- **Setup Guide:** See `SETUP_GUIDE_V2.md`

---

**Status:** ✅ Docker Setup Complete  
**Database:** PostgreSQL 16 in Docker  
**Backend:** FastAPI with hot reload  
**No Local Dependencies:** Everything runs in containers


