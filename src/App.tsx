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
import { applyAlpha, getReadableTextColor } from './lib/colorUtils';

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
  const accentColor = uiCustomization.accentColor;
  const accentForeground = getReadableTextColor(accentColor);
  const accentSurface = applyAlpha(accentColor, 0.12);

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
      style={{
        '--custom-accent': accentColor,
        '--custom-accent-foreground': accentForeground,
        '--primary': accentColor,
        '--primary-foreground': accentForeground,
        '--ring': accentColor,
        '--accent': accentSurface,
        '--accent-foreground': accentForeground,
      } as React.CSSProperties}
    >
      <div className="min-h-screen relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(at_top_left,_rgba(59,130,246,0.12),transparent_55%),radial-gradient(at_bottom_right,_rgba(16,185,129,0.12),transparent_48%),radial-gradient(at_top_right,_rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="relative min-h-screen bg-background/95 backdrop-blur-sm">
          <TopNavigation
            currentView={secondaryView ? 'home' : mainView}
            onViewChange={handleViewChange}
            onOpenSettings={handleOpenSettings}
          />

          <main className="relative mt-2">
            {renderContent()}
          </main>

          <Toaster />
        </div>
      </div>
    </div>
  );
}
