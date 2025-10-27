import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  Clock, 
  Brain, 
  Target,
  BookOpen,
  Calendar,
  Award,
  Zap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { useEffect, useState } from 'react';
import { 
  getStudyTimeByCourse, 
  getWeeklyStudyHours, 
  getTotalStudyTime,
  getStudyStreak,
  getActivityDistribution,
  initializeSampleData 
} from '../lib/studyTimeStore';
import { getCourseColor } from '../lib/mockData';
import { HighlightedSection } from './HighlightedSection';

export default function InsightsView() {
  const [studyTimeData, setStudyTimeData] = useState<Array<{ course: string; courseId: string; hours: number }>>([]);
  const [weeklyStudyData, setWeeklyStudyData] = useState<Array<{ day: string; hours: number }>>([]);
  const [totalTime, setTotalTime] = useState({ hours: 0, sessions: 0 });
  const [studyStreak, setStudyStreak] = useState(0);
  const [activityData, setActivityData] = useState<Array<{ name: string; value: number; color: string }>>([]);

  // Get accuracy data with dynamic colors
  const getAccuracyData = () => {
    return [
      { course: 'CRN4020', courseId: 'crn4020', accuracy: 88 },
      { course: 'COP4600', courseId: 'cop4600', accuracy: 91 },
      { course: 'CIS4930', courseId: 'cis4930', accuracy: 82 },
      { course: 'CIS4931', courseId: 'cis4931', accuracy: 86 },
    ].map(item => ({ 
      ...item,
      color: getCourseColor(item.courseId).primary
    }));
  };

  const accuracyData = getAccuracyData();

  // Custom label component for bar chart
  const CustomBarLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    
    // Only show label if bar has sufficient height
    if (height < 20) return null;
    
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        className="pointer-events-none"
        style={{ 
          fontSize: '12px',
          fontWeight: '600',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        {value}h
      </text>
    );
  };

  useEffect(() => {
    // Initialize sample data if none exists (for demo purposes)
    initializeSampleData();
    
    // Load real data
    setStudyTimeData(getStudyTimeByCourse());
    setWeeklyStudyData(getWeeklyStudyHours());
    setTotalTime(getTotalStudyTime());
    setStudyStreak(getStudyStreak());
    setActivityData(getActivityDistribution());
  }, []);

  const stats = [
    {
      label: 'Total Study Time',
      value: `${totalTime.hours} hours`,
      subtext: 'This month',
      icon: Clock,
      trend: '+12%',
      trendUp: true,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10',
    },
    {
      label: 'Flashcards Reviewed',
      value: '342',
      subtext: 'This month',
      icon: Brain,
      trend: '+8%',
      trendUp: true,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      label: 'Average Accuracy',
      value: '86%',
      subtext: 'All courses',
      icon: Target,
      trend: '+5%',
      trendUp: true,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
    {
      label: 'Study Streak',
      value: `${studyStreak} days`,
      subtext: 'Current',
      icon: Zap,
      trend: 'New record!',
      trendUp: true,
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10',
    },
  ];

  const achievements = [
    {
      title: 'Week Warrior',
      description: 'Studied 7 days in a row',
      icon: Award,
      unlocked: true,
    },
    {
      title: 'Flashcard Master',
      description: 'Reviewed 500+ flashcards',
      icon: Brain,
      unlocked: true,
    },
    {
      title: 'Perfect Score',
      description: 'Get 100% on a practice quiz',
      icon: Target,
      unlocked: false,
    },
    {
      title: 'Early Bird',
      description: 'Complete all assignments 2 days early',
      icon: BookOpen,
      unlocked: false,
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <HighlightedSection innerClassName="space-y-8">
        <div>
          <h1 className="text-foreground mb-1">Study Insights</h1>
          <p className="text-muted-foreground">
            Track your learning progress, study patterns, and performance metrics
          </p>
        </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                {stat.trendUp && (
                  <Badge variant="outline" className="text-chart-2 border-chart-2/50 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </Badge>
                )}
              </div>
              <p className="text-2xl text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.subtext}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Study Time by Course */}
        <Card className="p-4">
          <h3 className="text-foreground mb-4">Study Time by Course</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={studyTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="course" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                wrapperStyle={{ zIndex: 1000 }}
              />
              <Bar dataKey="hours" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} label={<CustomBarLabel />} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Study Hours Trend */}
        <Card className="p-4">
          <h3 className="text-foreground mb-4">Weekly Study Hours</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyStudyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-2))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Flashcard Accuracy */}
        <div className="lg:col-span-2">
          <Card className="p-4">
            <h3 className="text-foreground mb-4">Flashcard Accuracy by Course</h3>
            <div className="space-y-3">
              {accuracyData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-sm" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-foreground">{item.course}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.accuracy}%</span>
                  </div>
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: `${item.color}20` }}>
                    <div 
                      className="h-full transition-all rounded-full" 
                      style={{ 
                        width: `${item.accuracy}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Study Activity Distribution */}
            <div className="mt-6">
              <h3 className="text-foreground mb-4">Study Activity Distribution</h3>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={activityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {activityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 space-y-2">
                  {activityData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-sm shrink-0" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-foreground">{item.name}</span>
                      </div>
                      <span className="text-xs text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements & Streaks */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-foreground mb-3">Achievements</h3>
            <div className="space-y-2">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      achievement.unlocked
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-border bg-muted/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          achievement.unlocked
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground mb-0.5 text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="outline" className="shrink-0 text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Study Tips */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-primary" />
              <h3 className="text-foreground">Study Insights</h3>
            </div>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-foreground">
                  Study sessions most productive 2-4 PM
                </p>
              </div>
              <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-foreground">
                  Flashcard accuracy +15% this month
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </HighlightedSection>
  </div>
);
}
