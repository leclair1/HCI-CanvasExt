import { Home, Brain, Calendar, TrendingUp, Settings, Search, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export type MainView = 'home' | 'flashcards' | 'planner' | 'insights' | 'ai-tutor';

interface TopNavigationProps {
  currentView: MainView;
  onViewChange: (view: MainView) => void;
  onOpenSettings: () => void;
}

export default function TopNavigation({ currentView, onViewChange, onOpenSettings }: TopNavigationProps) {
  const navItems = [
    { id: 'home' as MainView, label: 'Home', icon: Home },
    { id: 'flashcards' as MainView, label: 'Flashcards', icon: Brain },
    { id: 'planner' as MainView, label: 'Planner', icon: Calendar },
    { id: 'insights' as MainView, label: 'Insights', icon: TrendingUp },
    { id: 'ai-tutor' as MainView, label: 'AI Tutor', icon: MessageCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 mr-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-foreground">Canvas Tailored</h2>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  transition-colors relative
                  ${isActive 
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden sm:inline">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Search */}
        <div className="hidden md:flex items-center mr-4 w-64">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, files..."
              className="pl-9 bg-input-background h-9"
            />
          </div>
        </div>

        {/* Settings Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onOpenSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}