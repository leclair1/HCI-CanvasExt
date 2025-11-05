from app.schemas.course import Course, CourseCreate, CourseUpdate
from app.schemas.assignment import Assignment, AssignmentCreate, AssignmentUpdate
from app.schemas.flashcard import Flashcard, FlashcardCreate, FlashcardSet, FlashcardSetCreate
from app.schemas.study_session import StudySession, StudySessionCreate
from app.schemas.chat import ChatMessage, ChatRequest, ChatResponse
from app.schemas.settings import UserSettings, UserSettingsUpdate

__all__ = [
    "Course",
    "CourseCreate",
    "CourseUpdate",
    "Assignment",
    "AssignmentCreate",
    "AssignmentUpdate",
    "Flashcard",
    "FlashcardCreate",
    "FlashcardSet",
    "FlashcardSetCreate",
    "StudySession",
    "StudySessionCreate",
    "ChatMessage",
    "ChatRequest",
    "ChatResponse",
    "UserSettings",
    "UserSettingsUpdate",
]

