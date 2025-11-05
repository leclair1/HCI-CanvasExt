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
    <header
      className="sticky top-0 z-50 w-full text-white shadow-[0_24px_60px_-28px_rgba(102,32,32,0.6)]"
      style={{ backgroundColor: '#972f1c' }}
    >
      <div className="relative overflow-hidden border-b border-[#741f16]/60">
        <div className="relative flex h-16 items-center px-4 md:px-8">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mr-10">
            <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shadow-[0_10px_25px_-12px_rgba(17,24,39,0.6)]">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-white uppercase">Canvas Tailored</h1>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <nav className="flex flex-1 justify-center">
            <div className="flex items-center gap-4 rounded-full bg-white/10 px-3 py-1.5 shadow-[0_18px_48px_-28px_rgba(255,255,255,0.55)] backdrop-blur-sm">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`
                      flex items-center gap-2.5 px-6 py-2.5 rounded-full relative transition-all text-base font-semibold tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70
                      ${isActive 
                        ? 'bg-white/25 text-white shadow-[0_18px_44px_-20px_rgba(255,255,255,0.7)]'
                        : 'text-white/80 hover:text-white hover:bg-white/15'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{item.label}</span>
                    {isActive && (
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/60" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center mr-4 w-64">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Search courses, files..."
                className="pl-9 h-9 bg-white/15 border-white text-white placeholder:text-white/70 focus-visible:ring-white/45 focus-visible:border-white"
              />
            </div>
          </div>

          {/* Settings Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/90">
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
      </div>
    </header>
  );
}
