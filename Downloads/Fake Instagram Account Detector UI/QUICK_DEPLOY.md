# Quick Deploy Checklist

## Step 1: Deploy Backend to Railway (Do This First!)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Navigate to backend
cd backend

# Login to Railway
railway login

# Initialize and deploy
railway init
railway up
```

**SAVE THE PUBLIC URL** it provides (looks like: `https://your-app.up.railway.app`)

## Step 2: Update Frontend with Backend URL

Open `.env.production` and update:
```
VITE_API_URL=https://your-railway-backend.up.railway.app
```

Replace `your-railway-backend` with your actual Railway app name.

## Step 3: Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Go back to root directory
cd ..

# Deploy to Vercel
vercel --prod
```

When prompted:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: Set `VITE_API_URL` to your Railway URL

## Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Go to the Analyze page
3. Fill in account details
4. Click Analyze
5. See predictions from your Railway backend!

---

## Troubleshooting

**Backend not connecting?**
- Check Railway dashboard for error logs
- Verify `/api/health` endpoint works: `curl https://your-railway-url/api/health`
- Make sure `.env.production` has correct URL

**Frontend not building?**
- Check Vercel build logs
- Ensure `npm run build` works locally first

**Models not loading?**
- Verify pickle files are in backend folder
- Check Railway logs for import errors

---

## File Changes Made

**Backend** (for Railway):
- `Procfile` - How to run on Railway
- `Dockerfile` - Container configuration
- `wsgi.py` - Production WSGI entry point
- `requirements.txt` - Updated with waitress
- `backend_api.py` - Updated for PORT env var

**Frontend** (for Vercel):
- `.env.production` - API URL configuration
- `vercel.json` - Vercel configuration
- `.gitignore` - What to exclude from git
- `AnalyzePageEnhanced.tsx` - Updated to use VITE_API_URL

**Documentation**:
- `DEPLOYMENT_GUIDE.md` - Comprehensive guide

---

## Final Notes

- The app uses Random Forest with 96% accuracy
- Backend handles model loading and predictions
- Frontend sends form data and displays results
- Everything is production-ready!

**Good luck with your deployment! 🚀**
