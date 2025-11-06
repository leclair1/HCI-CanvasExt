#!/bin/bash

# Canvas LMS Extension Backend - Docker Start Script

echo "🚀 Starting Canvas LMS Extension Backend..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Start services
echo "📦 Starting PostgreSQL + Backend..."
docker-compose up -d

# Wait for services to be healthy
echo ""
echo "⏳ Waiting for services to start..."
sleep 5

# Check status
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✨ Backend is ready!"
echo ""
echo "📍 API Server: http://localhost:8000"
echo "📍 API Docs: http://localhost:8000/api/docs"
echo ""
echo "💡 Useful commands:"
echo "   docker-compose logs -f        # View logs"
echo "   docker-compose down           # Stop services"
echo "   docker-compose restart        # Restart services"
echo ""

