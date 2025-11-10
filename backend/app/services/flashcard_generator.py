"""
AI Flashcard Generator Service using Groq
Generates flashcards from module content using LLM
"""

import requests
import json
from typing import List, Dict
from bs4 import BeautifulSoup
from PyPDF2 import PdfReader
import io
from groq import Groq
from app.core.config import settings

# Groq API Configuration
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "llama-3.1-8b-instant"


def extract_text_from_url(url: str, session_cookie: str, canvas_url: str) -> str:
    """
    Download content from Canvas URL and extract text
    """
    try:
        # Create session with cookie
        session = requests.Session()
        from urllib.parse import urlparse, urljoin
        domain = urlparse(canvas_url).hostname
        session.cookies.set("canvas_session", session_cookie, domain=domain)
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })
        
        print(f"Fetching: {url}")
        
        # First, get the Canvas module item page
        response = session.get(url, allow_redirects=True)
        content_type = response.headers.get('Content-Type', '')
        
        print(f"Content-Type: {content_type}, Status: {response.status_code}")
        
        # If it's HTML, look for the actual file download link
        if 'text/html' in content_type:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Strategy 1: Look for file preview iframe
            iframe = soup.find('iframe', {'id': 'file_content'})
            if iframe and iframe.get('src'):
                file_url = iframe['src']
                print(f"Found iframe src: {file_url}")
                response = session.get(file_url, allow_redirects=True)
                content_type = response.headers.get('Content-Type', '')
            
            # Strategy 2: Look for any link with /files/ and download in URL
            if 'application/pdf' not in content_type:
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    if '/files/' in href and ('download' in href or 'preview' in href):
                        download_url = urljoin(canvas_url, href)
                        print(f"Found file link: {download_url}")
                        response = session.get(download_url, allow_redirects=True)
                        content_type = response.headers.get('Content-Type', '')
                        if 'application/pdf' in content_type:
                            break
        
        # If it's a PDF
        if 'application/pdf' in content_type:
            try:
                print(f"PDF found! Size: {len(response.content)} bytes")
                pdf_reader = PdfReader(io.BytesIO(response.content))
                text = ""
                for i, page in enumerate(pdf_reader.pages):
                    page_text = page.extract_text()
                    text += page_text + "\n"
                    if i == 0:  # Log first page sample
                        print(f"First page sample: {page_text[:200]}...")
                print(f"Total extracted: {len(text)} characters from {len(pdf_reader.pages)} pages")
                return text
            except Exception as e:
                print(f"PDF extraction error: {e}")
                return ""
        
        # If it's HTML
        elif 'text/html' in content_type:
            soup = BeautifulSoup(response.text, 'html.parser')
            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()
            return soup.get_text()
        
        return ""
    except Exception as e:
        print(f"Error extracting text from {url}: {e}")
        return ""


def generate_flashcards_with_groq(
    content: str,
    module_name: str,
    num_cards: int = 15
) -> List[Dict[str, str]]:
    """
    Generate flashcards from content using Groq LLM
    """
    groq_api_key = settings.GROQ_API_KEY
    if not groq_api_key:
        raise ValueError("GROQ_API_KEY not configured. Please set it in .env file")
    
    # Truncate content if too long
    max_content_length = 8000
    if len(content) > max_content_length:
        content = content[:max_content_length] + "..."
    
    # Create prompt
    prompt = f"""You are an expert educational content creator. Generate exactly {num_cards} high-quality study flashcards from the following course material.

IMPORTANT GUIDELINES:
1. Create diverse types of questions:
   - Definitions: "What is [concept]?"
   - Explanations: "Explain [concept]"
   - Applications: "How would you apply [concept]?"
   - Comparisons: "What's the difference between [A] and [B]?"

2. Answers should be:
   - Clear and concise (2-4 sentences)
   - Accurate and educational
   - Based strictly on the provided content

3. Focus on important concepts, skip administrative details

4. Return ONLY valid JSON array, no other text

CONTENT FROM: {module_name}

TEXT:
{content}

Generate exactly {num_cards} flashcards in this JSON format:
[
  {{"question": "What is...", "answer": "...", "type": "definition"}},
  {{"question": "Explain...", "answer": "...", "type": "explanation"}}
]

JSON array:"""

    try:
        response = requests.post(
            GROQ_API_URL,
            headers={
                "Authorization": f"Bearer {groq_api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are an expert educational content creator who generates high-quality study flashcards. Always return valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.7,
                "max_tokens": 2000
            },
            timeout=60
        )
        
        if response.status_code != 200:
            raise ValueError(f"Groq API error: {response.status_code}")
        
        result = response.json()
        content_text = result['choices'][0]['message']['content'].strip()
        
        # Extract JSON
        if "```json" in content_text:
            content_text = content_text.split("```json")[1].split("```")[0].strip()
        elif "```" in content_text:
            content_text = content_text.split("```")[1].split("```")[0].strip()
        elif "[" in content_text:
            start = content_text.find("[")
            end = content_text.rfind("]") + 1
            if start >= 0 and end > start:
                content_text = content_text[start:end]
        
        # Clean the JSON text before parsing
        # Fix common issues like unescaped quotes in strings
        content_text = content_text.replace('\\"', '"')  # Fix escaped quotes
        content_text = content_text.replace("'", "'")  # Fix smart quotes
        content_text = content_text.replace('"', '"')  # Fix smart quotes
        content_text = content_text.replace('"', '"')  # Fix smart quotes
        
        # Parse JSON
        try:
            flashcards = json.loads(content_text)
        except json.JSONDecodeError:
            # Try more aggressive cleaning
            import re
            # Remove any text before first [ and after last ]
            match = re.search(r'\[.*\]', content_text, re.DOTALL)
            if match:
                content_text = match.group(0)
                flashcards = json.loads(content_text)
            else:
                raise
        
        return flashcards
        
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON. Content was:\n{content_text[:500]}")
        raise ValueError(f"Failed to parse LLM response as JSON: {e}")
    except Exception as e:
        raise ValueError(f"Flashcard generation failed: {e}")


