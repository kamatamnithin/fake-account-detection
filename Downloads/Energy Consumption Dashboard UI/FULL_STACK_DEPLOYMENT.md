# 🚀 Complete Full-Stack Deployment Guide

## 🎯 Overview
Deploy your SmartEnergy dashboard with both frontend and backend to production.

**Frontend**: React/Vite → Vercel (free, fast)
**Backend**: Flask/Python → Railway (free tier available)

---

## ⚡ Quick Deploy (Recommended)

### Windows:
```bash
deploy_full_stack.bat
```

### Mac/Linux:
```bash
chmod +x deploy_full_stack.sh
./deploy_full_stack.sh
```

---

## 📋 Manual Step-by-Step Deployment

### Step 1: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Python/Flask

3. **Configure Environment Variables**
   In Railway dashboard → Variables tab:
   ```
   FLASK_ENV=production
   DEBUG=False
   HOST=0.0.0.0
   PORT=8080
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```

4. **Deploy**
   - Railway builds and deploys automatically
   - Get your backend URL (e.g., `https://smartenergy-backend.up.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Set Backend URL**
   ```bash
   vercel env add VITE_API_URL
   ```
   When prompted, enter: `https://your-railway-backend-url/api`

3. **Deploy Frontend**
   ```bash
   vercel --prod
   ```

4. **Update CORS (Optional)**
   In Railway, update `CORS_ORIGINS` with your Vercel frontend URL

### Step 3: Add Gemini API Key (Optional)

```bash
vercel env add VITE_GEMINI_API_KEY
```
Get key from: https://makersuite.google.com/app/apikey

---

## 🔧 Environment Variables Summary

### Backend (Railway):
```
FLASK_ENV=production
DEBUG=False
HOST=0.0.0.0
PORT=8080
CORS_ORIGINS=https://your-vercel-app.vercel.app
```

### Frontend (Vercel):
```
VITE_API_URL=https://your-railway-app.up.railway.app/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ✅ Testing Your Deployment

1. **Test Backend**: Visit `https://your-railway-app.up.railway.app/api/health`
2. **Test Frontend**: Visit your Vercel URL
3. **Test Integration**: Try making a prediction on the frontend

---

## 🆘 Troubleshooting

### Backend Issues:
- Check Railway logs in dashboard
- Verify environment variables
- Ensure model file is committed to repo

### Frontend Issues:
- Check Vercel build logs
- Verify VITE_API_URL is set correctly
- Check browser console for CORS errors

### CORS Issues:
- Update Railway CORS_ORIGINS with Vercel URL
- Redeploy both services

---

## 💰 Cost Estimate

- **Railway**: Free tier (512MB RAM, 1GB storage)
- **Vercel**: Free tier (100GB bandwidth)
- **Total**: $0/month for basic usage

---

## 🎉 Success!

Your SmartEnergy dashboard is now live with:
- ✅ Real ML predictions
- ✅ Professional UI
- ✅ AI chat features
- ✅ Responsive design
- ✅ Production-ready backend

Share your live URL! 🚀</content>
<parameter name="filePath">c:\Users\nithi\Downloads\Energy Consumption Dashboard UI\FULL_STACK_DEPLOYMENT.md