# chat/model.py
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from datetime import datetime

from auth.db_models import Base
from message.model import Message 

class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    character = Column(String, nullable=False)
    scenario = Column(String, nullable=False)
    started_at = Column(DateTime, default=datetime.utcnow)
    finished_at = Column(DateTime, nullable=True)

    user = relationship("UserDB", back_populates="chats")
    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan")