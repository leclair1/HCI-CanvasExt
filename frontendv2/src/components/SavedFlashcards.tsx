import { ChevronLeft, BookOpen, Trash2, Play } from "lucide-react";
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

interface SavedFlashcardsProps {
  onBack: () => void;
  savedDecks: FlashcardDeck[];
  onDeleteDeck: (deckId: string) => void;
  onStudyDeck: (deckId: string) => void;
  onNavigateToAITutor: () => void;
}

export default function SavedFlashcards({ onBack, savedDecks, onDeleteDeck, onStudyDeck, onNavigateToAITutor }: SavedFlashcardsProps) {
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
                <h1 className="text-foreground">Saved Flashcard Decks</h1>
                <p className="text-muted-foreground text-sm">{savedDecks.length} deck{savedDecks.length !== 1 ? 's' : ''} saved</p>
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

        {/* Saved Decks */}
        {savedDecks.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 border border-border text-center">
            <BookOpen className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-foreground mb-2">No saved decks yet</h3>
            <p className="text-muted-foreground text-sm">
              Save flashcard decks while studying to access them later
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedDecks.map((deck) => (
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
        )}
      </main>
    </div>
  );
}
