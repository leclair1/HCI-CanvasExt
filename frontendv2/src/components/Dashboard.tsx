import { Clock, BookOpen, Award, ChevronRight, Sparkles, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { tokenManager, coursesAPI, Course } from "../lib/api";

interface DashboardProps {
  onNavigateToCourse: (courseId: number, courseCode: string, courseName: string) => void;
  onNavigateToPlanner: () => void;
}

export default function Dashboard({ onNavigateToCourse, onNavigateToPlanner }: DashboardProps) {
  const [userName, setUserName] = useState("Student");
  const [studyStreak, setStudyStreak] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = tokenManager.getUser();
    if (user) {
      setUserName(user.first_name);
      setStudyStreak(user.study_streak_days);
    }
    
    // Fetch courses from API
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      const data = await coursesAPI.getCourses(true); // Get active courses only
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pt-24 px-12 max-w-7xl mx-auto pb-12">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-foreground mb-1">Welcome back, {userName}! 👋</h1>
          <p className="text-muted-foreground">Here's your learning dashboard</p>
        </div>

        {/* Top Priority Cards */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {/* Due Today */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="size-4 text-accent" />
              <h3 className="text-foreground">Due Today</h3>
            </div>

            <div className="space-y-2">
              <div className="bg-accent/10 rounded-lg p-2.5 border border-accent/20">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-foreground text-sm">If-Else If-Else Statement Practice</h4>
                  <span className="px-2 py-0.5 rounded-lg bg-destructive text-destructive-foreground text-xs shrink-0">
                    Urgent
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">CS 101 • Assignment</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-2.5 border border-border">
                <h4 className="text-foreground text-sm mb-1">Review Flashcards</h4>
                <p className="text-muted-foreground text-xs">5 cards due</p>
              </div>
            </div>
          </div>

          {/* Study Today - formerly Smart Suggestions */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-4 text-accent" />
              <h3 className="text-foreground">Study Today</h3>
            </div>

            <div className="space-y-2">
              <div className="bg-accent/10 rounded-xl p-3 border border-accent/20">
                <div className="flex items-start gap-2">
                  <svg className="size-3 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                    <path d="M6 4V6" stroke="currentColor" strokeWidth="1" />
                    <path d="M6 8H6.005" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <p className="text-foreground text-sm">1 assignments due in 48 hours</p>
                </div>
              </div>

              <div className="bg-accent/10 rounded-xl p-3 border border-accent/20">
                <div className="flex items-start gap-2 mb-2">
                  <svg className="size-3 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                    <path d="M6 4V6" stroke="currentColor" strokeWidth="1" />
                    <path d="M6 8H6.005" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <p className="text-foreground text-sm">5 flashcards due today</p>
                </div>
                <button
                  onClick={() => onNavigateToCourse("CS 101", "Introduction to Computer Science")}
                  className="w-full h-7 bg-primary rounded-lg text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
                >
                  Review Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <h2 className="text-foreground mb-5">My Courses</h2>
          
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading courses...
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No courses found. Please sync your Canvas account.
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-5">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => onNavigateToCourse(course.id, course.code, course.name)}
                  className="bg-card rounded-2xl p-5 border border-border hover:border-accent transition-colors cursor-pointer text-left"
                  style={{ borderLeftColor: course.color, borderLeftWidth: '4px' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-foreground mb-1">{course.code}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{course.name}</p>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">{Math.round(course.progress)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all" 
                        style={{ width: `${course.progress}%`, backgroundColor: course.color }} 
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-[1fr_400px] gap-5">
          {/* Upcoming Assignments */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-foreground">Upcoming Assignments</h3>
              <button className="px-3 h-8 rounded-lg hover:bg-accent/20 text-foreground transition-colors text-sm">
                View All
              </button>
            </div>

            <div className="bg-accent/10 rounded-xl p-3">
              <div className="flex gap-4">
                <div className="size-8 rounded-lg bg-destructive/20 flex items-center justify-center shrink-0">
                  <BookOpen className="size-4 text-destructive" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className="text-foreground mb-0.5">If-Else If-Else Statement Practice</h4>
                      <p className="text-muted-foreground text-sm">CS 101</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-lg bg-destructive text-destructive-foreground text-xs">
                      Urgent
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock className="size-3" />
                      <span>Oct 8, 2025</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-lg border border-border text-foreground text-xs">
                      Assignment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Personal Stats & Tasks */}
          <div className="space-y-5">
            {/* Study Streak */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Study Streak</p>
                  <p className="text-foreground">{studyStreak} {studyStreak === 1 ? 'Day' : 'Days'}</p>
                </div>
                <div className="size-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <Award className="size-5 text-warning" />
                </div>
              </div>
            </div>

            {/* Today's Tasks from Planner */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-foreground">Today's Tasks</h3>
                <button 
                  onClick={onNavigateToPlanner}
                  className="text-accent text-sm hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg p-3 border border-border">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 rounded border-border cursor-pointer accent-primary"
                    />
                    <div className="flex-1">
                      <h4 className="text-foreground text-sm mb-0.5">If-Else If-Else Statement Practice</h4>
                      <p className="text-muted-foreground text-xs mb-1.5">CS 101</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Calendar className="size-3" />
                          <span>Oct 8, 2025</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-lg bg-destructive text-destructive-foreground text-xs">
                          Urgent
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 border border-border">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 rounded border-border cursor-pointer accent-primary"
                    />
                    <div className="flex-1">
                      <h4 className="text-foreground text-sm mb-0.5">Review Week Materials</h4>
                      <p className="text-muted-foreground text-xs mb-1.5">All Courses</p>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Clock className="size-3" />
                        <span>5:00 PM - 6:00 PM</span>
                      </div>
                    </div>
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
