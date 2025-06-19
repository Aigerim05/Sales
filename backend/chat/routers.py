from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from chat.crud import ChatDAO
from chat.model import Chat
from chat.schema import ChatCreate, ChatRead, ChatMessageCreate
from database import get_async_db
from auth.dependencies import get_current_user
from auth.models import User

from typing import List

router = APIRouter(prefix="/chats", tags=["chats"])

@router.post("", response_model=ChatRead)
async def create_chat(
    chat_data: ChatCreate,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
):
    chat = Chat(
        user_id=current_user.id,
        character=chat_data.character,
        scenario=chat_data.scenario
    )
    return await ChatDAO.create_chat(chat, db)

@router.get("", response_model=List[ChatRead])
async def get_chats(
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
):
    return await ChatDAO.get_chats_by_user(current_user.id, db)

@router.get("/{chat_id}", response_model=ChatRead)
async def get_chat_by_id(
    chat_id: int,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
):
    chat = await ChatDAO.get_chat_by_id(chat_id, db)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access forbidden")
    return chat

@router.post("/{chat_id}/messages", response_model=ChatRead)
async def add_message_to_chat(
    chat_id: int,
    message: ChatMessageCreate,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
):
    chat = await ChatDAO.get_chat_by_id(chat_id, db)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access forbidden")

    return await ChatDAO.append_message_to_chat(chat_id, message.dict(), db)
