# Testing Frontend Flow

## Current Issue
"Clicking on generate flashcards doesn't take me anywhere"

## Debug Steps

### 1. Check if Frontend is Running
Open: http://localhost:5173 or http://localhost:5174

### 2. Open Browser Console
Press **F12** → Go to **Console** tab

### 3. Follow the Flow and Watch for Errors

#### Step 1: Login
- Email: test@example.com
- Password: password123
- **Check console** for any errors

#### Step 2: Click a Course from Dashboard
- Click any course card (e.g., CIS4930)
- **Check console** - should see courseId logged
- Should navigate to Course Details

#### Step 3: Click "Study Flashcards" Button
- Look for button in Course Details page
- Click it
- **Check console** - any errors?
- Should navigate to Flashcard Selection

#### Step 4: On Flashcard Selection Page
- Should see list of modules
- **Check console** - any API errors?
- If you see "Failed to load modules" error, note what it says

#### Step 5: Select a Module
- Click on any module (radio button)
- Module should highlight with accent color
- **Check console** - any errors?

#### Step 6: Click "Generate Flashcards" Button
- Big button at bottom should be enabled
- Click it
- Modal should open
- **Check console** - any errors?

## Common Issues & Solutions

### Issue: "No course selected"
**Solution:** The courseId isn't being passed correctly
- Check if clicking course from dashboard sets the ID

### Issue: "Failed to fetch modules"
**Solution:** Backend API not responding
- Check backend: http://localhost:8000/health
- Verify Docker is running: `docker ps`

### Issue: "Not authenticated"
**Solution:** Token expired or not set
- Try logging out and back in
- Check localStorage in browser (F12 → Application → Local Storage)

### Issue: Modal doesn't appear
**Solution:** Check console for JavaScript errors
- Look for React errors
- Check if modal code is rendering

### Issue: "Failed to generate flashcards"
**Solution:** Backend endpoint not ready
- Wait for Docker rebuild to complete
- Check backend logs: `docker logs canvas_ext_backend`

## Quick Fixes

### Reload Frontend
```bash
# Stop frontend (Ctrl+C if running)
cd frontendv2
npm run dev
```

### Check Backend Status
```bash
docker ps
# Should see canvas_ext_backend running

docker logs canvas_ext_backend --tail 20
# Should see "Application startup complete"
```

### Restart Everything
```bash
# Backend
cd backend
docker-compose restart

# Frontend
cd frontendv2
npm run dev
```

## Expected Console Output (Normal Flow)

```
1. Login → "User logged in: test@example.com"
2. Dashboard → "Fetched 5 courses"
3. Click Course → "Navigating to course: CIS4930 (ID: 3)"
4. Course Details → "Fetched 11 modules for course 3"
5. Study Flashcards → "Navigating to flashcard selection"
6. Flashcard Selection → "Fetched 11 modules"
7. Select Module → "Module 5 selected"
8. Generate → "Opening generate modal"
9. Confirm → "Generating 15 flashcards from module 5..."
10. Success → "Generated 15 flashcards"
11. Save → "Saving deck: HCI Week 1"
```

## What to Report

If it's still not working, tell me:
1. What page are you on? (Dashboard, Course Details, Flashcard Selection?)
2. What do you see in the console (F12)?
3. Any error messages displayed on screen?
4. Does the button look clickable or grayed out?

This will help me fix the exact issue!

