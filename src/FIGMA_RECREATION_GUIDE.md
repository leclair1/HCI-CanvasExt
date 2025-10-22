# Canvas Tailored - Figma Recreation Guide

## 📋 Overview

This guide will help you recreate your Canvas Tailored prototype in Figma without any code. Follow this step-by-step to build a high-fidelity interactive prototype.

---

## 🎨 Part 1: Design System Setup

### Step 1: Create Color Styles

In Figma, create these color styles (Edit → Edit local styles → Color styles):

#### Light Mode Colors
- **Background**: `#FFFFFF`
- **Foreground/Text**: `#252525` (very dark gray)
- **Primary**: `#030213` (almost black)
- **Primary Foreground**: `#FFFFFF`
- **Muted**: `#ECECF0` (light gray)
- **Muted Foreground**: `#717182` (medium gray)
- **Border**: `rgba(0, 0, 0, 0.1)` (10% black)
- **Destructive**: `#D4183D` (red)
- **Card Background**: `#FFFFFF`

#### Chart Colors (for data visualizations)
- **Chart 1**: `#E89E3E` (orange)
- **Chart 2**: `#52B2A8` (teal)
- **Chart 3**: `#4A5568` (dark blue-gray)
- **Chart 4**: `#E8D84C` (yellow)
- **Chart 5**: `#E8A84C` (golden)

#### Theme Variants (Optional - for Settings)
**Blue Theme:**
- Primary: `#0077B6`
- Secondary: `#CAF0F8`
- Accent: `#90E0EF`

**Purple Theme:**
- Primary: `#7209B7`
- Secondary: `#F3E5FF`
- Accent: `#E0AAFF`

**Green Theme:**
- Primary: `#2D6A4F`
- Secondary: `#D8F3DC`
- Accent: `#95D5B2`

### Step 2: Typography Styles

Create text styles in Figma:

- **H1**: 32px, Medium (500), 1.5 line height
- **H2**: 24px, Medium (500), 1.5 line height
- **H3**: 20px, Medium (500), 1.5 line height
- **H4/Body**: 16px, Medium (500), 1.5 line height
- **Body Regular**: 16px, Regular (400), 1.5 line height
- **Small**: 14px, Regular (400), 1.5 line height
- **Extra Small**: 12px, Regular (400), 1.5 line height

### Step 3: Effects & Styling

- **Corner Radius**: 10px (default for cards/buttons)
- **Card Shadow**: X:0, Y:1, Blur:3, Color: `rgba(0,0,0,0.1)`
- **Spacing**: Use 8px grid (multiples of 8: 8, 16, 24, 32, 48, 64)

---

## 📱 Part 2: Screen Inventory

You need to create these **21 main screens** in Figma:

### Global Navigation Screens (4)
1. **Home/Dashboard View**
2. **Flashcards View** (with sub-screens)
3. **Planner View**
4. **Insights View**

### Course-Specific Screens (5 per course - show 1 course fully)
5. **Course Overview Tab**
6. **Course Learn Tab**
7. **Course Plan Tab**
8. **Course Flashcards Tab**
9. **Course Quizzes Tab**

### Settings & Additional (3)
10. **Settings Panel**
11. **Integrations Panel**
12. **Study Timer (Modal)**

### Flashcard Flow (4)
13. **Flashcard Course Selection**
14. **Flashcard Lesson Selection**
15. **Flashcard Study Interface (Front)**
16. **Flashcard Study Interface (Back)**

### Quiz Flow (2)
17. **Quiz Question Screen**
18. **Quiz Results Screen**

---

## 🏗️ Part 3: Component Library

Create these reusable components in Figma (Components → Create Component):

### Navigation Components
- **Top Navigation Bar** (with Canvas Tailored logo, search, timer, settings buttons)
- **Sidebar** (with course list)
- **Tab Bar** (for global tabs: Home, Flashcards, Planner, Insights)
- **Course Tab Bar** (for course tabs: Overview, Learn, Plan, Flashcards, Quizzes)

### Cards
- **Course Card** (shows course code, name, progress bar)
- **Assignment Card** (shows title, due date, priority badge)
- **Event Card** (with date, time, course)
- **Module Card** (with status indicator, items list)
- **Flashcard** (front and back states)
- **To-Do Item** (with checkbox, title, course badge)

### Data Visualization
- **Progress Bar** (horizontal bar with percentage)
- **Pie Chart** (for Study Activity Distribution - use plugin or draw)
- **Bar Chart** (for Study Hours - use plugin or draw)
- **Line Chart** (for Performance Over Time - use plugin or draw)

### Buttons & Controls
- **Primary Button** (filled)
- **Secondary Button** (outline)
- **Icon Button** (small, for actions)
- **Checkbox** (checked/unchecked states)
- **Switch/Toggle** (on/off states)
- **Badge** (for priority, status, etc.)

### Form Elements
- **Text Input** (with label)
- **Dropdown/Select**
- **Search Bar**

### Modals & Overlays
- **Study Timer Modal**
- **Settings Panel** (side drawer)
- **Alert/Banner** (AI generation banner with sparkles icon)

---

## 📄 Part 4: Detailed Screen Layouts

### Screen 1: Home/Dashboard View

**Layout Structure:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation (fixed)                          │
├────────┬───────────────────────────────────────┤
│        │  Welcome back! [User]                 │
│        │  [Search bar]                          │
│ Side   │                                        │
│ bar    │  ┌──────────┐ ┌──────────┐           │
│ with   │  │ Course   │ │ Course   │  (4 cards)│
│ course │  │ Card 1   │ │ Card 2   │           │
│ list   │  └──────────┘ └──────────┘           │
│        │                                        │
│        │  Upcoming Assignments                  │
│        │  ┌─────────────────────────────────┐  │
│        │  │ Assignment item 1               │  │
│        │  │ Assignment item 2               │  │
│        │  └─────────────────────────────────┘  │
│        │                                        │
│        │  AI Study Suggestions                  │
│        │  ┌─────────────────────────────────┐  │
│        │  │ [sparkles icon] Suggestion text │  │
│        │  └─────────────────────────────────┘  │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Top nav with "Canvas Tailored" logo, search, timer icon, settings icon
- Sidebar on left (collapsible) with CS 101, MATH 201, PHYS 150, BIO 101
- Global tabs: Home (active), Flashcards, Planner, Insights
- 4 course cards in grid layout (2x2)
- Each course card has: code, name, instructor, progress bar
- Upcoming assignments section with 5 assignment cards
- AI suggestions section with 3 suggestion cards
- Quick actions section with calendar

**Content to Use:**
- CS 101 - Introduction to Computer Science, Dr. Sarah Johnson, 68% progress
- MATH 201 - Calculus II, Prof. Michael Chen, 52% progress
- PHYS 150 - Physics I: Mechanics, Dr. Emily Rodriguez, 75% progress
- BIO 101 - General Biology, Prof. David Kim, 83% progress

### Screen 2: Flashcards - Course Selection

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  [← Back to Dashboard]                │
│        │  Smart Study Tools                     │
│        │  Select a course to get started        │
│        │                                        │
│ Side   │  Choose a Course                       │
│ bar    │  ┌──────────┐ ┌──────────┐           │
│        │  │ CS 101   │ │ MATH 201 │           │
│        │  │ 4 modules│ │ 2 modules│           │
│        │  │ 17 cards │ │ 6 cards  │           │
│        │  └──────────┘ └──────────┘           │
│        │  ┌──────────┐ ┌──────────┐           │
│        │  │ PHYS 150 │ │ BIO 101  │           │
│        │  │ 2 modules│ │ 2 modules│           │
│        │  │ 6 cards  │ │ 7 cards  │           │
│        │  └──────────┘ └──────────┘           │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Back button at top
- Brain icon with title "Smart Study Tools"
- Description text
- 4 course selection cards (2x2 grid)
- Each card shows: icon, course code, course name, module count, flashcard count

### Screen 3: Flashcards - Lesson Selection

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  [← Back to Selection]                │
│        │  CS 101 - Intro to Computer Science   │
│        │  2 lessons selected   [Change Course] │
│        │                                        │
│ Side   │  [AI Banner with sparkles icon]       │
│ bar    │                                        │
│        │  Select Lessons      [Select All btn] │
│        │  ☑ Module 1: Intro to Programming     │
│        │     4 flashcards available            │
│        │  ☑ Module 2: Data Structures          │
│        │     5 flashcards available            │
│        │  ☐ Module 3: Algorithms               │
│        │     4 flashcards available            │
│        │  ☐ Module 4: Recursion & DP           │
│        │     4 flashcards available            │
│        │                                        │
│        │  [Start Studying (9 flashcards) btn]  │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Course name at top with "Change Course" button
- Selection status text (e.g., "2 lessons selected")
- AI banner: "Select specific lessons or study all available flashcards"
- Lesson cards with checkboxes
- Each lesson shows book icon, title, flashcard count
- Large "Start Studying" button showing total flashcard count

### Screen 4: Flashcard Study Interface (Front)

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  [← Back to Selection]                │
│        │  Smart Study Tools                     │
│        │  CS 101 - Intro to Computer Science   │
│        │                                        │
│ Side   │  [AI Banner]                          │
│ bar    │                                        │
│        │  Flashcards | Practice Quiz (tabs)    │
│        │                                        │
│        │  Card 1 of 17          68% Complete   │
│        │  [Progress bar ═════════════░░░░░]    │
│        │                                        │
│        │  ┌──────────────────────────────────┐ │
│        │  │        [Question badge]          │ │
│        │  │                                  │ │
│        │  │   What is a data structure?      │ │
│        │  │                                  │ │
│        │  │       [rotate icon] Click to flip│ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  [← Previous]  [↻]    [Next →]        │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Tabs: Flashcards (active) | Practice Quiz
- Progress indicator: "Card X of Y" and percentage
- Progress bar (visual)
- Large flashcard (white card with shadow)
- "Question" badge at top of card
- Question text centered
- Instruction text: "Click to flip" with rotate icon
- Navigation buttons: Previous, Flip (icon), Next

### Screen 5: Flashcard Study Interface (Back)

**Same layout as front, but:**
- "Answer" badge (secondary color)
- Answer text displayed
- Same flip instruction and navigation

### Screen 6: Planner View

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  Study Planner                         │
│        │  Your AI-generated study schedule      │
│        │                                        │
│ Side   │  ┌─────────────┬──────────────────┐  │
│ bar    │  │Study Plans │ To-Do List (tabs)│  │
│        │  └─────────────┴──────────────────┘  │
│        │                                        │
│        │  Study Plans for This Week             │
│        │  ┌─────────────────────────────────┐  │
│        │  │ CS 101 - Midterm Prep           │  │
│        │  │ [brain icon] 3 tasks • Oct 8-15 │  │
│        │  │ Progress: ████████░░░░ 75%      │  │
│        │  │                                 │  │
│        │  │ Tasks:                          │  │
│        │  │ ✓ Review Data Structures notes  │  │
│        │  │ ✓ Complete practice problems    │  │
│        │  │ ○ Create summary sheet          │  │
│        │  └─────────────────────────────────┘  │
│        │                                        │
│        │  ┌─────────────────────────────────┐  │
│        │  │ MATH 201 - Integration Review   │  │
│        │  │ [calculate icon] 4 tasks        │  │
│        │  └─────────────────────────────────┘  │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Title and subtitle
- Tabs: Study Plans (active) | To-Do List
- Study plan cards with:
  - Course badge
  - Plan title
  - Task count and date range
  - Progress bar
  - Task checklist (checked/unchecked items)
  - Icons for each plan type

