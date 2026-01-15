# 🚀 SmartEnergy - Complete Deployment Guide

## 📋 Table of Contents
1. [Quick Deploy (Recommended)](#quick-deploy-vercel)
2. [Netlify Deployment](#netlify-deployment)
3. [GitHub Pages](#github-pages)
4. [Environment Variables Setup](#environment-variables)
5. [Pre-Deployment Checklist](#pre-deployment-checklist)
6. [Post-Deployment Testing](#post-deployment-testing)

---

## ⚡ Quick Deploy (Vercel) - RECOMMENDED

**Vercel is the easiest and fastest option for React + Vite apps!**

### Method 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy (from project root):**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Press Enter for default settings
   - Your app will be live in ~2 minutes!

4. **For Production:**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard (No Code)

1. **Go to:** https://vercel.com
2. **Click "Add New Project"**
3. **Import your Git repository** (GitHub/GitLab/Bitbucket)
4. **Configure:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
5. **Add Environment Variables** (see section below)
6. **Click "Deploy"** - Done! ✅

**Your app will be live at:** `https://your-project-name.vercel.app`

---

## 🌐 Netlify Deployment

### Method 1: Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Initialize:**
   ```bash
   netlify init
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Method 2: Netlify Dashboard

1. **Go to:** https://app.netlify.com
2. **Click "Add new site" → "Import an existing project"**
3. **Connect to Git provider**
4. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Add Environment Variables**
6. **Click "Deploy site"**

**Your app will be live at:** `https://your-site-name.netlify.app`

---

## 📦 GitHub Pages

### Setup Steps:

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/YOUR_REPO_NAME/',
     // ... rest of config
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Source: **gh-pages** branch
   - Click Save

**Your app will be live at:** `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## 🔐 Environment Variables

### Required Variables:

Create a `.env` file (local) and add these to your deployment platform:

```env
# Google Gemini AI (for AI Chat feature)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Backend API (if you deploy the Python backend)
VITE_API_URL=https://your-backend-url.com
```

### How to Get Gemini API Key:

1. **Go to:** https://makersuite.google.com/app/apikey
2. **Click "Create API Key"**
3. **Copy the key**
4. **Add to your deployment platform:**

   **Vercel:**
   - Project Settings → Environment Variables
   - Add: `VITE_GEMINI_API_KEY` = `your_key`

   **Netlify:**
   - Site Settings → Environment Variables
   - Add: `VITE_GEMINI_API_KEY` = `your_key`

### Adding Environment Variables:

**Vercel:**
```bash
vercel env add VITE_GEMINI_API_KEY
```

**Netlify:**
- Dashboard → Site Settings → Environment Variables → Add Variable

---

## ✅ Pre-Deployment Checklist

### 1. Test Build Locally:
```bash
npm run build
```
- ✅ Should complete without errors
- ✅ Check `dist/` folder is created

### 2. Test Production Build:
```bash
npx vite preview
```
- ✅ Open http://localhost:4173
- ✅ Test all pages work
- ✅ Test dark/light mode toggle
- ✅ Test AI Chat (requires Gemini API key)

### 3. Check Files:
- ✅ All routes working (/, /dashboard, /prediction, etc.)
- ✅ Images loading correctly
- ✅ Authentication working
- ✅ Charts rendering properly

### 4. Code Quality:
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Optional: Run linter
npx eslint src/
```

---

## 🧪 Post-Deployment Testing

### Test These Features:

1. **✅ Navigation**
   - Home page loads
   - All menu items work
   - Mobile menu works

2. **✅ Authentication**
   - Sign In modal opens
   - Login works (demo@smartenergy.com / demo123)
   - Protected routes require login
   - Logout works

3. **✅ Pages**
   - Dashboard: Charts load, real-time updates work
   - Prediction: Form submission, charts render
   - AI Chat: Messages send (requires Gemini API key)
   - Analysis: All visualizations display
   - Scenarios: What-if calculations work
   - Review: Review submission works

4. **✅ Features**
   - Theme toggle (light/dark mode)
   - File upload (CSV, TXT)
   - Data export (PDF, CSV)
   - Responsive design (mobile, tablet, desktop)

5. **✅ Performance**
   - Page load speed
   - Chart rendering speed
   - Smooth animations
   - No console errors

---

## 🔧 Common Deployment Issues & Fixes

### Issue 1: 404 on Page Refresh

**Problem:** Refreshing `/dashboard` gives 404 error

**Fix for Vercel:** (Already included in vercel.json)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Fix for Netlify:** (Already included in netlify.toml)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue 2: Environment Variables Not Working

**Problem:** AI Chat not working, Gemini errors

**Fix:**
- Ensure variable starts with `VITE_`
- Rebuild after adding variables
- Check variable is set in deployment platform
- Verify API key is valid

### Issue 3: Build Fails

**Common Causes:**
- TypeScript errors → Fix type issues
- Missing dependencies → Run `npm install`
- Node version mismatch → Use Node 18+

**Fix:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue 4: Charts Not Rendering

**Problem:** Recharts charts blank or broken

**Fix:**
- Check if data is loading
- Verify ResponsiveContainer has height
- Check console for errors
- Ensure Recharts is installed: `npm install recharts`

---

## 🎯 Recommended Deployment Platform

### 🥇 **Vercel (Best Choice)**

**Pros:**
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free tier generous
- ✅ Built for React/Vite
- ✅ Deploy in 1 minute
- ✅ Preview deployments
- ✅ Automatic environment variables

**Cons:**
- ⚠️ Limited build minutes (free tier)

### 🥈 **Netlify (Great Alternative)**

**Pros:**
- ✅ Easy setup
- ✅ Free tier
- ✅ Form handling
- ✅ Serverless functions

**Cons:**
- ⚠️ Slightly slower than Vercel

### 🥉 **GitHub Pages (Free but Limited)**

**Pros:**
- ✅ Completely free
- ✅ Simple for static sites

**Cons:**
- ⚠️ Requires manual setup
- ⚠️ No environment variables
- ⚠️ No serverless functions
- ⚠️ Slower than CDN platforms

---

## 📊 Backend Deployment (Optional)

If you want to deploy the Python backend:

### Option 1: Railway
1. Go to https://railway.app
2. Create new project from GitHub
3. Add Python service
4. Set environment variables
5. Deploy

### Option 2: Render
1. Go to https://render.com
2. New → Web Service
3. Connect repository
4. Build Command: `pip install -r backend/requirements.txt`
5. Start Command: `cd backend && python app.py`
6. Deploy

### Option 3: Heroku
```bash
# Install Heroku CLI
heroku create smartenergy-backend
git push heroku main
```

---

## 🎉 Quick Start Commands

### Deploy to Vercel (Fastest):
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Deploy to Netlify:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Deploy to GitHub Pages:
```bash
npm install --save-dev gh-pages
npm run deploy
```

---

## 🌟 Success Checklist

After deployment, verify:

- [ ] ✅ Site loads at production URL
- [ ] ✅ All pages accessible
- [ ] ✅ Authentication works
- [ ] ✅ Dark/Light mode works
- [ ] ✅ Charts render properly
- [ ] ✅ AI Chat works (with Gemini API key)
- [ ] ✅ File upload works
- [ ] ✅ Mobile responsive
- [ ] ✅ No console errors
- [ ] ✅ SSL certificate active (https://)

---

## 📞 Need Help?

**Common Resources:**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev/guide/static-deploy.html

**Check These Files:**
- `/vercel.json` - Vercel configuration
- `/netlify.toml` - Netlify configuration
- `/vite.config.ts` - Vite build configuration

---

## 🚀 You're Ready to Deploy!

**Recommended Path:**
1. ✅ Test build locally: `npm run build`
2. ✅ Get Gemini API key
3. ✅ Deploy to Vercel (easiest)
4. ✅ Add environment variables
5. ✅ Test production site
6. ✅ Share your live app! 🎊

**Your SmartEnergy dashboard will be live in minutes!** ⚡
