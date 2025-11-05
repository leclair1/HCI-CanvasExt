import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { HighlightedSection } from './HighlightedSection';
import { 
  Clock, 
  BookOpen, 
  Brain, 
  Play,
  Calendar,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Palette
} from 'lucide-react';
import { mockCourses, mockAssignments, getCourseColor } from '../lib/mockData';
import { setCourseColorPreset, colorPresets, getPresetNames } from '../lib/courseColorStore';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface HomeViewProps {
  onNavigateToCourse: (courseId: string) => void;
  onNavigateToFlashcards: () => void;
  onStartStudySession: (courseId: string) => void;
}

export default function HomeView({ 
  onNavigateToCourse, 
  onNavigateToFlashcards,
  onStartStudySession 
}: HomeViewProps) {
  const [courseColors, setCourseColors] = useState<{[key: string]: any}>({});

  const handleColorChange = (courseId: string, presetName: string) => {
    setCourseColorPreset(courseId, presetName);
    // Force re-render by updating state
    setCourseColors({...courseColors, [courseId]: getCourseColor(courseId)});
    toast.success(`Color updated for course`);
  };

  return (
    <div className="w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-foreground mb-1">Welcome back, Student! ??</h1>
      </div>

      {/* Learning Overview */}
      <HighlightedSection className="mb-10" innerClassName="space-y-14 md:space-y-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground text-lg font-semibold">Here's your learning dashboard</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 shadow-none border border-border/60 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Due This Week</p>
                <h3 className="text-foreground">5 Assignments</h3>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-none border border-border/60 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Courses</p>
                <h3 className="text-foreground">{mockCourses.length} Courses</h3>
              </div>
              <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-chart-2" />
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-none border border-border/60 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Study Streak</p>
                <h3 className="text-foreground">12 Days</h3>
              </div>
              <div className="w-10 h-10 bg-chart-4/10 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-chart-4" />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-14 lg:space-y-16">
          {/* My Courses - Main Focus */}
          <div className="pb-2 md:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground">My Courses</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockCourses.map((course) => {
                // Get assignments for this course
                const courseAssignments = mockAssignments.filter(a => a.courseId === course.id);
                const upcomingAssignment = courseAssignments[0];
                const courseColor = getCourseColor(course.id);

                return (
                  <Card 
                    key={course.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow border-0"
                    style={{ 
                      backgroundColor: `${courseColor.light}`,
                      borderLeft: `4px solid ${courseColor.primary}`
                    }}
                  >
                    {/* Course Header */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => onNavigateToCourse(course.id)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: courseColor.primary }}
                            />
                            <h4 className="text-foreground">{course.code}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{course.name}</p>
                        </div>
                        
                        {/* Color Picker */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 shrink-0"
                              onClick={(e) => e.stopPropagation()}
                              title="Adjust color scheme"
                            >
                              <Palette className="h-3.5 w-3.5" style={{ color: courseColor.primary }} />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56" align="end">
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground mb-2">Choose color theme</p>
                              <div className="grid grid-cols-4 gap-2">
                                {getPresetNames().map((presetName) => {
                                  const preset = colorPresets[presetName];
                                  return (
                                    <button
                                      key={presetName}
                                      className="w-10 h-10 rounded-lg border-2 hover:scale-110 transition-transform"
                                      style={{ 
                                        backgroundColor: preset.light,
                                        borderColor: preset.primary
                                      }}
                                      onClick={() => handleColorChange(course.id, presetName)}
                                      title={presetName}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Progress */}
                      <div 
                        className="space-y-1 cursor-pointer"
                        onClick={() => onNavigateToCourse(course.id)}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{course.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all"
                            style={{ 
                              width: `${course.progress}%`,
                              backgroundColor: courseColor.primary
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bottom Section: Upcoming Tasks & AI Suggestions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 lg:mt-16 pt-4">
            {/* Upcoming Assignments */}
            <div className="lg:col-span-2">
              <Card className="p-4 bg-white border border-border/60 shadow-none">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-foreground">Upcoming Assignments</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-2">
                  {mockAssignments.slice(0, 3).map((assignment) => {
                    const courseColor = getCourseColor(assignment.courseId);
                    
                    return (
                      <div
                        key={assignment.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => onNavigateToCourse(assignment.courseId)}
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${courseColor.primary}15` }}
                        >
                          <BookOpen 
                            className="h-4 w-4"
                            style={{ color: courseColor.primary }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h4 className="text-foreground mb-0.5">{assignment.title}</h4>
                              <div className="flex items-center gap-1.5">
                                <div 
                                  className="w-1.5 h-1.5 rounded-full" 
                                  style={{ backgroundColor: courseColor.primary }}
                                />
                                <p className="text-xs text-muted-foreground">{assignment.course}</p>
                              </div>
                            </div>
                            {assignment.priority === 'high' && (
                              <Badge variant="destructive" className="shrink-0 text-xs">Urgent</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{assignment.dueDate}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">{assignment.type}</Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* AI Study Suggestions */}
            <div>
              <Card className="p-4 bg-white border border-border/60 shadow-none">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-primary" />
                  <h3 className="text-foreground">Smart Suggestions</h3>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground">
                        3 assignments due in 48 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertCircle className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground">
                        15 flashcards due today
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full h-7 text-xs"
                      onClick={onNavigateToFlashcards}
                    >
                      Review Now
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </HighlightedSection>
    </div>
  );
}