### Screen 7: Planner - To-Do List Tab

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  Study Planner                         │
│        │  Your AI-generated study schedule      │
│        │                                        │
│ Side   │  ┌─────────────┬──────────────────┐  │
│ bar    │  │Study Plans │ To-Do List (tabs)│  │
│        │  └─────────────┴──────────────────┘  │
│        │                                        │
│        │  To-Do List              [Filter ▾]   │
│        │                                        │
│        │  ☐ Data Structures Assignment          │
│        │     CS 101 • Oct 8 • High Priority    │
│        │                                        │
│        │  ☐ Integration Problem Set             │
│        │     MATH 201 • Oct 10 • Medium        │
│        │                                        │
│        │  ☑ Cell Structure Quiz                 │
│        │     BIO 101 • Oct 15 • Completed      │
│        │                                        │
│        │  ☐ Lab Report: Newton's Laws           │
│        │     PHYS 150 • Oct 12 • High          │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Same header as Study Plans
- Filter dropdown (All, By Course, By Priority, By Date)
- To-do items with:
  - Checkbox (can be checked/unchecked)
  - Task title
  - Course badge, due date, priority badge
  - Completed items have strikethrough and different styling

### Screen 8: Insights View

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  Study Insights                        │
│        │  Track your progress and patterns      │
│        │                                        │
│ Side   │  ┌─────┬─────┬─────┬─────┐           │
│ bar    │  │ 23  │ 45  │ 87% │ 12  │ (stat card)│
│        │  │Study│Flash│Grade│ Days│           │
│        │  │Hours│cards│ Avg │Strk │           │
│        │  └─────┴─────┴─────┴─────┘           │
│        │                                        │
│        │  Study Hours This Week                 │
│        │  ┌─────────────────────────────────┐  │
│        │  │  [Bar Chart]                    │  │
│        │  │   Mon Tue Wed Thu Fri Sat Sun   │  │
│        │  └─────────────────────────────────┘  │
│        │                                        │
│        │  Study Activity Distribution           │
│        │  ┌─────────────────────────────────┐  │
│        │  │  [Pie Chart with legend]        │  │
│        │  │  ● Flashcards 35%               │  │
│        │  │  ● Reading 30%                  │  │
│        │  │  ● Practice 25%                 │  │
│        │  │  ● Videos 10%                   │  │
│        │  └─────────────────────────────────┘  │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Title and subtitle
- 4 stat cards in a row: Study Hours, Flashcards Reviewed, Grade Average, Study Streak
- Study Hours bar chart card (use Figma plugins like "Charts" or draw manually)
- Pie chart with color-coded legend matching chart colors
- Performance Over Time line chart (below, not shown in ASCII)
- Achievement badges section (below)

### Screen 9: Course Overview Tab

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  [← Back to Home]                     │
│        │  CS 101 - Introduction to CS           │
│        │  Dr. Sarah Johnson • Fall 2025        │
│        │                                        │
│ Side   │  ┌──────────────────────────────────┐ │
│ bar    │  │ Overview | Learn | Plan | Flash..│ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  Course Progress: 68%                  │
│        │  [Progress bar ══════════░░░░░]       │
│        │                                        │
│        │  Upcoming Assignments (2)              │
│        │  ┌──────────────────────────────────┐ │
│        │  │ Data Structures Assignment       │ │
│        │  │ Due: Oct 8 • Assignment • High   │ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  Recent Activity                       │
│        │  ┌──────────────────────────────────┐ │
│        │  │ ✓ Completed Module 1 Quiz        │ │
│        │  │ ✓ Submitted Hello World Program  │ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  Quick Actions                         │
│        │  [Create Flashcards] [Generate Plan]  │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Back button
- Course header: code, name, instructor, term
- Course tabs: Overview (active), Learn, Plan, Flashcards, Quizzes
- Progress percentage and visual bar
- Upcoming assignments section (cards)
- Recent activity timeline
- Quick action buttons

