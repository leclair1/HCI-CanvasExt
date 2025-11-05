# Study Time Tracking System

## Overview
This document explains how study time data is tracked in Canvas Tailored and how it integrates across different features.

## Current Implementation

### 1. Study Timer Component (`/components/StudyTimer.tsx`)
The Study Timer component currently tracks:
- **Total study time** in seconds (`totalStudyTime` state)
- **Sessions completed** count
- **Current session duration** and break times
- **Daily study goals** with progress tracking

**Current Limitation**: The study time data is stored only in component state, which means:
- Data is lost when the page refreshes
- Data is not shared between the Study Timer and Insights pages
- No per-course tracking

### 2. Insights View Component (`/components/InsightsView.tsx`)
The Insights page currently uses **hardcoded mock data**:
```typescript
const studyTimeData = [
  { course: 'CS 101', hours: 12 },
  { course: 'MATH 201', hours: 8 },
  { course: 'PHYS 150', hours: 10 },
  { course: 'BIO 101', hours: 6 },
  { course: 'ENG 102', hours: 5 },
];
```

## Recommended Solution: Global Study Time Tracking

### Implementation Approach

#### 1. Create a Study Time Context/Store
Create a new file `/lib/studyTimeStore.ts`:

```typescript
interface StudySession {
  id: string;
  courseId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  type: 'timer' | 'manual' | 'flashcard' | 'quiz';
}

interface StudyTimeData {
  sessions: StudySession[];
  totalTime: number;
  byWeek: { [week: string]: number };
  byCourse: { [courseId: string]: number };
}

// Store study sessions in localStorage
const STORAGE_KEY = 'canvas_tailored_study_time';

export function saveStudySession(session: StudySession) {
  const data = getStudyTimeData();
  data.sessions.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStudyTimeData(): StudyTimeData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { sessions: [], totalTime: 0, byWeek: {}, byCourse: {} };
}

export function getStudyTimeByWeek(): Array<{ day: string; hours: number }> {
  // Calculate weekly study time from sessions
}

export function getStudyTimeByCourse(): Array<{ course: string; hours: number }> {
  // Calculate per-course study time from sessions
}
```

#### 2. Track Study Time Automatically

**From Study Timer:**
- When a study session completes, save it to the store with the current course context
- Add course selector to Study Timer to track which course the student is studying

**From Flashcard Sessions:**
- When students complete flashcard practice, track the time spent
- Associate it with the course the flashcards belong to

**From Quiz/Practice Sessions:**
- When students complete practice quizzes in AI Tutor, track time
- Associate with the course

**From Course Pages:**
- When students view course materials, optionally track "reading time"
- This could be passive or require manual confirmation

#### 3. Update Insights View
Replace mock data with actual data from the study time store:

```typescript
import { getStudyTimeByCourse, getStudyTimeByWeek } from '../lib/studyTimeStore';

export default function InsightsView() {
  const studyTimeData = getStudyTimeByCourse();
  const weeklyStudyData = getStudyTimeByWeek();
  // ... rest of component
}
```

### Benefits of This Approach

1. **Persistence**: Data survives page refreshes using localStorage
2. **Centralized**: All study tracking goes through one system
3. **Flexible**: Can track time from multiple sources (timer, flashcards, quizzes)
4. **Accurate**: Real data instead of mock data
5. **Privacy-First**: Data stays in the browser, no server needed
6. **Expandable**: Easy to add new tracking sources or analytics

### Alternative: Manual Time Entry
For a simpler implementation, allow students to manually log study sessions:

- Add "Log Study Session" button in Planner
- Modal with fields: Course, Duration, Date, Activity Type
- Directly saves to study time store
- Combines with automatic tracking from timer

### Data Privacy Note
Since Canvas Tailored is a browser extension, all study time data should remain local to the user's browser using localStorage or IndexedDB. Never send this data to external servers without explicit user consent.

## For Figma Prototype
For the high-fidelity Figma prototype (no code), represent this system with:
- Mockup of settings panel showing "Study Time Tracking" toggle
- Visual indicator on Study Timer showing "Tracking for CS 101"
- Charts in Insights view showing realistic but static data
- Flow diagram showing how data moves from Timer → Storage → Insights
