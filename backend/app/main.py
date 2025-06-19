from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from auth.api import router as auth_router
from chat.routers import router as chat_router
from database import get_async_db
from agent.routers import router as simulator_router

app = FastAPI(
    title="Sales API",
    description="API for Sales application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(simulator_router)


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/health")
async def check_health(db: AsyncSession = Depends(get_async_db)):
    try:
        result = await db.execute(text("SELECT 1"))
        result.fetchone()
        return {
            "status": "ok",
            "database": "connected",
            "details": "Database connection successful"
        }
    except Exception as e:
        print("❌ DB error:", e)
        raise HTTPException(
            status_code=500,
            detail=f"Database connection failed: {str(e)}"
        )
