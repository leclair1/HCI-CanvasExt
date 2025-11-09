# Canvas Content Scraper & AI Flashcard Generator

A collection of Python scripts to scrape content from Canvas LMS and generate high-quality flashcards using AI.

## 🎯 What These Scripts Do

1. **Test Canvas Connection** - Verify your Canvas session is working
2. **Scrape Course Content** - Download course structure, modules, and materials
3. **Generate Flashcards** - Create study flashcards using AI (OpenRouter LLMs)

## 📋 Prerequisites

- Python 3.14 (or 3.10+)
- Canvas session cookie (from your browser)
- OpenRouter API key (for AI flashcard generation)

## 🚀 Quick Start

### Step 1: Test Your Canvas Connection

```bash
python test_canvas_connection.py
```

This verifies your Canvas session cookie is working and shows your courses.

### Step 2: Scrape Course Content

```bash
python canvas_course_scraper.py
```

This downloads:
- Course structure
- Module information
- PDF names and URLs

Output: `canvas_data.json`

### Step 3: Generate AI Flashcards

#### Option A: Using AI (Recommended)

```bash
python create_flashcards_llm.py
```

**Setup Required:**
1. Get your OpenRouter API key from https://openrouter.ai/keys
2. Open `create_flashcards_llm.py`
3. Update line with your API key:
   ```python
   OPENROUTER_API_KEY = "sk-or-v1-xxxxx"
   ```
4. Choose your model (optional):
   ```python
   MODEL = "meta-llama/llama-3.1-70b-instruct"  # Good balance
   # Or try:
   # "anthropic/claude-3.5-sonnet"  # Best quality
   # "google/gemini-flash-1.5"      # Fast & cheap
   # "mistralai/mistral-7b-instruct" # Very cheap
   ```

Output: `flashcards_llm.json`

#### Option B: Rule-Based (Free, No API Key)

```bash
python create_flashcards_v2.py
```

Uses simple text patterns to generate flashcards. No API key needed but lower quality.

Output: `flashcards.json`

## 📁 Generated Files

| File | Description |
|------|-------------|
| `canvas_data.json` | Course structure and module information |
| `flashcards_llm.json` | AI-generated flashcards (high quality) |
| `flashcards.json` | Rule-based flashcards (fallback) |
| `pdf_downloads/` | Downloaded PDF files from Canvas |

## 🔑 Getting Your Canvas Session Cookie

1. **Open Canvas** in your browser
2. **Open Developer Tools** (F12)
3. **Go to Application tab** (Chrome) or Storage tab (Firefox)
4. **Click on Cookies** → Select your Canvas domain
5. **Find cookie named** `canvas_session`
6. **Copy the Value**
7. **Update the scripts** with your cookie value:
   ```python
   SESSION_COOKIE_VALUE = "your-cookie-value-here"
   ```

**Note:** Session cookies expire! If scripts stop working, refresh your cookie.

## 🤖 OpenRouter Models & Pricing

### Recommended Models

| Model | Quality | Speed | Cost (per 1M tokens) | Best For |
|-------|---------|-------|---------------------|----------|
| **Meta Llama 3.1 70B** | ⭐⭐⭐⭐ | Fast | $0.27 | Balanced - Best value |
| **Claude 3.5 Sonnet** | ⭐⭐⭐⭐⭐ | Medium | $3.00 | Highest quality |
| **Gemini Flash 1.5** | ⭐⭐⭐ | Very Fast | $0.075 | Budget-friendly |
| **Mistral 7B** | ⭐⭐ | Very Fast | $0.07 | Testing/prototyping |

### Cost Estimation

For a typical course with 10 PDFs:
- **Gemini Flash**: ~$0.01 - $0.05
- **Llama 3.1 70B**: ~$0.03 - $0.15
- **Claude 3.5**: ~$0.30 - $1.00

## ⚙️ Configuration

### Change Target Course

Edit in any script:
```python
TARGET_COURSE_ID = "1994124"  # Your course ID
```

To find your course ID:
1. Run `test_canvas_connection.py`
2. Look for your course in the output
3. The number in brackets `[1994124]` is the course ID

### Control Number of Modules

```python
MAX_MODULES = 2  # Process first 2 modules
```

### Adjust Flashcards Per Document

```python
FLASHCARDS_PER_DOCUMENT = 10  # Number of flashcards to generate per PDF
```

## 📊 Example Output

### AI-Generated Flashcards

```json
[
  {
    "question": "What is Human-Computer Interaction?",
    "answer": "Human-Computer Interaction (HCI) is the study of how people interact with computers and digital systems. It focuses on designing interfaces that are usable, efficient, and enjoyable for users.",
    "source": "02 - Introduction to HCI.pdf",
    "module": "Week 1: Welcome to HCI",
    "type": "definition"
  },
  {
    "question": "Explain the concept of user-centered design.",
    "answer": "User-centered design is an approach that puts the user's needs, preferences, and limitations at the center of the design process. It involves iterative cycles of design, testing, and refinement based on user feedback.",
    "source": "07 - Introduction to User-Centered Design.pdf",
    "module": "Week 3",
    "type": "explanation"
  }
]
```

## 🔧 Troubleshooting

### "No module named requests"

```bash
pip install requests beautifulsoup4 PyPDF2 openai
```

### "Invalid session cookie"

Your session cookie expired. Get a fresh one from your browser.

### "No flashcards generated"

- Check your OpenRouter API key is correct
- Verify you have API credits
- Try a different model
- Check the console for error messages

### "Could not find PDF download link"

Some PDFs may be restricted. The script will skip them and continue.

### "Rate limit exceeded"

OpenRouter has rate limits. Wait a minute and try again, or upgrade your OpenRouter plan.

## 💰 OpenRouter API Credits

1. **Sign up** at https://openrouter.ai/
2. **Add credits** (minimum $5)
3. **Generate API key** at https://openrouter.ai/keys
4. **Monitor usage** at https://openrouter.ai/activity

## 📝 Script Descriptions

### `test_canvas_connection.py`
- Tests Canvas authentication
- Lists all your courses
- No modifications to Canvas

### `canvas_course_scraper.py`
- Scrapes course structure
- Downloads module information
- Creates `canvas_data.json`

### `create_flashcards_llm.py` ⭐ **Recommended**
- Uses AI to generate flashcards
- High-quality questions and answers
- Understands context and concepts
- Requires OpenRouter API key

### `create_flashcards_v2.py`
- Rule-based flashcard generation
- No API key needed
- Lower quality than AI version
- Good for testing

### `canvas_file_scraper.py`
- Alternative scraper for downloading files
- More aggressive file downloading
- Use if other methods fail

## 🎓 Tips for Best Results

1. **Start small**: Test with 1-2 modules first
2. **Use good models**: Llama 3.1 70B offers great quality/cost balance
3. **Review generated flashcards**: AI isn't perfect, review and edit
4. **Adjust prompts**: Modify the prompt in `create_flashcards_llm.py` for your needs
5. **Cache PDFs**: Scripts cache downloads to save time on re-runs

## 🔒 Security Notes

- **Don't commit** your session cookie or API keys to Git
- Session cookies are **sensitive** - treat like passwords
- **Regenerate** session cookies regularly
- **Monitor** your OpenRouter usage to avoid unexpected costs

## 📧 Support

For issues:
1. Check error messages carefully
2. Verify your credentials (cookie, API key)
3. Try with a simpler model first
4. Check Canvas and OpenRouter status pages

## 🎉 Success!

Once you have `flashcards_llm.json`, you can:
- Import into your HCI Canvas Extension backend
- Use in your frontend flashcard interface
- Export to Anki, Quizlet, or other tools
- Continue generating more as you progress through your course

Happy studying! 🚀


