import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Save, Sparkles } from "lucide-react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";

interface FlashcardStudyProps {
  onBack: () => void;
  onStartQuiz: () => void;
  onSaveDeck: (cards: Flashcard[]) => void;
  onGenerateNewDeck: () => void;
  onNavigateToAITutor: () => void;
  flashcards?: any[];
  isRegenerating?: boolean;
  onSwitchToQuiz?: () => void; // New prop for switching to quiz with same files
}

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

const defaultFlashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is a data structure?",
    answer: "A data structure is a specialized format for organizing, processing, retrieving and storing data efficiently."
  },
  {
    id: 2,
    question: "What is an algorithm?",
    answer: "An algorithm is a step-by-step procedure for solving a problem or accomplishing a task in a finite amount of time."
  }
];

export default function FlashcardStudy({ 
  onBack, 
  onStartQuiz, 
  onSaveDeck, 
  onGenerateNewDeck, 
  onNavigateToAITutor,
  flashcards: providedFlashcards,
  isRegenerating = false,
  onSwitchToQuiz
}: FlashcardStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<"flashcards" | "quiz">("flashcards");
  const [isSaved, setIsSaved] = useState(false);

  // Use provided flashcards or default ones
  const flashcards = providedFlashcards && providedFlashcards.length > 0 ? providedFlashcards : defaultFlashcards;

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSaveDeck = () => {
    onSaveDeck(flashcards);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 px-12 max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 h-9 px-3 rounded-lg hover:bg-accent/20 text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="size-4" />
            <span className="text-sm">Back to Selection</span>
          </button>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="size-6" fill="none" viewBox="0 0 24 24">
                  <path d="M12 18V5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M15 13C14.1348 12.7471 13.3748 12.2206 12.834 11.4995C12.2932 10.7784 12.0005 9.90141 12 9C11.9995 9.90141 11.7068 10.7784 11.166 11.4995C10.6252 12.2206 9.8652 12.7471 9 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h1 className="text-foreground">Smart Study Tools</h1>
                <p className="text-muted-foreground text-sm">CS 101 - Introduction to Computer Science</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDeck}
                className={`h-9 px-4 rounded-lg transition-all text-sm flex items-center gap-2 ${
                  isSaved
                    ? "bg-accent text-primary-foreground"
                    : "bg-card hover:bg-accent/20 border border-border text-foreground"
                }`}
              >
                <Save className="size-4" />
                {isSaved ? "Saved!" : "Save Deck"}
              </button>
              <button
                onClick={onGenerateNewDeck}
                disabled={isRegenerating}
                className={`h-9 px-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 hover:from-accent/20 hover:to-primary/20 border border-accent/30 text-foreground transition-all text-sm flex items-center gap-2 ${
                  isRegenerating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isRegenerating ? (
                  <>
                    <RotateCw className="size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate New
                  </>
                )}
              </button>
              
              {/* AI Tutor Badge */}
              <button
                onClick={onNavigateToAITutor}
                className="flex items-center gap-3 px-4 h-9 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/30 hover:from-accent/20 hover:to-primary/20 transition-all"
              >
                <img src={imgAiTutorLogo} alt="AI Tutor" className="size-5" />
                <span className="text-foreground text-sm">AI tutor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="bg-muted rounded-2xl p-1 mb-16 inline-flex">
          <button
            className="px-8 h-7 rounded-xl text-sm bg-card text-foreground shadow-sm transition-all"
          >
            Flashcards
          </button>
          <button
            onClick={onSwitchToQuiz || onStartQuiz}
            className="px-8 h-7 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-all"
          >
            Practice Quiz
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Card {currentIndex + 1} of {flashcards.length}</span>
            <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div
          onClick={handleFlip}
          className="bg-card rounded-2xl p-12 border border-border min-h-[260px] flex flex-col items-center justify-center gap-8 cursor-pointer hover:border-accent transition-all mb-8 group"
        >
          <span className="px-3 py-1 rounded-lg bg-muted text-muted-foreground text-xs">
            {isFlipped ? "Answer" : "Question"}
          </span>
          
          <p className="text-foreground text-center max-w-2xl">
            {isFlipped ? currentCard.answer : currentCard.question}
          </p>

          <div className="flex items-center gap-2 text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <RotateCw className="size-4" />
            <span>Click to flip</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleFlip}
            className="size-9 rounded-lg bg-card hover:bg-accent/20 border border-border flex items-center justify-center text-foreground transition-colors"
            aria-label="Flip card"
          >
            <RotateCw className="size-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <span>Next</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
