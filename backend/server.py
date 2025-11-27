from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


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

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

# Email sending function
def send_contact_email(contact_data: dict):
    """Send contact form submission via email using SendGrid"""
    try:
        # Get SendGrid API key and recipient email from environment variables
        sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
        from_email = os.environ.get('FROM_EMAIL', 'noreply@grpaccess.com')
        recipient_email = os.environ.get('RECIPIENT_EMAIL', 'zack@grpaccess.com')
        
        if not sendgrid_api_key:
            logger.warning("SendGrid API key not configured. Email not sent.")
            return False
        
        # HTML email body
        html_content = f"""
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #ff5722;">New Contact Form Submission</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold; width: 120px;">Name:</td>
        <td style="padding: 10px;">{contact_data['name']}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold;">Email:</td>
        <td style="padding: 10px;"><a href="mailto:{contact_data['email']}">{contact_data['email']}</a></td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold;">Phone:</td>
        <td style="padding: 10px;">{contact_data.get('phone', 'Not provided')}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold; vertical-align: top;">Message:</td>
        <td style="padding: 10px;">{contact_data['message']}</td>
      </tr>
    </table>
    <p style="margin-top: 20px; color: #666; font-size: 12px;">
      Submitted at: {contact_data['submitted_at']}
    </p>
  </body>
</html>
"""
        
        # Create SendGrid message
        message = Mail(
            from_email=from_email,
            to_emails=recipient_email,
            subject=f"New Contact Form Submission from {contact_data['name']}",
            html_content=html_content
        )
        
        # Send email via SendGrid
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        
        logger.info(f"Contact form email sent successfully to {recipient_email}. Status: {response.status_code}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send contact email: {str(e)}")
        return False

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

@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(input: ContactSubmissionCreate):
    """Handle contact form submission - save to database and send email"""
    try:
        # Create contact submission object
        contact_dict = input.dict()
        contact_obj = ContactSubmission(**contact_dict)
        
        # Save to database
        await db.contact_submissions.insert_one(contact_obj.dict())
        logger.info(f"Contact submission saved: {contact_obj.id}")
        
        # Send email notification
        email_sent = send_contact_email(contact_obj.dict())
        if not email_sent:
            logger.warning(f"Email notification failed for submission {contact_obj.id}")
        
        return contact_obj
        
    except Exception as e:
        logger.error(f"Error processing contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process contact submission")

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Retrieve all contact form submissions"""
    submissions = await db.contact_submissions.find().to_list(1000)
    return [ContactSubmission(**submission) for submission in submissions]

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