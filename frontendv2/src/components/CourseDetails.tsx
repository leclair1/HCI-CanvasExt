import { ChevronLeft, BookOpen, Clock, Calendar, FileText, Sparkles } from "lucide-react";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";

interface CourseDetailsProps {
  onBack: () => void;
  onNavigateToFlashcards: () => void;
  onNavigateToAITutor: () => void;
  courseCode: string;
  courseName: string;
}

export default function CourseDetails({ 
  onBack, 
  onNavigateToFlashcards,
  onNavigateToAITutor,
  courseCode, 
  courseName 
}: CourseDetailsProps) {
  // Mock data for assignments
  const assignments = [
    {
      id: "1",
      title: "If-Else If-Else Statement Practice",
      type: "Assignment",
      dueDate: "Today",
      urgent: true
    },
    {
      id: "2", 
      title: "Arrays and Loops Homework",
      type: "Homework",
      dueDate: "Tomorrow",
      urgent: false
    },
    {
      id: "3",
      title: "Midterm Project: Calculator App",
      type: "Project",
      dueDate: "Nov 15",
      urgent: false
    }
  ];

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
            {assignments.map((assignment) => (
              <div 
                key={assignment.id}
                className={`bg-card rounded-2xl p-5 border-2 transition-all ${
                  assignment.urgent 
                    ? "border-destructive/30 bg-destructive/5" 
                    : "border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`size-10 rounded-lg flex items-center justify-center ${
                      assignment.urgent 
                        ? "bg-destructive/20" 
                        : "bg-primary/20"
                    }`}>
                      <FileText className={`size-5 ${
                        assignment.urgent 
                          ? "text-destructive" 
                          : "text-primary"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-foreground">{assignment.title}</h3>
                        {assignment.urgent && (
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
                    <span>Due {assignment.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Modules */}
        <div>
          <h2 className="text-foreground mb-5">Recent Modules</h2>
          <div className="space-y-3">
            <div className="bg-card rounded-2xl p-5 border border-border hover:border-accent transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BookOpen className="size-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground mb-1">Module 7: Conditional Statements</h3>
                  <p className="text-muted-foreground text-sm">Completed 2 days ago</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-accent text-sm">
                    <svg className="size-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span>95%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-5 border border-border hover:border-accent transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                  <BookOpen className="size-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground mb-1">Module 6: Functions and Parameters</h3>
                  <p className="text-muted-foreground text-sm">Completed 1 week ago</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-accent text-sm">
                    <svg className="size-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span>88%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
