#!/bin/bash

# SmartEnergy - Quick Deployment Script
# This script helps you deploy to Vercel, Netlify, or GitHub Pages

echo "🚀 SmartEnergy Deployment Helper"
echo "================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Test build
echo "🔨 Testing production build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Ask user which platform to deploy to
echo "Choose deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Just build (no deploy)"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installing Vercel CLI..."
            npm install -g vercel
        fi
        vercel --prod
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo "📦 Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        netlify deploy --prod
        ;;
    3)
        echo "🚀 Deploying to GitHub Pages..."
        
        # Check if gh-pages is installed
        if ! npm list gh-pages &> /dev/null; then
            echo "📦 Installing gh-pages..."
            npm install --save-dev gh-pages
        fi
        
        # Ask for repository details
        read -p "Enter your GitHub username: " username
        read -p "Enter your repository name: " repo
        
        # Update package.json homepage
        echo "Updating package.json..."
        npm pkg set homepage="https://$username.github.io/$repo"
        npm pkg set scripts.predeploy="npm run build"
        npm pkg set scripts.deploy="gh-pages -d dist"
        
        # Deploy
        npm run deploy
        
        echo "✅ Deployed! Enable GitHub Pages in repo settings."
        echo "   Settings → Pages → Source: gh-pages branch"
        ;;
    4)
        echo "✅ Build complete! Check the 'dist' folder."
        echo "Run 'npx vite preview' to test locally."
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "⚠️  Don't forget to:"
echo "   1. Add VITE_GEMINI_API_KEY environment variable"
echo "   2. Test your live site"
echo "   3. Check all features work"
echo ""
