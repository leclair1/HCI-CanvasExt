from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class QuizQuestionBase(BaseModel):
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str

class QuizQuestionCreate(QuizQuestionBase):
    pass

class QuizQuestion(QuizQuestionBase):
    id: int
    quiz_id: int
    order: int
    
    class Config:
        from_attributes = True

class QuizQuestionPublic(BaseModel):
    """Quiz question without correct answer - for students"""
    id: int
    question_text: str
    options: List[str]
    
class QuizBase(BaseModel):
    title: str
    description: Optional[str] = None
    course_id: Optional[int] = None

class QuizCreate(QuizBase):
    questions: List[QuizQuestionCreate]

class Quiz(QuizBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    questions: List[QuizQuestion]
    
    class Config:
        from_attributes = True

class QuizPublic(BaseModel):
    """Quiz without answers - for students"""
    id: int
    title: str
    description: Optional[str]
    questions: List[QuizQuestionPublic]

class QuizAnswerSubmit(BaseModel):
    question_id: int
    user_answer: str

class QuizSubmit(BaseModel):
    quiz_id: int
    answers: List[QuizAnswerSubmit]

class QuizResultAnswer(BaseModel):
    question: str
    user_answer: str
    correct_answer: str
    is_correct: bool

class QuizResult(BaseModel):
    score: int
    total: int
    answers: List[QuizResultAnswer]
    attempt_id: int

class GenerateQuizRequest(BaseModel):
    course_id: Optional[int] = None
    num_questions: int = 5
    topics: Optional[List[str]] = None


