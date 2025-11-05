import { BookOpen, ChevronRight, ChevronLeft } from "lucide-react";

interface CourseSelectionProps {
  onBack: () => void;
  onSelectCourse: (courseCode: string, courseName: string) => void;
}

export default function CourseSelection({ onBack, onSelectCourse }: CourseSelectionProps) {
  const courses = [
    {
      code: "CS 101",
      name: "Introduction to Computer Science",
      progress: 68,
      modules: 10,
      completedModules: 7
    },
    {
      code: "MATH 201",
      name: "Calculus II",
      progress: 52,
      modules: 12,
      completedModules: 6
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

          <div className="flex items-center gap-4 mb-8">
            <div className="size-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <BookOpen className="size-6 text-accent" />
            </div>
            <div>
              <h1 className="text-foreground">Select a Course</h1>
              <p className="text-muted-foreground text-sm">Choose a course to study flashcards</p>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {courses.map((course) => (
            <button
              key={course.code}
              onClick={() => onSelectCourse(course.code, course.name)}
              className="w-full bg-card rounded-2xl p-6 border border-border hover:border-accent transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <BookOpen className="size-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-foreground">{course.code}</h2>
                      <p className="text-muted-foreground text-sm">{course.name}</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">{course.progress}% • {course.completedModules}/{course.modules} modules</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all" 
                    style={{ width: `${course.progress}%` }} 
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-5 border border-accent/30">
          <p className="text-foreground text-sm">
            📚 Your flashcards are organized by course. Select a course above to access study materials and practice quizzes.
          </p>
        </div>
      </main>
    </div>
  );
}
