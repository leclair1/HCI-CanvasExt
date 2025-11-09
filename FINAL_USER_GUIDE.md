# 🎓 Canvas Extension - Complete User Guide

## 🚀 Getting Started

### Access Your App
**URL:** http://localhost:5173

**Login:**
- Email: `test@example.com`
- Password: `password123`

## 📚 Features Guide

### 1. Dashboard - Your Courses
When you login, you'll see:
- **5 color-coded course cards** from your Canvas
- Each shows course code, name, and progress
- Click any course to explore it

### 2. Course Details - Explore Modules
After clicking a course:
- See **all course modules** from Canvas
- Each module lists its items (PDFs, assignments, etc.)
- **Click module items** to open them in Canvas
- Click **"Study Flashcards"** to generate flashcards

### 3. Generate Flashcards - The Simple Way ✨

#### Step 1: Select a Module
- You'll see a list of all course modules
- **Click on any module** to select it (radio button style)
- Selected module gets highlighted with accent color

#### Step 2: Choose Quantity
- Click **"Generate Flashcards from Selected Module"** button
- Modal opens
- Use the **slider** to choose how many flashcards (10-30)
  - 10 = Quick review
  - 15 = Balanced (default)
  - 20 = Thorough
  - 25 = Comprehensive  
  - 30 = Deep study

#### Step 3: Generate
- Click **"Generate"**
- AI (Groq) works its magic (10-30 seconds)
- Flashcards are created from the module's PDFs and content

#### Step 4: Save with Name
- After generation, save modal appears
- Enter a **custom deck name** (auto-suggested)
  - Good names: "HCI Week 1", "Software Eng Module 3", etc.
- Click **"Save Deck"** or **"Skip"** to study without saving

### 4. Search Saved Decks
- Go to **"Saved Decks"** from the navigation
- See all your saved flashcard decks
- **Type in search bar** to filter by name
- Real-time search as you type
- Click **"Study"** to review any deck
- Click **trash icon** to delete

## 🎯 Example Workflow

### Studying for HCI Exam:
1. **Dashboard** → Click **CIS4930** (HCI)
2. **Course Details** → Click **"Study Flashcards"**
3. **Module List** → Click on **"Week 1: Welcome to HCI"**
4. **Generate Button** → Click it
5. **Slider** → Choose **20 flashcards**
6. **Generate** → Wait 15 seconds
7. **Name** → "HCI Week 1 Exam Prep"
8. **Save** → Deck saved!
9. **Study** → Review the 20 flashcards
10. **Saved Decks** → Search "HCI" to find it later

## 🔍 Search Tips

### Search Examples:
- Type **"HCI"** → Find all HCI flashcard decks
- Type **"Week 1"** → Find all Week 1 materials
- Type **"Software"** → Find Software Engineering decks
- Type **"Exam"** → Find exam prep decks

### Naming Strategy:
Use descriptive names for easy searching:
- ✅ "HCI Week 1 - Introduction"
- ✅ "Software Eng - Design Patterns"
- ✅ "Secure Coding Module 3"
- ❌ "Flashcards 1" (not searchable)
- ❌ "Test" (too generic)

## 📊 Your Current Courses

### Available for Flashcard Generation:
1. **ARH2000** - Art & Culture
   - 5 modules available
   
2. **CEN4020** - Software Engineering
   - 19 modules available
   
3. **CIS4930** - Human-Computer Interaction ⭐
   - 11 modules available
   - Pre-generated: 60 flashcards already in database
   
4. **CNT4419** - Secure Coding
   - Modules available
   
5. **IDH3400** - Honors Social/Behavioral Sciences
   - 15 modules available

## 🎨 UI Elements Explained

### Module Selection (Radio Buttons)
- **Unselected:** Gray border, hollow circle
- **Selected:** Accent border, filled circle, highlighted background
- **Click anywhere** on the module card to select

### Generate Button States
- **Disabled** (no selection): Grayed out, says "Select a Module..."
- **Enabled** (module selected): Blue/primary color, clickable
- **Generating**: Shows spinner, says "Generating..."

### Slider
- **10-30 range** in steps of 5
- **Current value** displayed in center
- **Drag or click** to select

## 💡 Pro Tips

### Getting the Best Flashcards:
1. **Choose modules with substantive content** (PDFs, readings)
2. **Generate 15-20 cards** for most topics
3. **Use 25-30 cards** for comprehensive exam prep
4. **Save with descriptive names** for easy searching
5. **Create multiple decks** from different modules

### Organizing Your Decks:
- Use prefixes: "HCI -", "SE -", "SC -"
- Include week/module numbers: "Week 1", "Module 3"
- Add purpose: "Exam Prep", "Quick Review"

### Studying Effectively:
1. Generate flashcards as you progress through modules
2. Review saved decks before exams
3. Use search to find topic-specific decks
4. Regenerate if you need more cards on a topic

## 🔐 Security & Privacy

### Your Data is Safe:
- ✅ Canvas session cookie **encrypted** at rest
- ✅ Password **hashed** with bcrypt
- ✅ Only **you** can see your courses/flashcards
- ✅ JWT authentication protects all API calls

### Multi-User Support:
- Each user has their own courses
- Flashcards are user-specific
- Saved decks are private
- No data sharing between users

## 🆘 Troubleshooting

### "Failed to generate flashcards"
- **Cause:** Module might not have PDF content
- **Solution:** Try a different module with PDFs/documents

### "Please select a module first"
- **Cause:** Clicked generate without selecting
- **Solution:** Click on a module card first (radio button)

### Modules not loading
- **Check:** Backend is running (http://localhost:8000/health)
- **Check:** You're logged in
- **Check:** Course has modules in Canvas

### Search not working
- **Check:** You have saved decks
- **Try:** Different search terms
- **Note:** Search is case-insensitive

## 📱 Navigation Map

```
Login
  ↓
Dashboard (see all courses)
  ↓
Course Details (click course → see modules)
  ↓
Study Flashcards (click → see module list)
  ↓
Select Module (radio button)
  ↓
Generate (click button → choose count → generate)
  ↓
Save Deck (enter name → save)
  ↓
Study OR Saved Decks (search → study later)
```

## 🎉 You're All Set!

Your Canvas Extension is fully functional with:
- ✅ Real Canvas integration
- ✅ AI-powered flashcard generation
- ✅ Multi-user support
- ✅ Searchable saved decks
- ✅ Clean, intuitive UI
- ✅ Secure data storage

**Start studying smarter, not harder!** 📚✨

Have fun exploring and generating flashcards! 🚀

