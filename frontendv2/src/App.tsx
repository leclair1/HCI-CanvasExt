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
import SavedFlashcards from "./components/SavedFlashcards";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileSettings from "./components/ProfileSettings";
import "./styles/globals.css";

type View = "login" | "signup" | "dashboard" | "course-details" | "course-selection" | "flashcard-selection" | "flashcard-study" | "quiz" | "quiz-results" | "planner" | "insights" | "ai-tutor" | "saved-flashcards" | "profile";

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

export default function App() {
  const [currentView, setCurrentView] = useState<View>("login");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [savedDecks, setSavedDecks] = useState<FlashcardDeck[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Flashcard[]>([]);
  const [selectedCourse, setSelectedCourse] = useState({ code: "CS 101", name: "Introduction to Computer Science" });

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
    // When navigating to flashcards from navbar, show course selection first
    if (view === "flashcard-selection") {
      setCurrentView("course-selection");
    } else {
      setCurrentView(view);
    }
  };

  const handleCourseSelect = (courseCode: string, courseName: string) => {
    setSelectedCourse({ code: courseCode, name: courseName });
    setCurrentView("flashcard-selection");
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

  const handleGenerateNewDeck = () => {
    // Simulate generating a new deck with different flashcards
    const newCards: Flashcard[] = [
      {
        id: Date.now(),
        question: "What is Big O notation?",
        answer: "Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity."
      },
      {
        id: Date.now() + 1,
        question: "What is recursion?",
        answer: "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem."
      }
    ];
    setCurrentDeck(newCards);
  };

  const handleSaveQuiz = () => {
    // Placeholder for saving quiz functionality
    console.log("Quiz saved!");
  };

  const handleGenerateNewQuiz = () => {
    // Placeholder for generating new quiz functionality
    console.log("Generating new quiz...");
  };

  const handleLogin = () => {
    setCurrentView("dashboard");
  };

  const handleSignup = () => {
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentView("login");
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
          onNavigateToCourse={(courseCode: string, courseName: string) => {
            setSelectedCourse({ code: courseCode, name: courseName });
            setCurrentView("course-details");
          }}
          onNavigateToPlanner={() => setCurrentView("planner")}
        />
      )}
      {currentView === "course-details" && (
        <CourseDetails
          onBack={() => setCurrentView("dashboard")}
          onNavigateToFlashcards={() => setCurrentView("flashcard-selection")}
          onNavigateToAITutor={() => setCurrentView("ai-tutor")}
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
          onStartStudying={() => setCurrentView("flashcard-study")}
          onStartQuiz={() => setCurrentView("quiz")}
          onViewSavedDecks={() => setCurrentView("saved-flashcards")}
          onNavigateToAITutor={() => setCurrentView("ai-tutor")}
          savedDecksCount={savedDecks.length}
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
          onNavigateToAITutor={() => setCurrentView("ai-tutor")}
        />
      )}
      {currentView === "saved-flashcards" && (
        <SavedFlashcards
          onBack={() => setCurrentView("flashcard-selection")}
          savedDecks={savedDecks}
          onDeleteDeck={handleDeleteDeck}
          onStudyDeck={handleStudyDeck}
          onNavigateToAITutor={() => setCurrentView("ai-tutor")}
        />
      )}
      {currentView === "quiz" && (
        <Quiz
          onBack={() => setCurrentView("flashcard-selection")}
          onComplete={handleQuizComplete}
          onStartStudying={() => setCurrentView("flashcard-study")}
          onNavigateToAITutor={() => setCurrentView("ai-tutor")}
          onSaveQuiz={handleSaveQuiz}
          onGenerateNewQuiz={handleGenerateNewQuiz}
        />
      )}
      {currentView === "quiz-results" && (
        <QuizResults
          score={quizScore}
          total={quizTotal}
          answers={quizAnswers}
          onRetake={handleRetakeQuiz}
          onBack={() => setCurrentView("flashcard-selection")}
          onNavigateToAITutor={() => setCurrentView("ai-tutor")}
        />
      )}
      {currentView === "planner" && (
        <Planner onBack={() => setCurrentView("dashboard")} />
      )}
      {currentView === "insights" && (
        <Insights />
      )}
      {currentView === "ai-tutor" && (
        <AITutor onBack={() => setCurrentView("dashboard")} />
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