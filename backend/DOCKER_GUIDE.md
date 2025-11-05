# Docker Setup Guide

Running the backend entirely in Docker eliminates all Windows compilation issues and makes deployment easier.

## 🚀 Quick Start

### Option 1: Use the startup script (Windows)
```bash
start-docker.bat
```

### Option 2: Manual commands
```bash
# Start everything
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

## 📦 What Gets Started

1. **PostgreSQL Database** on port `5432`
2. **FastAPI Backend** on port `8000`

## 🌐 Access Points

- **API Server**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/docs
- **Alternative Docs**: http://localhost:8000/api/redoc
- **Health Check**: http://localhost:8000/health

## 🔧 Common Commands

### Start services
```bash
docker-compose up -d
```

### View logs (all services)
```bash
docker-compose logs -f
```

### View logs (specific service)
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Restart a service
```bash
docker-compose restart backend
```

### Stop services
```bash
docker-compose down
```

### Stop and remove all data (⚠️ DELETES DATABASE)
```bash
docker-compose down -v
```

### Rebuild after code changes
```bash
docker-compose up --build
```

## 🗄️ Database Access

### Connect to PostgreSQL
```bash
docker exec -it canvas_ext_db psql -U canvas_user -d canvas_ext
```

### Run seed script
```bash
# Method 1: From inside the backend container
docker exec -it canvas_ext_backend python seed_data.py

# Method 2: Copy script and run
docker cp seed_data.py canvas_ext_backend:/app/
docker exec -it canvas_ext_backend python seed_data.py
```

## 🔄 Development Workflow

The `docker-compose.yml` is configured with hot-reload:
- Changes to `app/` directory automatically reload the server
- No need to rebuild for code changes
- Just edit and save - Docker handles the rest!

### Making code changes:
1. Edit files in `app/` directory
2. Save
3. Wait 1-2 seconds for reload
4. Test at http://localhost:8000

### Adding new Python packages:
1. Add to `requirements.txt`
2. Rebuild: `docker-compose up --build`

## 🐛 Troubleshooting

### Port already in use
```bash
# Find what's using the port
netstat -ano | findstr :8000

# Kill the process or change the port in docker-compose.yml
```

### Permission errors
```bash
# Run as administrator or ensure Docker Desktop is running
```

### Database connection errors
```bash
# Check if PostgreSQL is healthy
docker-compose ps

# Restart database
docker-compose restart postgres
```

### Container won't start
```bash
# Check logs for errors
docker-compose logs backend

# Remove containers and try again
docker-compose down
docker-compose up --build
```

### "Module not found" errors
```bash
# Rebuild with no cache
docker-compose build --no-cache
docker-compose up
```

## 📊 Monitoring

### Check service status
```bash
docker-compose ps
```

### Check resource usage
```bash
docker stats canvas_ext_backend canvas_ext_db
```

### View service health
```bash
curl http://localhost:8000/health
```

## 🚀 Production Deployment

For production, update `docker-compose.yml`:

1. **Remove development features:**
   - Remove `--reload` flag
   - Remove volume mount for hot-reload

2. **Add security:**
   - Use environment file for secrets
   - Add restart policies
   - Use proper domain names

3. **Scale if needed:**
```bash
docker-compose up --scale backend=3
```

## 🔒 Security Notes

- Database credentials are in `docker-compose.yml` (OK for dev)
- For production: Use Docker secrets or .env file
- Never commit `.env` files with real credentials

## 💡 Tips

1. **First time setup**: Run `docker-compose up` without `-d` to see logs
2. **Debugging**: Use `docker-compose logs -f backend` to watch API logs
3. **Clean slate**: `docker-compose down -v && docker-compose up --build`
4. **Save database**: Backup volume with `docker run --rm -v canvas_ext_postgres_data:/data -v $(pwd):/backup ubuntu tar czf /backup/db-backup.tar.gz /data`

## 🎯 Next Steps

1. Start services: `start-docker.bat`
2. Verify API works: http://localhost:8000/api/docs
3. Test Canvas integration
4. Connect your frontend to http://localhost:8000

---

Need help? Check logs with `docker-compose logs -f` or visit http://localhost:8000/api/docs for API testing.

