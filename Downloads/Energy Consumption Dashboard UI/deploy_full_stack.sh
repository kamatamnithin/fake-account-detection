#!/bin/bash

echo
echo "🚀 SmartEnergy Full-Stack Deployment Script"
echo "============================================"
echo

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found! Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
fi

echo
echo "🔧 Step 1: Deploying Backend to Railway"
echo "========================================"
echo
echo "📋 Backend Deployment Instructions:"
echo "1. Go to https://railway.app"
echo "2. Create new project from GitHub repo"
echo "3. Railway will auto-detect Python/Flask"
echo "4. Add environment variables in Railway dashboard:"
echo "   - FLASK_ENV=production"
echo "   - DEBUG=False"
echo "   - HOST=0.0.0.0"
echo "   - PORT=8080"
echo "   - CORS_ORIGINS=https://your-frontend-domain.vercel.app"
echo
echo "⏳ Waiting for you to deploy backend and get the URL..."
read -p "Press Enter when you have the Railway backend URL"

echo
read -p "Enter your Railway backend URL (e.g., https://smartenergy-backend.up.railway.app): " BACKEND_URL

echo
echo "🔧 Step 2: Deploying Frontend to Vercel"
echo "====================================="
echo

echo "📝 Setting up environment variables..."
echo "When prompted, paste: $BACKEND_URL/api"
vercel env add VITE_API_URL

echo
echo "🚀 Deploying to Vercel..."
vercel --prod

echo
echo "✅ Deployment Complete!"
echo "======================="
echo
echo "🌐 Frontend: Check Vercel dashboard for your live URL"
echo "🔌 Backend: $BACKEND_URL"
echo
echo "📝 Next Steps:"
echo "1. Test your live app"
echo "2. Add Gemini API key if needed (vercel env add VITE_GEMINI_API_KEY)"
echo "3. Share your app URL!"
echo