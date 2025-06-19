from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class MessageCreate(BaseModel):
    chat_id: int
    sender: Literal["user", "client", "coach"]
    content: str

class MessageRead(BaseModel):
    id: int 
    chat_id: int
    sender: str
    content: str
    created_at: datetime

    class Config:
        orm_mode = True
