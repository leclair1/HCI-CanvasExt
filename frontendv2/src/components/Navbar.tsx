import { Home, BookOpen, Calendar, TrendingUp, Sparkles, Bot, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: "dashboard" | "flashcard-selection" | "planner" | "insights" | "ai-tutor" | "profile") => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export default function Navbar({ currentView, onNavigate, isDarkMode, onToggleDarkMode, onLogout }: NavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (view: string) => {
    // Dashboard is active for dashboard view
    if (view === "dashboard") {
      return currentView === "dashboard";
    }
    // Flashcards is active for all flashcard/quiz related views
    if (view === "flashcards") {
      return currentView.includes("flashcard") || currentView.includes("quiz");
    }
    // Planner is active for planner view
    if (view === "planner") {
      return currentView === "planner";
    }
    // Insights is active for insights view
    if (view === "insights") {
      return currentView === "insights";
    }
    // AI Tutor is active for ai-tutor view
    if (view === "ai-tutor") {
      return currentView === "ai-tutor";
    }
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border z-40">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="size-5 text-primary-foreground" />
          </div>
          <span className="text-foreground">Canvas Tailored</span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate("dashboard")}
              className={`flex items-center gap-2 px-4 h-10 rounded-lg transition-colors ${
                isActive("dashboard")
                  ? "bg-primary/10 text-foreground"
                  : "hover:bg-accent/20 text-muted-foreground"
              }`}
            >
              <Home className="size-5" />
              <span>Home</span>
            </button>
          <button
            onClick={() => onNavigate("flashcard-selection")}
            className={`flex items-center gap-2 px-4 h-10 rounded-lg transition-colors ${
              isActive("flashcards")
                ? "bg-primary/10 text-foreground"
                : "hover:bg-accent/20 text-muted-foreground"
            }`}
          >
            <BookOpen className="size-5" />
            <span>Flashcards</span>
          </button>
          <button
            onClick={() => onNavigate("planner")}
            className={`flex items-center gap-2 px-4 h-10 rounded-lg transition-colors ${
              isActive("planner")
                ? "bg-primary/10 text-foreground"
                : "hover:bg-accent/20 text-muted-foreground"
            }`}
          >
            <Calendar className="size-5" />
            <span>Planner</span>
          </button>
          <button
            onClick={() => onNavigate("insights")}
            className={`flex items-center gap-2 px-4 h-10 rounded-lg transition-colors ${
              isActive("insights")
                ? "bg-primary/10 text-foreground"
                : "hover:bg-accent/20 text-muted-foreground"
            }`}
          >
            <TrendingUp className="size-5" />
            <span>Insights</span>
          </button>
          <button
            onClick={() => onNavigate("ai-tutor")}
            className={`flex items-center gap-2 px-4 h-10 rounded-lg transition-colors ${
              isActive("ai-tutor")
                ? "bg-primary/10 text-foreground"
                : "hover:bg-accent/20 text-muted-foreground"
            }`}
          >
            <Bot className="size-5" />
            <span>AI Tutor</span>
          </button>
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center justify-center size-10 rounded-lg transition-colors ${
                currentView === "profile"
                  ? "bg-primary/10 text-foreground"
                  : "bg-accent/10 hover:bg-accent/20 text-foreground"
              }`}
              aria-label="Profile menu"
            >
              <User className="size-5" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-card rounded-lg border border-border shadow-lg py-2">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate("profile");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent/20 transition-colors"
                >
                  <Settings className="size-4" />
                  Profile Settings
                </button>
                <div className="h-px bg-border my-2" />
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-accent/20 transition-colors"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="flex items-center justify-center size-10 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="size-5 text-foreground" />
            ) : (
              <Moon className="size-5 text-foreground" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}