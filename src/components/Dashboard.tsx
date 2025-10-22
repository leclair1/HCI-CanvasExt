import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Calendar, Clock, BookOpen, Brain, AlertCircle, TrendingUp, ChevronRight } from 'lucide-react';
import { mockCourses, mockAssignments, mockStudySuggestions, mockUpcomingEvents } from '../lib/mockData';

interface DashboardProps {
  initialTab?: string;
  onNavigateToCourse: (courseId: string) => void;
  onNavigateToFlashcards: () => void;
  onNavigateToCreator: () => void;
}

export default function Dashboard({ initialTab = 'overview', onNavigateToCourse, onNavigateToFlashcards, onNavigateToCreator }: DashboardProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2">Welcome back, Student! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="study">Study Plan</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Due This Week</p>
                  <h3 className="text-foreground">5 Assignments</h3>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Study Sessions</p>
                  <h3 className="text-foreground">12 This Month</h3>
                </div>
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-chart-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Overall Progress</p>
                  <h3 className="text-foreground">78%</h3>
                </div>
                <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-chart-4" />
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Assignments & Tasks */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-foreground">Upcoming Assignments</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  {mockAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
                      onClick={() => onNavigateToCourse(assignment.courseId)}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${assignment.priority === 'high' ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                        <BookOpen className={`h-5 w-5 ${assignment.priority === 'high' ? 'text-destructive' : 'text-primary'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="text-foreground mb-1">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          </div>
                          {assignment.priority === 'high' && (
                            <Badge variant="destructive" className="shrink-0">Urgent</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{assignment.dueDate}</span>
                          </div>
                          <Badge variant="outline">{assignment.type}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* My Courses */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-foreground">My Courses</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                      onClick={() => onNavigateToCourse(course.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-foreground mb-1">{course.code}</h4>
                          <p className="text-sm text-muted-foreground">{course.name}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* AI Study Suggestions */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="text-foreground">AI Study Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {mockStudySuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-primary/5 border border-primary/10"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">{suggestion.text}</p>
                      </div>
                      {suggestion.action && (
                        <Button 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => {
                            if (suggestion.action === 'flashcards') {
                              onNavigateToFlashcards();
                            }
                          }}
                        >
                          {suggestion.actionLabel}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={onNavigateToCreator}>
                    <Brain className="h-4 w-4 mr-2" />
                    Create Flashcards
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={onNavigateToFlashcards}>
                    <Brain className="h-4 w-4 mr-2" />
                    Study Flashcards
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Study Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Extract Syllabus
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-foreground mb-6">Upcoming Events & Deadlines</h3>
            <div className="space-y-4">
              {mockUpcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4">
                  <div className="shrink-0 w-16 text-center">
                    <div className="bg-primary text-primary-foreground rounded-lg p-2">
                      <div className="text-xs">{event.month}</div>
                      <div className="text-xl">{event.day}</div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-foreground mb-1">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.course}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                      <Badge variant={event.type === 'exam' ? 'destructive' : 'default'}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Study Plan Tab */}
        <TabsContent value="study" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="h-6 w-6 text-primary" />
              <h3 className="text-foreground">AI-Generated Study Plan</h3>
            </div>
            <div className="space-y-4">
              {[
                { day: 'Monday', sessions: ['Refine CRN4020 sprint backlog (2 hrs)', 'Review COP4600 scheduling lab (1 hr)'] },
                { day: 'Tuesday', sessions: ['Synthesize CIS4930 interview insights (1.5 hrs)', 'Outline CIS4931 evaluation plan (45 min)'] },
                { day: 'Wednesday', sessions: ['CRN4020 architecture sketching (2 hrs)', 'Prep weekly status update (1 hr)'] },
                { day: 'Thursday', sessions: ['Build COP4600 memory visualizer (2.5 hrs)', 'Facilitate CIS4931 feedback session (1 hr)'] },
                { day: 'Friday', sessions: ['Polish CIS4930 prototype screens (1 hr)', 'Capture CRN4020 retro notes (1 hr)'] },
              ].map((plan) => (
                <div key={plan.day} className="p-4 rounded-lg bg-accent/50">
                  <h4 className="text-foreground mb-2">{plan.day}</h4>
                  <ul className="space-y-1">
                    {plan.sessions.map((session, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        {session}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
