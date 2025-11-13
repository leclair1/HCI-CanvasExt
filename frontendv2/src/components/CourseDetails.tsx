import { ChevronLeft, BookOpen, Clock, Calendar, FileText, Sparkles, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";
import { modulesAPI, assignmentsAPI, Module, Assignment } from "../lib/api";

interface CourseDetailsProps {
  onBack: () => void;
  onNavigateToFlashcards: () => void;
  onNavigateToAITutor: () => void;
  courseId: number;
  courseCode: string;
  courseName: string;
}

export default function CourseDetails({ 
  onBack, 
  onNavigateToFlashcards,
  onNavigateToAITutor,
  courseId,
  courseCode, 
  courseName 
}: CourseDetailsProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, [courseId]);
  
  const fetchData = async () => {
    try {
      const [modulesData, assignmentsData] = await Promise.all([
        modulesAPI.getCourseModules(courseId),
        assignmentsAPI.getAssignments(courseId)
      ]);
      setModules(modulesData);
      
      // Filter to only upcoming assignments with specific due dates (not overdue)
      const now = new Date();
      const upcomingOnly = assignmentsData
        .filter(a => {
          if (a.submitted || a.status !== "pending") return false;
          if (!a.due_date) return false; // Only assignments with specific due dates
          const dueDate = new Date(a.due_date);
          if (isNaN(dueDate.getTime())) return false; // Invalid date
          return dueDate >= now;
        })
        .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
      
      setAssignments(upcomingOnly);
    } catch (error) {
      console.error("Failed to fetch course data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper to format assignment due date
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 0) return "Overdue";
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Helper to determine if assignment is urgent (due within 2 days)
  const isUrgent = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
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
            <span className="text-sm">Back to Dashboard</span>
          </button>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <BookOpen className="size-6 text-accent" />
              </div>
              <div>
                <h1 className="text-foreground">{courseCode}</h1>
                <p className="text-muted-foreground text-sm">{courseName}</p>
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

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-foreground mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onNavigateToFlashcards}
              className="bg-card rounded-2xl p-5 border border-border hover:border-accent transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Sparkles className="size-5 text-accent" />
                </div>
                <h3 className="text-foreground">Study Flashcards</h3>
              </div>
              <p className="text-muted-foreground text-sm">Review course materials with smart flashcards</p>
            </button>

            <button className="bg-card rounded-2xl p-5 border border-border hover:border-accent transition-colors text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <FileText className="size-5 text-primary" />
                </div>
                <h3 className="text-foreground">Course Materials</h3>
              </div>
              <p className="text-muted-foreground text-sm">Access lectures, notes, and resources</p>
            </button>
          </div>
        </div>

        {/* Course Progress */}
        <div className="mb-8">
          <h2 className="text-foreground mb-5">Course Progress</h2>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Overall Progress</p>
                <p className="text-foreground">68% Complete</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-sm mb-1">Modules Completed</p>
                <p className="text-foreground">7 of 10</p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: "68%" }} />
            </div>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-foreground">Upcoming Assignments</h2>
            <span className="text-muted-foreground text-sm">{assignments.length} assignments</span>
          </div>

          <div className="space-y-3">
            {assignments.length > 0 ? (
              assignments.map((assignment) => {
                const urgent = isUrgent(assignment.due_date);
                const dueDate = formatDueDate(assignment.due_date);
                
                return (
                  <div 
                    key={assignment.id}
                    className={`bg-card rounded-2xl p-5 border-2 transition-all ${
                      urgent 
                        ? "border-destructive/30 bg-destructive/5" 
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`size-10 rounded-lg flex items-center justify-center ${
                          urgent 
                            ? "bg-destructive/20" 
                            : "bg-primary/20"
                        }`}>
                          <FileText className={`size-5 ${
                            urgent 
                              ? "text-destructive" 
                              : "text-primary"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-foreground">{assignment.title}</h3>
                            {urgent && (
                              <span className="px-2 py-0.5 rounded-lg bg-destructive text-destructive-foreground text-xs">
                                Urgent
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{assignment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm shrink-0">
                        <Clock className="size-4" />
                        <span>{dueDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-card rounded-2xl p-8 border border-border text-center">
                <p className="text-muted-foreground">No upcoming assignments for this course</p>
              </div>
            )}
          </div>
        </div>

        {/* Course Modules */}
        <div>
          <h2 className="text-foreground mb-5">Course Modules</h2>
          
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading modules...
            </div>
          ) : modules.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No modules found for this course.
            </div>
          ) : (
            <div className="space-y-3">
              {modules.map((module) => (
                <div 
                  key={module.id}
                  className="bg-card rounded-2xl p-5 border border-border hover:border-accent transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                      <BookOpen className="size-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground mb-2">{module.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {module.items.length} {module.items.length === 1 ? 'item' : 'items'}
                      </p>
                      
                      {/* Module Items */}
                      {module.items.length > 0 && (
                        <div className="space-y-2 mt-3">
                          {module.items.slice(0, 3).map((item, idx) => (
                            <a
                              key={idx}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                            >
                              <FileText className="size-4 text-muted-foreground" />
                              <span className="text-sm text-foreground flex-1 truncate">{item.name}</span>
                              <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ))}
                          {module.items.length > 3 && (
                            <p className="text-muted-foreground text-xs pl-3">
                              + {module.items.length - 3} more items
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
