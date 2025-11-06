from fastapi import APIRouter
from app.api.v1 import (
    courses, assignments, flashcards, chat, study_sessions, settings, canvas,
    auth, quizzes, saved_decks, profile, dashboard
)

api_router = APIRouter()

# Authentication
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])

# User Profile & Settings
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])

# Dashboard
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])

# Canvas Integration
api_router.include_router(canvas.router, prefix="/canvas", tags=["canvas-integration"])

# Courses & Assignments
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(assignments.router, prefix="/assignments", tags=["assignments"])

# Study Tools
api_router.include_router(flashcards.router, prefix="/flashcards", tags=["flashcards"])
api_router.include_router(quizzes.router, prefix="/quizzes", tags=["quizzes"])
api_router.include_router(saved_decks.router, prefix="/saved-decks", tags=["saved-decks"])
api_router.include_router(study_sessions.router, prefix="/study-sessions", tags=["study-sessions"])

# AI Chat
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])

