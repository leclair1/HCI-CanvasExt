import { Card } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Moon, 
  Sun, 
  Palette, 
  Bell, 
  Lock,
  Database,
  Trash2,
  Type,
  Layout,
  Link2,
  ExternalLink
} from 'lucide-react';
import type { Theme, UICustomization } from '../App';

interface SettingsPanelProps {
  theme: Theme;
  darkMode: boolean;
  uiCustomization: UICustomization;
  onThemeChange: (theme: Theme) => void;
  onDarkModeChange: (enabled: boolean) => void;
  onUICustomizationChange: (customization: UICustomization) => void;
  onNavigateToIntegrations?: () => void;
}

export default function SettingsPanel({ 
  theme, 
  darkMode,
  uiCustomization,
  onThemeChange, 
  onDarkModeChange,
  onUICustomizationChange,
  onNavigateToIntegrations
}: SettingsPanelProps) {
  const themes: { id: Theme; name: string; colors: string[] }[] = [
    { id: 'default', name: 'Default', colors: ['#030213', '#e9ebef', '#717182'] },
    { id: 'blue', name: 'Ocean Blue', colors: ['#0077b6', '#90e0ef', '#023e8a'] },
    { id: 'purple', name: 'Purple Dream', colors: ['#7209b7', '#e0aaff', '#560bad'] },
    { id: 'green', name: 'Forest Green', colors: ['#2d6a4f', '#95d5b2', '#1b4332'] },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your Canvas Tailored experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-5 w-5 text-primary" />
            <h3 className="text-foreground">Appearance</h3>
          </div>

          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme across the app</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
            </div>

            <Separator />

            {/* Theme Selection */}
            <div>
              <Label className="mb-4 block">Color Theme</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange(t.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === t.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex gap-2 mb-3">
                      {t.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground">{t.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Custom Accent Color */}
            <div>
              <Label className="mb-3 block">Custom Accent Color</Label>
              <div className="flex gap-3 items-center">
                <Input
                  type="color"
                  value={uiCustomization.accentColor}
                  onChange={(e) => onUICustomizationChange({ ...uiCustomization, accentColor: e.target.value })}
                  className="w-20 h-10 cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">{uiCustomization.accentColor}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUICustomizationChange({ ...uiCustomization, accentColor: '#030213' })}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Typography & Layout */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Type className="h-5 w-5 text-primary" />
            <h3 className="text-foreground">Typography & Layout</h3>
          </div>

          <div className="space-y-6">
            {/* Font Size */}
            <div>
              <Label className="mb-3 block">Font Size</Label>
              <div className="flex gap-2">
                {[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' }
                ].map((size) => (
                  <Button
                    key={size.value}
                    variant={uiCustomization.fontSize === size.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUICustomizationChange({ ...uiCustomization, fontSize: size.value as 'small' | 'medium' | 'large' })}
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Font Family */}
            <div>
              <Label className="mb-3 block">Font Family</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'default', label: 'Default', className: 'font-sans' },
                  { value: 'serif', label: 'Serif', className: 'font-serif' },
                  { value: 'mono', label: 'Mono', className: 'font-mono' }
                ].map((font) => (
                  <Button
                    key={font.value}
                    variant={uiCustomization.fontFamily === font.value ? 'default' : 'outline'}
                    size="sm"
                    className={font.className}
                    onClick={() => onUICustomizationChange({ ...uiCustomization, fontFamily: font.value as 'default' | 'serif' | 'mono' })}
                  >
                    {font.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Card Style */}
            <div>
              <Label className="mb-3 block">Card Style</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'default', label: 'Default' },
                  { value: 'bordered', label: 'Bordered' },
                  { value: 'elevated', label: 'Elevated' }
                ].map((style) => (
                  <Button
                    key={style.value}
                    variant={uiCustomization.cardStyle === style.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUICustomizationChange({ ...uiCustomization, cardStyle: style.value as 'default' | 'bordered' | 'elevated' })}
                  >
                    {style.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Spacing */}
            <div>
              <Label className="mb-3 block">UI Spacing</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'compact', label: 'Compact' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'comfortable', label: 'Comfortable' }
                ].map((spacing) => (
                  <Button
                    key={spacing.value}
                    variant={uiCustomization.spacing === spacing.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUICustomizationChange({ ...uiCustomization, spacing: spacing.value as 'compact' | 'normal' | 'comfortable' })}
                  >
                    {spacing.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-foreground">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Assignment Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified about upcoming deadlines</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Study Suggestions</Label>
                <p className="text-sm text-muted-foreground">Receive AI-generated study recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Grade Updates</Label>
                <p className="text-sm text-muted-foreground">Notify when grades are posted</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Course Announcements</Label>
                <p className="text-sm text-muted-foreground">Stay updated with course news</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* AI Study Tools */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="text-foreground">AI Study Tools</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Generate Flashcards</Label>
                <p className="text-sm text-muted-foreground">Automatically create flashcards from new materials</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Smart Study Schedule</Label>
                <p className="text-sm text-muted-foreground">AI-powered study plan optimization</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Syllabus Extraction</Label>
                <p className="text-sm text-muted-foreground">Auto-extract dates from syllabi</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div>
              <Label className="mb-3 block">Study Difficulty Level</Label>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Challenging'].map((level) => (
                  <Button
                    key={level}
                    variant={level === 'Medium' ? 'default' : 'outline'}
                    size="sm"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-5 w-5 text-primary" />
            <h3 className="text-foreground">Privacy & Security</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Encryption</Label>
                <p className="text-sm text-muted-foreground">Encrypt study materials and notes</p>
              </div>
              <Badge variant="default">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve Canvas Tailored with anonymous usage data</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div>
              <Button variant="outline" className="w-full">
                View Privacy Policy
              </Button>
            </div>
          </div>
        </Card>

        {/* Integrations Quick Access */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <Link2 className="h-5 w-5 text-primary" />
            <h3 className="text-foreground">Integrations</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Connect Canvas Tailored with tools like GitHub, Jira, Notion, Trello, and more to streamline your workflow.
          </p>
          
          <Button 
            variant="default" 
            className="w-full"
            onClick={onNavigateToIntegrations}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Manage Integrations
          </Button>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="h-5 w-5 text-destructive" />
            <h3 className="text-foreground">Data Management</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Storage Used</Label>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '45%' }} />
                </div>
                <span className="text-sm text-muted-foreground">4.5 GB / 10 GB</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Clear Cache
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export Study Data
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All Data
              </Button>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-foreground mb-2">Canvas Tailored v1.0.0</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered study extension for Canvas LMS
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm">Help Center</Button>
              <Button variant="outline" size="sm">Report Bug</Button>
              <Button variant="outline" size="sm">What's New</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}