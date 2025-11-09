import { useState, useEffect } from "react";
import { ChevronLeft, BookOpen, Sparkles, Bookmark, Loader2 } from "lucide-react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";
import { modulesAPI, Module, flashcardsAPI } from "../lib/api";

interface FlashcardSelectionProps {
  onBack: () => void;
  onStartStudying: (flashcards?: any[]) => void;
  onStartQuiz: () => void;
  onViewSavedDecks: () => void;
  onNavigateToAITutor: () => void;
  savedDecksCount: number;
  courseId: number;
  courseCode?: string;
  courseName?: string;
}

export default function FlashcardSelection({ 
  onBack, 
  onStartStudying, 
  onStartQuiz, 
  onViewSavedDecks, 
  onNavigateToAITutor, 
  savedDecksCount, 
  courseId,
  courseCode = "CS 101", 
  courseName = "Introduction to Computer Science" 
}: FlashcardSelectionProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  const fetchModules = async () => {
    try {
      if (!courseId) {
        setError("No course selected");
        setLoading(false);
        return;
      }
      const data = await modulesAPI.getCourseModules(courseId);
      setModules(data);
      setError("");
    } catch (error: any) {
      console.error("Failed to fetch modules:", error);
      setError(`Failed to load modules: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectModule = (moduleId: number) => {
    console.log("Module selected:", moduleId);
    setSelectedModuleId(moduleId);
    setError("");
  };

  const handleGenerateFlashcards = async () => {
    if (!selectedModuleId) {
      setError("Please select a module first");
      return;
    }

    console.log("Starting flashcard generation for module:", selectedModuleId);
    setGenerating(true);
    setError("");

    try {
      // Generate 15 flashcards (default)
      const result = await flashcardsAPI.generateFromModule(selectedModuleId, 15);
      
      console.log("Flashcards generated successfully:", result.flashcards.length);
      
      // Navigate to study page with the generated flashcards
      onStartStudying(result.flashcards);
      
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Failed to generate flashcards. Please try again.");
      setGenerating(false);
    }
  };

  const selectedModule = modules.find(m => m.id === selectedModuleId);

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
            <span className="text-sm">Back</span>
          </button>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Sparkles className="size-6 text-accent" />
              </div>
              <div>
                <h1 className="text-foreground">Generate Flashcards</h1>
                <p className="text-muted-foreground text-sm">{courseCode} - {courseName}</p>
              </div>
            </div>

            <button
              onClick={onNavigateToAITutor}
              className="flex items-center gap-3 px-5 h-12 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl border border-accent/30 hover:from-accent/20 hover:to-primary/20 transition-all"
            >
              <img src={imgAiTutorLogo} alt="AI Tutor" className="size-6" />
              <span className="text-foreground">AI tutor</span>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-5 border border-accent/30 mb-8">
          <div className="flex items-center gap-4">
            <Sparkles className="size-5 text-accent shrink-0" />
            <p className="text-foreground text-sm">
              Select a module below and click "Generate Flashcards" to create AI-powered study materials.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Module Selection */}
        <div className="mb-8">
          <h3 className="text-foreground mb-5">Select a Module</h3>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              <Loader2 className="size-8 animate-spin mx-auto mb-3" />
              Loading modules...
            </div>
          ) : modules.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No modules found for this course.
            </div>
          ) : (
            <div className="space-y-3">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleSelectModule(module.id)}
                  disabled={generating}
                  className={`w-full bg-card rounded-2xl p-5 border-2 transition-all text-left ${
                    selectedModuleId === module.id
                      ? "border-accent shadow-lg shadow-accent/10"
                      : "border-border hover:border-accent/50"
                  } ${generating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`size-4 mt-0.5 rounded-full shrink-0 flex items-center justify-center border-2 transition-colors ${
                        selectedModuleId === module.id
                          ? "bg-accent border-accent"
                          : "border-muted-foreground"
                      }`}
                    >
                      {selectedModuleId === module.id && (
                        <div className="size-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="size-4 text-accent" />
                        <h4 className="text-foreground">{module.name}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {module.items.length} {module.items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex gap-3">
          <button
            onClick={onViewSavedDecks}
            className="h-12 px-6 bg-card rounded-lg text-foreground hover:bg-accent/20 border border-border transition-colors text-sm flex items-center gap-2"
          >
            <Bookmark className="size-4" />
            Saved Decks ({savedDecksCount})
          </button>
          
          <button
            onClick={handleGenerateFlashcards}
            disabled={!selectedModuleId || generating}
            className="flex-1 h-12 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
          >
            {generating ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Generating Flashcards...
              </>
            ) : (
              <>
                <Sparkles className="size-5" />
                {selectedModuleId ? 'Generate Flashcards (15 cards)' : 'Select a Module to Generate'}
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
