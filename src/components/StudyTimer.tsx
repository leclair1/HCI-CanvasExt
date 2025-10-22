import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock,
  Coffee,
  Settings,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { saveStudySession, getTodayStudyTime } from '../lib/studyTimeStore';
import { mockCourses } from '../lib/mockData';

export default function StudyTimer() {
  const [studyDuration, setStudyDuration] = useState(45); // minutes
  const [breakDuration, setBreakDuration] = useState(10); // minutes
  const [enableBreaks, setEnableBreaks] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(studyDuration * 60); // seconds
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0); // in seconds
  const [showSettings, setShowSettings] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].id);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
        
        if (!isBreak) {
          setTotalStudyTime(prev => prev + 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, isBreak]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (!isBreak) {
      // Study session complete - Save to storage
      const sessionDuration = studyDuration * 60; // Full session duration
      const selectedCourseData = mockCourses.find(c => c.id === selectedCourse);
      
      if (selectedCourseData) {
        const now = new Date();
        const endTime = now;
        const startTime = new Date(now.getTime() - sessionDuration * 1000);
        
        saveStudySession({
          courseId: selectedCourseData.id,
          courseName: selectedCourseData.code,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: sessionDuration,
          type: 'timer',
          date: now.toISOString().split('T')[0],
        });
      }
      
      setSessionsCompleted(prev => prev + 1);
      
      if (enableBreaks) {
        toast.success('Study session complete!', {
          description: 'Time for a break. Stretch and rest your eyes.',
        });
        setIsBreak(true);
        setTimeLeft(breakDuration * 60);
      } else {
        toast.success('Study session complete!', {
          description: `Great work! You've completed ${sessionsCompleted + 1} session${sessionsCompleted + 1 !== 1 ? 's' : ''}.`,
        });
      }
    } else {
      // Break complete
      toast.success('Break time over!', {
        description: 'Ready to start your next study session?',
      });
      setIsBreak(false);
      setTimeLeft(studyDuration * 60);
    }
  };

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(isBreak ? breakDuration * 60 : studyDuration * 60);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(studyDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const progressPercentage = isBreak
    ? ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100
    : ((studyDuration * 60 - timeLeft) / (studyDuration * 60)) * 100;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-foreground">Study Timer</h1>
            <p className="text-sm text-muted-foreground">Stay focused with timed study sessions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Selector */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <Label>Studying For</Label>
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse} disabled={isRunning}>
              <SelectTrigger className="w-full">
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
            <p className="text-xs text-muted-foreground mt-2">
              Study time will be tracked for this course in your Insights
            </p>
          </Card>
          
          <Card className="p-8">
            <div className="text-center">
              <Badge className="mb-4" variant={isBreak ? 'secondary' : 'default'}>
                {isBreak ? (
                  <><Coffee className="h-3 w-3 mr-1" /> Break Time</>
                ) : (
                  <><Clock className="h-3 w-3 mr-1" /> Study Session</>
                )}
              </Badge>
              
              {/* Circular Progress */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <svg className="w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - progressPercentage / 100)}`}
                    className={isBreak ? 'text-chart-2' : 'text-primary'}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <p className="text-6xl text-foreground mb-2">{formatTime(timeLeft)}</p>
                    <p className="text-sm text-muted-foreground">
                      {isBreak ? `${breakDuration} min break` : `${studyDuration} min session`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={isRunning ? handlePause : handleStart}
                  className="w-32"
                >
                  {isRunning ? (
                    <><Pause className="h-5 w-5 mr-2" /> Pause</>
                  ) : (
                    <><Play className="h-5 w-5 mr-2" /> Start</>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Settings */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-foreground">Timer Settings</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                {showSettings ? 'Hide' : 'Show'}
              </Button>
            </div>

            {showSettings && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Study Duration</Label>
                    <span className="text-sm text-foreground">{studyDuration} minutes</span>
                  </div>
                  <Slider
                    value={[studyDuration]}
                    onValueChange={(value) => {
                      setStudyDuration(value[0]);
                      if (!isRunning && !isBreak) {
                        setTimeLeft(value[0] * 60);
                      }
                    }}
                    min={5}
                    max={120}
                    step={5}
                    className="w-full"
                    disabled={isRunning}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5 min</span>
                    <span>120 min</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Breaks</Label>
                    <p className="text-sm text-muted-foreground">Automatic breaks between sessions</p>
                  </div>
                  <Switch
                    checked={enableBreaks}
                    onCheckedChange={setEnableBreaks}
                  />
                </div>

                {enableBreaks && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Break Duration</Label>
                      <span className="text-sm text-foreground">{breakDuration} minutes</span>
                    </div>
                    <Slider
                      value={[breakDuration]}
                      onValueChange={(value) => {
                        setBreakDuration(value[0]);
                        if (!isRunning && isBreak) {
                          setTimeLeft(value[0] * 60);
                        }
                      }}
                      min={5}
                      max={30}
                      step={5}
                      className="w-full"
                      disabled={isRunning}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5 min</span>
                      <span>30 min</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Recommended: 45-minute study sessions with 10-minute breaks (Pomodoro technique)
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-foreground">Today's Progress</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Sessions Completed</p>
                <p className="text-3xl text-foreground">{sessionsCompleted}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Study Time</p>
                <p className="text-3xl text-foreground">{formatDuration(totalStudyTime)}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Study Goal</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${Math.min((totalStudyTime / (2 * 3600)) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">2h</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-foreground mb-4">Quick Presets</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setStudyDuration(25);
                  setBreakDuration(5);
                  setEnableBreaks(true);
                  setTimeLeft(25 * 60);
                  setIsRunning(false);
                  setIsBreak(false);
                  toast.success('Pomodoro preset applied');
                }}
              >
                <Clock className="h-4 w-4 mr-2" />
                Pomodoro (25/5)
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setStudyDuration(45);
                  setBreakDuration(10);
                  setEnableBreaks(true);
                  setTimeLeft(45 * 60);
                  setIsRunning(false);
                  setIsBreak(false);
                  toast.success('Standard preset applied');
                }}
              >
                <Clock className="h-4 w-4 mr-2" />
                Standard (45/10)
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setStudyDuration(90);
                  setBreakDuration(15);
                  setEnableBreaks(true);
                  setTimeLeft(90 * 60);
                  setIsRunning(false);
                  setIsBreak(false);
                  toast.success('Deep focus preset applied');
                }}
              >
                <Clock className="h-4 w-4 mr-2" />
                Deep Focus (90/15)
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <h4 className="text-foreground mb-2">Study Tips</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                Eliminate distractions before starting
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                Stay hydrated during study sessions
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                Use breaks to move and stretch
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}