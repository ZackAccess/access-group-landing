# Access Group Landing Page - Contracts Document

## Current Implementation Status

### Frontend (Completed)
- Landing page with hero section, divisions showcase, about section, contact form, and footer
- Responsive design with smooth scrolling navigation
- Contact form with client-side validation
- Toast notifications using Sonner
- Placeholder logo areas ready for actual logos

### Mock Data
Location: `/app/frontend/src/pages/HomePage.jsx`
- Contact form submission is currently **MOCKED** (lines 21-28)
- Form shows success toast but doesn't save data
- Division data is hardcoded in the component (lines 30-46)

## Backend Implementation Plan

### API Endpoints Needed

#### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "message": "string (required)"
}
```

**Response:**
```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "submitted_at": "datetime",
  "status": "new"
}
```

**Validation:**
- Name: required, 2-100 characters
- Email: required, valid email format
- Phone: optional, valid phone format if provided
- Message: required, 10-1000 characters

### Database Schema

#### Collection: `contact_submissions`
```json
{
  "_id": "ObjectId",
  "id": "string (UUID)",
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "submitted_at": "datetime",
  "status": "string (new/contacted/resolved)"
}
```

### Frontend Integration

**File to Update:** `/app/frontend/src/pages/HomePage.jsx`

**Changes Required:**
1. Replace mock submission (lines 21-28) with actual API call to `${API}/contact`
2. Add error handling for failed submissions
3. Update success/error toast messages based on API response

**API Call Example:**
```javascript
const response = await axios.post(`${API}/contact`, formData);
if (response.data) {
  toast.success('Thank you! We\'ll get back to you soon.');
  setFormData({ name: '', email: '', phone: '', message: '' });
}
```

## Logo Integration (Future)

When actual logos are provided:
1. Place logo files in `/app/frontend/public/` directory
2. Update HomePage.jsx division objects with correct logo paths
3. Replace placeholder text with `<img>` tags

## Deployment Notes

This is a static site that can be deployed to GoDaddy hosting:
- Frontend build output will be in `/app/frontend/build/`
- Backend API can be deployed separately or integrated with hosting provider's backend services
- Environment variables need to be configured for production

## Testing Checklist

### Frontend Testing
- [x] Hero section displays correctly
- [x] Navigation links work (smooth scroll)
- [x] Division cards display with proper styling
- [x] Contact form validation works
- [x] Toast notifications appear
- [ ] Backend API integration

### Backend Testing (To Do)
- [ ] POST /api/contact accepts valid data
- [ ] Validation errors return proper messages
- [ ] Data is saved to MongoDB correctly
- [ ] Optional phone field handled properly
