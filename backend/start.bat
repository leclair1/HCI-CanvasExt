@echo off
REM Canvas LMS Extension Backend - Docker Start Script (Windows)

echo.
echo 🚀 Starting Canvas LMS Extension Backend...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo ✅ Docker is running
echo.

REM Start services
echo 📦 Starting PostgreSQL + Backend...
docker-compose up -d

REM Wait for services
echo.
echo ⏳ Waiting for services to start...
timeout /t 5 /nobreak >nul

REM Check status
echo.
echo 📊 Service Status:
docker-compose ps

echo.
echo ✨ Backend is ready!
echo.
echo 📍 API Server: http://localhost:8000
echo 📍 API Docs: http://localhost:8000/api/docs
echo.
echo 💡 Useful commands:
echo    docker-compose logs -f        # View logs
echo    docker-compose down           # Stop services
echo    docker-compose restart        # Restart services
echo.
pause