### Screen 10: Course Learn Tab

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  CS 101 - Introduction to CS           │
│        │  Dr. Sarah Johnson • Fall 2025        │
│        │                                        │
│ Side   │  ┌──────────────────────────────────┐ │
│ bar    │  │ Overview | Learn | Plan | Flash..│ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  Course Materials                      │
│        │                                        │
│        │  ┌─────────────────────────────────┐  │
│        │  │ ✓ Module 1: Intro to Programming│  │
│        │  │   Completed                     │  │
│        │  │   • Lecture: Basics (video) ✓   │  │
│        │  │   • Reading: Chapter 1-2 ✓      │  │
│        │  │   • Code Examples.pdf ✓         │  │
│        │  │   • Quiz: Fundamentals ✓        │  │
│        │  └─────────────────────────────────┘  │
│        │                                        │
│        │  ┌─────────────────────────────────┐  │
│        │  │ ⊙ Module 2: Data Structures     │  │
│        │  │   In Progress                   │  │
│        │  │   • Lecture: Arrays & Lists ✓   │  │
│        │  │   • Lecture: Trees & Graphs ○   │  │
│        │  │   • Reading: Chapter 3-4 ✓      │  │
│        │  │   • Practice Problems ○         │  │
│        │  └─────────────────────────────────┘  │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Course header (same as Overview)
- Learn tab active
- Module accordion cards
- Each module shows:
  - Status icon (completed/in-progress/locked)
  - Module title and status text
  - Expandable list of materials
  - Material type icons (video, reading, file, quiz)
  - Completion checkmarks

### Screen 11: Settings Panel

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  Settings                              │
│        │  Customize your Canvas Tailored exp.  │
│        │                                        │
│ Side   │  ┌──────────────────────────────────┐ │
│ bar    │  │ Appearance                       │ │
│        │  │                                  │ │
│        │  │ Theme                            │ │
│        │  │ ○ Light  ● Dark                  │ │
│        │  │                                  │ │
│        │  │ Color Scheme                     │ │
│        │  │ [Default] [Blue] [Purple] [Green]│ │
│        │  │                                  │ │
│        │  │ Font Size                        │ │
│        │  │ ○ Small  ● Medium  ○ Large       │ │
│        │  │                                  │ │
│        │  │ Spacing                          │ │
│        │  │ ○ Compact ● Normal ○ Comfortable │ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  ┌──────────────────────────────────┐ │
│        │  │ Notifications               [ON] │ │
│        │  │ Study Reminders             [ON] │ │
│        │  │ Analytics                   [ON] │ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  About • Canvas Tailored v1.0.0       │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Settings title and description
- Appearance section card:
  - Theme radio buttons (Light/Dark)
  - Color scheme color swatches (4 options)
  - Font size radio buttons
  - Spacing radio buttons
- Notifications section with toggle switches
- About section at bottom with version

### Screen 12: Integrations Panel

**Layout:**
```
┌────────────────────────────────────────────────┐
│ Top Navigation                                  │
├────────┬───────────────────────────────────────┤
│        │  Integrations                          │
│        │  Connect Canvas Tailored with tools   │
│        │                                        │
│ Side   │  ┌──────────────────────────────────┐ │
│ bar    │  │ [GitHub icon] GitHub             │ │
│        │  │ Sync assignments with repos      │ │
│        │  │ [Connected ✓]                    │ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  ┌──────────────────────────────────┐ │
│        │  │ [Notion icon] Notion             │ │
│        │  │ Export study materials           │ │
│        │  │ [Connected ✓]                    │ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  ┌──────────────────────────────────┐ │
│        │  │ [Jira icon] Jira                 │ │
│        │  │ Convert assignments to tasks     │ │
│        │  │ [Connect]                        │ │
│        │  └──────────────────────────────────┘ │
│        │                                        │
│        │  ┌──────────────────────────────────┐ │
│        │  │ [Slack icon] Slack               │ │
│        │  │ Get study reminders              │ │
│        │  │ [Connected ✓]                    │ │
│        │  └──────────────────────────────────┘ │
└────────┴───────────────────────────────────────┘
```

