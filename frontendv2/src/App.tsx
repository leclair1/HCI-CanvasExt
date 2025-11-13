import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CourseDetails from "./components/CourseDetails";
import CourseSelection from "./components/CourseSelection";
import FlashcardSelection from "./components/FlashcardSelection";
import FlashcardStudy from "./components/FlashcardStudy";
import Quiz from "./components/Quiz";
import QuizResults from "./components/QuizResults";
import Planner from "./components/Planner";
import Insights from "./components/Insights";
import AITutor from "./components/AITutor";
import AITutorSelection from "./components/AITutorSelection";
import SavedFlashcards from "./components/SavedFlashcards";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileSettings from "./components/ProfileSettings";
import CanvasSessionPrompt from "./components/CanvasSessionPrompt";
import { tokenManager } from "./lib/api";
import "./styles/globals.css";

type View = "login" | "signup" | "dashboard" | "course-details" | "course-selection" | "flashcard-selection" | "flashcard-study" | "quiz" | "quiz-results" | "planner" | "insights" | "ai-tutor-selection" | "ai-tutor" | "saved-flashcards" | "profile";

interface QuizAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardDeck {
  id: string;
  name: string;
  createdAt: string;
  cards: Flashcard[];
}

interface SavedQuiz {
  id: string;
  name: string;
  createdAt: string;
  questions: any[];
  answers?: QuizAnswer[];
  score?: number;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>("login");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [savedDecks, setSavedDecks] = useState<FlashcardDeck[]>([]);
  const [savedQuizzes, setSavedQuizzes] = useState<SavedQuiz[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Flashcard[]>([]);
  const [selectedCourse, setSelectedCourse] = useState({ id: 0, code: "CS 101", name: "Introduction to Computer Science" });
  const [generatedFlashcards, setGeneratedFlashcards] = useState<any[]>([]);
  const [generatedQuizQuestions, setGeneratedQuizQuestions] = useState<any[]>([]);
  const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);
  const [currentFlashcardCount, setCurrentFlashcardCount] = useState<number>(15);
  const [currentSelectedFiles, setCurrentSelectedFiles] = useState<string[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [aiTutorModuleId, setAiTutorModuleId] = useState<number | null>(null);
  const [aiTutorSelectedFiles, setAiTutorSelectedFiles] = useState<string[]>([]);
  const [aiTutorCourseName, setAiTutorCourseName] = useState<string>("");
  const [navigationIntent, setNavigationIntent] = useState<"flashcards" | "ai-tutor" | null>(null);
  const [showCanvasSessionPrompt, setShowCanvasSessionPrompt] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleQuizComplete = (score: number, total: number, answers: QuizAnswer[]) => {
    setQuizScore(score);
    setQuizTotal(total);
    setQuizAnswers(answers);
    setCurrentView("quiz-results");
  };

  const handleRetakeQuiz = () => {
    setCurrentView("quiz");
  };

  const handleNavigate = (view: "dashboard" | "flashcard-selection" | "planner" | "insights" | "ai-tutor" | "profile") => {
    // When navigating to flashcards or AI tutor from navbar, show course selection first
    if (view === "flashcard-selection") {
      setNavigationIntent("flashcards");
      setCurrentView("course-selection");
    } else if (view === "ai-tutor") {
      setNavigationIntent("ai-tutor");
      setCurrentView("course-selection");
    } else {
      setCurrentView(view);
    }
  };

  const handleCourseSelect = (courseId: number, courseCode: string, courseName: string) => {
    setSelectedCourse({ id: courseId, code: courseCode, name: courseName });
    
    // Navigate based on intent
    if (navigationIntent === "ai-tutor") {
      setCurrentView("ai-tutor-selection");
      setNavigationIntent(null); // Reset intent
    } else {
      setCurrentView("flashcard-selection");
      setNavigationIntent(null); // Reset intent
    }
  };

  const handleSaveDeck = (cards: Flashcard[]) => {
    const newDeck: FlashcardDeck = {
      id: Date.now().toString(),
      name: `CS 101 Deck - ${new Date().toLocaleDateString()}`,
      createdAt: new Date().toISOString(),
      cards: cards
    };
    setSavedDecks([newDeck, ...savedDecks]);
  };

  const handleDeleteDeck = (deckId: string) => {
    setSavedDecks(savedDecks.filter(deck => deck.id !== deckId));
  };

  const handleStudyDeck = (deckId: string) => {
    const deck = savedDecks.find(d => d.id === deckId);
    if (deck) {
      setCurrentDeck(deck.cards);
      setCurrentView("flashcard-study");
    }
  };

  const handleGenerateNewDeck = async () => {
    if (currentModuleId === null) {
      console.error("No module ID stored, cannot regenerate");
      return;
    }

    setIsRegenerating(true);
    try {
      console.log(`Regenerating flashcards for module ${currentModuleId} with count ${currentFlashcardCount}`);
      
      // Import the API
      const { flashcardsAPI } = await import("./lib/api");
      
      // Call the API to regenerate flashcards
      const result = await flashcardsAPI.generateFromModule(currentModuleId, currentFlashcardCount);
      
      console.log("New flashcards generated successfully:", result.flashcards.length);
      
      // Update the generated flashcards
      setGeneratedFlashcards(result.flashcards);
      
    } catch (error: any) {
      console.error("Failed to regenerate flashcards:", error);
      alert("Failed to generate new flashcards. Please try again.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSaveQuiz = (questions: any[], answers: QuizAnswer[]) => {
    const score = answers.filter(a => a.isCorrect).length;
    const newQuiz: SavedQuiz = {
      id: Date.now().toString(),
      name: `Quiz - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      createdAt: new Date().toISOString(),
      questions: questions,
      answers: answers,
      score: score
    };
    setSavedQuizzes([newQuiz, ...savedQuizzes]);
    console.log("Quiz saved successfully!", newQuiz);
  };

  const handleGenerateNewQuiz = async () => {
    if (currentModuleId === null) {
      console.error("No module ID stored, cannot regenerate quiz");
      return;
    }

    setIsRegenerating(true);
    try {
      console.log(`Regenerating quiz for module ${currentModuleId}`);
      
      // Import the API
      const { flashcardsAPI } = await import("./lib/api");
      
      // Call the API to regenerate quiz (using 10 questions by default)
      const result = await flashcardsAPI.generateQuizFromModule(currentModuleId, 10, currentSelectedFiles);
      
      console.log("New quiz generated successfully:", result.questions.length);
      
      // Update the generated quiz questions
      setGeneratedQuizQuestions(result.questions);
      
    } catch (error: any) {
      console.error("Failed to regenerate quiz:", error);
      alert("Failed to generate new quiz. Please try again.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSwitchToQuiz = async () => {
    if (currentModuleId === null || currentSelectedFiles.length === 0) {
      console.error("No module/files stored, cannot generate quiz");
      setCurrentView("quiz"); // Still go to quiz, will show default
      return;
    }

    setIsRegenerating(true);
    setCurrentView("quiz"); // Navigate immediately
    
    try {
      const { flashcardsAPI } = await import("./lib/api");
      const result = await flashcardsAPI.generateQuizFromModule(currentModuleId, 10, currentSelectedFiles);
      
      console.log("Quiz generated from same files:", result.questions.length);
      setGeneratedQuizQuestions(result.questions);
      
    } catch (error: any) {
      console.error("Failed to generate quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSwitchToFlashcards = async () => {
    if (currentModuleId === null || currentSelectedFiles.length === 0) {
      console.error("No module/files stored, cannot generate flashcards");
      setCurrentView("flashcard-study"); // Still go to flashcards, will show default
      return;
    }

    setIsRegenerating(true);
    setCurrentView("flashcard-study"); // Navigate immediately
    
    try {
      const { flashcardsAPI } = await import("./lib/api");
      const result = await flashcardsAPI.generateFromModule(currentModuleId, currentFlashcardCount, currentSelectedFiles);
      
      console.log("Flashcards generated from same files:", result.flashcards.length);
      setGeneratedFlashcards(result.flashcards);
      
    } catch (error: any) {
      console.error("Failed to generate flashcards:", error);
      alert("Failed to generate flashcards. Please try again.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleLogin = async () => {
    // Check Canvas session status from login response
    const canvasSessionValid = sessionStorage.getItem("canvas_session_valid") === "true";
    const hasCanvasSession = sessionStorage.getItem("has_canvas_session") === "true";
    
    // If session is invalid but user has a session stored, show prompt
    if (!canvasSessionValid && hasCanvasSession) {
      setShowCanvasSessionPrompt(true);
    }
    
    // Clear session storage
    sessionStorage.removeItem("canvas_session_valid");
    sessionStorage.removeItem("has_canvas_session");
    
    setCurrentView("dashboard");
  };

  const handleSignup = () => {
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    tokenManager.clear();
    setCurrentView("login");
  };

  const handleCanvasSessionSuccess = () => {
    // Canvas session updated successfully
    console.log("Canvas session updated successfully");
  };

  // Show login/signup without navbar
  if (currentView === "login" || currentView === "signup") {
    return (
      <div className="min-h-screen">
        {currentView === "login" && (
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView("signup")}
          />
        )}
        {currentView === "signup" && (
          <Signup
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Canvas Session Prompt Modal */}
      <CanvasSessionPrompt
        isOpen={showCanvasSessionPrompt}
        onClose={() => setShowCanvasSessionPrompt(false)}
        onSuccess={handleCanvasSessionSuccess}
      />

      {/* Persistent Navbar */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      {currentView === "dashboard" && (
        <Dashboard 
          onNavigateToCourse={(courseId: number, courseCode: string, courseName: string) => {
            setSelectedCourse({ id: courseId, code: courseCode, name: courseName });
            setCurrentView("course-details");
          }}
          onNavigateToPlanner={() => setCurrentView("planner")}
        />
      )}
      {currentView === "course-details" && (
        <CourseDetails
          onBack={() => setCurrentView("dashboard")}
          onNavigateToFlashcards={() => {
            // Make sure courseId is set before navigating
            if (selectedCourse.id) {
              setCurrentView("flashcard-selection");
            }
          }}
          onNavigateToAITutor={() => setCurrentView("ai-tutor-selection")}
          courseId={selectedCourse.id}
          courseCode={selectedCourse.code}
          courseName={selectedCourse.name}
        />
      )}
      {currentView === "course-selection" && (
        <CourseSelection
          onBack={() => setCurrentView("dashboard")}
          onSelectCourse={handleCourseSelect}
        />
      )}
      {currentView === "flashcard-selection" && (
        <FlashcardSelection
          onBack={() => setCurrentView("course-selection")}
          onStartStudying={(flashcards, moduleId, count, files) => {
            if (flashcards) {
              console.log("Received generated flashcards:", flashcards);
              setGeneratedFlashcards(flashcards);
            }
            if (moduleId !== undefined) {
              setCurrentModuleId(moduleId);
            }
            if (count !== undefined) {
              setCurrentFlashcardCount(count);
            }
            if (files) {
              setCurrentSelectedFiles(files);
            }
            setCurrentView("flashcard-study");
          }}
          onStartQuiz={(quizQuestions, moduleId, files) => {
            if (quizQuestions) {
              console.log("Received generated quiz questions:", quizQuestions);
              setGeneratedQuizQuestions(quizQuestions);
            }
            if (moduleId !== undefined) {
              setCurrentModuleId(moduleId);
            }
            if (files) {
              setCurrentSelectedFiles(files);
            }
            setCurrentView("quiz");
          }}
          onViewSavedDecks={() => setCurrentView("saved-flashcards")}
          onViewSavedQuizzes={() => setCurrentView("saved-flashcards")} // Reuse same view for now
          onNavigateToAITutor={() => setCurrentView("ai-tutor-selection")}
          savedDecksCount={savedDecks.length}
          savedQuizzesCount={savedQuizzes.length}
          courseId={selectedCourse.id}
          courseCode={selectedCourse.code}
          courseName={selectedCourse.name}
        />
      )}
      {currentView === "flashcard-study" && (
        <FlashcardStudy 
          onBack={() => setCurrentView("flashcard-selection")}
          onStartQuiz={() => setCurrentView("quiz")}
          onSaveDeck={handleSaveDeck}
          onGenerateNewDeck={handleGenerateNewDeck}
          onNavigateToAITutor={() => setCurrentView("ai-tutor-selection")}
          flashcards={generatedFlashcards}
          isRegenerating={isRegenerating}
          onSwitchToQuiz={handleSwitchToQuiz}
        />
      )}
      {currentView === "saved-flashcards" && (
        <SavedFlashcards
          onBack={() => setCurrentView("flashcard-selection")}
          savedDecks={savedDecks}
          savedQuizzes={savedQuizzes}
          onDeleteDeck={handleDeleteDeck}
          onDeleteQuiz={(quizId) => setSavedQuizzes(savedQuizzes.filter(q => q.id !== quizId))}
          onStudyDeck={handleStudyDeck}
          onRetakeQuiz={(quizId) => {
            const quiz = savedQuizzes.find(q => q.id === quizId);
            if (quiz) {
              setGeneratedQuizQuestions(quiz.questions);
              setCurrentView("quiz");
            }
          }}
          onNavigateToAITutor={() => setCurrentView("ai-tutor-selection")}
        />
      )}
      {currentView === "quiz" && (
        <Quiz
          onBack={() => setCurrentView("flashcard-selection")}
          onComplete={handleQuizComplete}
          onStartStudying={() => setCurrentView("flashcard-study")}
          onNavigateToAITutor={() => setCurrentView("ai-tutor-selection")}
          onSaveQuiz={handleSaveQuiz}
          onGenerateNewQuiz={handleGenerateNewQuiz}
          quizQuestions={generatedQuizQuestions}
          isRegenerating={isRegenerating}
          onSwitchToFlashcards={handleSwitchToFlashcards}
        />
      )}
      {currentView === "quiz-results" && (
        <QuizResults
          score={quizScore}
          total={quizTotal}
          answers={quizAnswers}
          onRetake={handleRetakeQuiz}
          onBack={() => setCurrentView("flashcard-selection")}
          onNavigateToAITutor={() => setCurrentView("ai-tutor-selection")}
        />
      )}
      {currentView === "planner" && (
        <Planner onBack={() => setCurrentView("dashboard")} />
      )}
      {currentView === "insights" && (
        <Insights />
      )}
      {currentView === "ai-tutor-selection" && (
        <AITutorSelection
          onBack={() => setCurrentView("dashboard")}
          onStartChat={(moduleId, selectedFiles, courseName) => {
            setAiTutorModuleId(moduleId);
            setAiTutorSelectedFiles(selectedFiles);
            setAiTutorCourseName(courseName);
            setCurrentView("ai-tutor");
          }}
          courseId={selectedCourse.id}
          courseCode={selectedCourse.code}
          courseName={selectedCourse.name}
        />
      )}
      {currentView === "ai-tutor" && aiTutorModuleId && (
        <AITutor 
          onBack={() => setCurrentView("ai-tutor-selection")}
          moduleId={aiTutorModuleId}
          selectedFiles={aiTutorSelectedFiles}
          courseName={aiTutorCourseName}
        />
      )}
      {currentView === "profile" && (
        <ProfileSettings
          onBack={() => setCurrentView("dashboard")}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
    </div>
  );
}