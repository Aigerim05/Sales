from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from auth.db_models import Base
import enum

class SenderEnum(str, enum.Enum):
    user = "user"
    client = "client"
    coach = "coach"

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chats.id"), nullable=False)  # используем строку
    sender = Column(Enum(SenderEnum), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    chat = relationship("Chat", back_populates="messages")  # строка вместо Chat класса
