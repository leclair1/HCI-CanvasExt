import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Brain, 
  FileText, 
  Calendar, 
  Download, 
  Sparkles,
  BookOpen,
  Video,
  FileDown,
  CheckCircle2
} from 'lucide-react';
import { mockCourses, mockCourseMaterials } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';

interface CoursePageProps {
  courseId: string | null;
  onNavigateToFlashcards: () => void;
  onNavigateToCreator: () => void;
  onBack: () => void;
}

export default function CoursePage({ courseId, onNavigateToFlashcards, onNavigateToCreator, onBack }: CoursePageProps) {
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];
  const materials = mockCourseMaterials;

  const handleGenerateStudyMaterials = (type: string) => {
    toast.success(`Generating ${type}...`, {
      description: 'AI is analyzing your course materials. This may take a few moments.',
    });
    
    setTimeout(() => {
      toast.success(`${type} ready!`, {
        description: 'Your study materials have been generated.',
        action: {
          label: 'View',
          onClick: () => onNavigateToFlashcards(),
        },
      });
    }, 2000);
  };

  const handleExtractSyllabus = () => {
    toast.success('Syllabus extracted!', {
      description: 'Key dates and deadlines have been added to your calendar.',
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-foreground mb-2">{course.code}</h1>
            <p className="text-muted-foreground">{course.name}</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge>{course.term}</Badge>
              <Badge variant="outline">{course.instructor}</Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={onNavigateToCreator}>
              <Brain className="h-4 w-4 mr-2" />
              Create Flashcards
            </Button>
            <Button variant="outline" onClick={handleExtractSyllabus}>
              <Calendar className="h-4 w-4 mr-2" />
              Extract Syllabus
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 p-4 rounded-lg bg-accent/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">Course Progress</span>
            <span className="text-sm text-muted-foreground">{course.progress}% Complete</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      </div>

      {/* AI Study Tools Banner */}
      <Card className="relative overflow-hidden p-6 mb-6 border border-primary/30 bg-gradient-to-r from-primary/25 via-sky-500/15 to-purple-500/15 shadow-[0_32px_80px_-32px_rgba(56,189,248,0.55)]">
        <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(at_top_left,_rgba(56,189,248,0.35),transparent_55%),radial-gradient(at_bottom_right,_rgba(168,85,247,0.38),transparent_55%)]" />
        <div className="relative flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary via-sky-400/80 to-purple-500/80 shadow-[0_24px_50px_-28px_rgba(56,189,248,0.65)] flex items-center justify-center shrink-0">
            <Sparkles className="h-7 w-7 text-primary-foreground drop-shadow-[0_8px_18px_rgba(15,23,42,0.35)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-500 to-purple-500 mb-2">
              Smart Study Tools Available
            </h3>
            <p className="text-sm text-primary/85 dark:text-primary-foreground/80 mb-4">
              AI can automatically generate study materials from your course content, syllabus, and lecture notes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary via-sky-500 to-purple-500 text-primary-foreground shadow-[0_18px_44px_-20px_rgba(56,189,248,0.65)] hover:shadow-[0_24px_58px_-20px_rgba(56,189,248,0.7)]"
                onClick={() => handleGenerateStudyMaterials('Flashcards')}
              >
                <Brain className="h-4 w-4 mr-2" />
                Flashcards
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-gradient-to-r from-sky-400/90 to-violet-500/90 text-white shadow-[0_18px_40px_-18px_rgba(167,139,250,0.6)] hover:shadow-[0_24px_52px_-18px_rgba(167,139,250,0.7)]"
                onClick={() => handleGenerateStudyMaterials('Summary')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Summary
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-gradient-to-r from-emerald-400/90 to-sky-500/90 text-white shadow-[0_20px_46px_-18px_rgba(16,185,129,0.65)] hover:shadow-[0_26px_58px_-18px_rgba(16,185,129,0.7)]"
                onClick={() => handleGenerateStudyMaterials('Quiz')}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Practice Quiz
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Course Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="plan">Plan</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>

        {/* Overview Tab - Deadlines, Progress, Syllabus Highlights */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Deadlines & Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Deadlines */}
              <Card className="p-6">
                <h3 className="text-foreground mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {materials.assignments.filter(a => a.status === 'pending').map((assignment) => (
                    <div key={assignment.id} className="flex items-start gap-4 p-4 rounded-lg border border-border">
                      <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center shrink-0">
                        <Calendar className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground mb-1">{assignment.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Due {assignment.dueDate}</span>
                          <span>•</span>
                          <span>{assignment.points} points</span>
                        </div>
                      </div>
                      <Badge variant="destructive">
                        {assignment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Course Modules */}
              <Card className="p-6">
                <h3 className="text-foreground mb-4">Course Modules</h3>
                <div className="space-y-4">
                  {materials.modules.map((module) => (
                    <div key={module.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-foreground">{module.title}</h4>
                        <Badge variant={module.status === 'completed' ? 'default' : 'outline'}>
                          {module.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{module.items.length} items</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column: Syllabus Highlights */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-foreground mb-4">Syllabus Highlights</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                    <p className="text-sm text-foreground">{course.instructor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Office Hours</p>
                    <p className="text-sm text-foreground">Mon/Wed 2-4 PM</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm text-foreground">instructor@university.edu</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Location</p>
                    <p className="text-sm text-foreground">Science Building, Room 201</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-foreground mb-4">Important Dates</h3>
                <div className="space-y-2">
                  {[
                    { date: 'Oct 15, 2025', event: 'Midterm Exam' },
                    { date: 'Nov 1, 2025', event: 'Project Proposal' },
                    { date: 'Dec 10, 2025', event: 'Final Exam' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{item.event}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Learn Tab - AI Assistant */}
        <TabsContent value="learn" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="h-6 w-6 text-primary" />
              <h3 className="text-foreground">AI Learning Assistant</h3>
            </div>
            
            <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm text-foreground mb-2">
                Ask the AI assistant to help you understand difficult topics, get clarifications, or receive guided explanations of course materials.
              </p>
            </div>

            {/* Example conversation */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <span className="text-sm">You</span>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-accent">
                  <p className="text-sm text-foreground">Can you explain the concept of recursion in data structures?</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Brain className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 p-4 rounded-lg border border-border">
                  <p className="text-sm text-foreground mb-3">
                    Recursion is a programming technique where a function calls itself to solve a problem. In data structures, it's particularly useful for:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground mb-3">
                    <li>Traversing tree structures</li>
                    <li>Solving divide-and-conquer problems</li>
                    <li>Processing nested data structures</li>
                  </ul>
                  <p className="text-sm text-foreground">
                    A recursive function typically has two parts: a base case (stopping condition) and a recursive case (calling itself with modified parameters).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <span className="text-sm">You</span>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-accent">
                  <p className="text-sm text-foreground">Can you give me an example?</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Brain className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 p-4 rounded-lg border border-border">
                  <p className="text-sm text-foreground mb-2">
                    Sure! Here's a classic example - calculating factorial:
                  </p>
                  <div className="p-3 rounded bg-muted font-mono text-sm mb-2">
                    <div>function factorial(n) {'{'}</div>
                    <div className="pl-4">if (n === 0) return 1; // base case</div>
                    <div className="pl-4">return n * factorial(n - 1); // recursive</div>
                    <div>{'}'}</div>
                  </div>
                  <p className="text-sm text-foreground">
                    This demonstrates both the base case (when n=0) and the recursive case where the function calls itself.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask a question about course materials..." 
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
              />
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                Ask AI
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Plan Tab - Course-Specific Study Roadmap */}
        <TabsContent value="plan" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="text-foreground">Study Roadmap for {course.code}</h3>
            </div>

            <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm text-foreground">
                AI-generated personalized study plan based on upcoming deadlines, your current progress, and learning patterns.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  week: 'This Week (Oct 6-12)',
                  tasks: [
                    { day: 'Mon', task: 'Complete Assignment 3', hours: '2 hrs' },
                    { day: 'Wed', task: 'Review Module 4 - Recursion', hours: '1.5 hrs' },
                    { day: 'Fri', task: 'Practice coding problems', hours: '1 hr' },
                  ]
                },
                {
                  week: 'Next Week (Oct 13-19)',
                  tasks: [
                    { day: 'Mon', task: 'Start Assignment 4', hours: '2 hrs' },
                    { day: 'Tue', task: 'Midterm exam prep begins', hours: '2 hrs' },
                    { day: 'Thu', task: 'Review all modules 1-5', hours: '3 hrs' },
                  ]
                },
                {
                  week: 'Week of Oct 20-26',
                  tasks: [
                    { day: 'Mon', task: 'Intensive midterm review', hours: '3 hrs' },
                    { day: 'Wed', task: 'Practice exams', hours: '2 hrs' },
                    { day: 'Fri', task: 'Final review session', hours: '2 hrs' },
                  ]
                },
              ].map((plan, index) => (
                <div key={index} className="p-4 rounded-lg bg-accent/50">
                  <h4 className="text-foreground mb-3">{plan.week}</h4>
                  <div className="space-y-2">
                    {plan.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded bg-background border border-border">
                        <div className="w-16 shrink-0">
                          <Badge variant="outline">{task.day}</Badge>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{task.task}</p>
                        </div>
                        <div className="shrink-0 text-sm text-muted-foreground">
                          {task.hours}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6" variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              Regenerate Study Plan
            </Button>
          </Card>
        </TabsContent>

        {/* Flashcards Tab */}
        <TabsContent value="flashcards" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground">Flashcard Decks for {course.code}</h3>
              <Button onClick={onNavigateToCreator}>
                <Brain className="h-4 w-4 mr-2" />
                Create New Deck
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.modules.map((module) => (
                <div key={module.id} className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer" onClick={onNavigateToFlashcards}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-foreground">{module.title}</h4>
                    <Badge variant={module.status === 'completed' ? 'default' : 'outline'}>
                      {module.status === 'completed' ? '15' : '8'} cards
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last reviewed: 2 days ago</span>
                    <Button size="sm" variant="outline">
                      Study Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground">Practice Quizzes</h3>
              <Button>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Quiz
              </Button>
            </div>

            <div className="space-y-4">
              {materials.modules.map((module, index) => (
                <div key={module.id} className="p-6 rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-foreground mb-2">{module.title} - Practice Quiz</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>10 questions</span>
                        <span>•</span>
                        <span>15 minutes</span>
                        <span>•</span>
                        <span>Multiple attempts allowed</span>
                      </div>
                    </div>
                    {index < 2 && (
                      <div className="text-right">
                        <p className="text-sm text-foreground mb-1">Last Score</p>
                        <p className="text-2xl text-chart-2">{85 + index * 5}%</p>
                      </div>
                    )}
                  </div>
                  
                  {index < 2 ? (
                    <div className="flex gap-2">
                      <Button size="sm">Retake Quiz</Button>
                      <Button size="sm" variant="outline">Review Answers</Button>
                    </div>
                  ) : (
                    <Button size="sm">Start Quiz</Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Old Modules Tab - REMOVED, content merged into Overview */}
        <TabsContent value="modules" className="space-y-4">
          {materials.modules.map((module) => (
            <Card key={module.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-foreground mb-1">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </div>
                <Badge variant={module.status === 'completed' ? 'default' : 'outline'}>
                  {module.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {module.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="shrink-0 mt-0.5">
                      {item.type === 'video' && <Video className="h-5 w-5 text-chart-2" />}
                      {item.type === 'reading' && <BookOpen className="h-5 w-5 text-chart-4" />}
                      {item.type === 'file' && <FileDown className="h-5 w-5 text-primary" />}
                      {item.type === 'quiz' && <CheckCircle2 className="h-5 w-5 text-chart-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-foreground">{item.title}</span>
                        {item.completed && <CheckCircle2 className="h-5 w-5 text-chart-2 shrink-0" />}
                      </div>
                      {(item.duration || item.pages || item.size || item.questions) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.duration || item.pages || item.size || `${item.questions} questions`}
                        </p>
                      )}
                      {item.content && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onNavigateToCreator}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Create Study Materials for This Module
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          {materials.assignments.map((assignment) => (
            <Card key={assignment.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-foreground mb-1">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">{assignment.description}</p>
                </div>
                <Badge variant={assignment.status === 'submitted' ? 'default' : 'destructive'}>
                  {assignment.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                  <p className="text-sm text-foreground">{assignment.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Points</p>
                  <p className="text-sm text-foreground">{assignment.points}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="text-sm text-foreground">{assignment.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Score</p>
                  <p className="text-sm text-foreground">{assignment.score || '-'}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {assignment.status === 'pending' && (
                  <Button size="sm">Submit Assignment</Button>
                )}
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Syllabus Tab */}
        <TabsContent value="syllabus">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-foreground mb-2">Course Syllabus</h3>
                <p className="text-sm text-muted-foreground">
                  AI can extract key dates, deadlines, and exam schedules from your syllabus
                </p>
              </div>
              <Button variant="outline" onClick={handleExtractSyllabus}>
                <Sparkles className="h-4 w-4 mr-2" />
                Auto-Extract Dates
              </Button>
            </div>

            <div className="space-y-6">
              {/* Course Info */}
              <div>
                <h4 className="text-foreground mb-3">Course Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-accent/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                    <p className="text-sm text-foreground">{course.instructor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Office Hours</p>
                    <p className="text-sm text-foreground">Mon/Wed 2-4 PM</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm text-foreground">instructor@university.edu</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Location</p>
                    <p className="text-sm text-foreground">Science Building, Room 201</p>
                  </div>
                </div>
              </div>

              {/* Key Dates */}
              <div>
                <h4 className="text-foreground mb-3">Important Dates</h4>
                <div className="space-y-2">
                  {[
                    { date: 'Oct 15, 2025', event: 'Midterm Exam', type: 'exam' },
                    { date: 'Nov 1, 2025', event: 'Project Proposal Due', type: 'assignment' },
                    { date: 'Nov 20, 2025', event: 'Final Project Due', type: 'assignment' },
                    { date: 'Dec 10, 2025', event: 'Final Exam', type: 'exam' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{item.event}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <Badge variant={item.type === 'exam' ? 'destructive' : 'default'}>
                        {item.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grading Policy */}
              <div>
                <h4 className="text-foreground mb-3">Grading Policy</h4>
                <div className="space-y-2">
                  {[
                    { category: 'Assignments', weight: '30%' },
                    { category: 'Midterm Exam', weight: '25%' },
                    { category: 'Final Exam', weight: '30%' },
                    { category: 'Participation', weight: '15%' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                      <span className="text-sm text-foreground">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Download */}
              <div className="pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Syllabus (PDF)
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
