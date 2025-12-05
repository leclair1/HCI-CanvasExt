# Testing Notes - Files Tab Scanning & OCR Features

## ✅ Syntax Validation
All modified Python files have been syntax-checked and compile successfully:
- `app/services/canvas_scraper.py` ✓
- `app/services/flashcard_generator.py` ✓
- `app/api/v1/canvas.py` ✓
- `app/api/v1/flashcards.py` ✓
- `app/api/v1/quizzes.py` ✓
- `app/api/v1/chat.py` ✓

## ⚠️ Runtime Testing Required

### 1. Files Tab Scanning
**To Test:**
1. Start the backend server
2. Authenticate with a valid Canvas session cookie
3. Call `POST /api/v1/canvas/files` with a valid course_id
4. Verify files are returned from the Canvas Files tab
5. Test with `include_files_tab: true` in flashcard/quiz/chat endpoints

**Potential Issues:**
- Canvas HTML structure may vary - the scraper uses flexible selectors
- API endpoint might require different authentication
- File URL formats may differ between scraping and API

### 2. OCR Support
**To Test:**
1. Ensure Tesseract OCR is installed on the system
2. Test with an image-based PDF (scanned document)
3. Verify OCR is triggered when text extraction yields < 100 characters
4. Verify OCR works as fallback when direct extraction fails

**Potential Issues:**
- Tesseract must be in system PATH
- OCR is slower than direct extraction
- OCR quality depends on PDF image quality
- In Docker, Tesseract is included in Dockerfile

### 3. Integration Testing
**To Test:**
1. Generate flashcards with `include_files_tab: true`
2. Generate quiz with `include_files_tab: true`
3. Use AI tutor with `include_files_tab: true`
4. Verify files from Files tab are included in content extraction

**Known Limitations:**
- Files tab scanning may not work if Canvas HTML structure changes
- OCR requires Tesseract installation (optional, graceful degradation)
- Large files may take time to process
- Rate limiting may apply to Canvas API calls

## 🔧 Installation Requirements

### For OCR Support:
- **Windows**: Install Tesseract from https://github.com/UB-Mannheim/tesseract/wiki
- **macOS**: `brew install tesseract`
- **Linux**: `sudo apt-get install tesseract-ocr`
- **Docker**: Already included in Dockerfile

### Python Dependencies:
All dependencies are in `requirements.txt`:
- `pdf2image==1.17.0`
- `pytesseract==0.3.13`
- `Pillow==10.4.0`

## 📝 Next Steps

1. **Manual Testing**: Test with real Canvas courses and files
2. **Error Handling**: Monitor logs for any Canvas API errors
3. **Performance**: Test with large files and multiple files
4. **User Experience**: Verify UI integration (if frontend updated)

## 🐛 Known Issues

None identified yet - requires runtime testing with actual Canvas instance.

