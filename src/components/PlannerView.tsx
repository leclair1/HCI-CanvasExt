import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Brain, Plus, Calendar, Clock, CheckCircle2, AlertCircle, Sparkles, RotateCcw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getCourseColor, mockCourses } from '../lib/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { applyAlpha } from '../lib/colorUtils';
import { HighlightedSection } from './HighlightedSection';

interface Task {
  id: string;
  title: string;
  course: string;
  courseId: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  estimatedTime: string;
  type: 'assignment' | 'study' | 'exam-prep' | 'reading';
}

export default function PlannerView() {
  const MAX_UNDO_STEPS = 20;

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finalize sprint backlog items',
      course: 'CRN4020',
      courseId: 'crn4020',
      dueDate: 'Oct 8, 2025',
      priority: 'high',
      completed: false,
      estimatedTime: '2 hours',
      type: 'assignment',
    },
    {
      id: '2',
      title: 'Review CPU scheduling lecture notes',
      course: 'COP4600',
      courseId: 'cop4600',
      dueDate: 'Oct 9, 2025',
      priority: 'medium',
      completed: false,
      estimatedTime: '1 hour',
      type: 'study',
    },
    {
      id: '3',
      title: 'Prepare usability research brief',
      course: 'CIS4930',
      courseId: 'cis4930',
      dueDate: 'Oct 12, 2025',
      priority: 'high',
      completed: false,
      estimatedTime: '3 hours',
      type: 'exam-prep',
    },
    {
      id: '4',
      title: 'Read interaction design case studies',
      course: 'CIS4931',
      courseId: 'cis4931',
      dueDate: 'Oct 10, 2025',
      priority: 'low',
      completed: false,
      estimatedTime: '45 min',
      type: 'reading',
    },
    {
      id: '5',
      title: 'Update retrospective notes',
      course: 'CRN4020',
      courseId: 'crn4020',
      dueDate: 'Oct 7, 2025',
      priority: 'medium',
      completed: true,
      estimatedTime: '30 min',
      type: 'study',
    },
  ]);

  const [undoStack, setUndoStack] = useState<Task[][]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    courseId: 'crn4020',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    estimatedTime: '',
    type: 'assignment' as 'assignment' | 'study' | 'exam-prep' | 'reading',
  });

  const updateTasks = (updater: (previous: Task[]) => Task[]) => {
    setTasks((previous) => {
      const next = updater(previous);
      if (previous === next) {
        return previous;
      }

      setUndoStack((stack) => [
        ...stack.slice(-MAX_UNDO_STEPS + 1),
        previous.map((task) => ({ ...task })),
      ]);

      return next;
    });
  };

  const handleToggleTask = (taskId: string) => {
    updateTasks((previous) =>
      previous.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate || !newTask.estimatedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selectedCourse = mockCourses.find(c => c.id === newTask.courseId);
    if (!selectedCourse) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      course: selectedCourse.code,
      courseId: newTask.courseId,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      completed: false,
      estimatedTime: newTask.estimatedTime,
      type: newTask.type,
    };

    updateTasks((previous) => [...previous, task]);
    setNewTask({
      title: '',
      courseId: 'crn4020',
      dueDate: '',
      priority: 'medium',
      estimatedTime: '',
      type: 'assignment',
    });
    setIsAddTaskOpen(false);
    toast.success('Task added successfully!');
  };

  const handleUndo = () => {
    setUndoStack((stack) => {
      if (stack.length === 0) {
        return stack;
      }

      const previousSnapshot = stack[stack.length - 1];
      setTasks(previousSnapshot.map((task) => ({ ...task })));
      return stack.slice(0, -1);
    });
  };

  const upcomingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const canUndo = undoStack.length > 0;

  const weeklyPlan = [
    { 
      day: 'Monday', 
      date: 'Oct 6',
      sessions: [
        { time: '2:00 PM - 4:00 PM', task: 'Refine CRN4020 sprint backlog', course: 'CRN4020' },
        { time: '6:00 PM - 7:00 PM', task: 'Review COP4600 scheduling lab notes', course: 'COP4600' },
      ]
    },
    { 
      day: 'Tuesday', 
      date: 'Oct 7',
      sessions: [
        { time: '3:00 PM - 4:30 PM', task: 'Synthesize CIS4930 research interviews', course: 'CIS4930' },
        { time: '7:00 PM - 7:30 PM', task: 'Outline CIS4931 heuristic evaluation', course: 'CIS4931' },
      ]
    },
    { 
      day: 'Wednesday', 
      date: 'Oct 8',
      sessions: [
        { time: '1:00 PM - 3:00 PM', task: 'Draft CRN4020 architecture diagrams', course: 'CRN4020' },
        { time: '5:00 PM - 6:00 PM', task: 'Consolidate weekly insights', course: 'All Courses' },
      ]
    },
    { 
      day: 'Thursday', 
      date: 'Oct 9',
      sessions: [
        { time: '2:00 PM - 4:30 PM', task: 'Build COP4600 virtual memory demo', course: 'COP4600' },
        { time: '6:00 PM - 7:00 PM', task: 'Facilitate CIS4931 feedback session', course: 'CIS4931' },
      ]
    },
    { 
      day: 'Friday', 
      date: 'Oct 10',
      sessions: [
        { time: '3:00 PM - 4:00 PM', task: 'Light backlog grooming and QA', course: 'CRN4020' },
        { time: '5:00 PM - 6:30 PM', task: 'Update CIS4930 prototype screens', course: 'CIS4930' },
      ]
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-foreground mb-1">Study Planner</h1>
        <p className="text-muted-foreground">
          AI-powered personalized study plan based on your assignments, grades, and course syllabi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* To-Do List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Upcoming Tasks */}
          <HighlightedSection innerClassName="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-foreground">To-Do List</h3>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Undo
                </Button>
                <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="task-title">Task Title *</Label>
                      <Input
                        id="task-title"
                        placeholder="e.g., Complete Chapter 5 Homework"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-course">Course *</Label>
                      <Select
                        value={newTask.courseId}
                        onValueChange={(value) => setNewTask({ ...newTask, courseId: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.code} - {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="task-date">Due Date *</Label>
                      <Input
                        id="task-date"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-time">Estimated Time *</Label>
                      <Input
                        id="task-time"
                        placeholder="e.g., 2 hours"
                        value={newTask.estimatedTime}
                        onChange={(e) => setNewTask({ ...newTask, estimatedTime: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-type">Task Type</Label>
                      <Select
                        value={newTask.type}
                        onValueChange={(value: 'assignment' | 'study' | 'exam-prep' | 'reading') =>
                          setNewTask({ ...newTask, type: value })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="study">Study</SelectItem>
                          <SelectItem value="exam-prep">Exam Prep</SelectItem>
                          <SelectItem value="reading">Reading</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddTask}>Add Task</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-2">
              {upcomingTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>All caught up! No pending tasks.</p>
                </div>
              ) : (
                upcomingTasks.map((task) => {
                  const courseColor = getCourseColor(task.courseId);
                  const accent = courseColor.primary;

                  return (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 rounded-xl border transition-all bg-white/40 backdrop-blur-sm p-3"
                      style={{
                        borderColor: applyAlpha(accent, 0.28),
                        borderLeftWidth: '4px',
                        borderLeftColor: accent,
                        background: `linear-gradient(135deg, ${courseColor.light} 0%, ${applyAlpha(accent, 0.08)} 100%)`,
                        boxShadow: `0 14px 32px -24px ${applyAlpha(accent, 0.6)}`,
                      }}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="text-foreground mb-0.5">{task.title}</h4>
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: accent }}
                              />
                              <p className="text-xs text-muted-foreground">{task.course}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{task.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{task.estimatedTime}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: applyAlpha(accent, 0.35),
                              backgroundColor: applyAlpha(accent, 0.12),
                              color: courseColor.dark,
                            }}
                          >
                            {task.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-foreground flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-3 w-3 text-chart-2" />
                    Completed ({completedTasks.length})
                  </h4>
                  <p className="text-xs text-muted-foreground">Click to undo</p>
                </div>
                <div className="space-y-1.5">
                  {completedTasks.map((task) => {
                    const courseColor = getCourseColor(task.courseId);
                    const accent = courseColor.primary;
                    return (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 p-2 rounded-lg transition-all cursor-pointer"
                        onClick={() => handleToggleTask(task.id)}
                        style={{
                          border: `1px dashed ${applyAlpha(accent, 0.3)}`,
                          borderLeftWidth: '3px',
                          borderLeftColor: accent,
                          background: applyAlpha(accent, 0.06),
                        }}
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(task.id)}
                          className="cursor-pointer"
                        />
                        <div className="flex-1">
                          <p className="text-xs text-foreground line-through">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.course}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </HighlightedSection>

          {/* Weekly Schedule */}
          <HighlightedSection innerClassName="space-y-2">
            <h3 className="text-foreground mb-3">AI-Generated Weekly Study Schedule</h3>
            <div className="space-y-2">
              {weeklyPlan.map((plan) => (
                <div key={plan.day} className="p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-foreground">{plan.day}</h4>
                    <span className="text-xs text-muted-foreground">{plan.date}</span>
                  </div>
                  <div className="space-y-1.5">
                    {plan.sessions.map((session, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded bg-background border border-border">
                        <Clock className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground">{session.task}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">{session.time}</span>
                            <span className="text-xs text-primary">• {session.course}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </HighlightedSection>
        </div>

        {/* Sidebar - Study Stats & Insights */}
        <div className="space-y-4">
          {/* This Week Stats */}
          <HighlightedSection innerClassName="space-y-3">
            <h3 className="text-foreground mb-3">This Week</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl text-foreground">{upcomingTasks.length}</p>
                  <p className="text-xs text-muted-foreground">Tasks Due</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-chart-2/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-chart-2" />
                </div>
                <div>
                  <p className="text-xl text-foreground">12.5</p>
                  <p className="text-xs text-muted-foreground">Study Hours Planned</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-chart-4/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-chart-4" />
                </div>
                <div>
                  <p className="text-xl text-foreground">{completedTasks.length}</p>
                  <p className="text-xs text-muted-foreground">Tasks Completed</p>
                </div>
              </div>
            </div>
          </HighlightedSection>

          {/* AI Suggestions */}
          <HighlightedSection innerClassName="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-primary" />
              <h3 className="text-foreground">Smart Suggestions</h3>
            </div>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-foreground">
                  Confirm COP4600 lab environment before Thursday's session
                </p>
              </div>
              <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-foreground">
                  CRN4020 sprint review deck is due tomorrow
                </p>
              </div>
            </div>
          </HighlightedSection>
        </div>
      </div>
    </div>
  );
}

