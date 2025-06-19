from pydantic import BaseModel
from typing import Optional, List, Literal
from datetime import datetime

class ChatCreate(BaseModel):
    character: str
    scenario: str

class ChatMessageCreate(BaseModel):
    role: Literal["user", "client", "coach"]
    content: str
    ts: datetime

class ChatRead(BaseModel):
    id: int
    character: str
    scenario: str
    started_at: datetime
    finished_at: Optional[datetime]
    messages_json: Optional[List[dict]]

    class Config:
        from_attributes = True