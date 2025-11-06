# Canvas LMS Integration Guide

This guide explains how to integrate your Canvas LMS Extension backend with Canvas LMS to fetch real student data.

## 🎓 How It Works

```
Student Logs In → Get Canvas Token → Authenticate → Sync Data → Display in Frontend
```

1. **Student provides Canvas credentials**
2. **Backend authenticates** with Canvas API
3. **Data is synced** (courses, assignments, files)
4. **Stored in local database** for fast access
5. **Frontend displays** the data

## 🔑 Getting a Canvas Access Token

### Option 1: Manual Token (For Testing)

1. **Log into your Canvas account**
2. **Go to Account Settings**
   - Click on your profile (top left)
   - Select "Settings"

3. **Generate New Access Token**
   - Scroll to "Approved Integrations"
   - Click "+ New Access Token"
   - Purpose: `Canvas LMS Extension`
   - Expiration: Optional (leave blank for no expiration)
   - Click "Generate Token"

4. **Copy the token** - you won't see it again!

### Option 2: OAuth 2.0 (For Production - Recommended)

For production apps, implement OAuth flow:

1. **Register your app in Canvas**
   - Admin Console → Developer Keys
   - Create new Developer Key (OAuth2)

2. **Configuration:**
   ```
   Redirect URI: http://localhost:8000/api/v1/canvas/oauth/callback
   Scopes: 
     - url:GET|/api/v1/courses
     - url:GET|/api/v1/assignments
     - url:GET|/api/v1/users/self
     - url:GET|/api/v1/files
   ```

3. **Implement OAuth flow** (example in `app/api/v1/canvas_oauth.py`)

## 🚀 Using the Canvas Integration API

### Step 1: Authenticate User

```bash
POST /api/v1/canvas/auth
```

**Request:**
```json
{
  "canvas_url": "https://canvas.instructure.com",
  "access_token": "your-canvas-access-token-here"
}
```

**Response:**
```json
{
  "success": true,
  "user_id": 1,
  "canvas_user_id": "12345",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Successfully authenticated with Canvas"
}
```

### Step 2: Sync Canvas Data

```bash
POST /api/v1/canvas/sync?user_id=1
```

**Response:**
```json
{
  "success": true,
  "courses_synced": 4,
  "assignments_synced": 15,
  "last_sync": "2025-11-05T10:30:00",
  "errors": []
}
```

### Step 3: Access Synced Data

Now you can use the regular API endpoints:

```bash
# Get courses
GET /api/v1/courses

# Get assignments
GET /api/v1/assignments?course_id=crn4020

# Get study stats (your custom features)
GET /api/v1/study-sessions/stats
```

## 📝 Frontend Integration Example

```typescript
// 1. User Login with Canvas
async function loginWithCanvas(canvasUrl: string, accessToken: string) {
  const response = await fetch('http://localhost:8000/api/v1/canvas/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      canvas_url: canvasUrl,
      access_token: accessToken
    })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('userId', data.user_id);
    return data;
  }
}

// 2. Sync Data from Canvas
async function syncCanvasData(userId: number) {
  const response = await fetch(
    `http://localhost:8000/api/v1/canvas/sync?user_id=${userId}`,
    { method: 'POST' }
  );
  
  return await response.json();
}

// 3. Fetch Synced Courses
async function getCourses() {
  const response = await fetch('http://localhost:8000/api/v1/courses');
  return await response.json();
}

// Complete flow
async function handleLogin(canvasUrl: string, token: string) {
  // Step 1: Authenticate
  const auth = await loginWithCanvas(canvasUrl, token);
  
  // Step 2: Sync data
  await syncCanvasData(auth.user_id);
  
  // Step 3: Fetch and display
  const courses = await getCourses();
  console.log('Courses:', courses);
}
```

## 🧪 Testing the Integration

### Test with curl:

```bash
# 1. Authenticate
curl -X POST http://localhost:8000/api/v1/canvas/auth \
  -H "Content-Type: application/json" \
  -d '{
    "canvas_url": "https://canvas.instructure.com",
    "access_token": "YOUR_CANVAS_TOKEN"
  }'

# 2. Sync data (use user_id from step 1)
curl -X POST "http://localhost:8000/api/v1/canvas/sync?user_id=1"

# 3. View synced courses
curl http://localhost:8000/api/v1/courses