**Key Elements:**
- Integration cards showing:
  - Icon/logo
  - Service name
  - Description
  - Connection status (Connected with checkmark or Connect button)
- Services to show: GitHub (connected), Notion (connected), Jira (not connected), Slack (connected), Trello (not connected), Google Calendar (not connected)

---

## 🔗 Part 5: Interactions & Prototyping

### Primary Navigation Flow

1. **Home → Flashcards**
   - Click "Flashcards" tab → Goes to Course Selection screen

2. **Flashcard Flow**
   - Course Selection → Click course card → Lesson Selection
   - Lesson Selection → Check lessons → Click "Start Studying" → Flashcard Interface
   - Flashcard Interface → Click card → Flip animation (show back)
   - Click "Next" → Shows next flashcard
   - Click "Previous" → Shows previous flashcard

3. **Home → Course Page**
   - Click course card on Home → Course Overview screen
   - Course tabs navigate between: Overview, Learn, Plan, Flashcards, Quizzes

4. **Planner Tab Switching**
   - Click "Study Plans" tab → Shows study plans
   - Click "To-Do List" tab → Shows to-do items

5. **Settings Access**
   - Click settings icon in top nav → Settings panel slides in from right
   - Click outside or X button → Panel closes

6. **Study Timer**
   - Click timer icon in top nav → Timer modal appears
   - Click outside or close → Modal disappears

### Interactive Elements to Prototype

**Checkboxes:**
- To-do items: Click checkbox → Item gets strikethrough, moves to bottom
- Lesson selection: Click checkbox → Toggle checked/unchecked state

**Tabs:**
- All tab groups should switch content when clicked

**Buttons:**
- Hover states (slightly darker/lighter)
- Click states (navigate to new screen)

**Cards:**
- Hover states (lift/shadow effect)
- Clickable cards navigate to new screens

**Toggles/Switches:**
- Click to toggle on/off states

**Accordion/Modules:**
- Click module card → Expands to show items
- Click again → Collapses

### Animation Suggestions

- **Flashcard flip**: 0.5s rotation animation
- **Panel slides**: 0.3s ease-in-out
- **Tab transitions**: 0.2s fade
- **Button hover**: 0.15s ease
- **Progress bars**: Animated fill (optional)

---

## 📊 Part 6: Mock Data to Use

### Courses
1. **CS 101** - Introduction to Computer Science | Dr. Sarah Johnson | Fall 2025 | 68% progress
2. **MATH 201** - Calculus II | Prof. Michael Chen | Fall 2025 | 52% progress
3. **PHYS 150** - Physics I: Mechanics | Dr. Emily Rodriguez | Fall 2025 | 75% progress
4. **BIO 101** - General Biology | Prof. David Kim | Fall 2025 | 83% progress

### Assignments
1. Data Structures Assignment | CS 101 | Oct 8, 2025 | High Priority
2. Integration Problem Set | MATH 201 | Oct 10, 2025 | Medium
3. Lab Report: Newton's Laws | PHYS 150 | Oct 12, 2025 | High
4. Cell Structure Quiz | BIO 101 | Oct 15, 2025 | Medium
5. Midterm Project Proposal | CS 101 | Oct 18, 2025 | Medium

### Study Plans
1. **CS 101 - Midterm Prep** | Oct 8-15 | 75% complete
   - ✓ Review Data Structures notes
   - ✓ Complete practice problems
   - ○ Create summary sheet
   - ○ Take practice exam

2. **MATH 201 - Integration Review** | Oct 10-17 | 50% complete
   - ✓ Watch lecture recordings
   - ✓ Review textbook examples
   - ○ Complete problem set
   - ○ Attend study group

