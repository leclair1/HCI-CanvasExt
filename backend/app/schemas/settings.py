from pydantic import BaseModel

class UserSettingsBase(BaseModel):
    theme: str = "default"
    dark_mode: bool = False
    font_size: str = "medium"
    font_family: str = "default"
    card_style: str = "default"
    spacing: str = "comfortable"
    accent_color: str = "#030213"

class UserSettingsUpdate(BaseModel):
    theme: str | None = None
    dark_mode: bool | None = None
    font_size: str | None = None
    font_family: str | None = None
    card_style: str | None = None
    spacing: str | None = None
    accent_color: str | None = None

class UserSettings(UserSettingsBase):
    id: int
    
    class Config:
        from_attributes = True

