#!/bin/bash
# Script to start the entire backend stack with Docker

echo "🚀 Starting Canvas Extension Backend with Docker..."
echo ""

# Build and start services
docker-compose up --build -d

echo ""
echo "✅ Services started!"
echo ""
echo "📊 PostgreSQL: localhost:5432"
echo "🌐 API Server: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/api/docs"
echo ""
echo "📝 View logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose down"
echo ""
echo "💾 Reset database (WARNING: deletes all data):"
echo "   docker-compose down -v"



