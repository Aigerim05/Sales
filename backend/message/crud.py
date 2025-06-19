# message/crud.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from message.model import Message


class MessageDAO:
    @staticmethod
    async def create_message(message: Message, db: AsyncSession) -> Message:
        db.add(message)
        await db.commit()
        await db.refresh(message)
        return message

    @staticmethod
    async def get_messages_by_chat(chat_id: int, db: AsyncSession) -> list[Message]:
        result = await db.execute(select(Message).where(Message.chat_id == chat_id))
        return result.scalars().all()

    @staticmethod
    async def get_message_by_id(message_id: int, db: AsyncSession) -> Message | None:
        result = await db.execute(select(Message).where(Message.id == message_id))
        return result.scalars().first()
