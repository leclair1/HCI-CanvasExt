import { useState, type MouseEvent } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  Brain,
  Sparkles,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockFlashcards, mockQuizQuestions, mockFlashcardsByCourse, mockCourses, getCourseColor } from '../lib/mockData';
import { Checkbox } from './ui/checkbox';
import { applyAlpha } from '../lib/colorUtils';

interface FlashcardInterfaceProps {
  onBack: () => void;
}

export default function FlashcardInterface({ onBack }: FlashcardInterfaceProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [isStudying, setIsStudying] = useState(false);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'flashcards' | 'quiz'>('flashcards');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Get filtered flashcards based on selections
  const getFilteredFlashcards = () => {
    if (!selectedCourse) return mockFlashcards;
    
    const courseData = mockFlashcardsByCourse[selectedCourse as keyof typeof mockFlashcardsByCourse];
    if (!courseData) return mockFlashcards;

    if (selectedLessons.length === 0) {
      // If no lessons selected, use all lessons from the course
      return courseData.lessons.flatMap(lesson => lesson.flashcards);
    }

    // Filter by selected lessons
    return courseData.lessons
      .filter(lesson => selectedLessons.includes(lesson.id))
      .flatMap(lesson => lesson.flashcards);
  };

  const filteredFlashcards = getFilteredFlashcards();
  const currentCard = filteredFlashcards[currentCardIndex];
  const currentQuestion = mockQuizQuestions[currentCardIndex];

  const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const items = mode === 'flashcards' ? filteredFlashcards : mockQuizQuestions;
    const maxIndex = items.length - 1;

    if (maxIndex < 0) {
      setIsFlipped(false);
      return;
    }

    setCurrentCardIndex(prev => (prev < maxIndex ? prev + 1 : prev));
    setIsFlipped(false);
  };

  const handlePrevious = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentCardIndex(prev => (prev > 0 ? prev - 1 : prev));
    setIsFlipped(false);
  };

  const handleFlip = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFlipped(prev => !prev);
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const calculateQuizScore = () => {
    let correct = 0;
    mockQuizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return (correct / mockQuizQuestions.length) * 100;
  };

  const handleStartStudying = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!selectedCourse) return;
    setIsStudying(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleSelectAllLessons = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!selectedCourse) return;
    const courseData = mockFlashcardsByCourse[selectedCourse as keyof typeof mockFlashcardsByCourse];
    if (!courseData) return;
    
    const allLessonIds = courseData.lessons.map(l => l.id);
    if (selectedLessons.length === allLessonIds.length) {
      setSelectedLessons([]);
    } else {
      setSelectedLessons(allLessonIds);
    }
  };

  const handleBackToSelection = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsStudying(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setQuizAnswers({});
    setShowResults(false);
  };

  const toggleLesson = (lessonId: string) => {
    setSelectedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  // Course and Lesson Selection View
  if (!isStudying) {
    const courseData = selectedCourse 
      ? mockFlashcardsByCourse[selectedCourse as keyof typeof mockFlashcardsByCourse]
      : null;

    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onBack();
            }}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-foreground">Smart Study Tools</h1>
              <p className="text-sm text-muted-foreground">
                {selectedCourse ? 'Select lessons to study' : 'Select a course to get started'}
              </p>
            </div>
          </div>
        </div>

        {/* Course Selection */}
        {!selectedCourse ? (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-foreground mb-2">Choose a Course</h2>
              <p className="text-sm text-muted-foreground">
                Select which course you'd like to study
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {mockCourses.map((course) => {
                const hasCourseData = mockFlashcardsByCourse[course.id as keyof typeof mockFlashcardsByCourse];
                const courseFlashcardData = hasCourseData ? mockFlashcardsByCourse[course.id as keyof typeof mockFlashcardsByCourse] : null;
                const totalFlashcards = courseFlashcardData 
                  ? courseFlashcardData.lessons.reduce((sum, lesson) => sum + lesson.flashcards.length, 0)
                  : 0;
                const courseColor = getCourseColor(course.id);
                const cardBackground = `linear-gradient(135deg, ${courseColor.light} 0%, ${applyAlpha(courseColor.primary, 0.12)} 45%, ${applyAlpha(courseColor.primary, 0.32)} 100%)`;

                return (
                  <Card
                    key={course.id}
                    className="p-6 cursor-pointer border border-transparent transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      background: cardBackground,
                      boxShadow: `0 18px 36px -24px ${applyAlpha(courseColor.primary, 0.6)}`,
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (hasCourseData) {
                        setSelectedCourse(course.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{
                          background: applyAlpha(courseColor.primary, 0.22),
                          border: `1px solid ${applyAlpha(courseColor.primary, 0.35)}`,
                          color: courseColor.foreground,
                        }}
                      >
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-lg font-semibold tracking-tight mb-1"
                          style={{ color: courseColor.dark }}
                        >
                          {course.code}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{course.name}</p>
                        {hasCourseData ? (
                          <div className="flex items-center gap-3 text-xs font-medium">
                            <span
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/70 shadow-sm"
                              style={{ color: courseColor.primary }}
                            >
                              {courseFlashcardData?.lessons.length} modules
                            </span>
                            <span
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                              style={{
                                background: applyAlpha(courseColor.primary, 0.16),
                                color: courseColor.dark,
                              }}
                            >
                              {totalFlashcards} flashcards
                            </span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-xs">No flashcards available</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          /* Lesson Selection */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground mb-1">{courseData?.courseName}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedLessons.length === 0 
                    ? 'All lessons selected' 
                    : `${selectedLessons.length} lesson${selectedLessons.length !== 1 ? 's' : ''} selected`}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setSelectedCourse(null);
                }}
              >
                Change Course
              </Button>
            </div>

            <Card className="p-4 bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-sm text-foreground">
                  Select specific lessons or study all available flashcards from this course.
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground">Select Lessons</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSelectAllLessons}
                >
                  {selectedLessons.length === courseData?.lessons.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>

              <div className="space-y-3">
                {courseData?.lessons.map((lesson) => {
                  const isSelected = selectedLessons.includes(lesson.id);
                  const isAllSelected = selectedLessons.length === 0;
                  
                  return (
                    <Card
                      key={lesson.id}
                      className={`p-4 cursor-pointer transition-all ${
                        isSelected || isAllSelected
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleLesson(lesson.id);
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="pt-1">
                          <Checkbox 
                            checked={isSelected || isAllSelected}
                            onCheckedChange={() => toggleLesson(lesson.id)}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <h4 className="text-foreground">{lesson.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {lesson.flashcards.length} flashcard{lesson.flashcards.length !== 1 ? 's' : ''} available
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleStartStudying}
                className="flex-1"
                disabled={filteredFlashcards.length === 0}
              >
                Start Studying ({filteredFlashcards.length} flashcard{filteredFlashcards.length !== 1 ? 's' : ''})
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Study Interface (existing flashcard view)
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBackToSelection} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Selection
        </Button>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-foreground">Smart Study Tools</h1>
            <p className="text-sm text-muted-foreground">
              {selectedCourse 
                ? mockFlashcardsByCourse[selectedCourse as keyof typeof mockFlashcardsByCourse]?.courseName
                : 'AI-generated flashcards'}
            </p>
          </div>
        </div>
      </div>



      {/* Mode Tabs */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as 'flashcards' | 'quiz')} className="space-y-6">
        <TabsList className="bg-muted w-full">
          <TabsTrigger value="flashcards" className="flex-1">Flashcards</TabsTrigger>
          <TabsTrigger value="quiz" className="flex-1">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Flashcards Mode */}
        <TabsContent value="flashcards" className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Card {currentCardIndex + 1} of {filteredFlashcards.length}
              </span>
              <span className="text-muted-foreground">
                {Math.round(((currentCardIndex + 1) / filteredFlashcards.length) * 100)}% Complete
              </span>
            </div>
            <Progress value={((currentCardIndex + 1) / filteredFlashcards.length) * 100} className="h-2" />
          </div>

          {/* Flashcard */}
          <div className="perspective-1000">
            <div
              className={`relative w-full transition-transform duration-500 transform-style-3d cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsFlipped(prev => !prev);
              }}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
              }}
            >
              {/* Front */}
              <Card
                className={`min-h-[260px] p-6 flex flex-col items-center justify-center text-center backface-hidden ${
                  isFlipped ? 'hidden' : ''
                }`}
              >
                <Badge className="mb-3">Question</Badge>
                <p className="text-foreground mb-4">{currentCard?.question}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RotateCw className="h-4 w-4" />
                  <span>Click to flip</span>
                </div>
              </Card>

              {/* Back */}
              <Card
                className={`min-h-[260px] p-6 flex flex-col items-center justify-center text-center backface-hidden ${
                  !isFlipped ? 'hidden' : ''
                }`}
                style={{ transform: 'rotateY(180deg)' }}
              >
                <Badge className="mb-3" variant="secondary">Answer</Badge>
                <p className="text-foreground mb-4">{currentCard?.answer}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RotateCw className="h-4 w-4" />
                  <span>Click to flip</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleFlip}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleNext}
              disabled={currentCardIndex === filteredFlashcards.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        {/* Quiz Mode */}
        <TabsContent value="quiz" className="space-y-6">
          {!showResults ? (
            <>
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Question {currentCardIndex + 1} of {mockQuizQuestions.length}
                  </span>
                  <span className="text-muted-foreground">
                    {Object.keys(quizAnswers).length} / {mockQuizQuestions.length} Answered
                  </span>
                </div>
                <Progress value={((currentCardIndex + 1) / mockQuizQuestions.length) * 100} className="h-2" />
              </div>

              {/* Question */}
              <Card className="p-6">
                <div className="mb-4">
                  <Badge className="mb-3">Question {currentCardIndex + 1}</Badge>
                  <h3 className="text-foreground">{currentQuestion.question}</h3>
                </div>

                <div className="space-y-2">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = quizAnswers[currentCardIndex] === idx;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleQuizAnswer(currentCardIndex, idx);
                        }}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                          }`}>
                            {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                          </div>
                          <span className="text-foreground">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentCardIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentCardIndex === mockQuizQuestions.length - 1 ? (
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setShowResults(true);
                    }}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Quiz Results */
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl text-primary">{Math.round(calculateQuizScore())}%</span>
                </div>
                <h3 className="text-foreground mb-1">Quiz Complete!</h3>
                <p className="text-sm text-muted-foreground">
                  You got {Object.values(quizAnswers).filter((ans, idx) => ans === mockQuizQuestions[idx].correctAnswer).length} out of {mockQuizQuestions.length} correct
                </p>
              </div>

              <div className="space-y-3">
                {mockQuizQuestions.map((question, idx) => {
                  const userAnswer = quizAnswers[idx];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={idx} className="p-3 rounded-lg border border-border">
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <div className="w-6 h-6 bg-chart-2 rounded-full flex items-center justify-center shrink-0">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center shrink-0">
                            <X className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-foreground mb-2">{question.question}</p>
                          {!isCorrect && (
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">
                                Your answer: <span className="text-destructive">{question.options[userAnswer]}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Correct answer: <span className="text-chart-2">{question.options[question.correctAnswer]}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setShowResults(false);
                    setCurrentCardIndex(0);
                    setQuizAnswers({});
                  }}
                  className="flex-1"
                >
                  Retake Quiz
                </Button>
                <Button onClick={handleBackToSelection} className="flex-1">
                  Back to Selection
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
