from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError

from chat.model import Chat
from auth.execptions import DatabaseException
from sqlalchemy.orm.attributes import flag_modified
from message.model import Message
import copy
from datetime import datetime


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

    @staticmethod
    async def append_message_to_chat(chat_id: int, message: dict, db: AsyncSession) -> Chat:
        try:
            chat = await ChatDAO.get_chat_by_id(chat_id, db)
            if not chat:
                raise DatabaseException(f"Chat with ID {chat_id} not found")

            # Сохраняем в JSON (с ts в виде строки)
            import copy
            safe_message = copy.deepcopy(message)
            if isinstance(safe_message.get("ts"), datetime):
                safe_message["ts"] = safe_message["ts"].isoformat()

            if not isinstance(chat.messages_json, list):
                chat.messages_json = []
            chat.messages_json.append(safe_message)
            flag_modified(chat, "messages_json")

            # Приводим datetime к naive
            original_ts = message["ts"]
            if original_ts.tzinfo is not None:
                original_ts = original_ts.replace(tzinfo=None)

            # Создаём запись в Message
            from message.model import Message
            message_row = Message(
                chat_id=chat_id,
                sender=message["role"],
                content=message["content"],
                created_at=original_ts  # now naive datetime
            )
            db.add(message_row)

            await db.commit()
            await db.refresh(chat)
            return chat
        except Exception as e:
            await db.rollback()
            raise DatabaseException(f"append_message_to_chat: {str(e)}")
