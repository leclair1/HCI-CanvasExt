import { useState } from "react";
import { ChevronLeft, BookOpen, Sparkles, Check, Bookmark } from "lucide-react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";

interface FlashcardSelectionProps {
  onBack: () => void;
  onStartStudying: () => void;
  onStartQuiz: () => void;
  onViewSavedDecks: () => void;
  onNavigateToAITutor: () => void;
  savedDecksCount: number;
  courseCode?: string;
  courseName?: string;
}

export default function FlashcardSelection({ onBack, onStartStudying, onStartQuiz, onViewSavedDecks, onNavigateToAITutor, savedDecksCount, courseCode = "CS 101", courseName = "Introduction to Computer Science" }: FlashcardSelectionProps) {
  const [selectedLessons, setSelectedLessons] = useState<string[]>(["module-1"]);

  const toggleLesson = (lessonId: string) => {
    setSelectedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const totalFlashcards = selectedLessons.length * 2; // 2 flashcards per lesson for demo

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
            <span className="text-sm">Back to Dashboard</span>
          </button>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Sparkles className="size-6 text-accent" />
              </div>
              <div>
                <h1 className="text-foreground">Smart Study Tools</h1>
                <p className="text-muted-foreground text-sm">Select lessons to study</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Saved Decks Button */}
              <button
                onClick={onViewSavedDecks}
                className="flex items-center gap-2 px-4 h-12 bg-card hover:bg-accent/20 rounded-2xl border border-border transition-colors"
              >
                <Bookmark className="size-5 text-accent" />
                <div className="text-left">
                  <div className="text-foreground text-sm">Saved Decks</div>
                  <div className="text-muted-foreground text-xs">{savedDecksCount} saved</div>
                </div>
              </button>

              {/* AI Tutor Badge */}
              <button
                onClick={onNavigateToAITutor}
                className="flex items-center gap-3 px-5 h-12 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl border border-accent/30 hover:from-accent/20 hover:to-primary/20 transition-all"
              >
                <img src={imgAiTutorLogo} alt="AI Tutor" className="size-6" />
                <span className="text-foreground">AI tutor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-foreground mb-1">{courseCode} - {courseName}</h2>
              <p className="text-muted-foreground text-sm">All lessons selected</p>
            </div>
            <button 
              onClick={onBack}
              className="h-9 px-4 rounded-lg hover:bg-accent/20 text-foreground transition-colors text-sm"
            >
              Change Course
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-5 border border-accent/30">
            <div className="flex items-center gap-4">
              <Sparkles className="size-5 text-accent shrink-0" />
              <p className="text-foreground text-sm">
                Select specific lessons or study all available flashcards from this course.
              </p>
            </div>
          </div>
        </div>

        {/* Lesson Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-foreground">Select Lessons</h3>
            <button
              onClick={() => setSelectedLessons(["module-1"])}
              className="h-8 px-3 rounded-lg bg-card hover:bg-accent/20 text-foreground transition-colors text-sm border border-border"
            >
              Select All
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => toggleLesson("module-1")}
              className={`w-full bg-card rounded-2xl p-5 border-2 transition-all text-left ${
                selectedLessons.includes("module-1")
                  ? "border-accent shadow-lg shadow-accent/10"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`size-4 mt-0.5 rounded shrink-0 flex items-center justify-center border-2 transition-colors ${
                    selectedLessons.includes("module-1")
                      ? "bg-accent border-accent"
                      : "border-muted-foreground"
                  }`}
                >
                  {selectedLessons.includes("module-1") && (
                    <Check className="size-3 text-primary-foreground" strokeWidth={3} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="size-4 text-accent" />
                    <h4 className="text-foreground">Module 1: Introduction to Programming</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">2 flashcards available</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Start Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onStartStudying}
            disabled={selectedLessons.length === 0}
            className="flex-1 h-9 bg-card rounded-lg text-foreground hover:bg-accent/20 border border-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Study Flashcards ({totalFlashcards})
          </button>
          <button
            onClick={onStartQuiz}
            disabled={selectedLessons.length === 0}
            className="flex-1 h-9 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Start Quiz ({totalFlashcards} questions)
          </button>
        </div>
      </main>
    </div>
  );
}
