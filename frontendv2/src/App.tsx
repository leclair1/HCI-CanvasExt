import { useState, useEffect } from "react";
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
import { tokenManager, setCanvasSessionExpiredCallback } from "./lib/api";
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
  const [selectedCourse, setSelectedCourse] = useState({ id: 0, code: "CS 101", name: "Introduction to Computer Science", canvas_id: null as string | null });
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
  
  // Debug: Log when showCanvasSessionPrompt changes
  useEffect(() => {
    console.log("showCanvasSessionPrompt state changed to:", showCanvasSessionPrompt);
    if (showCanvasSessionPrompt) {
      console.log("PROMPT SHOULD BE VISIBLE NOW!");
    }
  }, [showCanvasSessionPrompt]);

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

  const handleCourseSelect = (courseId: number, courseCode: string, courseName: string, canvasId?: string | null) => {
    setSelectedCourse({ id: courseId, code: courseCode, name: courseName, canvas_id: canvasId || null });
    
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
    console.log("handleLogin called");
    
    // Read session status BEFORE navigating
    const canvasSessionValid = sessionStorage.getItem("canvas_session_valid") === "true";
    const hasCanvasSession = sessionStorage.getItem("has_canvas_session") === "true";
    
    console.log("handleLogin - Session status from storage:", {
      canvasSessionValid,
      hasCanvasSession,
      shouldShowPrompt: !canvasSessionValid || !hasCanvasSession
    });
    
    // Navigate to dashboard first
    setCurrentView("dashboard");
    console.log("Set currentView to dashboard");
    
    // Show prompt immediately if needed (don't wait for useEffect)
    if (!canvasSessionValid || !hasCanvasSession) {
      console.log("handleLogin: Showing prompt immediately");
      // Use a small delay to ensure dashboard renders
      setTimeout(() => {
        console.log("handleLogin: Setting showCanvasSessionPrompt to true");
        setShowCanvasSessionPrompt(true);
      }, 1000);
    }
    
    // Also set up a backup check
    setTimeout(() => {
      const shouldCheck = sessionStorage.getItem("check_canvas_session") === "true";
      const canvasSessionValid2 = sessionStorage.getItem("canvas_session_valid") === "true";
      const hasCanvasSession2 = sessionStorage.getItem("has_canvas_session") === "true";
      
      console.log("handleLogin backup check:", {
        shouldCheck,
        canvasSessionValid2,
        hasCanvasSession2,
        currentPromptState: showCanvasSessionPrompt
      });
      
      if (shouldCheck && (!canvasSessionValid2 || !hasCanvasSession2) && !showCanvasSessionPrompt) {
        console.log("handleLogin backup: Showing prompt");
        setShowCanvasSessionPrompt(true);
      }
      
      // Clear the check flag
      sessionStorage.removeItem("check_canvas_session");
      sessionStorage.removeItem("canvas_session_valid");
      sessionStorage.removeItem("has_canvas_session");
    }, 2000);
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
    // Optionally refresh the current view or reload data
  };

  // Set up Canvas session expiration callback and check on login
  useEffect(() => {
    console.log("useEffect running, currentView:", currentView);
    
    setCanvasSessionExpiredCallback(() => {
      console.log("Canvas session expired callback triggered");
      setShowCanvasSessionPrompt(true);
    });

    // Check Canvas session status after login
    const checkLoginCanvasSession = () => {
      const shouldCheck = sessionStorage.getItem("check_canvas_session") === "true";
      console.log("checkLoginCanvasSession - shouldCheck:", shouldCheck, "currentView:", currentView);
      
      if (shouldCheck && currentView === "dashboard") {
        const canvasSessionValid = sessionStorage.getItem("canvas_session_valid") === "true";
        const hasCanvasSession = sessionStorage.getItem("has_canvas_session") === "true";
        
        console.log("Checking Canvas session after login:", {
          canvasSessionValid,
          hasCanvasSession,
          shouldShowPrompt: !canvasSessionValid || !hasCanvasSession
        });
        
        // Show prompt if session is invalid or missing
        if (!canvasSessionValid || !hasCanvasSession) {
          console.log("DECISION: Showing Canvas session prompt after login");
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            setTimeout(() => {
              console.log("Actually calling setShowCanvasSessionPrompt(true)");
              setShowCanvasSessionPrompt(true);
            }, 500);
          });
        } else {
          console.log("DECISION: Not showing prompt - session is valid");
        }
        
        // Clear the check flag
        sessionStorage.removeItem("check_canvas_session");
        sessionStorage.removeItem("canvas_session_valid");
        sessionStorage.removeItem("has_canvas_session");
      }
    };

    // Check immediately if we're on dashboard
    if (currentView === "dashboard") {
      // Small delay to ensure state is updated
      const timer = setTimeout(() => {
        checkLoginCanvasSession();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Periodically check Canvas session validity when user is logged in
    const checkCanvasSession = async () => {
      const token = tokenManager.getToken();
      if (!token || currentView === "login" || currentView === "signup") {
        return;
      }

      try {
        const { authAPI } = await import("./lib/api");
        const result = await authAPI.validateCanvasSession(token);
        
        console.log("Periodic Canvas session check:", result);
        
        // If session is invalid but user has a session, show prompt
        if (!result.is_valid && result.has_session) {
          console.log("Canvas session expired - showing prompt");
          setShowCanvasSessionPrompt(true);
        } else if (!result.has_session) {
          // No session at all - show prompt
          console.log("No Canvas session found - showing prompt");
          setShowCanvasSessionPrompt(true);
        }
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.log("Canvas session check failed:", error);
      }
    };

    // Check immediately on mount (if logged in and not just logged in)
    if (currentView !== "login" && currentView !== "signup" && currentView !== "dashboard") {
      checkCanvasSession();
    }

    // Check every 5 minutes
    const interval = setInterval(checkCanvasSession, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [currentView]);

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
      {/* Canvas Session Prompt - Always rendered, controlled by isOpen */}
      <CanvasSessionPrompt
        isOpen={showCanvasSessionPrompt}
        onClose={() => {
          console.log("Closing Canvas session prompt");
          setShowCanvasSessionPrompt(false);
        }}
        onSuccess={() => {
          console.log("Canvas session updated successfully");
          handleCanvasSessionSuccess();
          setShowCanvasSessionPrompt(false);
        }}
      />

      {/* Persistent Navbar */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
        onShowCanvasPrompt={() => {
          console.log("Manual Canvas session prompt trigger");
          setShowCanvasSessionPrompt(true);
        }}
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
          courseId={selectedCourse.id}
          courseCode={selectedCourse.code}
          courseName={selectedCourse.name}
          canvasCourseId={selectedCourse.canvas_id}
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
          canvasCourseId={selectedCourse.canvas_id}
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
          onBack={() => setCurrentView("course-selection")}
          courseId={selectedCourse.id}
          courseCode={selectedCourse.code}
          courseName={selectedCourse.name}
          canvasCourseId={selectedCourse.canvas_id}
          onStartChat={(moduleId, selectedFiles, courseName) => {
            setAiTutorModuleId(moduleId);
            setAiTutorSelectedFiles(selectedFiles);
            setAiTutorCourseName(courseName);
            setCurrentView("ai-tutor");
          }}
        />
      )}
      {currentView === "ai-tutor" && aiTutorSelectedFiles.length > 0 && (
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