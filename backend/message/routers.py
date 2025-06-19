# # message/routers.py
# from fastapi import APIRouter, Depends, Query, HTTPException
# from sqlalchemy.ext.asyncio import AsyncSession

# from message.crud import MessageDAO
# from message.model import Message
# from message.schema import MessageCreate, MessageRead
# from database import get_async_db
# from auth.dependencies import get_current_user
# from auth.models import User
# from chat.crud import ChatDAO

# router = APIRouter(prefix="/messages", tags=["messages"])


# # POST /messages — создать новое сообщение
# @router.post("", response_model=MessageRead)
# async def create_message(
#     message_data: MessageCreate,
#     db: AsyncSession = Depends(get_async_db),
#     current_user: User = Depends(get_current_user)
# ):
#     # Проверим, что чат принадлежит текущему пользователю
#     chat = await ChatDAO.get_chat_by_id(message_data.chat_id, db)
#     if not chat:
#         raise HTTPException(status_code=404, detail="Chat not found")
#     if chat.user_id != current_user.id:
#         raise HTTPException(status_code=403, detail="Access forbidden")

#     message = Message(**message_data.dict())
#     return await MessageDAO.create_message(message, db)


# # GET /messages?chat_id=... — получить все сообщения в чате
# @router.get("", response_model=list[MessageRead])
# async def get_messages(
#     chat_id: int = Query(...),
#     db: AsyncSession = Depends(get_async_db),
#     current_user: User = Depends(get_current_user)
# ):
#     chat = await ChatDAO.get_chat_by_id(chat_id, db)
#     if not chat:
#         raise HTTPException(status_code=404, detail="Chat not found")
#     if chat.user_id != current_user.id:
#         raise HTTPException(status_code=403, detail="Access forbidden")

#     return await MessageDAO.get_messages_by_chat(chat_id, db)


# # GET /messages/{message_id} — получить сообщение по ID
# @router.get("/{message_id}", response_model=MessageRead)
# async def get_message_by_id(
#     message_id: int,
#     db: AsyncSession = Depends(get_async_db),
#     current_user: User = Depends(get_current_user)
# ):
#     message = await MessageDAO.get_message_by_id(message_id, db)
#     if not message:
#         raise HTTPException(status_code=404, detail="Message not found")

#     chat = await ChatDAO.get_chat_by_id(message.chat_id, db)
#     if not chat or chat.user_id != current_user.id:
#         raise HTTPException(status_code=403, detail="Access forbidden")

#     return message