### Flashcard Examples

**CS 101 - Module 1:**
- Q: What is a variable in programming?
- A: A variable is a named storage location in memory that holds a value which can be changed during program execution.

**CS 101 - Module 2:**
- Q: What is a data structure?
- A: A data structure is a specialized format for organizing, processing, retrieving and storing data efficiently.

**MATH 201:**
- Q: What is integration?
- A: Integration is the process of finding the area under a curve, or the antiderivative of a function.

### Study Insights Stats
- **Study Hours**: 23 hours this week
- **Flashcards Reviewed**: 45 cards
- **Grade Average**: 87%
- **Study Streak**: 12 days

### Module Structure (CS 101)
1. **Module 1: Introduction to Programming** (Completed)
   - Lecture: Programming Basics (45 min) ✓
   - Reading: Chapter 1-2 (45 pages) ✓
   - Code Examples.pdf (2.3 MB) ✓
   - Quiz: Programming Fundamentals (10 questions) ✓

2. **Module 2: Data Structures** (In Progress)
   - Lecture: Arrays and Lists (52 min) ✓
   - Lecture: Trees and Graphs (58 min) ○
   - Reading: Chapter 3-4 (68 pages) ✓
   - Practice Problems (1.8 MB) ○

3. **Module 3: Algorithms** (In Progress)
   - Lecture: Sorting Algorithms (61 min) ✓
   - Reading: Chapter 5 (54 pages) ○
   - Lecture: Search Algorithms (48 min) ○

4. **Module 4: Recursion** (Locked)

---

## 🎯 Part 7: Step-by-Step Creation Process

### Week 1: Foundation (4-6 hours)

**Day 1: Setup (1-2 hours)**
1. Create new Figma file: "Canvas Tailored - High Fidelity Prototype"
2. Set up color styles (Part 1, Step 1)
3. Set up typography styles (Part 1, Step 2)
4. Create grid layout (8px grid)

**Day 2: Components (2-3 hours)**
1. Create Top Navigation component
2. Create Sidebar component
3. Create Tab Bar component
4. Create Course Card component
5. Create Assignment Card component
6. Create Button variants (primary, secondary, icon)

**Day 3: More Components (1-2 hours)**
1. Create Badge component
2. Create Checkbox component
3. Create Toggle component
4. Create Progress Bar component
5. Create Input components

### Week 2: Screens (6-8 hours)

**Day 4: Main Screens (2-3 hours)**
1. Create Home/Dashboard screen (use components)
2. Duplicate and create Planner View
3. Duplicate and create Insights View (add charts)

**Day 5: Flashcard Flow (2-3 hours)**
1. Create Flashcard Course Selection
2. Create Flashcard Lesson Selection
3. Create Flashcard Study Interface (front)
4. Duplicate for back state

**Day 6: Course Pages (2 hours)**
1. Create Course Overview screen
2. Duplicate for Learn, Plan tabs
3. Add module accordions

### Week 3: Polish & Interactions (4-6 hours)

**Day 7: Settings & Modals (1-2 hours)**
1. Create Settings Panel
2. Create Integrations Panel
3. Create Study Timer Modal
4. Create Quiz screens

**Day 8: Interactions (2-3 hours)**
1. Link Home → Flashcards flow
2. Link Home → Course pages
3. Add tab interactions
4. Add checkbox interactions
5. Add modal/panel interactions
6. Add button hover states

**Day 9: Final Polish (1 hour)**
1. Review all screens
2. Check consistency
3. Test all interactions
4. Add any missing elements

---

## ✅ Part 8: Quality Checklist

Before submitting, verify:

### Design Consistency
- [ ] All screens use the same color styles
- [ ] All text uses defined typography styles
- [ ] Spacing is consistent (8px grid)
- [ ] Corner radius is consistent (10px)
- [ ] All icons are the same style (use lucide.dev or similar)

