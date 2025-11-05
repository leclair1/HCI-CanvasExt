from sqlalchemy import Column, Integer, String, Boolean
from app.db.database import Base

class UserSettings(Base):
    __tablename__ = "user_settings"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    theme = Column(String, default="default")
    dark_mode = Column(Boolean, default=False)
    font_size = Column(String, default="medium")
    font_family = Column(String, default="default")
    card_style = Column(String, default="default")
    spacing = Column(String, default="comfortable")
    accent_color = Column(String, default="#030213")



