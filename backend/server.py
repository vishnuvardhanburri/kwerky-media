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
import re
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

class LeadState(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = ""
    email: str = ""
    product: str = ""
    audience: str = ""
    problem: str = ""
    stage: str = "greet"
    email_sent: bool = False

class AssistantRequest(BaseModel):
    message: str
    history: List[AssistantMessage] = Field(default_factory=list)
    lead: LeadState = Field(default_factory=LeadState)

class AssistantResponse(BaseModel):
    reply: str
    lead: LeadState


def _has_any(text: str, keywords: List[str]) -> bool:
    return any(keyword in text for keyword in keywords)


def _normalize(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def _extract_name(message: str) -> str:
    text = message.strip()
    patterns = [
        r"(?:my name is|i am|i'm|i’m)\s+([A-Za-z][A-Za-z\s.'-]{1,50})",
        r"^([A-Z][A-Za-z\s.'-]{1,40})$",
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return _normalize(match.group(1)).split(" ")[0]
    return ""


def _extract_email(message: str) -> str:
    match = re.search(r"([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})", message)
    return match.group(1).strip().lower() if match else ""


def _update_lead_fields(lead: LeadState, message: str) -> LeadState:
    text = _normalize(message)
    updated = lead.model_copy(deep=True)

    if not updated.name:
        name = _extract_name(text)
        if name:
            updated.name = name

    if not updated.email:
        email = _extract_email(text)
        if email:
            updated.email = email

    if not updated.product and _has_any(text, ["product", "platform", "app", "tool", "saas", "website", "service", "brand"]):
        updated.product = text

    if not updated.audience and _has_any(text, ["audience", "customers", "users", "founders", "startup", "team", "tech companies"]):
        updated.audience = text

    if not updated.problem and _has_any(text, ["clarity", "content", "growth", "leads", "conversion", "engagement", "messaging", "traffic", "reach"]):
        updated.problem = text

    return updated


def _lead_reply_for_stage(lead: LeadState, message: str) -> str:
    text = _normalize(message).lower()

    if _has_any(text, ["price", "pricing", "cost", "budget", "rate", "quote", "fee"]):
        return "Pricing depends on your product, stage, and goals. Let’s discuss your project and suggest the right approach."

    if _has_any(text, ["yes", "sure", "okay", "ok", "sounds good", "let's do it", "lets do it", "book", "discuss", "call"]):
        if lead.email:
            return "Great. I’ve got the details. Let’s discuss your project."
        return "Great. Share your email and I’ll send this to the team."

    if not lead.name:
        return "Hi — what should I call you?"

    if not lead.product:
        return "What product are you building, and who is it for?"

    if not lead.problem:
        return "What are you struggling with most right now: clarity, content, or growth?"

    if not lead.email and _has_any(text, ["send", "email", "contact", "follow up"]):
        return "Share your email and I’ll pass this to the team."

    return "That helps. If you’re early-stage, getting messaging right now saves time later. Let’s discuss your project."


def _next_stage(lead: LeadState, message: str) -> LeadState:
    updated = _update_lead_fields(lead, message)
    text = _normalize(message).lower()

    if _has_any(text, ["price", "pricing", "cost", "budget", "rate", "quote", "fee"]):
        updated.stage = "objection"
        return updated

    if _has_any(text, ["yes", "sure", "okay", "ok", "sounds good", "let's do it", "lets do it", "book", "discuss", "call"]):
        updated.stage = "convert"
        return updated

    if not updated.name:
        updated.stage = "greet"
        return updated

    if not updated.product:
        updated.stage = "discover"
        return updated

    if not updated.problem:
        updated.stage = "qualify"
        return updated

    if updated.email and not updated.email_sent:
        updated.stage = "convert"
        return updated

    updated.stage = "pitch"
    return updated


def _send_resend_email(lead: LeadState) -> bool:
    api_key = os.environ.get("RESEND_API_KEY", "").strip()
    if not api_key:
        return False

    from_email = os.environ.get("RESEND_FROM_EMAIL", "Kwerky Media <onboarding@resend.dev>").strip()
    to_email = os.environ.get("LEAD_NOTIFICATION_EMAIL", "hello@kwerkymedia.com").strip()

    payload = {
        "from": from_email,
        "to": [to_email],
        "subject": f"Kwerky lead: {lead.name or 'New visitor'}",
        "text": (
            f"Name: {lead.name or '-'}\n"
            f"Email: {lead.email or '-'}\n"
            f"Product: {lead.product or '-'}\n"
            f"Audience: {lead.audience or '-'}\n"
            f"Problem: {lead.problem or '-'}\n"
            f"Stage: {lead.stage}\n"
        ),
        "reply_to": lead.email or to_email,
    }

    response = requests.post(
        "https://api.resend.com/emails",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=20,
    )
    response.raise_for_status()
    return True


def _chat_reply(message: str, lead: LeadState) -> tuple[str, LeadState]:
    next_lead = _next_stage(lead, message)
    text = _normalize(message).lower()

    if next_lead.stage == "convert" and next_lead.email and not next_lead.email_sent:
        try:
            if _send_resend_email(next_lead):
                next_lead.email_sent = True
        except Exception as exc:
            logger.warning("Resend handoff failed: %s", exc)

    if _has_any(text, ["hello", "hi", "hey"]):
        reply = "Hi — how can I help you with your content or growth today?"
    elif _has_any(text, ["what do you do", "who are you", "what is kwerky", "about you"]):
        reply = "We help tech companies turn complex products into clear, high-conversion messaging."
    elif _has_any(text, ["why you", "why kwerky", "choose you"]):
        reply = "Most agencies focus on content output. We focus on clarity and conversion. If your product is complex, we make it simple and compelling."
    elif _has_any(text, ["other agencies", "vs", "compare"]):
        reply = "Others optimize for volume. We optimize for understanding. Your audience should not just read — they should understand and act."
    elif _has_any(text, ["service", "services", "what can you do", "offer"]):
        reply = "We work on content creation, social media, video content, blogs, and website content. All focused on improving how your product is understood."
    elif _has_any(text, ["price", "pricing", "cost", "budget", "rate", "quote", "fee"]):
        reply = "Pricing depends on your product, stage, and goals. Let’s discuss your project and suggest the right approach."
    elif _has_any(text, ["startup", "early", "seed", "founder"]):
        reply = "If you're early-stage, getting your messaging right now saves time and cost later."
    elif _has_any(text, ["scale", "scaling", "growth", "conversion"]):
        reply = "If you're scaling, we refine your messaging to improve conversion and engagement."
    elif _has_any(text, ["contact", "email", "phone", "reach", "call"]):
        reply = "You can reach Kwerky Media at hello@kwerkymedia.com or 08031548088. Let’s discuss your project."
    else:
        reply = _lead_reply_for_stage(next_lead, message)

    if next_lead.stage == "objection":
        reply = "Pricing depends on your product, stage, and goals. Let’s discuss your project and suggest the right approach."

    if next_lead.stage == "convert":
        if next_lead.email:
            reply = "Perfect. I’ve got the details. Let’s discuss your project."
        else:
            reply = "Great. Share your email and I’ll pass this to the team."

    if next_lead.stage == "pitch" and reply == _lead_reply_for_stage(next_lead, message):
        reply = "That helps. We focus on clarity and conversion, not just more content. Let’s discuss your project."

    return reply, next_lead

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

    if any(word in text for word in ["hello", "hi", "hey"]):
        return "Hi — how can I help you with your content or growth today?"

    if any(word in text for word in ["bye", "goodbye", "see you"]):
        return "Bye for now. If you need anything later, I can take you to Services, About Us, Blogs, Videos, or Contact."

    if any(word in text for word in ["home", "hero", "value", "proof", "cta"]):
        return "The Home page has five sections: Hero, Value, Services, Proof, and CTA. I can take you there section by section."

    if any(word in text for word in ["contact", "email", "phone", "reach", "call"]):
        return "You can reach Kwerky Media at hello@kwerkymedia.com or 08031548088. Let’s discuss your project."

    if any(word in text for word in ["founder", "founders", "shashi", "mithun"]):
        return "Kwerky Media is led by Shashikanth Peetla and Mithun Mohan. Shashikanth focuses on tech storytelling and content, while Mithun leads client relationships and delivery."

    if any(word in text for word in ["service", "blog", "video", "social", "website"]):
        return "We work on content creation, social media, video content, blogs, and website content. All focused on improving how your product is understood."

    if any(word in text for word in ["about", "story", "company"]):
        return "Kwerky Media is a content and growth partner for tech companies. The About page explains the founders' story and the thinking behind the brand."

    return "I can help with services, founders, blogs, videos, contact details, or project discussion. Ask me anything about the site."


@api_router.post("/assistant", response_model=AssistantResponse)
async def assistant_chat(input: AssistantRequest):
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    model = os.environ.get("OPENAI_MODEL", "gpt-4.1-mini").strip()
    reply, next_lead = _chat_reply(input.message, input.lead)

    if api_key:
        system_prompt = (
            "You are Kwerky AI, the assistant for kwerkymedia.com. "
            "Use the site facts below. Keep every reply to 2-4 short lines. No fluff, no emojis, no prices. "
            "Current lead stage and details are included. Match the stage. "
            "Kwerky Media is a content and growth partner for tech companies. "
            "We help complex products become clear, engaging, and conversion-driven. "
            "If the user asks what we do, explain that we turn complex products into clear, high-conversion messaging. "
            "If the user asks why Kwerky, explain that we focus on clarity and conversion, not just content output. "
            "If the user asks about services, mention content creation, social media, video content, blogs, and website content. "
            "If the user asks about pricing, never give numbers; say pricing depends on product, stage, and goals, and invite discussion. "
            "Always move the conversation toward discovery, trust, and a project discussion."
        )
        messages = [{"role": "system", "content": system_prompt}]
        messages.append(
            {
                "role": "system",
                "content": (
                    f"Lead state: name={next_lead.name or 'unknown'}, email={next_lead.email or 'unknown'}, "
                    f"product={next_lead.product or 'unknown'}, audience={next_lead.audience or 'unknown'}, "
                    f"problem={next_lead.problem or 'unknown'}, stage={next_lead.stage}."
                ),
            }
        )
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
            ai_reply = data["choices"][0]["message"]["content"].strip()
            if ai_reply:
                reply = ai_reply
        except Exception as exc:
            logger.warning("Assistant API fallback used: %s", exc)

    return AssistantResponse(reply=reply, lead=next_lead)


@api_router.post("/chat", response_model=AssistantResponse)
async def chat_assistant(input: AssistantRequest):
    return await assistant_chat(input)

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
