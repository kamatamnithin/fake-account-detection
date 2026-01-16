# SmartEnergy Backend - Railway Deployment

## 🚀 Deploy to Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up/Sign in with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Choose "Deploy from GitHub repo"
3. Connect your repository (or upload files)

### Step 3: Configure Environment
1. Go to your project dashboard
2. Click "Variables" tab
3. Add these environment variables:
   ```
   FLASK_ENV=production
   DEBUG=False
   HOST=0.0.0.0
   PORT=8080
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```

### Step 4: Deploy
Railway will automatically detect Python and deploy your Flask app.

### Step 5: Get Backend URL
After deployment, copy the Railway domain (e.g., `https://smartenergy-backend.up.railway.app`)

## 📝 Notes
- Railway auto-detects Python/Flask apps
- No Procfile needed
- Uses nixpacks for building
- Automatic HTTPS included</content>
<parameter name="filePath">c:\Users\nithi\Downloads\Energy Consumption Dashboard UI\backend\DEPLOYMENT_README.md