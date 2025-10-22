# Canvas Tailored - Complete Project Reference

**Version:** 1.0.0  
**Last Updated:** October 21, 2025  
**Purpose:** Complete downloadable reference for recreating the Canvas Tailored prototype in Figma

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Documentation](#documentation)
4. [Complete Source Code](#complete-source-code)
5. [Color System](#color-system)
6. [Typography & Styling](#typography--styling)
7. [Component Specifications](#component-specifications)
8. [Data Models](#data-models)
9. [Features Summary](#features-summary)
10. [Figma Recreation Guide](#figma-recreation-guide)

---

## Project Overview

### What is Canvas Tailored?

Canvas Tailored is a browser extension that enhances Canvas LMS for college students with:
- **AI-powered study tools** (flashcards, summaries, quiz generation)
- **Intelligent organization** (unified dashboard, syllabus extraction, smart planner)
- **Study insights & analytics** (performance tracking, study patterns, achievements)
- **Quick access features** (course search, study timer, navigation)
- **Personalization** (dark mode, custom themes, course color customization)

### Technologies Used

- **Frontend:** React.js + TypeScript, Tailwind CSS v4.0, Shadcn/ui, Recharts, Lucide React
- **Backend:** Node.js, PostgreSQL, Canvas API integration
- **Collaboration:** GitHub

### Current Status

✅ Complete frontend prototype with:
- Fixed top navigation (Home, Flashcards, Planner, Insights, AI Tutor)
- Course color customization system (12 presets)
- Real study time tracking with localStorage persistence
- Fully functional AI Tutor with Active Recall practice
- Add Task functionality in Planner
- Responsive design for desktop and mobile

---

## File Structure

```
canvas-tailored/
├── App.tsx                          # Main application component
├── PROJECT_SUMMARY.md               # Project overview and status
├── FIGMA_RECREATION_GUIDE.md        # Step-by-step Figma guide
├── INTEGRATIONS_GUIDE.md            # API integrations documentation
├── STUDY_TIME_TRACKING.md           # Study time tracking system docs
├── Attributions.md                  # Third-party attributions
├── components/
│   ├── AITutorView.tsx             # AI Tutor with chat and practice
│   ├── CoursePage.tsx              # Course-specific page
│   ├── Dashboard.tsx               # (Legacy - not in use)
│   ├── FlashcardCreator.tsx        # Flashcard creation interface
│   ├── FlashcardInterface.tsx      # Flashcard study interface
│   ├── HomeView.tsx                # Home dashboard with course cards
│   ├── InsightsView.tsx            # Analytics and study insights
│   ├── IntegrationsPanel.tsx       # Third-party integrations
│   ├── PlannerView.tsx             # Study planner and to-do list
│   ├── SettingsPanel.tsx           # Settings and preferences
│   ├── Sidebar.tsx                 # Course navigation sidebar
│   ├── StudyTimer.tsx              # Pomodoro study timer
│   ├── TopNavigation.tsx           # Fixed top navigation bar
│   ├── figma/
│   │   └── ImageWithFallback.tsx   # Protected image component
│   └── ui/                         # Shadcn/ui components (43 files)
├── lib/
│   ├── courseColorStore.ts         # Course color customization
│   ├── mockData.ts                 # Mock data for prototype
│   └── studyTimeStore.ts           # Study time tracking logic
├── styles/
│   └── globals.css                 # Global styles and theme tokens
└── imports/                        # Figma-imported assets
    ├── Container.tsx
    ├── svg-ktd1c8hcfk.ts
    └── svg-s9jbj.tsx
```

---

## Documentation

### PROJECT_SUMMARY.md

# Canvas LMS Enhancement Extension - Group Project

## What It Does

This is a **group project** hosted on **GitHub** that creates a browser extension to supercharge Canvas LMS for college students. When complete, students will be able to install the extension and instantly access AI-powered study tools, intelligent course organization, and personalized learning analytics—all without leaving Canvas.

## Core Features

### 1. AI-Powered Study Tools
- **Flashcard Generation**: Automatically generate flashcards from course materials using AI
- **Summary Generation**: Create intelligent summaries of lecture notes and readings
- **Quiz Creation**: AI-generated practice quizzes based on course content

### 2. Intelligent Organization
- **Unified Dashboard**: Centralized view of all courses, deadlines, and assignments
- **Automatic Syllabus Extraction**: Parse and extract important dates and requirements
- **Smart Planner**: AI-powered personalized study plans
- **To-Do List**: Comprehensive task management with priority levels

### 3. Study Insights & Analytics
- **Performance Tracking**: Monitor grades, quiz scores, and flashcard accuracy
- **Study Pattern Analysis**: Track study time, activity distribution, and learning streaks
- **Progress Visualization**: Charts and graphs showing academic progress
- **Achievement System**: Gamification to encourage consistent study habits

### 4. Quick Access Features
- **Course Search**: Fast search functionality for finding course files
- **Study Timer**: Built-in timer for tracking study sessions
- **Quick Navigation**: Fixed global navigation bar

### 5. Personalization
- **Dark Mode**: Eye-friendly dark theme option
- **Custom Themes**: Multiple color schemes (Blue, Purple, Green)
- **Typography Controls**: Adjustable font size and font family
- **Spacing Options**: Compact, normal, or comfortable layout spacing
- **Course Colors**: 12 color presets per course

## Design Principles

- **Clean & Minimal**: Uncluttered interface that integrates seamlessly with Canvas
- **HCI-Focused**: Follows human-computer interaction best practices
- **Fully Responsive**: Optimized for both desktop and mobile
- **Accessible**: Designed with accessibility in mind
- **Non-Intrusive**: Enhances Canvas without disrupting native experience

---

### INTEGRATIONS_GUIDE.md

# Canvas Tailored Integrations Guide

## Available Integrations

### Development Tools
- **GitHub**: Link assignments to repositories, track commits, view project progress
- **GitLab**: Project synchronization, pipeline tracking, issue management

### Productivity Tools
- **Jira**: Create issues from assignments, sync due dates, task progress
- **Trello**: Create cards from assignments, visual task boards
- **Todoist**: Task synchronization, priority management
- **Google Calendar**: Auto-sync deadlines, study session scheduling

### Note-Taking & Collaboration
- **Notion**: Export flashcards, sync course materials, create study databases
- **Slack**: Assignment notifications, study reminders, grade updates

## Integration Data Structure

```typescript
interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'development' | 'note-taking' | 'collaboration';
  icon: string;
  color: string;
  connected: boolean;
  features: string[];
  apiUrl?: string;
}
```

---

### STUDY_TIME_TRACKING.md

# Study Time Tracking System

## Overview

Study time data is tracked globally and persists in localStorage. The system tracks:
- **Total study time** in seconds
- **Sessions completed** count
- **Per-course study time**
- **Daily study goals** with progress tracking
- **Study streak** (consecutive days)

## Implementation

### Study Session Structure

```typescript
interface StudySession {
  id: string;
  courseId: string;
  courseName: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  duration: number; // in seconds
  type: 'timer' | 'flashcard' | 'quiz' | 'reading' | 'manual';
  date: string; // YYYY-MM-DD format
}
```

### Storage Location

- **localStorage key**: `canvas_tailored_study_time`
- **Data persists** across page refreshes
- **Privacy-first**: All data stays in browser

---

## Complete Source Code

### /App.tsx

```typescript
import { useState } from 'react';
import TopNavigation, { MainView } from './components/TopNavigation';
import HomeView from './components/HomeView';
import PlannerView from './components/PlannerView';
import InsightsView from './components/InsightsView';
import AITutorView from './components/AITutorView';
import CoursePage from './components/CoursePage';
import FlashcardInterface from './components/FlashcardInterface';
import FlashcardCreator from './components/FlashcardCreator';
import StudyTimer from './components/StudyTimer';
import SettingsPanel from './components/SettingsPanel';
import IntegrationsPanel from './components/IntegrationsPanel';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export type Theme = 'default' | 'blue' | 'purple' | 'green';

export interface UICustomization {
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'default' | 'serif' | 'mono';
  cardStyle: 'default' | 'bordered' | 'elevated';
  spacing: 'compact' | 'normal' | 'comfortable';
  accentColor: string;
}

// Secondary views that aren't in main nav
type SecondaryView = 'course' | 'creator' | 'timer' | 'settings' | 'integrations';

export default function App() {
  const [mainView, setMainView] = useState<MainView>('home');
  const [secondaryView, setSecondaryView] = useState<SecondaryView | null>(null);
  const [theme, setTheme] = useState<Theme>('default');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [uiCustomization, setUICustomization] = useState<UICustomization>({
    fontSize: 'medium',
    fontFamily: 'default',
    cardStyle: 'default',
    spacing: 'comfortable',
    accentColor: '#030213',
  });

  const fontSizeClass = {
    small: 'text-sm',
    medium: '',
    large: 'text-lg',
  }[uiCustomization.fontSize];

  const fontFamilyClass = {
    default: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  }[uiCustomization.fontFamily];

  const spacingClass = {
    compact: 'space-compact',
    normal: '',
    comfortable: 'space-comfortable',
  }[uiCustomization.spacing];

  const handleNavigateToCourse = (courseId: string) => {
    setSelectedCourse(courseId);
    setSecondaryView('course');
  };

  const handleNavigateToFlashcards = () => {
    setMainView('flashcards');
    setSecondaryView(null);
  };

  const handleNavigateToCreator = () => {
    setSecondaryView('creator');
  };

  const handleStartStudySession = (courseId: string) => {
    toast.success('Starting study session', {
      description: 'Your study timer has been activated.',
    });
    setSecondaryView('timer');
  };

  const handleBackToHome = () => {
    setMainView('home');
    setSecondaryView(null);
  };

  const handleOpenSettings = () => {
    setSecondaryView('settings');
  };

  const handleViewChange = (view: MainView) => {
    setMainView(view);
    setSecondaryView(null);
  };

  // Determine what to render
  const renderContent = () => {
    // Secondary views take precedence
    if (secondaryView === 'course') {
      return (
        <CoursePage 
          courseId={selectedCourse}
          onNavigateToFlashcards={handleNavigateToFlashcards}
          onNavigateToCreator={handleNavigateToCreator}
          onBack={handleBackToHome}
        />
      );
    }
    
    if (secondaryView === 'creator') {
      return (
        <FlashcardCreator 
          courseId={selectedCourse}
          onBack={() => setSecondaryView(null)}
          onViewFlashcards={handleNavigateToFlashcards}
        />
      );
    }
    
    if (secondaryView === 'timer') {
      return <StudyTimer />;
    }
    
    if (secondaryView === 'settings') {
      return (
        <SettingsPanel 
          theme={theme}
          darkMode={darkMode}
          uiCustomization={uiCustomization}
          onThemeChange={setTheme}
          onDarkModeChange={setDarkMode}
          onUICustomizationChange={setUICustomization}
          onNavigateToIntegrations={() => setSecondaryView('integrations')}
        />
      );
    }
    
    if (secondaryView === 'integrations') {
      return <IntegrationsPanel />;
    }

    // Main views
    switch (mainView) {
      case 'home':
        return (
          <HomeView 
            onNavigateToCourse={handleNavigateToCourse}
            onNavigateToFlashcards={handleNavigateToFlashcards}
            onStartStudySession={handleStartStudySession}
          />
        );
      
      case 'flashcards':
        return (
          <FlashcardInterface 
            onBack={handleBackToHome}
          />
        );
      
      case 'planner':
        return <PlannerView />;
      
      case 'insights':
        return <InsightsView />;
      
      case 'ai-tutor':
        return <AITutorView onBack={handleBackToHome} />;
      
      default:
        return null;
    }
  };

  return (
    <div 
      className={`${darkMode ? 'dark' : ''} ${theme} ${fontSizeClass} ${fontFamilyClass} ${spacingClass}`}
      style={{ '--custom-accent': uiCustomization.accentColor } as React.CSSProperties}
    >
      <div className="min-h-screen bg-background">
        <TopNavigation 
          currentView={secondaryView ? 'home' : mainView}
          onViewChange={handleViewChange}
          onOpenSettings={handleOpenSettings}
        />
        
        <main className="mt-2">
          {renderContent()}
        </main>
        
        <Toaster />
      </div>
    </div>
  );
}
```

---

### /lib/mockData.ts

```typescript
// Mock data for the Canvas LMS Extension prototype

import { getCourseColor as getCustomCourseColor } from './courseColorStore';

// Course color scheme - now uses custom colors from store
export const courseColors = {
  cs101: {
    primary: '#3B82F6', // Blue
    light: '#DBEAFE',
    dark: '#1E40AF',
    bg: '#EFF6FF',
  },
  math201: {
    primary: '#10B981', // Green
    light: '#D1FAE5',
    dark: '#047857',
    bg: '#ECFDF5',
  },
  phys150: {
    primary: '#F59E0B', // Orange
    light: '#FEF3C7',
    dark: '#D97706',
    bg: '#FFFBEB',
  },
  bio101: {
    primary: '#8B5CF6', // Purple
    light: '#EDE9FE',
    dark: '#6D28D9',
    bg: '#F5F3FF',
  },
};

// Updated getCourseColor to use custom colors from store
export const getCourseColor = (courseId: string) => {
  return getCustomCourseColor(courseId);
};

export const mockCourses = [
  {
    id: 'cs101',
    code: 'CS 101',
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    term: 'Fall 2025',
    progress: 68,
    color: courseColors.cs101.primary,
  },
  {
    id: 'math201',
    code: 'MATH 201',
    name: 'Calculus II',
    instructor: 'Prof. Michael Chen',
    term: 'Fall 2025',
    progress: 52,
    color: courseColors.math201.primary,
  },
  {
    id: 'phys150',
    code: 'PHYS 150',
    name: 'Physics I: Mechanics',
    instructor: 'Dr. Emily Rodriguez',
    term: 'Fall 2025',
    progress: 75,
    color: courseColors.phys150.primary,
  },
  {
    id: 'bio101',
    code: 'BIO 101',
    name: 'General Biology',
    instructor: 'Prof. David Kim',
    term: 'Fall 2025',
    progress: 83,
    color: courseColors.bio101.primary,
  },
];

export const mockAssignments = [
  {
    id: 'a1',
    title: 'Data Structures Assignment',
    course: 'CS 101',
    courseId: 'cs101',
    dueDate: 'Oct 8, 2025',
    type: 'Assignment',
    priority: 'high',
  },
  {
    id: 'a2',
    title: 'Integration Problem Set',
    course: 'MATH 201',
    courseId: 'math201',
    dueDate: 'Oct 10, 2025',
    type: 'Homework',
    priority: 'medium',
  },
  {
    id: 'a3',
    title: 'Lab Report: Newton\'s Laws',
    course: 'PHYS 150',
    courseId: 'phys150',
    dueDate: 'Oct 12, 2025',
    type: 'Lab',
    priority: 'high',
  },
  {
    id: 'a4',
    title: 'Cell Structure Quiz',
    course: 'BIO 101',
    courseId: 'bio101',
    dueDate: 'Oct 15, 2025',
    type: 'Quiz',
    priority: 'medium',
  },
];

// Flashcards organized by course
export const mockFlashcardsByCourse = {
  cs101: {
    courseId: 'cs101',
    courseName: 'CS 101 - Introduction to Computer Science',
    lessons: [
      {
        id: 'lesson1',
        title: 'Data Structures',
        flashcards: [
          {
            id: 'cs101-l1-fc1',
            question: 'What is a data structure?',
            answer: 'A data structure is a specialized format for organizing, processing, retrieving and storing data efficiently.',
          },
          {
            id: 'cs101-l1-fc2',
            question: 'What is the difference between a stack and a queue?',
            answer: 'A stack follows Last-In-First-Out (LIFO) principle, while a queue follows First-In-First-Out (FIFO) principle.',
          },
        ],
      },
    ],
  },
  // ... other courses
};
```

---

### /lib/courseColorStore.ts

```typescript
// Course Color Customization Store

export interface CourseColor {
  primary: string;
  light: string;
  dark: string;
}

export interface CustomCourseColors {
  [courseId: string]: CourseColor;
}

const STORAGE_KEY = 'canvas_tailored_course_colors';

// 12 Color Presets
export const colorPresets: { [key: string]: CourseColor } = {
  blue: {
    primary: '#3B82F6',
    light: '#DBEAFE',
    dark: '#1E40AF',
  },
  green: {
    primary: '#10B981',
    light: '#D1FAE5',
    dark: '#047857',
  },
  orange: {
    primary: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
  },
  purple: {
    primary: '#8B5CF6',
    light: '#EDE9FE',
    dark: '#6D28D9',
  },
  red: {
    primary: '#EF4444',
    light: '#FEE2E2',
    dark: '#B91C1C',
  },
  pink: {
    primary: '#EC4899',
    light: '#FCE7F3',
    dark: '#BE185D',
  },
  indigo: {
    primary: '#6366F1',
    light: '#E0E7FF',
    dark: '#4338CA',
  },
  teal: {
    primary: '#14B8A6',
    light: '#CCFBF1',
    dark: '#0F766E',
  },
  cyan: {
    primary: '#06B6D4',
    light: '#CFFAFE',
    dark: '#0E7490',
  },
  amber: {
    primary: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
  },
  lime: {
    primary: '#84CC16',
    light: '#ECFCCB',
    dark: '#65A30D',
  },
  emerald: {
    primary: '#10B981',
    light: '#D1FAE5',
    dark: '#047857',
  },
};

// Default colors for each course
const defaultColors: CustomCourseColors = {
  cs101: colorPresets.blue,
  math201: colorPresets.green,
  phys150: colorPresets.orange,
  bio101: colorPresets.purple,
};

// Get color for a specific course
export function getCourseColor(courseId: string): CourseColor {
  const customColors = getCustomCourseColors();
  return customColors[courseId] || colorPresets.blue;
}

// Get custom colors from localStorage
export function getCustomCourseColors(): CustomCourseColors {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultColors, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error loading custom course colors:', error);
  }
  return defaultColors;
}

// Set course color by preset name
export function setCourseColorPreset(courseId: string, presetName: string): void {
  const preset = colorPresets[presetName];
  if (preset) {
    setCourseColor(courseId, preset);
  }
}

// Save custom color for a course
export function setCourseColor(courseId: string, color: CourseColor): void {
  try {
    const customColors = getCustomCourseColors();
    customColors[courseId] = color;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customColors));
  } catch (error) {
    console.error('Error saving course color:', error);
  }
}

// Get all preset names
export function getPresetNames(): string[] {
  return Object.keys(colorPresets);
}
```

---

### /lib/studyTimeStore.ts

```typescript
// Study Time Tracking Store

export interface StudySession {
  id: string;
  courseId: string;
  courseName: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  duration: number; // in seconds
  type: 'timer' | 'flashcard' | 'quiz' | 'reading' | 'manual';
  date: string; // YYYY-MM-DD format
}

export interface StudyTimeData {
  sessions: StudySession[];
  lastUpdated: string;
}

const STORAGE_KEY = 'canvas_tailored_study_time';

// Get all study time data
export function getStudyTimeData(): StudyTimeData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading study time data:', error);
  }
  return { sessions: [], lastUpdated: new Date().toISOString() };
}

// Save a new study session
export function saveStudySession(session: Omit<StudySession, 'id'>): void {
  try {
    const data = getStudyTimeData();
    const newSession: StudySession = {
      ...session,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    data.sessions.push(newSession);
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving study session:', error);
  }
}

// Get study time by course
export function getStudyTimeByCourse(): Array<{ course: string; courseId: string; hours: number }> {
  const data = getStudyTimeData();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthSessions = data.sessions.filter(session => {
    const sessionDate = new Date(session.startTime);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  });

  const byCourse: { [key: string]: { courseName: string; courseId: string; seconds: number } } = {};
  
  monthSessions.forEach(session => {
    if (!byCourse[session.courseId]) {
      byCourse[session.courseId] = {
        courseName: session.courseName,
        courseId: session.courseId,
        seconds: 0,
      };
    }
    byCourse[session.courseId].seconds += session.duration;
  });

  return Object.values(byCourse).map(item => ({
    course: item.courseName,
    courseId: item.courseId,
    hours: Math.round((item.seconds / 3600) * 10) / 10,
  }));
}

// Get weekly study hours (last 7 days)
export function getWeeklyStudyHours(): Array<{ day: string; hours: number; date: string }> {
  const data = getStudyTimeData();
  const now = new Date();
  const weekData: Array<{ day: string; hours: number; date: string }> = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    const daySessions = data.sessions.filter(session => session.date === dateStr);
    const totalSeconds = daySessions.reduce((sum, session) => sum + session.duration, 0);
    const hours = Math.round((totalSeconds / 3600) * 10) / 10;

    weekData.push({
      day: dayName,
      hours,
      date: dateStr,
    });
  }

  return weekData;
}

// Get total study time for current month
export function getTotalStudyTime(): { hours: number; sessions: number } {
  const data = getStudyTimeData();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthSessions = data.sessions.filter(session => {
    const sessionDate = new Date(session.startTime);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  });

  const totalSeconds = monthSessions.reduce((sum, session) => sum + session.duration, 0);
  
  return {
    hours: Math.round((totalSeconds / 3600) * 10) / 10,
    sessions: monthSessions.length,
  };
}

// Get current study streak
export function getStudyStreak(): number {
  const data = getStudyTimeData();
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const hasSessions = data.sessions.some(session => session.date === dateStr);
    
    if (hasSessions) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// Initialize with sample data for demonstration
export function initializeSampleData(): void {
  const existing = getStudyTimeData();
  if (existing.sessions.length > 0) {
    return; // Don't overwrite existing data
  }

  const courses = [
    { id: 'cs101', name: 'CS 101' },
    { id: 'math201', name: 'MATH 201' },
    { id: 'phys150', name: 'PHYS 150' },
    { id: 'bio101', name: 'BIO 101' },
  ];

  const types: Array<'timer' | 'flashcard' | 'quiz' | 'reading'> = ['timer', 'flashcard', 'quiz', 'reading'];
  
  for (let daysAgo = 6; daysAgo >= 0; daysAgo--) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateStr = date.toISOString().split('T')[0];

    const sessionsPerDay = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < sessionsPerDay; i++) {
      const course = courses[Math.floor(Math.random() * courses.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const duration = Math.floor(Math.random() * 3600) + 1800; // 30-90 minutes
      
      const startTime = new Date(date);
      startTime.setHours(9 + i * 2, 0, 0, 0);
      const endTime = new Date(startTime.getTime() + duration * 1000);

      saveStudySession({
        courseId: course.id,
        courseName: course.name,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration,
        type,
        date: dateStr,
      });
    }
  }
}
```

---

### /styles/globals.css

```css
@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
}

.blue {
  --primary: #0077b6;
  --secondary: #caf0f8;
  --accent: #90e0ef;
  --muted: #e3f5fb;
}

.purple {
  --primary: #7209b7;
  --secondary: #f3e5ff;
  --accent: #e0aaff;
  --muted: #f8f0ff;
}

.green {
  --primary: #2d6a4f;
  --secondary: #d8f3dc;
  --accent: #95d5b2;
  --muted: #e8f5e9;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --primary: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --border: oklch(0.269 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-lg: var(--radius);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }

  h1 {
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h2 {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h4 {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  p {
    font-size: var(--text-base);
    font-weight: var(--font-weight-normal);
    line-height: 1.5;
  }
}
```

---

## Color System

### Design Tokens (CSS Variables)

```css
/* Light Mode */
--background: #ffffff
--foreground: oklch(0.145 0 0)     /* ~#252525 - Very dark gray */
--primary: #030213                  /* Almost black */
--primary-foreground: #ffffff
--muted: #ececf0                    /* Light gray */
--muted-foreground: #717182         /* Medium gray */
--border: rgba(0, 0, 0, 0.1)       /* 10% black */
--destructive: #d4183d              /* Red */

/* Chart Colors */
--chart-1: #E89E3E                  /* Orange */
--chart-2: #52B2A8                  /* Teal */
--chart-3: #4A5568                  /* Dark blue-gray */
--chart-4: #E8D84C                  /* Yellow */
--chart-5: #E8A84C                  /* Golden */
```

### Course Color Presets (12 Options)

| Preset | Primary | Light | Dark |
|--------|---------|-------|------|
| **Blue** | #3B82F6 | #DBEAFE | #1E40AF |
| **Green** | #10B981 | #D1FAE5 | #047857 |
| **Orange** | #F59E0B | #FEF3C7 | #D97706 |
| **Purple** | #8B5CF6 | #EDE9FE | #6D28D9 |
| **Red** | #EF4444 | #FEE2E2 | #B91C1C |
| **Pink** | #EC4899 | #FCE7F3 | #BE185D |
| **Indigo** | #6366F1 | #E0E7FF | #4338CA |
| **Teal** | #14B8A6 | #CCFBF1 | #0F766E |
| **Cyan** | #06B6D4 | #CFFAFE | #0E7490 |
| **Amber** | #F59E0B | #FEF3C7 | #D97706 |
| **Lime** | #84CC16 | #ECFCCB | #65A30D |
| **Emerald** | #10B981 | #D1FAE5 | #047857 |

### Default Course Colors

- **CS 101**: Blue (#3B82F6)
- **MATH 201**: Green (#10B981)
- **PHYS 150**: Orange (#F59E0B)
- **BIO 101**: Purple (#8B5CF6)

---

## Typography & Styling

### Font Sizes

- **H1**: 32px (2xl), Medium (500), 1.5 line-height
- **H2**: 24px (xl), Medium (500), 1.5 line-height
- **H3**: 20px (lg), Medium (500), 1.5 line-height
- **H4/Body**: 16px (base), Medium (500), 1.5 line-height
- **Body Regular**: 16px (base), Regular (400), 1.5 line-height
- **Small**: 14px (sm), Regular (400), 1.5 line-height
- **Extra Small**: 12px (xs), Regular (400), 1.5 line-height

### Effects & Styling

- **Corner Radius**: 10px (default for cards/buttons)
- **Card Shadow**: X:0, Y:1, Blur:3, Color: `rgba(0,0,0,0.1)`
- **Spacing Grid**: 8px base (multiples: 8, 16, 24, 32, 48, 64)

### Spacing Options

Users can choose from 3 spacing modes:
- **Compact**: 0.75× spacing multiplier
- **Normal**: 1× spacing (default)
- **Comfortable**: 1.25× spacing multiplier

---

## Component Specifications

### Course Card

**Dimensions:**
- Width: Responsive (1/4 on desktop, 1/2 on tablet, full on mobile)
- Height: Auto (min ~160px)
- Padding: 16px (p-4)
- Border-left: 4px solid {courseColor.primary}
- Background: {courseColor.light}
- Border-radius: 10px

**Elements:**
1. **Course dot** (top-left)
   - Size: 10px × 10px (w-2.5 h-2.5)
   - Background: {courseColor.primary}
   - Border-radius: 50%

2. **Course code** (h4)
   - Text: e.g., "CS 101"
   - Color: foreground

3. **Course name** (p)
   - Text: e.g., "Introduction to Computer Science"
   - Color: muted-foreground
   - Font-size: 12px (text-xs)
   - Line-clamp: 1

4. **Color picker button** (top-right)
   - Size: 28px × 28px (h-7 w-7)
   - Icon: Palette (Lucide)
   - Color: {courseColor.primary}

5. **Progress bar**
   - Label: "Progress" + percentage
   - Height: 6px (h-1.5)
   - Background: background/50
   - Fill: {courseColor.primary}
   - Border-radius: 9999px (full)

**States:**
- **Hover**: shadow-lg transition-shadow
- **Click**: Navigate to course page

**Color Picker Popover:**
- 12 color swatches in 4×3 grid
- Each swatch: 40px × 40px, border-2
- Shows preset color's light background + primary border

---

### Assignment Card

**Dimensions:**
- Width: Full container
- Padding: 12px (p-3)
- Border-radius: 8px (rounded-lg)
- Background: accent/50
- Hover: accent

**Elements:**
1. **Course icon** (left)
   - Size: 32px × 32px (w-8 h-8)
   - Background: {courseColor.primary}15 (15% opacity)
   - Icon: BookOpen (16px, h-4 w-4)
   - Color: {courseColor.primary}

2. **Title** (h4)
   - Text: Assignment title
   - Color: foreground

3. **Course badge** (below title)
   - Dot (6px) + Course name
   - Color: {courseColor.primary}

4. **Due date** (bottom-left)
   - Icon: Clock (12px)
   - Text: e.g., "Oct 8, 2025"
   - Color: muted-foreground
   - Font-size: 12px

5. **Type badge** (bottom)
   - Text: e.g., "Assignment", "Quiz"
   - Variant: outline

6. **Priority badge** (top-right, if high)
   - Text: "Urgent"
   - Variant: destructive
   - Font-size: 12px

---

### Flashcard

**Front:**
- Min-height: 260px
- Padding: 24px (p-6)
- Border: 1px solid border
- Border-radius: 10px
- Background: card
- Shadow: default card shadow

**Badge:**
- Text: "Question"
- Position: Top center
- Margin-bottom: 12px

**Question text:**
- Alignment: Center
- Font-size: 16px (base)
- Color: foreground
- Margin-bottom: 16px

**Flip instruction:**
- Icon: RotateCw (16px)
- Text: "Click to flip"
- Font-size: 14px
- Color: muted-foreground

**Back:**
- Same as front, but:
- Badge: "Answer" (variant: secondary)
- Answer text displayed

**Animation:**
- Transform: rotateY(180deg)
- Duration: 500ms
- Transform-style: preserve-3d

---

### Study Timer (Pomodoro)

**Timer Display:**
- Font-size: 72px (6xl)
- Font-weight: 700 (bold)
- Color: foreground
- Format: MM:SS

**Session selector:**
- Tabs: Study (25 min) | Short Break (5 min) | Long Break (15 min)
- Active tab: primary background

**Control buttons:**
- Start/Pause: Primary button, 48px height
- Reset: Outline button

**Progress ring:**
- Circular SVG progress indicator
- Stroke: primary color
- Background: muted color

**Session counter:**
- Text: "Session X of 4"
- Sessions completed: checkmarks

---

### Charts (Insights Page)

**Bar Chart (Study Time by Course):**
- Library: Recharts
- Height: 220px
- Bar color: {courseColor.primary} per course
- Corner radius: [8, 8, 0, 0] (top rounded)
- Labels: White text inside bars
- Grid: Dashed lines (strokeDasharray="3 3")
- Axes: muted-foreground color

**Line Chart (Weekly Study Hours):**
- Height: 220px
- Line color: chart-2 (teal)
- Stroke width: 2px
- Dots: 4px radius, filled
- Grid: Dashed lines

**Pie Chart (Activity Distribution):**
- Inner radius: 45px
- Outer radius: 65px
- Padding angle: 5°
- Colors: chart-1 through chart-5
- Legend: Color dot + label + percentage

---

## Data Models

### Course

```typescript
interface Course {
  id: string;                    // e.g., 'cs101'
  code: string;                  // e.g., 'CS 101'
  name: string;                  // e.g., 'Introduction to Computer Science'
  instructor: string;            // e.g., 'Dr. Sarah Johnson'
  term: string;                  // e.g., 'Fall 2025'
  progress: number;              // 0-100
  color: string;                 // Hex color
}
```

### Assignment

```typescript
interface Assignment {
  id: string;
  title: string;
  course: string;                // Course code
  courseId: string;
  dueDate: string;               // e.g., 'Oct 8, 2025'
  type: string;                  // e.g., 'Assignment', 'Quiz', 'Lab'
  priority: 'high' | 'medium' | 'low';
}
```

### Flashcard

```typescript
interface Flashcard {
  id: string;
  question: string;
  answer: string;
}
```

### Task (Planner)

```typescript
interface Task {
  id: string;
  title: string;
  course: string;
  courseId: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  estimatedTime: string;         // e.g., '2 hours'
  type: 'assignment' | 'study' | 'exam-prep' | 'reading';
}
```

### StudySession

```typescript
interface StudySession {
  id: string;
  courseId: string;
  courseName: string;
  startTime: string;             // ISO string
  endTime: string;               // ISO string
  duration: number;              // in seconds
  type: 'timer' | 'flashcard' | 'quiz' | 'reading' | 'manual';
  date: string;                  // YYYY-MM-DD
}
```

---

## Features Summary

### 1. Home View (Dashboard)

**Layout:**
- Quick Stats (3 cards): Due This Week, Active Courses, Study Streak
- Course Cards (4 courses, 2×2 grid)
  - Each with color customization palette icon
  - Click card → Navigate to course page
- Upcoming Assignments (bottom-left, 3 shown)
- Smart Suggestions (bottom-right)

**Features:**
- ✅ Click course card → View course details
- ✅ Click palette icon → Choose from 12 color presets
- ✅ Colors persist in localStorage
- ✅ Colors apply across all pages (Home, Flashcards, Insights, AI Tutor, Planner)

---

### 2. Flashcards View

**Flow:**
1. **Course Selection** → Select course
2. **Lesson Selection** → Check lessons to study
3. **Study Interface** → Flashcard practice

**Study Interface has 2 tabs:**
- **Flashcards**: Flip card animation, Previous/Next navigation
- **Practice Quiz**: Multiple choice questions, results with score

**Features:**
- ✅ Select all / deselect all lessons
- ✅ Dynamic flashcard count
- ✅ Progress bar with percentage
- ✅ Card flipping animation
- ✅ Quiz with instant feedback
- ✅ Results showing correct/incorrect answers

---

### 3. Planner View

**Layout:**
- To-Do List (left, 2/3 width)
  - Add Task button → Dialog with form
  - Upcoming tasks (checkboxes)
  - Completed tasks (collapsed section)
- Weekly Schedule (bottom-left)
  - AI-generated study sessions per day
- Sidebar (right, 1/3 width)
  - This Week stats
  - Smart Suggestions

**Features:**
- ✅ Add Task functionality with full form
  - Fields: Title, Course, Due Date, Priority, Estimated Time, Type
- ✅ Check/uncheck tasks
- ✅ Completed tasks move to separate section
- ✅ Course color dots on tasks
- ✅ Priority badges (Urgent for high priority)

---

### 4. Insights View

**Layout:**
- Stats Overview (4 cards): Total Study Time, Flashcards Reviewed, Average Accuracy, Study Streak
- Charts (2×1 grid):
  - Study Time by Course (bar chart with colored bars)
  - Weekly Study Hours (line chart)
- Flashcard Accuracy (left, 2/3 width)
  - Progress bars per course with dynamic colors
  - Study Activity Distribution (pie chart + legend)
- Achievements & Streaks (right, 1/3 width)
  - Achievement cards (unlocked/locked)
  - Study Insights

**Features:**
- ✅ Real study time tracking from localStorage
- ✅ Dynamic course colors in charts
- ✅ White hour labels inside bar chart
- ✅ Sample data initialization for demo

---

### 5. AI Tutor View

**Flow:**
1. **Course Selection** → Choose CS 101 or MATH 201
2. **Chat/Active Recall Interface**

**Interface has 2 tabs:**
- **Chat**: Ask questions, get AI responses
- **Active Recall**: Practice questions from course materials

**Features:**
- ✅ Course selection screen with colored cards
- ✅ Chat interface with message history
- ✅ Active Recall practice session
  - 5 practice questions
  - Radio button selections
  - Results screen with correct/incorrect highlighting
  - Score summary
- ✅ Sidebar showing available materials and key topics
- ✅ Disclaimer banner about course material limitation

---

### 6. Settings Panel

**Sections:**
- **Appearance**
  - Theme: Light / Dark
  - Color Scheme: Default, Blue, Purple, Green
  - Font Size: Small, Medium, Large
  - Spacing: Compact, Normal, Comfortable
- **Notifications** (toggles)
- **About**: Version info

**Features:**
- ✅ Theme switching
- ✅ Font size adjustment
- ✅ Spacing modes affect all layouts
- ✅ Settings persist

---

### 7. Integrations Panel

**Integrations:**
- GitHub (Connected)
- Notion (Connected)
- Slack (Connected)
- Jira (Not connected)
- Trello (Not connected)
- Google Calendar (Not connected)
- GitLab (Not connected)
- Todoist (Not connected)

**Features:**
- Integration cards showing:
  - Icon, name, description
  - Features list
  - Connection status (Connected ✓ or Connect button)
  - API URL

---

### 8. Study Timer

**Features:**
- Pomodoro timer with 3 modes:
  - Study: 25 minutes
  - Short Break: 5 minutes
  - Long Break: 15 minutes
- Start/Pause/Reset controls
- Session counter (e.g., "Session 2 of 4")
- Visual progress indicator
- Auto-switches to break after study session

---

## Figma Recreation Guide

### Step 1: Create Color Styles

In Figma, create color styles (Edit → Edit local styles → Color styles):

**Light Mode:**
- Background: #FFFFFF
- Foreground/Text: #252525
- Primary: #030213
- Muted: #ECECF0
- Muted Foreground: #717182
- Border: rgba(0, 0, 0, 0.1)
- Destructive: #D4183D

**Chart Colors:**
- Chart 1: #E89E3E (orange)
- Chart 2: #52B2A8 (teal)
- Chart 3: #4A5568 (dark blue-gray)
- Chart 4: #E8D84C (yellow)
- Chart 5: #E8A84C (golden)

**Course Colors (12 Presets):**
- Blue: #3B82F6 / #DBEAFE
- Green: #10B981 / #D1FAE5
- Orange: #F59E0B / #FEF3C7
- Purple: #8B5CF6 / #EDE9FE
- Red: #EF4444 / #FEE2E2
- Pink: #EC4899 / #FCE7F3
- Indigo: #6366F1 / #E0E7FF
- Teal: #14B8A6 / #CCFBF1
- Cyan: #06B6D4 / #CFFAFE
- Amber: #F59E0B / #FEF3C7
- Lime: #84CC16 / #ECFCCB
- Emerald: #10B981 / #D1FAE5

---

### Step 2: Typography Styles

Create text styles:
- **H1**: 32px, Medium (500), 1.5 line height
- **H2**: 24px, Medium (500), 1.5 line height
- **H3**: 20px, Medium (500), 1.5 line height
- **H4/Body**: 16px, Medium (500), 1.5 line height
- **Body Regular**: 16px, Regular (400), 1.5 line height
- **Small**: 14px, Regular (400), 1.5 line height
- **Extra Small**: 12px, Regular (400), 1.5 line height

---

### Step 3: Effects & Styling

- **Corner Radius**: 10px
- **Card Shadow**: X:0, Y:1, Blur:3, Color: rgba(0,0,0,0.1)
- **Spacing Grid**: 8px base

---

### Step 4: Create Components

**Navigation Components:**
- Top Navigation Bar
- Tab Bar (Home, Flashcards, Planner, Insights)
- Course Tab Bar (Overview, Learn, Plan, Flashcards, Quizzes)

**Cards:**
- Course Card (with color picker popover)
- Assignment Card
- Task Card (with checkbox)
- Flashcard (front/back states)
- Achievement Card

**Buttons:**
- Primary Button (filled)
- Secondary Button (outline)
- Icon Button
- Color Picker Button

**Form Elements:**
- Text Input
- Dropdown/Select
- Checkbox
- Radio Button
- Textarea

---

### Step 5: Create Screens (21 screens minimum)

**Main Views (4):**
1. Home/Dashboard
2. Flashcards (Course Selection)
3. Planner
4. Insights

**Course Page (5 tabs):**
5. Overview
6. Learn
7. Plan
8. Flashcards
9. Quizzes

**Settings & Additional (3):**
10. Settings Panel
11. Integrations Panel
12. Study Timer

**Flashcard Flow (4):**
13. Course Selection
14. Lesson Selection
15. Flashcard Front
16. Flashcard Back

**AI Tutor (3):**
17. Course Selection
18. Chat Interface
19. Active Recall Practice

---

### Step 6: Add Interactions

**Prototyping Flows:**

1. **Home → Course Page**
   - Click course card → Course Overview screen
   - Course tabs switch content

2. **Home → Flashcards**
   - Click Flashcards tab → Course Selection
   - Click course → Lesson Selection
   - Click Start Studying → Flashcard Interface
   - Click flashcard → Flip animation (show back)

3. **Course Color Customization**
   - Click palette icon → Open color picker popover
   - Click color swatch → Change course card background + border

4. **Planner**
   - Click checkbox → Toggle task completion
   - Click Add Task → Open dialog

5. **Settings**
   - Click settings icon → Slide in settings panel
   - Click outside → Close panel

---

### Step 7: Screens with Course Colors

**Home View:**
- 4 course cards with different colors
- CS 101: Blue
- MATH 201: Green
- PHYS 150: Orange
- BIO 101: Purple

**Each course card shows:**
- Colored dot (10px, course color)
- Colored left border (4px)
- Colored light background
- Colored progress bar
- Palette icon for color picker

**Color Picker Popover:**
- 12 color swatches (40px × 40px)
- 4 columns × 3 rows
- Each shows light background + primary border

---

### Step 8: Mock Data

**Courses:**
1. CS 101 - Introduction to Computer Science | Dr. Sarah Johnson | 68%
2. MATH 201 - Calculus II | Prof. Michael Chen | 52%
3. PHYS 150 - Physics I: Mechanics | Dr. Emily Rodriguez | 75%
4. BIO 101 - General Biology | Prof. David Kim | 83%

**Assignments:**
1. Data Structures Assignment | CS 101 | Oct 8 | High
2. Integration Problem Set | MATH 201 | Oct 10 | Medium
3. Lab Report: Newton's Laws | PHYS 150 | Oct 12 | High
4. Cell Structure Quiz | BIO 101 | Oct 15 | Medium

**Flashcards (CS 101):**
- Q: What is a data structure?
- A: A specialized format for organizing, processing, retrieving and storing data efficiently.

**Tasks (Planner):**
1. Complete Data Structures Assignment | CS 101 | Oct 8 | 2 hours
2. Review Chapter 5: Limits & Continuity | MATH 201 | Oct 9 | 1 hour
3. Study for Midterm Exam | PHYS 150 | Oct 12 | 3 hours

**Study Stats:**
- Total Study Time: 23 hours
- Flashcards Reviewed: 342
- Average Accuracy: 86%
- Study Streak: 12 days

---

## Attributions

This project uses:
- [shadcn/ui](https://ui.shadcn.com/) - MIT License
- [Unsplash](https://unsplash.com) - Photos under Unsplash License
- [Lucide React](https://lucide.dev) - Icons
- [Recharts](https://recharts.org) - Charts library

---

## Notes for Figma

1. **No Code Allowed**: This reference is for creating a high-fidelity prototype in Figma. Do not include any code in your Figma file.

2. **Preserve Design**: Try to match the exact colors, spacing, and typography specified in this document.

3. **Course Colors**: Make sure to show the color customization feature prominently, as this is a key differentiator.

4. **Interactivity**: Add prototyping links for main user flows (Home → Course, Flashcards flow, Color picker).

5. **Responsive**: Create mobile versions of key screens to show responsiveness.

6. **Consistency**: Use components for repeated elements (cards, buttons, badges) to maintain consistency.

7. **Study Time**: Charts should show realistic data as specified in the mock data section.

---

**End of Complete Project Reference**
**Created:** October 21, 2025  
**Canvas Tailored v1.0.0**
