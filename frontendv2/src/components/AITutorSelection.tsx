import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Bot, Loader2, ChevronDown, FileText, Check, Folder } from "lucide-react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";
import { modulesAPI, Module, courseFilesAPI, CourseFile } from "../lib/api";

interface AITutorSelectionProps {
  onBack: () => void;
  onStartChat: (moduleId: number | null, selectedFiles: string[], courseName: string) => void;
  courseId: number;
  courseCode?: string;
  courseName?: string;
  canvasCourseId?: string | null;
}

export default function AITutorSelection({ 
  onBack, 
  onStartChat,
  courseId,
  courseCode = "CS 101", 
  courseName = "Introduction to Computer Science",
  canvasCourseId
}: AITutorSelectionProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [courseFiles, setCourseFiles] = useState<CourseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]); // URLs of selected files
  const [error, setError] = useState("");
  const [sourceType, setSourceType] = useState<"modules" | "files">("modules"); // Toggle between modules and files
  const isInitialMount = useRef(true);

  useEffect(() => {
    console.log(`AITutorSelection mounted with courseId: ${courseId}, courseName: ${courseName}`);
    
    if (courseId && courseId > 0) {
      if (sourceType === "modules") {
        fetchModules();
      } else {
        fetchCourseFiles();
      }
    } else {
      console.error("Invalid courseId:", courseId);
      setError(`No course selected (courseId: ${courseId}). Please go back and select a course first.`);
      setLoading(false);
    }
  }, [courseId, sourceType]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous errors
      
      console.log(`Fetching modules for course ${courseId}...`);
      const data = await modulesAPI.getCourseModules(courseId);
      console.log(`Loaded ${data.length} modules`);
      
      setModules(data);
      
      // Auto-select first module if available
      if (data.length > 0 && isInitialMount.current) {
        setSelectedModuleId(data[0].id);
        isInitialMount.current = false;
      }
    } catch (error: any) {
      console.error("Failed to fetch modules:", error);
      setError(error.message || "Failed to load modules. Please try again.");
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
      setError(`Failed to load files: ${error.message || "Please check your Canvas session or try again later."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSourceTypeChange = (type: "modules" | "files") => {
    setSourceType(type);
    setSelectedModuleId(null);
    setSelectedFiles([]);
    setError("");
    isInitialMount.current = true; // Reset initial mount flag
  };

  const toggleModule = (moduleId: number) => {
    setSelectedModuleId(selectedModuleId === moduleId ? null : moduleId);
  };

  const toggleFileSelection = (fileUrl: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileUrl)
        ? prev.filter(url => url !== fileUrl)
        : [...prev, fileUrl]
    );
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
      const selectedModule = modules.find(m => m.id === selectedModuleId);
      if (!selectedModule) return;

      const items = Array.isArray(selectedModule.items) 
        ? selectedModule.items 
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

  const handleStartChat = () => {
    if (sourceType === "modules" && !selectedModuleId) {
      setError("Please select a module first");
      return;
    }

    if (selectedFiles.length === 0) {
      setError("Please select at least one file for the AI tutor to reference");
      return;
    }

    // Start chat with selected files (moduleId can be null if using files tab)
    onStartChat(selectedModuleId, selectedFiles, courseName);
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
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="size-6 text-primary" />
              </div>
              <div>
                <h1 className="text-foreground">AI Tutor Setup</h1>
                <p className="text-muted-foreground text-sm">{courseCode} - {courseName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-5 border border-primary/30 mb-8">
          <div className="flex items-center gap-4">
            <img src={imgAiTutorLogo} alt="AI Tutor" className="size-6 shrink-0" />
            <p className="text-foreground text-sm">
              Select the course materials you want the AI tutor to reference when answering your questions.
            </p>
          </div>
        </div>

        {/* Source Type Toggle */}
        <div className="mb-6">
          <div className="bg-muted rounded-2xl p-1 inline-flex">
            <button
              onClick={() => handleSourceTypeChange("modules")}
              className={`px-6 h-9 rounded-xl text-sm transition-colors flex items-center gap-2 ${
                sourceType === "modules"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="size-4" />
              Modules
            </button>
            <button
              onClick={() => handleSourceTypeChange("files")}
              className={`px-6 h-9 rounded-xl text-sm transition-colors flex items-center gap-2 ${
                sourceType === "files"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Folder className="size-4" />
              Files Tab
            </button>
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
                          onChange={() => toggleFileSelection(file.url)}
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
                
                // Parse items if they're stored as JSON string
                const items = Array.isArray(module.items) 
                  ? module.items 
                  : (typeof module.items === 'string' ? JSON.parse(module.items) : []);
                
                // Filter to show only files
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
                  <div key={module.id} className="bg-card rounded-xl border border-border overflow-hidden">
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <Bot className={`size-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="text-left">
                          <h4 className="text-foreground font-medium">{module.name}</h4>
                          <p className="text-muted-foreground text-sm">
                            {fileItems.length} file{fileItems.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className={`size-5 text-muted-foreground transition-transform ${
                        isSelected ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* File List */}
                    {isSelected && fileItems.length > 0 && (
                      <div className="border-t border-border p-5">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-muted-foreground">
                            {selectedFiles.length} of {fileItems.length} selected
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSelectAllFiles}
                              className="text-xs text-primary hover:underline"
                            >
                              Select all
                            </button>
                            <button
                              onClick={handleDeselectAllFiles}
                              className="text-xs text-muted-foreground hover:underline"
                            >
                              Deselect all
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {fileItems.map((item: any, index: number) => {
                            const fileUrl = item.url;
                            const fileName = item.title || item.name || `File ${index + 1}`;
                            const isFileSelected = selectedFiles.includes(fileUrl);

                            return (
                              <button
                                key={index}
                                onClick={() => toggleFileSelection(fileUrl)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                  isFileSelected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50 hover:bg-accent/5'
                                }`}
                              >
                                <div className={`size-5 rounded border flex items-center justify-center shrink-0 ${
                                  isFileSelected
                                    ? 'bg-primary border-primary'
                                    : 'border-muted-foreground/30'
                                }`}>
                                  {isFileSelected && <Check className="size-3 text-primary-foreground" />}
                                </div>
                                <FileText className="size-4 text-muted-foreground shrink-0" />
                                <span className="text-sm text-foreground text-left truncate flex-1">
                                  {fileName}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* No files message */}
                    {isSelected && fileItems.length === 0 && (
                      <div className="border-t border-border p-5 text-center text-muted-foreground text-sm">
                        No files available in this module
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleStartChat}
            disabled={selectedFiles.length === 0}
            className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Start Chatting ({selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected)
          </button>
        </div>
      </main>
    </div>
  );
}