# 4. View synced assignments
curl http://localhost:8000/api/v1/assignments
```

### Test with Swagger UI:

1. Start the backend: `uvicorn app.main:app --reload`
2. Open http://localhost:8000/api/docs
3. Navigate to "canvas-integration" section
4. Try out the endpoints

## 📊 What Data Gets Synced?

### Currently Supported:

✅ **Courses**
- Course code, name, instructor
- Term information
- Progress/completion percentage
- Color coding

✅ **Assignments**
- Title, description, due date
- Points possible
- Submission status
- Priority (calculated from due date)
- Type (assignment, quiz, discussion)

### Future Enhancements:

🔄 **Modules** - Course content organization
🔄 **Files** - Course materials (PDFs, videos)
🔄 **Announcements** - Course updates
🔄 **Grades** - Detailed grade information
🔄 **Submissions** - Assignment submission history
🔄 **Calendar Events** - Upcoming events

## 🔐 Security Considerations

### ⚠️ Current Implementation (Development Only)

The current code stores Canvas tokens in **plain text** in the database. This is **NOT secure** for production!

### ✅ For Production:

1. **Encrypt tokens** before storing:
```python
from cryptography.fernet import Fernet

# Encrypt token
cipher = Fernet(settings.ENCRYPTION_KEY)
encrypted_token = cipher.encrypt(token.encode())

# Decrypt token
decrypted_token = cipher.decrypt(encrypted_token).decode()
```

2. **Use environment variables** for encryption keys
3. **Implement token refresh** (OAuth)
4. **Use HTTPS** in production
5. **Add rate limiting** to prevent abuse
6. **Implement proper authentication** (JWT, sessions)

## 🎯 Canvas API Rate Limits

Canvas has rate limits:
- **Default:** 3000 requests per hour per user
- **Burst:** 100 requests per 10 seconds

Our implementation handles this by:
- Using pagination efficiently
- Caching data locally
- Only syncing when needed (not on every request)

## 🔄 Auto-Sync Strategy

### Recommended Approach:

```python
# Option 1: Sync on login
@app.on_event("startup")
async def schedule_sync():
    # Schedule periodic sync every 15 minutes
    pass

# Option 2: Manual sync button in UI
# Let users trigger sync when needed

# Option 3: Smart sync
# Check last_sync timestamp, only sync if > 15 minutes old
```

## 🐛 Troubleshooting

### Error: "Invalid Canvas credentials"

**Solution:**
- Verify your Canvas URL (must include https://)
- Check your access token hasn't expired
- Ensure token has correct permissions

### Error: "User not found"

**Solution:**
- Authenticate first using `/api/v1/canvas/auth`
- Use the returned `user_id` for sync operations

### Sync is slow

**Solution:**
- Normal for first sync (fetches all data)
- Subsequent syncs will be faster
- Consider implementing incremental sync

### Data not appearing in frontend

**Solution:**
- Check sync completed successfully
- Verify frontend is calling correct endpoints
- Check CORS settings in backend

## 📚 Canvas API Documentation

Official docs: https://canvas.instructure.com/doc/api/

Useful endpoints:
- [Courses API](https://canvas.instructure.com/doc/api/courses.html)
- [Assignments API](https://canvas.instructure.com/doc/api/assignments.html)
- [Modules API](https://canvas.instructure.com/doc/api/modules.html)
- [Files API](https://canvas.instructure.com/doc/api/files.html)

## 🎨 Extending the Integration

### Add new Canvas data type:

1. **Add method to `CanvasClient`:**
```python
# app/services/canvas_client.py
async def get_announcements(self, course_id: str):
    return await self._get_paginated(f"courses/{course_id}/discussion_topics")
```

2. **Add sync method to `CanvasSyncService`:**
```python
# app/services/canvas_sync.py
async def sync_announcements(self, course_id: str):
    announcements = await self.canvas.get_announcements(course_id)
    # Process and save to database
```

3. **Add database model:**
```python
# app/models/announcement.py
class Announcement(Base):
    __tablename__ = "announcements"
    id = Column(String, primary_key=True)
    course_id = Column(String, ForeignKey("courses.id"))
    title = Column(String)
    message = Column(Text)
    posted_at = Column(DateTime)
```

4. **Update sync endpoint** to include announcements

## 💡 Tips

1. **Start with manual token** for development
2. **Implement OAuth** for production
3. **Cache data locally** to reduce API calls
4. **Show sync status** in UI
5. **Handle errors gracefully** (network issues, expired tokens)
6. **Let users re-authenticate** easily

## 🤝 Need Help?

- Check Canvas API docs
- Review error messages in backend logs
- Test endpoints in Swagger UI
- Verify Canvas token permissions