### Components
- [ ] Reusable components are actual Figma components
- [ ] Button states (default, hover, disabled) exist
- [ ] Interactive elements have clear hover states

### Content
- [ ] All placeholder text is realistic and makes sense
- [ ] No "Lorem ipsum" text
- [ ] Course names, dates, and stats are consistent across screens
- [ ] Icons match their purpose

### Interactions
- [ ] All navigation flows work correctly
- [ ] Tabs switch content appropriately
- [ ] Checkboxes toggle on/off
- [ ] Modals/panels open and close
- [ ] Back buttons return to previous screen
- [ ] Flashcard flip animation works

### Completeness
- [ ] All 21+ screens created
- [ ] Starting screen is clearly defined (Home/Dashboard)
- [ ] Dead ends have back buttons
- [ ] Settings and timer are accessible from all screens

---

## 🚀 Part 9: Figma Tips & Shortcuts

### Essential Figma Features to Use

**Auto Layout** (Shift + A)
- Use for cards, buttons, lists
- Makes spacing consistent
- Easier to resize

**Components** (Ctrl/Cmd + Alt + K)
- Create for repeated elements
- Easy to update all instances at once

**Variants**
- Use for button states (default, hover)
- Use for checkbox states (checked, unchecked)
- Use for theme variations

**Plugins to Help:**
- **Iconify** - Free icon library (includes Lucide icons)
- **Content Reel** - Generate mock data
- **Charts** - Create pie charts, bar charts, line charts
- **Unsplash** - Free stock photos if needed
- **Auto Flow** - Quickly create interaction flows

### Time-Saving Tips

1. **Duplicate & Modify**: Create one screen fully, then duplicate and modify for similar screens
2. **Use Components**: Build component library first, assembly is faster
3. **Master Components**: Keep all master components on a separate "Components" page
4. **Styles Panel**: Use styles for all colors and text - never use raw values
5. **Layout Grid**: Turn on 8px grid (right panel → Layout Grid)

---

## 📤 Part 10: Sharing & Submission

### Before Submitting:

1. **Set Starting Point**
   - Select Home/Dashboard screen
   - Right panel → Prototype → Set as starting frame

2. **Test Your Prototype**
   - Click Play button (top right)
   - Go through all main flows
   - Check that interactions work

3. **Create Share Link**
   - Click "Share" button (top right)
   - Set to "Anyone with the link can view"
   - Copy link

4. **Add Instructions** (optional)
   - Add a title frame at the beginning
   - Include: "Canvas Tailored - Click Home to start"
   - Brief interaction guide

### What to Submit:

- Figma prototype link (view + interact permission)
- Optional: Brief PDF showing key screens
- Optional: Interaction flow diagram

---

## 💡 Quick Reference: Screen Priority

If you're short on time, create these screens FIRST (minimum viable prototype):

**Essential (Must Have):**
1. Home/Dashboard
2. Flashcards - Course Selection
3. Flashcards - Lesson Selection
4. Flashcard Study Interface (front + back)
5. Course Overview Page
6. Planner View (To-Do List)
7. Settings Panel

**Important (Should Have):**
8. Insights View
9. Course Learn Tab
10. Quiz Interface

**Nice to Have:**
11. Integrations Panel
12. Study Timer Modal
13. All 5 course tabs
14. Quiz Results screen

---

## 🎓 Final Notes

- **Time Estimate**: 14-20 hours total for complete prototype
- **Minimum Viable**: 8-10 hours for essential screens
- **Recommended Timeline**: Start 2 weeks before due date

Remember:
- Quality > Quantity (fewer screens done well is better)
- Consistency is key (use components and styles)
- Test your interactions before submitting
- Your coded prototype is an excellent visual reference

**You've got this!** You already have all the design work done - now it's just about recreating it in Figma's visual interface. Take it one screen at a time, use components to speed up the process, and don't hesitate to simplify where needed.

Good luck! 🎨
