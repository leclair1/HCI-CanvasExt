import { useState, useEffect, useRef } from "react";
import { ChevronLeft, BookOpen, Sparkles, Bookmark, Loader2, ChevronDown } from "lucide-react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";
import { modulesAPI, Module, flashcardsAPI } from "../lib/api";

interface FlashcardSelectionProps {
  onBack: () => void;
  onStartStudying: (flashcards?: any[], moduleId?: number, count?: number, files?: string[]) => void;
  onStartQuiz: (quizQuestions?: any[], moduleId?: number, files?: string[]) => void;
  onViewSavedDecks: () => void;
  onViewSavedQuizzes?: () => void;
  onNavigateToAITutor: () => void;
  savedDecksCount: number;
  savedQuizzesCount?: number;
  courseId: number;
  courseCode?: string;
  courseName?: string;
}

export default function FlashcardSelection({ 
  onBack, 
  onStartStudying, 
  onStartQuiz, 
  onViewSavedDecks,
  onViewSavedQuizzes, 
  onNavigateToAITutor, 
  savedDecksCount,
  savedQuizzesCount = 0, 
  courseId,
  courseCode = "CS 101", 
  courseName = "Introduction to Computer Science" 
}: FlashcardSelectionProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]); // URLs of selected files
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"flashcard" | "quiz">("flashcard");
  const isInitialMount = useRef(true);

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  // Auto-generate when switching modes if files are already selected
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // If user switched modes with files selected, auto-generate
    if (selectedModuleId && selectedFiles.length > 0 && !generating) {
      console.log(`Mode switched to ${mode}, auto-generating...`);
      handleGenerate();
    }
  }, [mode]);

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
    setSelectedFiles([]); // Reset selected files when changing module
    setError("");
  };

  const handleToggleFile = (fileUrl: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileUrl)) {
        return prev.filter(url => url !== fileUrl);
      } else {
        return [...prev, fileUrl];
      }
    });
  };

  const handleSelectAllFiles = () => {
    if (!selectedModule) return;
    const items = typeof selectedModule.items === 'string' 
      ? JSON.parse(selectedModule.items) 
      : selectedModule.items || [];
    
    // Use same filtering logic as display
    const allFileUrls = items
      .filter((item: any) => {
        if (!item.url) return false;
        const itemName = (item.title || item.name || '').toLowerCase();
        return item.type === 'File' || 
               itemName.includes('.pdf') || 
               itemName.includes('.doc') ||
               itemName.includes('.ppt') ||
               itemName.includes('.txt');
      })
      .map((item: any) => item.url);
    
    setSelectedFiles(allFileUrls);
  };

  const handleDeselectAllFiles = () => {
    setSelectedFiles([]);
  };

  const handleGenerate = async () => {
    if (!selectedModuleId) {
      setError("Please select a module first");
      return;
    }

    if (selectedFiles.length === 0) {
      setError(`Please select at least one file to generate ${mode === "flashcard" ? "flashcards" : "quiz questions"} from`);
      return;
    }

    setGenerating(true);
    setError("");

    try {
      if (mode === "flashcard") {
        const flashcardCount = 15;
        const result = await flashcardsAPI.generateFromModule(selectedModuleId, flashcardCount, selectedFiles);
        
        console.log("Flashcards generated successfully:", result.flashcards.length);
        onStartStudying(result.flashcards, selectedModuleId, flashcardCount, selectedFiles);
      } else {
        // Quiz mode
        const quizCount = 10; // Generate 10 quiz questions
        const result = await flashcardsAPI.generateQuizFromModule(selectedModuleId, quizCount, selectedFiles);
        
        console.log("Quiz generated successfully:", result.questions.length);
        // Navigate to quiz with the generated questions
        onStartQuiz(result.questions, selectedModuleId, selectedFiles);
      }
      
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || `Failed to generate ${mode === "flashcard" ? "flashcards" : "quiz"}. Please try again.`);
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

        {/* Mode Toggle */}
        <div className="bg-muted rounded-2xl p-1 mb-6 inline-flex">
          <button
            onClick={() => setMode("flashcard")}
            className={`px-8 h-10 rounded-xl text-sm transition-all ${
              mode === "flashcard"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => setMode("quiz")}
            className={`px-8 h-10 rounded-xl text-sm transition-all ${
              mode === "quiz"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Quiz
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-5 border border-accent/30 mb-8">
          <div className="flex items-center gap-4">
            <Sparkles className="size-5 text-accent shrink-0" />
            <p className="text-foreground text-sm">
              {mode === "flashcard" 
                ? "Click on a module to expand, select the files you want, then generate AI-powered flashcards."
                : "Click on a module to expand, select the files you want, then generate AI-powered quiz questions."
              }
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
              {modules.map((module) => {
                const isSelected = selectedModuleId === module.id;
                const items = typeof module.items === 'string'
                  ? JSON.parse(module.items)
                  : module.items || [];
                
                // Filter for files
                const fileItems = items.filter((item: any) => {
                  if (!item.url) return false;
                  const itemName = (item.title || item.name || '').toLowerCase();
                  return item.type === 'File' || 
                         itemName.includes('.pdf') || 
                         itemName.includes('.doc') ||
                         itemName.includes('.ppt') ||
                         itemName.includes('.txt');
                });

                return (
                  <div
                    key={module.id}
                    className={`bg-card rounded-2xl border-2 transition-all ${
                      isSelected
                        ? "border-accent shadow-lg shadow-accent/10"
                        : "border-border"
                    } ${generating ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {/* Module Header */}
                    <button
                      onClick={() => handleSelectModule(module.id)}
                      disabled={generating}
                      className="w-full p-5 text-left hover:bg-accent/5 transition-colors rounded-2xl"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`size-4 mt-0.5 rounded-full shrink-0 flex items-center justify-center border-2 transition-colors ${
                            isSelected
                              ? "bg-accent border-accent"
                              : "border-muted-foreground"
                          }`}
                        >
                          {isSelected && (
                            <div className="size-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="size-4 text-accent" />
                            <h4 className="text-foreground">{module.name}</h4>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {fileItems.length} file{fileItems.length !== 1 ? 's' : ''} available
                          </p>
                        </div>
                        <ChevronDown 
                          className={`size-5 text-muted-foreground transition-transform ${
                            isSelected ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Expanded File Selection */}
                    {isSelected && (
                      <div className="px-5 pb-5 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-foreground">Select Files</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={handleSelectAllFiles}
                                className="text-xs px-2 py-1 rounded bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
                              >
                                All
                              </button>
                              <button
                                onClick={handleDeselectAllFiles}
                                className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                              >
                                None
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {fileItems.length === 0 ? (
                              <p className="text-muted-foreground text-sm text-center py-4">
                                No files available
                              </p>
                            ) : (
                              fileItems.map((item: any, index: number) => {
                                const itemTitle = item.title || item.name || 'Untitled';
                                return (
                                  <label
                                    key={index}
                                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedFiles.includes(item.url)}
                                      onChange={() => handleToggleFile(item.url)}
                                      className="mt-0.5 size-4 rounded border-2 border-muted-foreground checked:bg-accent checked:border-accent cursor-pointer"
                                    />
                                    <span className="text-sm text-foreground flex-1">{itemTitle}</span>
                                  </label>
                                );
                              })
                            )}
                          </div>

                          <p className="text-muted-foreground text-xs mt-3">
                            {selectedFiles.length} selected
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex gap-3">
          <button
            onClick={mode === "flashcard" ? onViewSavedDecks : (onViewSavedQuizzes || onViewSavedDecks)}
            className="h-12 px-6 bg-card rounded-lg text-foreground hover:bg-accent/20 border border-border transition-colors text-sm flex items-center gap-2"
          >
            <Bookmark className="size-4" />
            {mode === "flashcard" ? `Saved Decks (${savedDecksCount})` : `Saved Quizzes (${savedQuizzesCount})`}
          </button>
          
          <button
            onClick={handleGenerate}
            disabled={!selectedModuleId || selectedFiles.length === 0 || generating}
            className="flex-1 h-12 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
          >
            {generating ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                {mode === "flashcard" ? "Generating Flashcards..." : "Generating Quiz..."}
              </>
            ) : (
              <>
                <Sparkles className="size-5" />
                {!selectedModuleId 
                  ? 'Select a Module to Generate'
                  : selectedFiles.length === 0
                    ? 'Select Files to Generate'
                    : mode === "flashcard" 
                      ? `Generate Flashcards (${selectedFiles.length} ${selectedFiles.length === 1 ? 'file' : 'files'})`
                      : `Generate Quiz (${selectedFiles.length} ${selectedFiles.length === 1 ? 'file' : 'files'})`
                }
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
