# ⚡ Quick Start - Deploy in 15 Minutes

## What You're Deploying
- **Frontend** → GoDaddy (your website)
- **Backend** → Railway (handles contact form emails)

---

## 🚀 Step-by-Step (Copy & Paste)

### 1️⃣ Deploy Backend to Railway (5 min)

**A. Create Account**
- Go to https://railway.app/
- Click "Start a New Project"
- Sign up with GitHub

**B. Add MongoDB**
- Click "New Project"
- Add Service → Database → MongoDB
- Copy the `MONGO_URL` (save it!)

**C. Deploy Backend**
Choose the easiest method for you:

**OPTION 1: Using Railway Website (Easiest)**
1. Download your backend folder to your computer
2. In Railway: "New Project" → "Deploy from Repo" 
3. Upload your backend code
4. Railway will auto-deploy

**OPTION 2: From GitHub**
1. Push code to GitHub first
2. Railway → "Deploy from GitHub repo"
3. Select your repository

**D. Add Environment Variables**
In Railway → Your Service → Variables tab, add:

```
MONGO_URL = [your MongoDB URL from step B]
DB_NAME = access_group_db
CORS_ORIGINS = *
RESEND_API_KEY = re_RduLSsXa_6bcT5Smq6Sbwiohjr8W8GRZP
FROM_EMAIL = onboarding@resend.dev
RECIPIENT_EMAIL = zack@grpaccess.com
```

**E. Get Your Backend URL**
- Settings → Generate Domain
- Copy URL (example: `https://yourapp.railway.app`)
- **SAVE THIS URL!**

**F. Test Backend**
- Visit: `https://yourapp.railway.app/api/`
- Should see: `{"message":"Hello World"}`
- ✅ If yes, backend is working!

---

### 2️⃣ Update & Build Frontend (2 min)

**A. Update Backend URL**

Edit: `/app/frontend/.env`
```
REACT_APP_BACKEND_URL=https://yourapp.railway.app
```
(Replace with YOUR Railway URL)

**B. Rebuild Frontend**
```bash
cd /app/frontend
yarn build
```

**C. Download Build Files**
- All files are in `/app/frontend/build/`
- Download this entire folder to your computer

---

### 3️⃣ Upload to GoDaddy (5 min)

**A. Login to GoDaddy**
- My Products → Your Hosting → Manage
- Open cPanel or File Manager

**B. Upload Files**
- Go to File Manager → `public_html/`
- Delete existing files (if any)
- Upload ALL files from your `build` folder
- Make sure `index.html` is in the root

**File Structure Should Look Like:**
```
public_html/
├── index.html
├── manifest.json
├── access-group-logo.png
├── access-signs-logo.png
├── suntek-awnings-logo.png
├── access-group-logo-white.png
└── static/
    ├── css/
    ├── js/
    └── media/
```

---

### 4️⃣ Test Everything (3 min)

**A. Visit Your Site**
- Go to https://grpaccess.com
- Check logos, navigation

**B. Test Contact Form**
- Fill out form
- Click Send
- Should see success message ✅
- Check zack@grpaccess.com for email

---

## ✅ Done! Your Site is Live!

**Frontend**: grpaccess.com (GoDaddy)
**Backend**: Railway (free hosting)
**Cost**: $0/month

---

## 🆘 Quick Fixes

**Form not working?**
- Check Railway URL is correct in `.env`
- Visit Railway URL + `/api/` to test backend
- Check browser console (F12) for errors

**Site not loading?**
- Make sure `index.html` is in `public_html/` root
- Wait for DNS (can take a few hours for new domains)
- Clear browser cache

**Logos missing?**
- Re-upload logo PNG files
- Check they're in same folder as index.html

---

## 📋 URLs You Need

**Railway Dashboard**: https://railway.app/dashboard
**Your Backend**: https://[yourapp].railway.app
**Your Website**: https://grpaccess.com
**Resend Dashboard**: https://resend.com/emails

---

**Need detailed instructions? See `GODADDY_RAILWAY_DEPLOYMENT.md`**
