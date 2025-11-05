from fastapi import APIRouter
from app.api.v1 import courses, assignments, flashcards, chat, study_sessions, settings, canvas

api_router = APIRouter()

api_router.include_router(canvas.router, prefix="/canvas", tags=["canvas-integration"])
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(assignments.router, prefix="/assignments", tags=["assignments"])
api_router.include_router(flashcards.router, prefix="/flashcards", tags=["flashcards"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(study_sessions.router, prefix="/study-sessions", tags=["study-sessions"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])

