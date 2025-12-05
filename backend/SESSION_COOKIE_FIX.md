# Canvas Session Cookie Fix

## Problem
The fetch was failing because `CanvasClient` was trying to use a Canvas session cookie for API authentication, but **Canvas API does not accept session cookies** - it requires OAuth2 access tokens.

## Root Cause
- Canvas session cookies are designed for browser-based web interactions
- Canvas API endpoints require OAuth2 Bearer tokens in the `Authorization` header
- Session cookies work for web scraping (HTML parsing) but not for REST API calls

## Solution Implemented

### 1. Updated `CanvasClient` to Support Session Cookies
- Modified `CanvasClient.__init__()` to accept either `access_token` or `session_cookie`
- When using session cookies, sets cookies properly with domain and path
- Added better error handling with detailed error messages

### 2. Updated Sync Endpoints
- Modified all sync endpoints to:
  - Try access token first (preferred method)
  - Fall back to session cookie if access token not available
  - Decrypt session cookies before use (they're stored encrypted in DB)

### 3. Important Notes
- **Session cookies will likely still fail for API calls** - Canvas API doesn't support them
- **Use `CanvasScraper` for web scraping** - it's designed to work with session cookies
- **For API calls, users need OAuth2 access tokens** - these can be generated in Canvas settings

## Testing Your Session Cookie

### Option 1: Test with Web Scraping (Should Work)
```bash
POST /api/v1/canvas/validate-session
{
  "canvas_url": "https://usflearn.instructure.com",
  "session_cookie": "your_session_cookie_here"
}
```

### Option 2: Test with API (Will Likely Fail)
```bash
POST /api/v1/canvas/test-session-api
{
  "canvas_url": "https://usflearn.instructure.com",
  "session_cookie": "your_session_cookie_here"
}
```

## Recommended Approach

1. **For API-based syncing**: Users should generate an OAuth2 access token in Canvas:
   - Go to Canvas → Account → Settings → New Access Token
   - Use this token with the `/api/v1/canvas/auth` endpoint

2. **For web scraping**: Use the session cookie with the `/api/v1/canvas/scrape-courses` endpoint

## Files Modified
- `backend/app/services/canvas_client.py` - Added session cookie support
- `backend/app/api/v1/canvas.py` - Updated sync endpoints to handle both auth methods
- Added better error messages to help diagnose authentication issues


