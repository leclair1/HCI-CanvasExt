"""
Test script to verify flashcard generation step by step
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.db.database import SessionLocal
from app.models.user import User
from app.models.module import Module
from app.core.encryption import decrypt_data
from app.core.config import settings
import json

def test_step_by_step():
    print("="*70)
    print(" TESTING FLASHCARD GENERATION STEP BY STEP")
    print("="*70)
    print()
    
    db = SessionLocal()
    
    # Step 1: Get test user
    print("Step 1: Getting test user...")
    user = db.query(User).filter(User.email == "test@example.com").first()
    if not user:
        print("❌ No test user found!")
        return
    print(f"✅ Found user: {user.email}")
    print()
    
    # Step 2: Check Canvas session cookie
    print("Step 2: Checking Canvas session cookie...")
    if not user.canvas_session_cookie:
        print("❌ No Canvas session cookie found!")
        return
    
    try:
        session_cookie = decrypt_data(user.canvas_session_cookie)
        print(f"✅ Canvas session cookie: {session_cookie[:50]}...")
    except Exception as e:
        print(f"❌ Failed to decrypt: {e}")
        return
    print()
    
    # Step 3: Get a module with items
    print("Step 3: Getting module with PDF items...")
    modules = db.query(Module).all()
    
    if not modules:
        print("❌ No modules found!")
        return
    
    # Find a module with PDF items
    selected_module = None
    for module in modules:
        if module.items:
            # Check if any items have PDF urls
            for item in module.items:
                if 'url' in item and item['url']:
                    selected_module = module
                    break
            if selected_module:
                break
    
    if not selected_module:
        print("❌ No module with items found!")
        return
    
    print(f"✅ Selected module: {selected_module.name}")
    print(f"   Items: {len(selected_module.items)}")
    for i, item in enumerate(selected_module.items[:3]):
        print(f"   {i+1}. {item.get('name', 'Unknown')} - {item.get('url', 'No URL')}")
    print()
    
    # Step 4: Test extracting text from first item
    print("Step 4: Extracting text from first item...")
    from app.services.flashcard_generator import extract_text_from_url
    
    first_item = selected_module.items[0]
    url = first_item.get('url')
    
    if not url:
        print("❌ First item has no URL!")
        return
    
    print(f"   URL: {url}")
    text = extract_text_from_url(url, session_cookie, settings.CANVAS_INSTANCE_URL)
    
    if not text:
        print("❌ Failed to extract text!")
        return
    
    print(f"✅ Extracted {len(text)} characters")
    print(f"   Sample: {text[:300]}...")
    print()
    
    # Step 5: Check Groq API key
    print("Step 5: Checking Groq API key...")
    if not settings.GROQ_API_KEY:
        print("❌ No GROQ_API_KEY found in environment!")
        return
    print(f"✅ Groq API key found: {settings.GROQ_API_KEY[:20]}...")
    print()
    
    # Step 6: Test AI generation with small sample
    print("Step 6: Testing AI flashcard generation...")
    from app.services.flashcard_generator import generate_flashcards_with_groq
    
    # Use a smaller text sample for testing
    sample_text = text[:2000] if len(text) > 2000 else text
    
    try:
        flashcards = generate_flashcards_with_groq(
            content=sample_text,
            module_name=selected_module.name,
            num_cards=3  # Just 3 for testing
        )
        
        if not flashcards:
            print("❌ No flashcards generated!")
            return
        
        print(f"✅ Generated {len(flashcards)} flashcards")
        print()
        print("Sample flashcard:")
        print(json.dumps(flashcards[0], indent=2))
        print()
        
        print("="*70)
        print(" ALL TESTS PASSED! ✅")
        print("="*70)
        
    except Exception as e:
        print(f"❌ AI generation failed: {e}")
        import traceback
        traceback.print_exc()
        return
    
    db.close()

if __name__ == "__main__":
    test_step_by_step()


