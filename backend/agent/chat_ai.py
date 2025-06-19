from datetime import datetime
from fastapi import HTTPException
from message.crud import MessageDAO
from chat.crud import ChatDAO
from message.model import SenderEnum, Message
from agent.prompts import build_client_prompt
from agent.schemas import SimulatorConfig, Persona, Scenario, Voice
from config import settings

import google.generativeai as genai

# Правильная конфигурация с API-ключом
genai.configure(api_key=settings.GOOGLE_API_KEY)
model = genai.GenerativeModel("models/gemini-1.5-pro-latest")


# Создание диалога с историей и генерацией
async def respond_as_client(chat_id: int, db) -> str:
    chat = await ChatDAO.get_chat_by_id(chat_id, db)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    messages = await MessageDAO.get_messages_by_chat(chat_id, db)

    # Построение prompt-конфига с преобразованием строк в Enum
    try:
        config = SimulatorConfig(
            offering="Услуга, выбранная пользователем",
            background="Контекст или ситуация",
            voice=Voice.male,  # или Voice(chat.voice) если есть поле voice
            persona=Persona(chat.character),
            scenario=Scenario(chat.scenario)
        )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=f"Invalid enum value: {e}")

    # Составляем историю
    history = [{"role": "user", "parts": [build_client_prompt(config)]}]

    for m in messages:
        role = "user" if m.sender == SenderEnum.user else "model"
        history.append({"role": role, "parts": [m.content]})

    # Запускаем сессию и получаем ответ
    chat_session = model.start_chat(history=history)
    response = chat_session.send_message("...")

    # Сохраняем ответ клиента
    ai_reply = Message(
        chat_id=chat_id,
        sender=SenderEnum.client,
        content=response.text.strip(),
        created_at=datetime.utcnow()
    )
    db.add(ai_reply)
    await db.commit()
    await db.refresh(ai_reply)

    return ai_reply.content
