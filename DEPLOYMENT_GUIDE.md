# Access Group Landing Page - GoDaddy Deployment Guide

## 🎉 Your Landing Page is Complete!

The Access Group landing page has been built with:
- ✅ Modern, professional design
- ✅ Access Group, Access Signs, and Suntek Awnings logos
- ✅ Working contact form with email notifications to zack@grpaccess.com
- ✅ Responsive design for all devices
- ✅ Smooth navigation and animations

---

## 📧 Email Configuration (Already Set Up!)

Your contact form uses **Resend** to send emails:
- **API Key**: Configured in `/app/backend/.env`
- **Recipient**: zack@grpaccess.com
- **Status**: ✅ TESTED AND WORKING
- **Free Tier**: 100 emails/day, 3,000/month

---

## 🚀 Deploying to GoDaddy Hosting

Since this is a full-stack application (React frontend + FastAPI backend), you have **two deployment options**:

### **Option 1: Static Site Only (Recommended for GoDaddy)**

Deploy just the frontend as a static site. The contact form won't work without the backend, so you'll need to:

1. **Build the frontend:**
```bash
cd /app/frontend
yarn build
```

2. **Upload to GoDaddy:**
   - The build files will be in `/app/frontend/build/`
   - Use GoDaddy's File Manager or FTP to upload all files from the `build` folder
   - Upload to your public_html directory (or subdomain folder)

3. **Configure domain:**
   - Point grpaccess.com to your GoDaddy hosting
   - Files should be in: `public_html/` (root domain) or `public_html/grpaccess/` (subdomain)

**Note:** This option won't have a working contact form unless you deploy the backend separately.

---

### **Option 2: Full-Stack Deployment (Requires VPS/Cloud Hosting)**

For the contact form to work, you need to deploy both frontend AND backend. GoDaddy shared hosting doesn't support Python backends, so you'd need:

**Alternative Hosting Options:**
1. **DigitalOcean App Platform** (Easy, $5/month)
2. **Heroku** (Easy, Free tier available)
3. **AWS Lightsail** ($5/month)
4. **GoDaddy VPS** (More expensive)

Would you like instructions for any of these platforms?

---

## 📝 What You Need for GoDaddy Deployment

### Files to Upload (Static Site):
All files from `/app/frontend/build/` including:
- `index.html`
- `static/` folder (CSS, JS, images)
- Logo files
- `manifest.json`
- `favicon.ico`

### How to Upload:

**Method 1: GoDaddy File Manager**
1. Log in to GoDaddy
2. Go to Web Hosting → Manage → File Manager
3. Navigate to `public_html/`
4. Upload all files from `/app/frontend/build/`
5. Make sure `index.html` is in the root

**Method 2: FTP (Recommended)**
1. Download FileZilla: https://filezilla-project.org/
2. Get FTP credentials from GoDaddy (Hosting → Manage → FTP)
3. Connect to your site
4. Upload all files from `/app/frontend/build/` to `public_html/`

---

## ⚠️ Important Notes

### For Static Site on GoDaddy:
- ✅ Landing page design will work perfectly
- ✅ Division links will work
- ✅ Navigation will work
- ❌ Contact form will NOT send emails (backend needed)

**Workaround Options:**
1. **Replace with mailto: link** - Opens user's email client
2. **Use Google Forms** - Embed a Google Form
3. **Use Formspree** - Third-party form service
4. **Keep full-stack** - Deploy backend to cloud platform

---

## 🔧 Next Steps

**For Static Deployment (No Contact Form):**
1. Build the frontend: `cd /app/frontend && yarn build`
2. Download the `build/` folder
3. Upload to GoDaddy via FTP or File Manager
4. Test at grpaccess.com

**For Full-Stack Deployment (With Contact Form):**
1. Choose a cloud platform (DigitalOcean, Heroku, AWS)
2. Deploy backend and frontend
3. Update environment variables
4. Test the contact form

---

## 📞 Contact Form Status

✅ **Currently Working** (in development environment)
- Form saves submissions to MongoDB database
- Emails sent via Resend to zack@grpaccess.com
- Professional HTML email template
- All submissions logged

**To keep it working after deployment:**
- Backend must be hosted on a platform that supports Python/FastAPI
- Environment variables must be configured on the hosting platform
- MongoDB must be accessible (use MongoDB Atlas for cloud hosting)

---

## 🎨 Design Files

All logos are in `/app/frontend/public/`:
- `access-group-logo.png` - Main Access Group logo (header)
- `access-group-logo-white.png` - White/orange logo (footer)
- `access-signs-logo.png` - Access Signs division logo
- `suntek-awnings-logo.png` - Suntek Awnings division logo

---

## 💡 Recommendations

**Best Solution for You:**

Given that you want the contact form to work and send emails to zack@grpaccess.com, I recommend:

**Option A: Deploy Full-Stack to DigitalOcean App Platform**
- Cost: ~$10/month
- Setup time: 30 minutes
- Includes: Hosting, SSL, automatic deployments
- Contact form works perfectly

**Option B: Use GoDaddy + Contact Form Alternative**
- Deploy static site to GoDaddy
- Replace contact form with:
  - Mailto link: `<a href="mailto:zack@grpaccess.com">Contact Us</a>`
  - Or embed Google Forms
  - Or use Formspree (free tier: 50 submissions/month)

---

## 🆘 Need Help?

If you need assistance with:
- Building the frontend
- Deploying to a specific platform
- Modifying the contact form
- Setting up domain DNS
- Any other questions

Just let me know what you'd like to do next!

---

## 📋 Quick Checklist

- [x] Landing page designed and built
- [x] Logos integrated
- [x] Contact form working with email
- [x] Tested successfully
- [ ] Build frontend for production
- [ ] Choose deployment method
- [ ] Upload to hosting
- [ ] Configure domain DNS
- [ ] Test live site

---

**Your landing page is ready! Choose your deployment path and let's get it live! 🚀**
