import { useState, useEffect } from "react";
import { Calendar, Clock, Award, AlertCircle, TrendingUp, Sparkles, Check, FileText } from "lucide-react";
import { assignmentsAPI, Assignment } from "../lib/api";

interface PlannerProps {
  onBack: () => void;
}

export default function Planner({ onBack }: PlannerProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const data = await assignmentsAPI.getAllUpcomingAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = (assignmentId: number) => {
    setAssignments(assignments.map(a => 
      a.id === assignmentId ? { ...a, submitted: !a.submitted } : a
    ));
  };

  // Format date helper
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isUrgent = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  const activeTodos = assignments.filter(a => !a.submitted && a.status === "pending");
  const completedTodos = assignments.filter(a => a.submitted);
  const tasksCompleted = completedTodos.length;
  const weekDays = [
    {
      day: "Monday",
      date: "Oct 6",
      tasks: [
        { time: "2:00 PM - 4:00 PM", title: "Review CS 101", course: "CS 101" },
        { time: "6:00 PM - 7:00 PM", title: "Practice MATH 201 Problems", course: "MATH 201" }
      ]
    },
    {
      day: "Tuesday",
      date: "Oct 7",
      tasks: [
        { time: "3:00 PM - 4:30 PM", title: "Study CS 101 - If-Else", course: "CS 101" },
        { time: "7:00 PM - 7:30 PM", title: "Complete Math 201 Flashcards", course: "Math 201" }
      ]
    },
    {
      day: "Wednesday",
      date: "Oct 8",
      tasks: [
        { time: "1:00 PM - 3:00 PM", title: "CS 101 Assignment Work", course: "CS 101" },
        { time: "5:00 PM - 6:00 PM", title: "Review Week Materials", course: "All Courses" }
      ]
    },
    {
      day: "Thursday",
      date: "Oct 9",
      tasks: [
        { time: "2:00 PM - 4:30 PM", title: "MATH 201 Exam Prep", course: "MATH 201" },
        { time: "6:00 PM - 7:00 PM", title: "Group Study Session", course: "CS 101" }
      ]
    },
    {
      day: "Friday",
      date: "Oct 10",
      tasks: [
        { time: "3:00 PM - 4:00 PM", title: "Light Review Day", course: "All Courses" },
        { time: "5:00 PM - 6:30 PM", title: "Catch up on Readings", course: "CS 101" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 px-12 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-1">Study Planner</h1>
          <p className="text-muted-foreground text-sm">AI-powered personalized study plan based on your assignments, grades, and course syllabi</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-[1fr_400px] gap-5">
          {/* Left Column - To-Do and Schedule */}
          <div className="space-y-5">
            {/* To-Do List Card */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-foreground">To-Do List</h3>
              </div>

              {/* Active Tasks */}
              <div className="space-y-4 mb-4">
                {activeTodos.length > 0 ? (
                  activeTodos.map(assignment => {
                    const urgent = isUrgent(assignment.due_date);
                    const dueDate = formatDueDate(assignment.due_date);
                    
                    return (
                      <div key={assignment.id} className="rounded-lg p-3 border border-border">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => handleToggleTodo(assignment.id)}
                            className="mt-1 size-4 rounded border-border cursor-pointer accent-primary"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <h4 className="text-foreground mb-0.5">{assignment.title}</h4>
                                <p className="text-muted-foreground text-sm">{assignment.course}</p>
                              </div>
                              {urgent && (
                                <span className="px-2.5 py-0.5 rounded-lg bg-destructive text-destructive-foreground text-xs">
                                  Urgent
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                                <Calendar className="size-3" />
                                <span>{dueDate}</span>
                              </div>
                              {assignment.points && (
                                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                                  <span>{assignment.points} pts</span>
                                </div>
                              )}
                              <span className="px-2 py-0.5 rounded-lg border border-border text-foreground text-xs">
                                {assignment.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No pending assignments
                  </div>
                )}
              </div>

              {/* Completed Section */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Check className="size-3 text-[#009689]" />
                    <h4 className="text-foreground text-sm">Completed ({completedTodos.length})</h4>
                  </div>
                  <p className="text-muted-foreground text-xs">Click to undo</p>
                </div>
                
                {completedTodos.length > 0 && (
                  <div className="space-y-2">
                    {completedTodos.map(assignment => {
                      const dueDate = formatDueDate(assignment.due_date);
                      
                      return (
                        <div key={assignment.id} className="rounded-lg p-3 bg-muted/30">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={true}
                              onChange={() => handleToggleTodo(assignment.id)}
                              className="mt-1 size-4 rounded border-border cursor-pointer accent-primary"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  <h4 className="text-muted-foreground text-sm line-through">{assignment.title}</h4>
                                  <p className="text-muted-foreground text-xs">{assignment.course}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Weekly Schedule Card */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-foreground mb-8">AI-Generated Weekly Study Schedule</h3>

              <div className="space-y-2">
                {weekDays.map((dayData, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-foreground">{dayData.day}</h4>
                      <span className="text-muted-foreground text-xs">{dayData.date}</span>
                    </div>
                    <div className="space-y-1.5">
                      {dayData.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="bg-card rounded p-2 border border-border">
                          <div className="flex items-start gap-2">
                            <Clock className="size-3 text-foreground shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-foreground text-xs mb-0.5">{task.title}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground text-xs">{task.time}</span>
                                <span className="text-foreground text-xs">• {task.course}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Suggestions */}
          <div className="space-y-5">
            {/* This Week Stats */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-foreground mb-8">This Week</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <AlertCircle className="size-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-foreground text-xl">{activeTodos.length}</p>
                    <p className="text-muted-foreground text-xs">Tasks Due</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-[#009689]/20 flex items-center justify-center shrink-0">
                    <Clock className="size-4 text-[#009689]" />
                  </div>
                  <div>
                    <p className="text-foreground text-xl">12.5</p>
                    <p className="text-muted-foreground text-xs">Study Hours Planned</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-warning/20 flex items-center justify-center shrink-0">
                    <Award className="size-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-foreground text-xl">{tasksCompleted}</p>
                    <p className="text-muted-foreground text-xs">Tasks Completed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="size-4 text-accent" />
                <h3 className="text-foreground">Smart Suggestions</h3>
              </div>

              <div className="space-y-2">
                <div className="bg-accent/10 rounded-lg p-2 border border-accent/20">
                  <p className="text-foreground text-xs">Start Math 201 exam prep earlier</p>
                </div>
                <div className="bg-accent/10 rounded-lg p-2 border border-accent/20">
                  <p className="text-foreground text-xs">CS 101 assignment due tomorrow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
