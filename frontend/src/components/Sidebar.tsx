import { Home, BookOpen, Brain, Calendar, Settings, Search, Menu, X, Clock, Link2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { View } from '../App';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  darkMode: boolean;
}

export default function Sidebar({ currentView, onViewChange, darkMode }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: Home },
    { id: 'course' as View, label: 'My Courses', icon: BookOpen },
    { id: 'flashcards' as View, label: 'Study Tools', icon: Brain },
    { id: 'timer' as View, label: 'Study Timer', icon: Clock },
    { id: 'calendar' as View, label: 'Calendar', icon: Calendar },
    { id: 'integrations' as View, label: 'Integrations', icon: Link2 },
    { id: 'settings' as View, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside 
        className={`
          ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-card border-r border-border
          transition-transform duration-300 ease-in-out
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-foreground">Canvas Tailored</h2>
              <p className="text-xs text-muted-foreground">Smart Study Extension</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-input-background border-white focus-visible:border-white focus-visible:ring-white/40"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-accent'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="bg-accent rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm">AI Study Assistant</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Auto-generate flashcards from your course materials
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
