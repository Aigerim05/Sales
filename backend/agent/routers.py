from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from agent.chat_ai import respond_as_client
from auth.dependencies import get_current_user
from auth.models import User
from chat.crud import ChatDAO
from database import get_async_db

router = APIRouter(prefix="/simulator", tags=["Simulator"])

@router.post("/{chat_id}/talk-to-client")
async def talk_to_virtual_client(
    chat_id: int,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
):
    chat = await ChatDAO.get_chat_by_id(chat_id, db)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access forbidden")

    reply = await respond_as_client(chat_id, db)
    return {"reply": reply}
