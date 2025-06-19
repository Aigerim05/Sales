# chat/schema.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ChatCreate(BaseModel):
    character: str
    scenario: str

class ChatRead(BaseModel):
    id: int
    user_id: int
    character: str
    scenario: str
    started_at: datetime
    finished_at: Optional[datetime]

    class Config:
        orm_mode = True
