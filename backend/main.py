import os
import uuid
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from google.adk.apps import App
from google.adk.runners import InMemoryRunner
from google.genai import types

from agents.general_assistant.agent import root_agent


# Carrega as variáveis do .env na raiz do projeto
ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")

if not os.getenv("GOOGLE_API_KEY"):
    raise RuntimeError("GOOGLE_API_KEY não encontrada no arquivo .env")


# Configuração do ADK
adk_app = App(
    name="ai_agent_hub",
    root_agent=root_agent,
)

runner = InMemoryRunner(app=adk_app)

# API FastAPI
app = FastAPI(
    title="AI Agent Hub API",
    description="API para executar agentes de IA.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


@app.get("/")
async def home():
    return {"message": "AI Agent Hub API está funcionando!"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="A mensagem não pode estar vazia.",
        )

    user_id = "hub_user"
    session_id = request.session_id or str(uuid.uuid4())

    try:
        session = await runner.session_service.get_session(
            app_name=adk_app.name,
            user_id=user_id,
            session_id=session_id,
        )

        if session is None:
            session = await runner.session_service.create_session(
                app_name=adk_app.name,
                user_id=user_id,
                session_id=session_id,
            )

        message = types.Content(
            role="user",
            parts=[types.Part.from_text(text=request.message)],
        )

        response_text = ""

        async for event in runner.run_async(
            user_id=user_id,
            session_id=session.id,
            new_message=message,
        ):
            if event.is_final_response() and event.content:
                response_text = "".join(
                    part.text
                    for part in event.content.parts or []
                    if part.text
                )

        return ChatResponse(
            response=response_text or "O agente não retornou uma resposta.",
            session_id=session.id,
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao executar o agente: {str(error)}",
        )