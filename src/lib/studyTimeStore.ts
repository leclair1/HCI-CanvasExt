// Study Time Tracking Store
// This module handles all study time tracking across the Canvas Tailored extension

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

// Get all study time data from localStorage
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

// Get study time by course for the current month
export function getStudyTimeByCourse(): Array<{ course: string; courseId: string; hours: number }> {
  const data = getStudyTimeData();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter sessions for current month
  const monthSessions = data.sessions.filter(session => {
    const sessionDate = new Date(session.startTime);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  });

  // Group by course
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

  // Convert to array and calculate hours
  return Object.values(byCourse).map(item => ({
    course: item.courseName,
    courseId: item.courseId,
    hours: Math.round((item.seconds / 3600) * 10) / 10, // Round to 1 decimal
  }));
}

// Get weekly study hours (last 7 days)
export function getWeeklyStudyHours(): Array<{ day: string; hours: number; date: string }> {
  const data = getStudyTimeData();
  const now = new Date();
  const weekData: Array<{ day: string; hours: number; date: string }> = [];

  // Generate last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    // Calculate hours for this day
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

// Get study time for today
export function getTodayStudyTime(): number {
  const data = getStudyTimeData();
  const today = new Date().toISOString().split('T')[0];
  
  const todaySessions = data.sessions.filter(session => session.date === today);
  const totalSeconds = todaySessions.reduce((sum, session) => sum + session.duration, 0);
  
  return totalSeconds; // Return in seconds
}

// Get current study streak (consecutive days with study sessions)
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

// Get study activity distribution (by type)
export function getActivityDistribution(): Array<{ name: string; value: number; color: string }> {
  const data = getStudyTimeData();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthSessions = data.sessions.filter(session => {
    const sessionDate = new Date(session.startTime);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  });

  const byType: { [key: string]: number } = {};
  
  monthSessions.forEach(session => {
    byType[session.type] = (byType[session.type] || 0) + session.duration;
  });

  const total = Object.values(byType).reduce((sum, val) => sum + val, 0);
  
  if (total === 0) {
    // Return default mock data if no real data exists
    return [
      { name: 'Flashcards', value: 35, color: '#D97706' },
      { name: 'Reading', value: 25, color: '#059669' },
      { name: 'Timer', value: 20, color: '#2563EB' },
      { name: 'Practice Quizzes', value: 15, color: '#C084FC' },
      { name: 'Manual', value: 5, color: '#EAB308' },
    ];
  }

  const typeLabels: { [key: string]: string } = {
    timer: 'Study Timer',
    flashcard: 'Flashcards',
    quiz: 'Practice Quizzes',
    reading: 'Reading',
    manual: 'Manual Entry',
  };

  const typeColors: { [key: string]: string } = {
    timer: '#2563EB',
    flashcard: '#D97706',
    quiz: '#C084FC',
    reading: '#059669',
    manual: '#EAB308',
  };

  return Object.entries(byType).map(([type, seconds]) => ({
    name: typeLabels[type] || type,
    value: Math.round((seconds / total) * 100),
    color: typeColors[type] || '#9CA3AF',
  }));
}

// Clear all study time data (for testing/reset)
export function clearStudyTimeData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Initialize with sample data for demonstration (only if no data exists)
export function initializeSampleData(): void {
  const existing = getStudyTimeData();
  if (existing.sessions.length > 0) {
    return; // Don't overwrite existing data
  }

  // Add some sample sessions for the past week
  const courses = [
    { id: 'crn4020', name: 'CRN4020' },
    { id: 'cop4600', name: 'COP4600' },
    { id: 'cis4930', name: 'CIS4930' },
    { id: 'cis4931', name: 'CIS4931' },
  ];

  const types: Array<'timer' | 'flashcard' | 'quiz' | 'reading'> = ['timer', 'flashcard', 'quiz', 'reading'];
  
  for (let daysAgo = 6; daysAgo >= 0; daysAgo--) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateStr = date.toISOString().split('T')[0];

    // Add 2-4 sessions per day
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
