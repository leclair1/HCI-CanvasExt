# 🚀 Quick Start - Docker Backend

Your Canvas LMS Extension backend is now fully running in Docker!

## ✅ What's Running

```
✓ PostgreSQL Database (canvas_ext_db) - Port 5432
✓ FastAPI Backend (canvas_ext_backend) - Port 8000
```

## 🌐 Access Your API

- **API Server**: http://localhost:8000
- **Interactive Docs (Swagger)**: http://localhost:8000/api/docs ← **Try this first!**
- **Alternative Docs (ReDoc)**: http://localhost:8000/api/redoc
- **Health Check**: http://localhost:8000/health

## 📝 Quick Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Just backend
docker-compose logs -f backend

# Just database
docker-compose logs -f postgres
```

### Stop/Start Services
```bash
# Stop everything
docker-compose stop

# Start everything
docker-compose start

# Restart backend
docker-compose restart backend

# Stop and remove everything
docker-compose down
```

### Code Changes
Your code has **hot-reload enabled**! Just edit files in `app/` and the server automatically restarts.

No need to rebuild for code changes! 🎯

## 🧪 Test the API

### 1. Open API Docs
Visit: http://localhost:8000/api/docs

### 2. Test Health Endpoint
```powershell
Invoke-WebRequest -Uri http://localhost:8000/health -UseBasicParsing
```

### 3. Seed Database with Sample Data
```bash
docker exec -it canvas_ext_backend python seed_data.py
```

### 4. Test Canvas Integration

**Get your Canvas token:**
1. Log into Canvas
2. Account → Settings
3. New Access Token
4. Copy the token

**Authenticate:**
```powershell
Invoke-WebRequest -Uri http://localhost:8000/api/v1/canvas/auth -Method Post -ContentType "application/json" -Body '{
  "canvas_url": "https://canvas.instructure.com",
  "access_token": "YOUR_TOKEN_HERE"
}' -UseBasicParsing
```

**Sync your data:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8000/api/v1/canvas/sync?user_id=1" -Method Post -UseBasicParsing
```

## 📊 Database Access

### Connect to PostgreSQL
```bash
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext
```

### View Data
```sql
-- List tables
\dt

-- View courses
SELECT * FROM courses;

-- View assignments
SELECT * FROM assignments;

-- Exit
\q
```

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Restart
docker-compose restart backend
```

### Database connection error
```bash
# Check database health
docker-compose ps

# Restart database
docker-compose restart postgres
```

### Port already in use
Edit `docker-compose.yml` and change ports:
```yaml
ports:
  - "8001:8000"  # Changed from 8000:8000
```

### Reset everything
```bash
# Stop and remove all data (⚠️ DELETES DATABASE)
docker-compose down -v

# Start fresh
docker-compose up -d
```

## 📁 Project Structure

```
backend/
├── app/                    # Your application code
│   ├── api/               # API routes
│   │   └── v1/
│   │       ├── canvas.py  # Canvas integration
│   │       ├── courses.py # Course endpoints
│   │       └── ...
│   ├── models/            # Database models
│   ├── services/          # Business logic
│   └── main.py           # FastAPI app
├── docker-compose.yml     # Docker services
├── Dockerfile            # Backend container
├── requirements.txt      # Python packages
└── seed_data.py         # Sample data script
```

## 🎯 Next Steps

1. ✅ **Test the API**: http://localhost:8000/api/docs
2. ✅ **Get Canvas token** and authenticate
3. ✅ **Sync your Canvas data**
4. ✅ **Connect your frontend** to the API
5. ✅ **Build amazing features!**

## 📖 More Documentation

- **Canvas Integration**: [CANVAS_INTEGRATION.md](./CANVAS_INTEGRATION.md)
- **Docker Guide**: [DOCKER_GUIDE.md](./DOCKER_GUIDE.md)
- **Full README**: [README.md](./README.md)

## 🎨 Frontend Integration

Update your frontend to use the API:

```typescript
// Instead of mockData, fetch from API
const response = await fetch('http://localhost:8000/api/v1/courses');
const courses = await response.json();
```

---

**🎉 You're all set! Your backend is running smoothly in Docker.**

Need help? Check the logs: `docker-compose logs -f`

