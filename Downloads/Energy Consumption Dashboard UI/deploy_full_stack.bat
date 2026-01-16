@echo off
echo.
echo 🚀 SmartEnergy Full-Stack Deployment Script
echo ============================================
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI not found! Installing...
    npm install -g vercel
    echo ✅ Vercel CLI installed
)

echo.
echo 🔧 Step 1: Deploying Backend to Railway
echo ========================================
echo.
echo 📋 Backend Deployment Instructions:
echo 1. Go to https://railway.app
echo 2. Create new project from GitHub repo
echo 3. Railway will auto-detect Python/Flask
echo 4. Add environment variables in Railway dashboard:
echo    - FLASK_ENV=production
echo    - DEBUG=False
echo    - HOST=0.0.0.0
echo    - PORT=8080
echo    - CORS_ORIGINS=https://your-frontend-domain.vercel.app
echo.
echo ⏳ Waiting for you to deploy backend and get the URL...
echo Press any key when you have the Railway backend URL
pause >nul

echo.
set /p BACKEND_URL="Enter your Railway backend URL (e.g., https://smartenergy-backend.up.railway.app): "

echo.
echo 🔧 Step 2: Deploying Frontend to Vercel
echo ======================================
echo.

echo 📝 Setting up environment variables...
vercel env add VITE_API_URL
echo When prompted, paste: %BACKEND_URL%/api
echo.

echo 🚀 Deploying to Vercel...
vercel --prod

echo.
echo ✅ Deployment Complete!
echo =======================
echo.
echo 🌐 Frontend: Check Vercel dashboard for your live URL
echo 🔌 Backend: %BACKEND_URL%
echo.
echo 📝 Next Steps:
echo 1. Test your live app
echo 2. Add Gemini API key if needed (vercel env add VITE_GEMINI_API_KEY)
echo 3. Share your app URL!
echo.

pause