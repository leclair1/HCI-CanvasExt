# 🔐 Multi-User Canvas Integration

## 🎯 How It Works

Each user now has their own:
- ✅ **Encrypted Canvas session cookie** (stored securely)
- ✅ **Personal courses** (only they can see)
- ✅ **Personal modules** (associated with their courses)
- ✅ **Personal flashcards** (from their materials)

## 🔒 Security Features

### 1. Canvas Session Cookie Encryption
- Session cookies are **encrypted** using Fernet encryption
- Key derived from `SECRET_KEY` environment variable
- **Not stored in plain text** ✅

### 2. User Isolation
- Courses filtered by `user_id`
- Each user only sees their own courses
- JWT authentication required for all API calls

### 3. Password Security
- Passwords hashed with bcrypt
- Never stored in plain text
- Industry-standard security

## 🚀 User Sign-Up Flow

### Step 1: User Creates Account

```typescript
// Frontend: Signup form
const signup = await authAPI.signup({
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  password: "securepassword123",
  canvas_instance_url: "https://usflearn.instructure.com",
  canvas_session_cookie: "user's_session_cookie_here"
});
```

### Step 2: Backend Processes

1. ✅ Hash password
2. ✅ **Encrypt Canvas session cookie**
3. ✅ Create user account
4. ✅ **Automatically scrape their Canvas courses**
5. ✅ Import courses & modules (user-specific)
6. ✅ Return JWT token

### Step 3: User Logs In

```typescript
const login = await authAPI.login({
  email: "john@example.com",
  password: "securepassword123"
});

// Store token
tokenManager.setToken(login.access_token);
tokenManager.setUser(login.user);
```

### Step 4: Access Personal Data

```typescript
// All API calls now require authentication
const courses = await coursesAPI.getCourses();  // Only user's courses
const modules = await modulesAPI.getCourseModules(courseId);  // Only user's modules
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    canvas_session_cookie VARCHAR,  -- ENCRYPTED!
    canvas_instance_url VARCHAR,
    ...
);
```

### Courses Table (User-Specific)
```sql
CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,  -- Links to user
    canvas_id VARCHAR,
    code VARCHAR,
    name VARCHAR,
    ...
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Modules Table (User-Specific via Course)
```sql
CREATE TABLE modules (
    id INTEGER PRIMARY KEY,
    course_id INTEGER,  -- Links to user's course
    name VARCHAR,
    items JSON,
    ...
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

## 🔄 Data Flow

```
User Signs Up
    ↓
Backend encrypts session cookie
    ↓
Auto-scrapes Canvas courses
    ↓
Imports to database (user_id = user.id)
    ↓
User logs in
    ↓
JWT token issued
    ↓
API calls use token
    ↓
Backend filters by user_id
    ↓
User sees only their data
```

## 🧪 Testing Multi-User

### Create Multiple Users

```bash
# User 1
POST /api/v1/auth/signup
{
  "first_name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "canvas_session_cookie": "alice_session_cookie"
}

# User 2
POST /api/v1/auth/signup
{
  "first_name": "Bob",
  "email": "bob@example.com",
  "password": "password123",
  "canvas_session_cookie": "bob_session_cookie"
}
```

### Verify Isolation

```bash
# Login as Alice
POST /api/v1/auth/login
{
  "email": "alice@example.com",
  "password": "password123"
}
# Returns: token_alice

# Get Alice's courses (uses token_alice)
GET /api/v1/courses
Authorization: Bearer token_alice
# Returns: Only Alice's courses

# Login as Bob
POST /api/v1/auth/login
{
  "email": "bob@example.com",
  "password": "password123"
}
# Returns: token_bob

# Get Bob's courses (uses token_bob)
GET /api/v1/courses
Authorization: Bearer token_bob
# Returns: Only Bob's courses (different from Alice's!)
```

## 🔐 Encryption Details

### How Session Cookies Are Encrypted

```python
# backend/app/core/encryption.py

from cryptography.fernet import Fernet

# Encrypt
encrypted = encrypt_data(session_cookie)
# Stored in database

# Decrypt when needed
decrypted = decrypt_data(encrypted_cookie)
# Used for scraping
```

### Key Management

- Encryption key derived from `SECRET_KEY`
- Change `SECRET_KEY` in production!
- Use strong random key: `openssl rand -hex 32`

## ⚙️ Environment Variables

### Required for Production

```bash
# .env file
SECRET_KEY=your-super-secret-key-change-this-in-production
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
CORS_ORIGINS=["https://yourdomain.com"]
```

## 🎨 Frontend Integration

### Updated Signup Component

The signup form now accepts Canvas session cookie:

```typescript
<input
  type="text"
  placeholder="Canvas Session Cookie (optional)"
  value={canvasSession}
  onChange={(e) => setCanvasSession(e.target.value)}
/>
```

When provided:
- ✅ Encrypted and stored securely
- ✅ Courses auto-imported on signup
- ✅ User sees their courses immediately

## 🔄 Re-Sync Courses

Users can re-sync their Canvas data:

```typescript
// Backend endpoint
POST /api/v1/canvas/scrape-courses
Authorization: Bearer {user_token}
{
  "canvas_url": "https://usflearn.instructure.com",
  "session_cookie": "new_session_cookie",
  "user_id": current_user.id  // From JWT token
}
```

## 📝 Summary

✅ **Encrypted Storage** - Session cookies encrypted at rest  
✅ **User Isolation** - Each user sees only their data  
✅ **Auto-Import** - Courses imported on signup  
✅ **JWT Authentication** - Secure API access  
✅ **Production-Ready** - Proper security practices  

## 🚨 Important Notes

### For Development
- Test with one user first
- Use strong SECRET_KEY
- Don't commit session cookies to Git

### For Production
- Change SECRET_KEY immediately
- Use HTTPS only
- Implement rate limiting
- Add session cookie expiration handling
- Consider OAuth for Canvas (more secure than scraping)

## 🎉 Benefits

1. **Privacy** - Users can't see each other's courses
2. **Security** - Session cookies encrypted
3. **Scalability** - Supports unlimited users
4. **Automatic** - Courses imported on signup
5. **Flexible** - Can re-sync anytime

Your app is now multi-user ready! 🚀


