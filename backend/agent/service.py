import os
import google.generativeai as genai
from .schemas import SimulatorConfig
from .prompts import build_client_prompt

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

# Хранилище сессий (упрощённо — в памяти)
chat_sessions = {}

def start_chat_session(session_id: str, config: SimulatorConfig):
    system_prompt = build_client_prompt(config)
    chat = model.start_chat(history=[{"role": "system", "parts": [system_prompt]}])
    chat_sessions[session_id] = chat
    return "Чат с виртуальным клиентом начат."

def send_user_message(session_id: str, message: str):
    chat = chat_sessions.get(session_id)
    if not chat:
        return "Сессия не найдена. Сначала вызови /start."

    response = chat.send_message(message)
    return response.text.strip()
