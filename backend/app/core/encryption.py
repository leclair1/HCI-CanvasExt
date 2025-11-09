"""
Encryption utilities for sensitive data
"""
from cryptography.fernet import Fernet
from app.core.config import settings
import base64
import hashlib


def get_encryption_key() -> bytes:
    """
    Get or create encryption key from settings
    In production, use environment variable
    """
    # Create a key from the SECRET_KEY
    key = hashlib.sha256(settings.SECRET_KEY.encode()).digest()
    return base64.urlsafe_b64encode(key)


def encrypt_data(data: str) -> str:
    """Encrypt sensitive data (like Canvas session cookie)"""
    if not data:
        return ""
    
    try:
        cipher = Fernet(get_encryption_key())
        encrypted = cipher.encrypt(data.encode())
        return encrypted.decode()
    except Exception as e:
        print(f"Encryption error: {e}")
        return data  # Fallback to unencrypted in dev


def decrypt_data(encrypted_data: str) -> str:
    """Decrypt sensitive data"""
    if not encrypted_data:
        return ""
    
    try:
        cipher = Fernet(get_encryption_key())
        decrypted = cipher.decrypt(encrypted_data.encode())
        return decrypted.decode()
    except Exception as e:
        print(f"Decryption error: {e}")
        return encrypted_data  # Fallback to returning as-is


