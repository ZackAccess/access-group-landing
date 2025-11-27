# 🚀 GoDaddy + Railway Deployment Guide

## Complete Step-by-Step Instructions

This guide will help you deploy your Access Group landing page with a fully functional contact form:
- **Frontend**: GoDaddy Hosting (your static files)
- **Backend**: Railway.app (free, handles emails)

---

## Part 1: Deploy Backend to Railway (10 minutes)

### Step 1: Create Railway Account
1. Go to https://railway.app/
2. Click "Start a New Project"
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

### Step 2: Create MongoDB Database
1. In Railway dashboard, click "New Project"
2. Click "Add Service" → "Database" → "Add MongoDB"
3. Wait for it to deploy (30 seconds)
4. Click on MongoDB service → "Variables" tab
5. **COPY** the `MONGO_URL` value (looks like: mongodb://mongo:...)
6. Save it somewhere - you'll need it soon!

### Step 3: Deploy Backend to Railway

**Option A: Deploy from GitHub (Recommended)**
1. Push your code to GitHub:
   ```bash
   cd /app
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. In Railway dashboard:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect and deploy

**Option B: Deploy with Railway CLI**
1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login and deploy:
   ```bash
   cd /app
   railway login
   railway init
   railway up
   ```

### Step 4: Configure Environment Variables in Railway

1. Click on your deployed service
2. Go to "Variables" tab
3. Add these variables:

```
MONGO_URL = [paste the MongoDB URL from Step 2]
DB_NAME = access_group_db
CORS_ORIGINS = *
RESEND_API_KEY = re_RduLSsXa_6bcT5Smq6Sbwiohjr8W8GRZP
FROM_EMAIL = onboarding@resend.dev
RECIPIENT_EMAIL = zack@grpaccess.com
PORT = 8001
```

4. Click "Deploy" or wait for auto-deploy

### Step 5: Get Your Backend URL

1. In Railway, click on your service
2. Go to "Settings" tab
3. Click "Generate Domain" under "Networking"
4. **COPY** the generated URL (e.g., `https://your-app.railway.app`)
5. **IMPORTANT**: Save this URL - you need it for Part 2!

### Step 6: Test Your Backend

1. Visit: `https://your-app.railway.app/api/`
2. You should see: `{"message":"Hello World"}`
3. If you see this, backend is working! ✅

---

## Part 2: Update Frontend with Railway URL

### Step 1: Update Frontend Environment Variable

1. Edit `/app/frontend/.env`
2. Replace the content with:
```
REACT_APP_BACKEND_URL=https://your-app.railway.app
```
(Replace `your-app.railway.app` with YOUR actual Railway URL)

### Step 2: Rebuild Frontend

```bash
cd /app/frontend
yarn build
```

### Step 3: Verify Build Files

The production files are now in `/app/frontend/build/` directory:
- index.html
- static/ folder
- All logo images
- manifest.json

---

## Part 3: Deploy Frontend to GoDaddy (5 minutes)

### Step 1: Download Build Files

You need to download the `/app/frontend/build/` folder to your local computer.

If you're working remotely, you can create a zip file:
```bash
cd /app/frontend
zip -r build.zip build/
```

Then download `build.zip` to your computer and extract it.

### Step 2: Upload to GoDaddy

**Method 1: GoDaddy File Manager (Easy)**
1. Log in to GoDaddy
2. Go to "My Products" → Find your hosting → Click "Manage"
3. Click "cPanel" (or "Plesk" depending on your plan)
4. Open "File Manager"
5. Navigate to `public_html/` (for main domain) or create a subfolder
6. Delete any existing files in that directory (index.html, etc.)
7. Click "Upload" and upload ALL files from the `build` folder
8. Make sure the structure looks like:
   ```
   public_html/
   ├── index.html
   ├── manifest.json
   ├── access-group-logo.png
   ├── access-group-logo-white.png
   ├── access-signs-logo.png
   ├── suntek-awnings-logo.png
   └── static/
       ├── css/
       ├── js/
       └── media/
   ```

**Method 2: FTP (Recommended for Large Files)**
1. Download FileZilla: https://filezilla-project.org/
2. Get your FTP credentials:
   - In GoDaddy, go to Hosting → Manage
   - Find "FTP" section or create FTP account
   - Note: Host, Username, Password
3. Connect FileZilla to GoDaddy:
   - Host: ftp.yourdomain.com (or IP provided by GoDaddy)
   - Username: your FTP username
   - Password: your FTP password
   - Port: 21
4. Navigate to `public_html/` on the remote side
5. Drag and drop ALL files from your local `build` folder

### Step 3: Configure Domain (if needed)

If deploying to grpaccess.com:
1. Make sure your domain points to your GoDaddy hosting
2. In GoDaddy DNS settings, ensure:
   - A record points to your hosting IP
   - Wait for DNS propagation (can take up to 48 hours)

---

## Part 4: Test Everything! 🎉

### Test 1: Visit Your Site
1. Go to https://grpaccess.com (or your domain)
2. You should see the Access Group landing page
3. Check that logos are loading
4. Navigation should work

### Test 2: Test Contact Form
1. Scroll to the contact section
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 450-674-3333
   - Message: Testing contact form
3. Click "Send Message"
4. You should see success message ✅
5. Check zack@grpaccess.com for the email

### Test 3: Check Mobile
1. Open site on phone or use browser dev tools
2. Verify responsive design works
3. Test contact form on mobile

---

## 🎯 Quick Checklist

**Railway Setup:**
- [ ] Railway account created
- [ ] MongoDB database deployed
- [ ] Backend deployed to Railway
- [ ] Environment variables configured
- [ ] Backend URL obtained and tested

**Frontend Setup:**
- [ ] Frontend `.env` updated with Railway URL
- [ ] Frontend rebuilt with `yarn build`
- [ ] Build files ready

**GoDaddy Upload:**
- [ ] All files uploaded to `public_html/`
- [ ] Domain pointing to GoDaddy hosting
- [ ] Site accessible at grpaccess.com

**Testing:**
- [ ] Site loads correctly
- [ ] Logos display properly
- [ ] Navigation works
- [ ] Contact form submits successfully
- [ ] Email received at zack@grpaccess.com

---

## 💡 Important Notes

### Railway Free Tier:
- **500 hours/month** of usage (plenty for your needs)
- **Automatic sleep** after inactivity (wakes up in ~30 seconds on first visit)
- **Free forever** for most small projects
- Can upgrade if needed later

### GoDaddy Hosting:
- **Supports static sites** perfectly
- SSL/HTTPS should be enabled by default
- If not, enable free SSL in cPanel

### Email Service:
- Using **Resend** free tier
- 100 emails/day, 3,000/month
- More than enough for contact forms

---

## 🆘 Troubleshooting

### Issue: Contact form not working
**Solution:**
1. Check browser console for errors (F12 → Console)
2. Verify Railway backend URL is correct in frontend `.env`
3. Make sure backend is running: visit `https://your-app.railway.app/api/`
4. Check CORS is set to `*` in Railway variables

### Issue: Site not loading on GoDaddy
**Solution:**
1. Verify `index.html` is in the root of `public_html/`
2. Check file permissions (should be 644 for files, 755 for folders)
3. Clear browser cache and try again
4. Wait for DNS propagation if using new domain

### Issue: Logos not showing
**Solution:**
1. Make sure logo files are in the root alongside index.html
2. Check file names match exactly (case-sensitive)
3. Re-upload logo files if needed

### Issue: Railway says "Application Failed"
**Solution:**
1. Check Railway logs for error messages
2. Verify all environment variables are set correctly
3. Make sure MONGO_URL is from your Railway MongoDB
4. Try redeploying

---

## 📞 Support

**Railway Documentation:**
- https://docs.railway.app/

**GoDaddy Support:**
- https://www.godaddy.com/help

**Resend (Email Service):**
- https://resend.com/docs

---

## 🎉 You're Done!

Once everything is deployed and tested:

✅ Your landing page is live at grpaccess.com
✅ Contact form sends emails to zack@grpaccess.com
✅ Both services are on free tiers
✅ Professional, modern design
✅ Fully responsive and optimized

**Total Cost: $0/month** (free tier hosting for both!)

---

## 📝 What to Do Next

1. Monitor Railway dashboard for backend health
2. Check Resend dashboard for email delivery stats
3. Keep your Railway backend URL private
4. Back up your code to GitHub
5. Test contact form regularly

**Need help with any step? Just ask!**
