import svgPaths from "../imports/svg-mmjoz98dn6";

export default function Insights() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 px-12 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-1">Study Insights</h1>
          <p className="text-muted-foreground text-sm">Track your learning progress, study patterns, and performance metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {/* Total Study Time */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-8">
              <div className="size-10 rounded-lg bg-[rgba(245,73,0,0.1)] flex items-center justify-center">
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path d="M10 5V10L13.3333 11.6667" stroke="#F54900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                  <path d={svgPaths.p14d24500} stroke="#F54900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                </svg>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg border border-[rgba(0,150,137,0.5)] text-[#009689] text-xs">+12%</span>
            </div>
            <p className="text-2xl text-foreground mb-4">41 hours</p>
            <p className="text-sm text-muted-foreground mb-1">Total Study Time</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>

          {/* Flashcards Reviewed */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-8">
              <div className="size-10 rounded-lg bg-[rgba(0,150,137,0.1)] flex items-center justify-center">
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path d="M10 15V4.16667" stroke="#009689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                  <path d={svgPaths.p28aa85e0} stroke="#009689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                </svg>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg border border-[rgba(0,150,137,0.5)] text-[#009689] text-xs">+8%</span>
            </div>
            <p className="text-2xl text-foreground mb-4">342</p>
            <p className="text-sm text-muted-foreground mb-1">Flashcards Reviewed</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>

          {/* Average Accuracy */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-8">
              <div className="size-10 rounded-lg bg-[rgba(255,185,0,0.1)] flex items-center justify-center">
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p14d24500} stroke="#FFB900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                  <path d={svgPaths.p240d7000} stroke="#FFB900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                  <path d={svgPaths.p25499600} stroke="#FFB900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                </svg>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg border border-[rgba(0,150,137,0.5)] text-[#009689] text-xs">+5%</span>
            </div>
            <p className="text-2xl text-foreground mb-4">86%</p>
            <p className="text-sm text-muted-foreground mb-1">Average Accuracy</p>
            <p className="text-xs text-muted-foreground">All courses</p>
          </div>

          {/* Study Streak */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-8">
              <div className="size-10 rounded-lg bg-[rgba(254,154,0,0.1)] flex items-center justify-center">
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p4352800} stroke="#FE9A00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                </svg>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg border border-[rgba(0,150,137,0.5)] text-[#009689] text-xs">New record!</span>
            </div>
            <p className="text-2xl text-foreground mb-4">12 days</p>
            <p className="text-sm text-muted-foreground mb-1">Study Streak</p>
            <p className="text-xs text-muted-foreground">Current</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {/* Study Time by Course - Placeholder */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="text-foreground mb-6">Study Time by Course</h3>
            <div className="h-[220px] flex items-center justify-center text-muted-foreground">
              <p className="text-sm">Chart visualization</p>
            </div>
          </div>

          {/* Weekly Study Hours - Placeholder */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="text-foreground mb-6">Weekly Study Hours</h3>
            <div className="h-[220px] flex items-center justify-center text-muted-foreground">
              <p className="text-sm">Chart visualization</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-[1fr_400px] gap-5">
          {/* Left: Flashcard Accuracy + Activity Distribution */}
          <div className="space-y-8">
            {/* Flashcard Accuracy by Course */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-foreground mb-6">Flashcard Accuracy by Course</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-amber-600" />
                      <span className="text-sm text-foreground">CS 101</span>
                    </div>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#FE9A00] rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-emerald-600" />
                      <span className="text-sm text-foreground">MATH 201</span>
                    </div>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#009689] rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Study Activity Distribution */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-foreground mb-6">Study Activity Distribution</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">Pie chart visualization</div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Flashcards', value: '35%', color: 'bg-amber-600' },
                    { label: 'Reading', value: '25%', color: 'bg-emerald-600' },
                    { label: 'Assignments', value: '20%', color: 'bg-blue-600' },
                    { label: 'Practice Quizzes', value: '15%', color: 'bg-purple-400' },
                    { label: 'Videos', value: '5%', color: 'bg-yellow-500' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between px-2 py-1">
                      <div className="flex items-center gap-2">
                        <div className={`size-3 rounded ${item.color}`} />
                        <span className="text-xs text-foreground">{item.label}</span>
                      </div>
                      <span className="text-xs text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Achievements + Study Insights */}
          <div className="space-y-5">
            {/* Achievements */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-foreground mb-8">Achievements</h3>
              <div className="space-y-2">
                {/* Week Warrior */}
                <div className="bg-[rgba(3,2,19,0.05)] border border-[rgba(3,2,19,0.5)] rounded-lg p-3">
                  <div className="flex items-start gap-2.5">
                    <div className="size-8 rounded-lg bg-[rgba(3,2,19,0.1)] flex items-center justify-center shrink-0">
                      <svg className="size-4" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p160f0600} stroke="#030213" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                        <path d={svgPaths.p27180a80} stroke="#030213" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Week Warrior</p>
                      <p className="text-xs text-muted-foreground">Studied 7 days in a row</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg border border-[rgba(0,0,0,0.1)] text-xs">✓</span>
                  </div>
                </div>

                {/* Flashcard Master */}
                <div className="bg-[rgba(3,2,19,0.05)] border border-[rgba(3,2,19,0.5)] rounded-lg p-3">
                  <div className="flex items-start gap-2.5">
                    <div className="size-8 rounded-lg bg-[rgba(3,2,19,0.1)] flex items-center justify-center shrink-0">
                      <svg className="size-4" fill="none" viewBox="0 0 16 16">
                        <path d="M8 12V3.33333" stroke="#030213" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Flashcard Master</p>
                      <p className="text-xs text-muted-foreground">Reviewed 500+ flashcards</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg border border-[rgba(0,0,0,0.1)] text-xs">✓</span>
                  </div>
                </div>

                {/* Locked achievements */}
                <div className="bg-[rgba(236,236,240,0.3)] opacity-60 rounded-lg p-3">
                  <div className="flex items-start gap-2.5">
                    <div className="size-8 rounded-lg bg-[#ececf0] flex items-center justify-center shrink-0">
                      <svg className="size-4" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p39ee6532} stroke="#717182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Perfect Score</p>
                      <p className="text-xs text-muted-foreground">Get 100% on a practice quiz</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Study Insights */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-8">
                <svg className="size-4" fill="none" viewBox="0 0 16 16">
                  <path d="M8 12V3.33333" stroke="#030213" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                </svg>
                <h3 className="text-foreground">Study Insights</h3>
              </div>
              <div className="space-y-2">
                <div className="bg-[rgba(3,2,19,0.05)] border border-[rgba(3,2,19,0.1)] rounded-lg p-2">
                  <p className="text-xs text-foreground">Study sessions most productive 2-4 PM</p>
                </div>
                <div className="bg-[rgba(3,2,19,0.05)] border border-[rgba(3,2,19,0.1)] rounded-lg p-2">
                  <p className="text-xs text-foreground">Flashcard accuracy +15% this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
