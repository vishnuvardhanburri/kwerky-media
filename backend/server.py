from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str = ""
    message: str
    service_interest: str = ""
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    name: str
    email: str
    company: str = ""
    message: str
    service_interest: str = ""

class AssistantMessage(BaseModel):
    role: str
    content: str

class AssistantRequest(BaseModel):
    message: str
    history: List[AssistantMessage] = Field(default_factory=list)

class AssistantResponse(BaseModel):
    reply: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactForm)
async def submit_contact_form(input: ContactFormCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactForm(**contact_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contact_forms.insert_one(doc)
    return contact_obj

def build_local_assistant_reply(message: str) -> str:
    text = message.lower()

    if any(word in text for word in ["contact", "email", "phone", "reach", "call"]):
        return "You can reach Kwerky Media at hello@kwerkymedia.com or 08031548088. For a project discussion, use the Services page contact form."

    if any(word in text for word in ["founder", "founders", "shashi", "mithun"]):
        return "Kwerky Media is led by Shashikanth Peetla and Mithun Mohan. Shashikanth focuses on tech storytelling and content, while Mithun leads client relationships and delivery."

    if any(word in text for word in ["service", "blog", "video", "social", "website"]):
        return "Kwerky Media creates website content, blogs, social media posts, slide decks, and videos for tech companies. The Home and Services pages show the current offerings."

    if any(word in text for word in ["about", "story", "company"]):
        return "Kwerky Media is a content and growth partner for tech companies. The About page explains the founders' story and the thinking behind the brand."

    return "I can help with Kwerky Media’s services, founders, blogs, videos, contact details, or project discussion. Ask me anything about the site."


@api_router.post("/assistant", response_model=AssistantResponse)
async def assistant_chat(input: AssistantRequest):
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    model = os.environ.get("OPENAI_MODEL", "gpt-4.1-mini").strip()

    if api_key:
        system_prompt = (
            "You are Kwerky AI, the assistant for kwerkymedia.com. "
            "Answer concisely and helpfully using only the site content and contact details below. "
            "If asked about contact, use hello@kwerkymedia.com and 08031548088. "
            "The founders are Shashikanth Peetla and Mithun Mohan. "
            "Services include website content, blogs, social media posts, slide decks, and videos. "
            "Keep replies short, clear, and friendly."
        )
        messages = [{"role": "system", "content": system_prompt}]
        for item in input.history[-6:]:
            messages.append({"role": item.role, "content": item.content})
        messages.append({"role": "user", "content": input.message})

        try:
            response = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": model,
                    "messages": messages,
                    "temperature": 0.4,
                    "max_tokens": 220,
                },
                timeout=25,
            )
            response.raise_for_status()
            data = response.json()
            reply = data["choices"][0]["message"]["content"].strip()
            return AssistantResponse(reply=reply)
        except Exception as exc:
            logger.warning("Assistant API fallback used: %s", exc)

    return AssistantResponse(reply=build_local_assistant_reply(input.message))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
