# Deployment Guide - Vercel & Railway

## Overview
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Railway
- **Database**: Pickle models stored in Railway

## Backend Deployment (Railway)

### Prerequisites
1. Create a Railway account: https://railway.app
2. Install Railway CLI: `npm i -g @railway/cli`

### Step 1: Prepare Backend for Railway
```bash
cd backend
# All files are already configured:
# - Procfile (defines how to run the app)
# - Dockerfile (containerization)
# - requirements.txt (Python dependencies)
# - wsgi.py (WSGI server entry point)
# - railway.json (Railway configuration)
```

### Step 2: Deploy to Railway
```bash
cd backend
railway login
railway init
railway up
```

### Step 3: Get Your Railway Backend URL
After deployment, Railway will assign a public URL like:
```
https://your-app.up.railway.app
```

**Save this URL** - you'll need it for frontend configuration.

### Step 4: Verify Backend is Running
```bash
curl https://your-app.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

---

## Frontend Deployment (Vercel)

### Prerequisites
1. Create a Vercel account: https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Have your Railway backend URL ready

### Step 1: Build Frontend Locally (Test)
```bash
npm run build
# Creates optimized production build in 'dist' folder
```

### Step 2: Configure Environment Variables
Update `.env.production` with your Railway backend URL:
```
VITE_API_URL=https://your-app.up.railway.app
```

### Step 3: Deploy to Vercel
```bash
vercel --prod
```

Follow the prompts:
- Link to existing project or create new
- Set build command: `npm run build`
- Set output directory: `dist`
- Add environment variable: `VITE_API_URL=https://your-app.up.railway.app`

### Step 4: Verify Frontend is Running
Visit your Vercel URL and test the Analyze page.

---

## Complete Deployment Checklist

### Backend (Railway)
- [ ] Create Railway account
- [ ] Install Railway CLI
- [ ] Run `railway login`
- [ ] Run `railway init` in backend folder
- [ ] Run `railway up` to deploy
- [ ] Copy assigned Railway URL
- [ ] Test `/api/health` endpoint

### Frontend (Vercel)
- [ ] Create Vercel account
- [ ] Install Vercel CLI
- [ ] Update `.env.production` with Railway URL
- [ ] Run `npm run build`
- [ ] Run `vercel --prod`
- [ ] Set `VITE_API_URL` environment variable in Vercel dashboard
- [ ] Test analysis functionality

---

## After Deployment

### Update API URL Anywhere Needed
If you change the backend URL, update:
1. `.env.production` in root
2. Vercel environment variables dashboard

### Monitoring
- **Railway**: View logs in railway.app dashboard
- **Vercel**: View logs in vercel.com dashboard

### Environment Variables

#### Railway (Backend)
- PORT: Automatically set by Railway (default: 8000)
- FLASK_ENV: production (optional)

#### Vercel (Frontend)
- VITE_API_URL: https://your-railway-backend.up.railway.app

---

## Troubleshooting

### Backend won't start
```bash
# Check Railway logs
railway logs

# Test locally
python wsgi.py
```

### Frontend can't reach backend
- Verify CORS is enabled in `backend_api.py` (it is)
- Check `VITE_API_URL` is set correctly in Vercel
- Test API directly: `curl https://your-api.up.railway.app/api/health`

### Models not loading
- Ensure pickle files are in backend directory
- Check Railway logs for load errors
- Rebuild and redeploy

---

## Files for Deployment

### Backend
```
backend/
├── Procfile                 (tells Railway how to run)
├── Dockerfile              (containerization)
├── railway.json            (Railway config)
├── wsgi.py                 (WSGI entry point)
├── backend_api.py          (Flask app)
├── requirements.txt        (dependencies)
├── classifier_model.pkl    (trained model)
├── scaler_model.pkl        (feature scaler)
├── feature_names.pkl       (feature list)
└── OldDataSet.csv          (training data)
```

### Frontend
```
root/
├── vercel.json             (Vercel config)
├── .env.production         (env variables)
├── vite.config.ts          (Vite config)
├── package.json            (npm config)
├── tsconfig.json           (TypeScript config)
└── src/                    (React source)
```

---

## API Integration Details

### Backend Endpoints
```
GET  /api/health           Check if backend is running
GET  /api/features         Get list of required features
POST /api/analyze          Analyze single account
POST /api/batch-analyze    Analyze multiple accounts
```

### Expected Request Format (POST /api/analyze)
```json
{
  "Profile Pic": 1,
  "Nums/Length Username": 0.5,
  "Full Name Words": 2,
  "Bio Length": 50,
  "External Url": 1,
  "Private": 0,
  "Verified": 1,
  "Business": 0,
  "#Posts": 500,
  "#Followers": 5000,
  "#Following": 2000
}
```

### Expected Response Format
```json
{
  "status": "Likely Real",
  "is_fake": false,
  "confidence": 86.0,
  "fake_probability": 14.0,
  "real_probability": 86.0,
  "risk_level": "Low Risk",
  "timestamp": "2026-01-28T12:00:00.000000"
}
```

---

## Quick Deploy Commands

### Railway
```bash
cd backend
railway login
railway init
railway up
# Copy the public URL assigned to you
```

### Vercel
```bash
# Update .env.production with Railway URL first!
vercel --prod
```

---

## Support & Links

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Flask Docs: https://flask.palletsprojects.com
- React Docs: https://react.dev
