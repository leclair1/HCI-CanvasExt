import { ChevronLeft, BookOpen, Trash2, Play, Search } from "lucide-react";
import { useState, useMemo } from "react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";

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
  answers?: any[];
  score?: number;
}

interface SavedFlashcardsProps {
  onBack: () => void;
  savedDecks: FlashcardDeck[];
  savedQuizzes?: SavedQuiz[];
  onDeleteDeck: (deckId: string) => void;
  onDeleteQuiz?: (quizId: string) => void;
  onStudyDeck: (deckId: string) => void;
  onRetakeQuiz?: (quizId: string) => void;
  onNavigateToAITutor: () => void;
}

export default function SavedFlashcards({ 
  onBack, 
  savedDecks, 
  savedQuizzes = [],
  onDeleteDeck, 
  onDeleteQuiz,
  onStudyDeck,
  onRetakeQuiz, 
  onNavigateToAITutor 
}: SavedFlashcardsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"decks" | "quizzes">("decks");

  // Filter decks based on search query
  const filteredDecks = useMemo(() => {
    if (!searchQuery.trim()) return savedDecks;
    
    const query = searchQuery.toLowerCase();
    return savedDecks.filter(deck => 
      deck.name.toLowerCase().includes(query)
    );
  }, [savedDecks, searchQuery]);

  // Filter quizzes based on search query
  const filteredQuizzes = useMemo(() => {
    if (!searchQuery.trim()) return savedQuizzes;
    
    const query = searchQuery.toLowerCase();
    return savedQuizzes.filter(quiz => 
      quiz.name.toLowerCase().includes(query)
    );
  }, [savedQuizzes, searchQuery]);

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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <BookOpen className="size-6 text-accent" />
              </div>
              <div>
                <h1 className="text-foreground">Saved Study Materials</h1>
                <p className="text-muted-foreground text-sm">
                  {activeTab === "decks" 
                    ? `${savedDecks.length} deck${savedDecks.length !== 1 ? 's' : ''} saved`
                    : `${savedQuizzes.length} quiz${savedQuizzes.length !== 1 ? 'zes' : ''} saved`
                  }
                </p>
              </div>
            </div>
            
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

        {/* Tabs */}
        <div className="bg-muted rounded-2xl p-1 mb-6 inline-flex">
          <button
            onClick={() => setActiveTab("decks")}
            className={`px-8 h-10 rounded-xl text-sm transition-all ${
              activeTab === "decks"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Flashcard Decks ({savedDecks.length})
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`px-8 h-10 rounded-xl text-sm transition-all ${
              activeTab === "quizzes"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Saved Quizzes ({savedQuizzes.length})
          </button>
        </div>

        {/* Search Bar */}
        {(activeTab === "decks" ? savedDecks.length : savedQuizzes.length) > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={activeTab === "decks" ? "Search saved decks..." : "Search saved quizzes..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {searchQuery && (
              <p className="text-muted-foreground text-sm mt-2">
                Found {activeTab === "decks" ? filteredDecks.length : filteredQuizzes.length} {activeTab === "decks" ? "deck" : "quiz"}{(activeTab === "decks" ? filteredDecks.length : filteredQuizzes.length) !== 1 ? (activeTab === "decks" ? 's' : 'zes') : ''}
              </p>
            )}
          </div>
        )}

        {/* Saved Decks or Quizzes */}
        {activeTab === "decks" ? (
          savedDecks.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 border border-border text-center">
              <BookOpen className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-foreground mb-2">No saved decks yet</h3>
              <p className="text-muted-foreground text-sm">
                Save flashcard decks while studying to access them later
              </p>
            </div>
          ) : filteredDecks.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 border border-border text-center">
            <Search className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-foreground mb-2">No decks found</h3>
            <p className="text-muted-foreground text-sm">
              No decks match your search query
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDecks.map((deck) => (
              <div
                key={deck.id}
                className="bg-card rounded-2xl p-5 border border-border hover:border-accent/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="size-4 text-accent" />
                      <h3 className="text-foreground">{deck.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">
                      {deck.cards.length} flashcard{deck.cards.length !== 1 ? 's' : ''}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Saved on {new Date(deck.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onStudyDeck(deck.id)}
                      className="h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm flex items-center gap-2"
                    >
                      <Play className="size-4" />
                      Study
                    </button>
                    <button
                      onClick={() => onDeleteDeck(deck.id)}
                      className="size-9 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors flex items-center justify-center"
                      aria-label="Delete deck"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
          // Saved Quizzes Tab
          savedQuizzes.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 border border-border text-center">
              <BookOpen className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-foreground mb-2">No saved quizzes yet</h3>
              <p className="text-muted-foreground text-sm">
                Save quiz results while practicing to review them later
              </p>
            </div>
          ) : filteredQuizzes.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 border border-border text-center">
              <Search className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-foreground mb-2">No quizzes found</h3>
              <p className="text-muted-foreground text-sm">
                No quizzes match your search query
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-card rounded-2xl p-5 border border-border hover:border-accent/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="size-4 text-accent" />
                        <h3 className="text-foreground">{quiz.name}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-1">
                        {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                        {quiz.score !== undefined && ` • Score: ${quiz.score}/${quiz.questions.length} (${Math.round((quiz.score / quiz.questions.length) * 100)}%)`}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Saved on {new Date(quiz.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRetakeQuiz && onRetakeQuiz(quiz.id)}
                        className="h-9 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm flex items-center gap-2"
                      >
                        <Play className="size-4" />
                        Review
                      </button>
                      <button
                        onClick={() => onDeleteQuiz && onDeleteQuiz(quiz.id)}
                        className="size-9 flex items-center justify-center rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}
