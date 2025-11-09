from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class Quiz(Base):
    __tablename__ = "quizzes"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=True)
    
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    questions = relationship("QuizQuestion", back_populates="quiz", cascade="all, delete-orphan")
    attempts = relationship("QuizAttempt", back_populates="quiz", cascade="all, delete-orphan")


class QuizQuestion(Base):
    __tablename__ = "quiz_questions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=False)
    
    question_text = Column(Text, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)  # A, B, C, or D
    
    order = Column(Integer, default=0)
    
    # Relationships
    quiz = relationship("Quiz", back_populates="questions")


class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    score = Column(Integer, nullable=False)
    total_questions = Column(Integer, nullable=False)
    
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    # Relationships
    quiz = relationship("Quiz", back_populates="attempts")
    answers = relationship("QuizAnswer", back_populates="attempt", cascade="all, delete-orphan")


class QuizAnswer(Base):
    __tablename__ = "quiz_answers"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    attempt_id = Column(Integer, ForeignKey("quiz_attempts.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("quiz_questions.id"), nullable=False)
    
    user_answer = Column(String, nullable=False)
    is_correct = Column(Boolean, nullable=False)
    
    # Relationships
    attempt = relationship("QuizAttempt", back_populates="answers")


