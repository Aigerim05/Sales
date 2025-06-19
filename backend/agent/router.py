from fastapi import APIRouter
from pydantic import BaseModel
from .schemas import SimulatorConfig
from .service import start_chat_session, send_user_message

router = APIRouter(prefix="/simulator", tags=["Simulator"])

# Старт сессии
@router.post("/start")
def start_simulation(session_id: str, config: SimulatorConfig):
    return {"status": start_chat_session(session_id, config)}

# Отправить сообщение
class UserMessage(BaseModel):
    session_id: str
    message: str

@router.post("/message")
def continue_simulation(data: UserMessage):
    reply = send_user_message(data.session_id, data.message)
    return {"reply": reply}
