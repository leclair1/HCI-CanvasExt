import { useState, useEffect, useRef } from "react";
import { ChevronLeft, BookOpen, Sparkles, Bookmark, Loader2, ChevronDown, Folder } from "lucide-react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";
import { modulesAPI, Module, flashcardsAPI, courseFilesAPI, CourseFile } from "../lib/api";

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
  canvasCourseId?: string | null; // Canvas course ID (different from database ID)
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
  courseName = "Introduction to Computer Science",
  canvasCourseId
}: FlashcardSelectionProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [courseFiles, setCourseFiles] = useState<CourseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]); // URLs of selected files
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"flashcard" | "quiz">("flashcard");
  const [sourceType, setSourceType] = useState<"modules" | "files">("modules"); // New: toggle between modules and files
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (sourceType === "modules") {
      fetchModules();
    } else {
      fetchCourseFiles();
    }
  }, [courseId, sourceType, canvasCourseId]); // Add canvasCourseId to dependencies

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
      setLoading(true);
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

  const fetchCourseFiles = async () => {
    try {
      console.log("fetchCourseFiles called with canvasCourseId:", canvasCourseId, "courseId:", courseId);
      
      // If no canvasCourseId, try to get it from the course
      let canvasId = canvasCourseId;
      if (!canvasId && courseId) {
        console.log("No canvasCourseId provided, attempting to fetch from course API");
        // Try to get canvas_id from the course API
        try {
          const { coursesAPI } = await import("../lib/api");
          const course = await coursesAPI.getCourse(courseId);
          canvasId = course.canvas_id;
          console.log("Fetched canvas_id from course API:", canvasId);
        } catch (err) {
          console.error("Failed to fetch course from API:", err);
        }
      }
      
      if (!canvasId) {
        setError("Canvas course ID not available. This course may not be synced from Canvas. Please update your Canvas session to sync courses, or select a course that has been synced from Canvas.");
        setLoading(false);
        return;
      }
      
      console.log("Using canvas_id:", canvasId, "to fetch files");
      setLoading(true);
      setError("");
      const files = await courseFilesAPI.getCourseFiles(canvasId);
      setCourseFiles(files);
      if (files.length === 0) {
        setError("No files found in the Canvas Files tab for this course. Try selecting a different course or check if files exist in Canvas.");
      }
    } catch (error: any) {
      console.error("Failed to fetch course files:", error);
      // Error handling is done in the API layer, which will trigger the Canvas session prompt if needed
      setError(`Failed to load files: ${error.message || "Please check your Canvas session or try again later."}`);
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

  const handleSourceTypeChange = (type: "modules" | "files") => {
    setSourceType(type);
    setSelectedModuleId(null);
    setSelectedFiles([]);
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
    if (sourceType === "files") {
      // Select all course files
      const allFileUrls = courseFiles
        .filter(file => file.url)
        .map(file => file.url);
      setSelectedFiles(allFileUrls);
    } else {
      // Select all files from selected module
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
    }
  };

  const handleDeselectAllFiles = () => {
    setSelectedFiles([]);
  };

  const handleGenerate = async () => {
    // Validation
    if (sourceType === "modules" && !selectedModuleId) {
      setError("Please select a module first");
      return;
    }

    if (sourceType === "files" && selectedFiles.length === 0) {
      setError(`Please select at least one file to generate ${mode === "flashcard" ? "flashcards" : "quiz questions"} from`);
      return;
    }

    if (sourceType === "modules" && selectedFiles.length === 0) {
      setError("Please select at least one file from the module");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      // For files tab, module ID is optional now
      let moduleIdToUse: number | null = selectedModuleId;
      
      if (sourceType === "files") {
        // When using files tab, module ID is optional
        // Try to get one if available, but don't require it
        if (!moduleIdToUse) {
          // Fetch modules if we haven't already
          if (modules.length === 0) {
            try {
              const fetchedModules = await modulesAPI.getCourseModules(courseId);
              if (fetchedModules.length > 0) {
                moduleIdToUse = fetchedModules[0].id;
                console.log("Using first module as placeholder:", moduleIdToUse);
              }
            } catch (err) {
              console.error("Failed to fetch modules:", err);
              // It's okay if we can't get modules - we can still use files
              moduleIdToUse = null;
            }
          } else {
            moduleIdToUse = modules[0].id;
          }
        }
      }

      // includeFilesTab should be false when user manually selects files
      // It's only true when we want to scan ALL files from Files tab automatically
      const includeFilesTab = false; // User is manually selecting files, don't scan all

      console.log("Generating with:", {
        mode,
        sourceType,
        moduleIdToUse,
        selectedFilesCount: selectedFiles.length,
        includeFilesTab
      });

      if (mode === "flashcard") {
        const flashcardCount = 15;
        const result = await flashcardsAPI.generateFromModule(moduleIdToUse, flashcardCount, selectedFiles, includeFilesTab);
        
        console.log("Flashcards generated successfully:", result.flashcards.length);
        console.log("Navigating to flashcard study view...");
        setGenerating(false); // Stop loading before navigation
        onStartStudying(result.flashcards, moduleIdToUse, flashcardCount, selectedFiles);
      } else {
        // Quiz mode
        const quizCount = 10; // Generate 10 quiz questions
        const result = await flashcardsAPI.generateQuizFromModule(moduleIdToUse, quizCount, selectedFiles, includeFilesTab);
        
        console.log("Quiz generated successfully:", result.questions.length);
        console.log("Navigating to quiz view...");
        setGenerating(false); // Stop loading before navigation
        // Navigate to quiz with the generated questions
        onStartQuiz(result.questions, moduleIdToUse, selectedFiles);
      }
      
    } catch (err: any) {
      console.error("Generation error:", err);
      // Error handling is done in the API layer, which will trigger the Canvas session prompt if needed
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

        {/* Source Type Toggle (Modules vs Files) */}
        <div className="bg-muted rounded-2xl p-1 mb-4 inline-flex">
          <button
            onClick={() => handleSourceTypeChange("modules")}
            className={`px-6 h-9 rounded-xl text-sm transition-all flex items-center gap-2 ${
              sourceType === "modules"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="size-4" />
            Modules
          </button>
          <button
            onClick={() => handleSourceTypeChange("files")}
            className={`px-6 h-9 rounded-xl text-sm transition-all flex items-center gap-2 ${
              sourceType === "files"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Folder className="size-4" />
            Files Tab
          </button>
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
              {sourceType === "modules" 
                ? (mode === "flashcard" 
                    ? "Click on a module to expand, select the files you want, then generate AI-powered flashcards."
                    : "Click on a module to expand, select the files you want, then generate AI-powered quiz questions.")
                : (mode === "flashcard"
                    ? "Select files from the Canvas Files tab, then generate AI-powered flashcards."
                    : "Select files from the Canvas Files tab, then generate AI-powered quiz questions.")
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

        {/* Module or Files Selection */}
        <div className="mb-8">
          <h3 className="text-foreground mb-5">
            {sourceType === "modules" ? "Select a Module" : "Select Files from Canvas Files Tab"}
          </h3>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              <Loader2 className="size-8 animate-spin mx-auto mb-3" />
              {sourceType === "modules" ? "Loading modules..." : "Loading files..."}
            </div>
          ) : sourceType === "files" ? (
            // Files Tab View
            courseFiles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No files found in the Canvas Files tab for this course.
              </div>
            ) : (
              <div className="bg-card rounded-2xl border-2 border-border">
                <div className="p-5">
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

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {courseFiles.map((file, index) => (
                      <label
                        key={index}
                        className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.url)}
                          onChange={() => handleToggleFile(file.url)}
                          className="mt-0.5 size-4 rounded border-2 border-muted-foreground checked:bg-accent checked:border-accent cursor-pointer"
                        />
                        <div className="flex-1">
                          <span className="text-sm text-foreground block">{file.name}</span>
                          {file.size && (
                            <span className="text-xs text-muted-foreground">
                              {typeof file.size === 'number' 
                                ? `${(file.size / 1024).toFixed(1)} KB`
                                : file.size}
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-xs mt-3">
                    {selectedFiles.length} selected
                  </p>
                </div>
              </div>
            )
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
            disabled={(sourceType === "modules" && !selectedModuleId) || selectedFiles.length === 0 || generating}
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
                {sourceType === "modules" && !selectedModuleId
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