def generate_quiz_with_groq(
    content: str,
    module_name: str,
    num_questions: int = 10
) -> List[Dict[str, str]]:
    """
    Generate quiz questions from content using Groq LLM
    """
    groq_api_key = settings.GROQ_API_KEY
    if not groq_api_key:
        raise ValueError("GROQ_API_KEY not configured. Please set it in .env file")
    
    # Truncate content if too long
    max_content_length = 8000
    if len(content) > max_content_length:
        content = content[:max_content_length] + "..."
    
    # Create prompt for quiz generation
    prompt = f"""You are an expert educational content creator. Generate exactly {num_questions} multiple-choice quiz questions from the following course material.

IMPORTANT GUIDELINES:
1. Create diverse question types:
   - Factual recall: "What is...?"
   - Conceptual understanding: "Why does...?"
   - Application: "Which would be best for...?"
   - Analysis: "How does X relate to Y?"

2. Each question must have:
   - Clear, unambiguous question text
   - Four answer options (A, B, C, D)
   - Only ONE correct answer
   - Plausible distractors (wrong answers that seem reasonable)

3. Requirements:
   - Questions should test understanding, not just memorization
   - Options should be roughly equal length
   - Avoid "all of the above" or "none of the above"
   - Base questions strictly on the provided content

4. Return ONLY valid JSON array, no other text

CONTENT FROM: {module_name}

TEXT:
{content}

Generate exactly {num_questions} questions in this JSON format:
[
  {{
    "question": "What is...",
    "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
    "correct_answer": "A"
  }}
]

JSON array:"""

    try:
        response = requests.post(
            GROQ_API_URL,
            headers={
                "Authorization": f"Bearer {groq_api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are an expert educational content creator who generates high-quality multiple-choice quiz questions. Always return valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.7,
                "max_tokens": 2500
            },
            timeout=60
        )
        
        if response.status_code != 200:
            raise ValueError(f"Groq API error: {response.status_code}")
        
        result = response.json()
        content_text = result['choices'][0]['message']['content'].strip()
        
        # Extract JSON
        if "```json" in content_text:
            content_text = content_text.split("```json")[1].split("```")[0].strip()
        elif "```" in content_text:
            content_text = content_text.split("```")[1].split("```")[0].strip()
        elif "[" in content_text:
            start = content_text.find("[")
            end = content_text.rfind("]") + 1
            if start >= 0 and end > start:
                content_text = content_text[start:end]
        
        # Clean the JSON text before parsing
        content_text = content_text.replace('\\"', '"')
        content_text = content_text.replace("'", "'")
        content_text = content_text.replace('"', '"')
        content_text = content_text.replace('"', '"')
        
        # Parse JSON
        try:
            questions = json.loads(content_text)
        except json.JSONDecodeError:
            import re
            match = re.search(r'\[.*\]', content_text, re.DOTALL)
            if match:
                content_text = match.group(0)
                questions = json.loads(content_text)
            else:
                raise
        
        return questions
        
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON. Content was:\n{content_text[:500]}")
        raise ValueError(f"Failed to parse LLM response as JSON: {e}")
    except Exception as e:
        raise ValueError(f"Quiz generation failed: {e}")


