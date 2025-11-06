import { useState } from "react";
import { ChevronLeft, User, Bell, Moon, Sun, Lock, LogOut } from "lucide-react";

interface ProfileSettingsProps {
  onBack: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function ProfileSettings({ onBack, onLogout, isDarkMode, onToggleDarkMode }: ProfileSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 px-12 max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 h-9 px-3 rounded-lg hover:bg-accent/20 text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="size-4" />
            <span className="text-sm">Back to Dashboard</span>
          </button>
          <h1 className="text-foreground">Profile Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <User className="size-5 text-primary" />
              <h2 className="text-foreground">Profile Information</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full h-9 px-3 rounded-lg bg-muted text-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full h-9 px-3 rounded-lg bg-muted text-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  defaultValue="student@university.edu"
                  className="w-full h-9 px-3 rounded-lg bg-muted text-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                  disabled
                />
              </div>
              <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-6">
              {isDarkMode ? (
                <Moon className="size-5 text-primary" />
              ) : (
                <Sun className="size-5 text-primary" />
              )}
              <h2 className="text-foreground">Appearance</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
              </div>
              <button
                onClick={onToggleDarkMode}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isDarkMode ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    isDarkMode ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="size-5 text-primary" />
              <h2 className="text-foreground">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    emailNotifications ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      emailNotifications ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive browser notifications</p>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    pushNotifications ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      pushNotifications ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Study Reminders</p>
                  <p className="text-xs text-muted-foreground">Get reminded to study regularly</p>
                </div>
                <button
                  onClick={() => setStudyReminders(!studyReminders)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    studyReminders ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      studyReminders ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Deadline Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified about upcoming deadlines</p>
                </div>
                <button
                  onClick={() => setDeadlineAlerts(!deadlineAlerts)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    deadlineAlerts ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      deadlineAlerts ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="size-5 text-primary" />
              <h2 className="text-foreground">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Canvas API Key</label>
                <input
                  type="password"
                  defaultValue="••••••••••••••••"
                  className="w-full h-9 px-3 rounded-lg bg-muted text-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Password:</label>
                <button className="h-9 px-4 rounded-lg bg-card hover:bg-accent/20 border border-border text-foreground transition-colors text-sm">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              <LogOut className="size-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}