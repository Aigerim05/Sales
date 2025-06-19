from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError

from chat.model import Chat
from auth.execptions import DatabaseException


class ChatDAO:

    @staticmethod
    async def create_chat(chat: Chat, db: AsyncSession) -> Chat:
        try:
            db.add(chat)
            await db.commit()
            await db.refresh(chat)
            return chat
        except Exception as e:
            await db.rollback()
            raise DatabaseException(f"create_chat: {str(e)}")

    @staticmethod
    async def get_chat_by_id(chat_id: int, db: AsyncSession) -> Optional[Chat]:
        try:
            query = select(Chat).where(Chat.id == chat_id)
            result = await db.execute(query)
            return result.scalars().first()
        except Exception as e:
            raise DatabaseException(f"get_chat_by_id: {str(e)}")

    @staticmethod
    async def get_chats_by_user(user_id: int, db: AsyncSession) -> List[Chat]:
        try:
            query = select(Chat).where(Chat.user_id == user_id)
            result = await db.execute(query)
            return result.scalars().all()
        except Exception as e:
            raise DatabaseException(f"get_chats_by_user: {str(e)}")

    @staticmethod
    async def delete_chat(chat: Chat, db: AsyncSession) -> bool:
        try:
            await db.delete(chat)
            await db.commit()
            return True
        except Exception as e:
            await db.rollback()
            raise DatabaseException(f"delete_chat: {str(e)}")