def generate_chat_response_with_groq(question: str, context: str, module_name: str) -> str:
    """
    Generate an AI tutor chat response using course material context (RAG).
    
    Args:
        question: Student's question
        context: Extracted text from course materials (PDFs, documents)
        module_name: Name of the module for reference
        
    Returns:
        AI-generated response based on the context
    """
    if not settings.GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY not configured")
    
    client = Groq(api_key=settings.GROQ_API_KEY)
    
    prompt = f"""You are a direct, no-nonsense AI tutor for "{module_name}".

Question: {question}

Course material context:
{context}

Instructions:
- Answer ONLY what was asked - no introductions, no pleasantries
- Be concise and to the point
- Use the provided course materials to answer
- If the answer isn't in the materials, say so briefly
- No "Would you like me to..." or "Let me know if..." endings
- Get straight to the answer

Answer:"""
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model=MODEL,  # Use same model as flashcards (llama-3.1-8b-instant)
            temperature=0.7,
            max_tokens=1000,
            top_p=1,
            stream=False
        )
        
        response = chat_completion.choices[0].message.content
        return response.strip()
        
    except Exception as e:
        raise ValueError(f"Chat response generation failed: {e}")


def generate_active_recall_question_with_groq(context: str, module_name: str) -> str:
    """
    Generate an active recall question based on course material context.
    
    Args:
        context: Extracted text from course materials
        module_name: Name of the module for reference
        
    Returns:
        A challenging question based on the context
    """
    if not settings.GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY not configured")
    
    client = Groq(api_key=settings.GROQ_API_KEY)
    
    prompt = f"""Based on this course material from "{module_name}", generate ONE challenging question that tests understanding:

{context}

Generate a question that:
- Tests deep understanding, not just memorization
- Requires explanation or analysis
- Is specific to the provided material
- Has a clear, answerable scope

Return ONLY the question, nothing else."""
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model=MODEL,
            temperature=0.8,  # Slightly higher for variety
            max_tokens=200,
            top_p=1,
            stream=False
        )
        
        question = chat_completion.choices[0].message.content
        return question.strip()
        
    except Exception as e:
        raise ValueError(f"Question generation failed: {e}")


def grade_active_recall_answer_with_groq(
    question: str, 
    user_answer: str, 
    context: str, 
    difficulty: str
) -> Dict[str, any]:
    """
    Grade a user's answer using AI based on course material and difficulty level.
    
    Args:
        question: The question asked
        user_answer: Student's answer
        context: Course material context
        difficulty: Grading mode - "easy", "balanced", or "tough"
        
    Returns:
        Dict with score, feedback, and correct answer
    """
    if not settings.GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY not configured")
    
    client = Groq(api_key=settings.GROQ_API_KEY)
    
    # Adjust grading criteria based on difficulty
    if difficulty == "easy":
        criteria = """- Award points for partial understanding
- Accept answers that capture the main idea even if missing details
- Be encouraging and lenient
- 70%+ for reasonable attempts"""
    elif difficulty == "balanced":
        criteria = """- Require accurate understanding of key concepts
- Expect clear explanations
- Deduct points for significant errors or omissions
- 80%+ for solid answers"""
    else:  # tough
        criteria = """- Demand precise, thorough explanations
- Expect specific examples and complete coverage
- Deduct points for minor inaccuracies
- 90%+ only for excellent answers"""
    
    prompt = f"""Grade this student answer using {difficulty} grading standards.

Question: {question}

Course Material Context:
{context}

Student's Answer:
{user_answer}

Grading Criteria ({difficulty} mode):
{criteria}

Provide your grading in this EXACT JSON format:
{{
  "score": <number 0-100>,
  "feedback": "<brief direct feedback on their answer>",
  "correct_answer": "<what a complete answer should include>",
  "passed": <true if score >= 70, false otherwise>
}}

Be direct and specific. No introductions."""
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model=MODEL,
            temperature=0.3,  # Lower for more consistent grading
            max_tokens=500,
            top_p=1,
            stream=False
        )
        
        response_text = chat_completion.choices[0].message.content.strip()
        
        # Parse JSON response
        # Try to extract JSON if wrapped in markdown code blocks
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()
        
        result = json.loads(response_text)
        return result
        
    except json.JSONDecodeError as e:
        print(f"Failed to parse grading response. Content:\n{response_text}")
        raise ValueError(f"Failed to parse grading response: {e}")
    except Exception as e:
        raise ValueError(f"Answer grading failed: {e}")
