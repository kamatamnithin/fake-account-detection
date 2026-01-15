@echo off
REM SmartEnergy - Quick Deployment Script for Windows
REM This script helps you deploy to Vercel, Netlify, or GitHub Pages

echo.
echo ========================================
echo    SmartEnergy Deployment Helper
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

REM Test build
echo.
echo Testing production build...
call npm run build

if errorlevel 1 (
    echo.
    echo Build failed! Please fix errors before deploying.
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.

REM Ask user which platform to deploy to
echo Choose deployment platform:
echo 1) Vercel (Recommended)
echo 2) Netlify
echo 3) GitHub Pages
echo 4) Just build (no deploy)
echo.
set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Deploying to Vercel...
    where vercel >nul 2>nul
    if errorlevel 1 (
        echo Installing Vercel CLI...
        call npm install -g vercel
    )
    call vercel --prod
) else if "%choice%"=="2" (
    echo.
    echo Deploying to Netlify...
    where netlify >nul 2>nul
    if errorlevel 1 (
        echo Installing Netlify CLI...
        call npm install -g netlify-cli
    )
    call netlify deploy --prod
) else if "%choice%"=="3" (
    echo.
    echo Deploying to GitHub Pages...
    
    REM Check if gh-pages is installed
    call npm list gh-pages >nul 2>nul
    if errorlevel 1 (
        echo Installing gh-pages...
        call npm install --save-dev gh-pages
    )
    
    REM Ask for repository details
    set /p username="Enter your GitHub username: "
    set /p repo="Enter your repository name: "
    
    REM Update package.json
    echo Updating package.json...
    call npm pkg set homepage="https://%username%.github.io/%repo%"
    call npm pkg set scripts.predeploy="npm run build"
    call npm pkg set scripts.deploy="gh-pages -d dist"
    
    REM Deploy
    call npm run deploy
    
    echo.
    echo Deployed! Enable GitHub Pages in repo settings.
    echo Settings - Pages - Source: gh-pages branch
) else if "%choice%"=="4" (
    echo.
    echo Build complete! Check the 'dist' folder.
    echo Run 'npx vite preview' to test locally.
) else (
    echo.
    echo Invalid choice
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Deployment Complete!
echo ========================================
echo.
echo Don't forget to:
echo   1. Add VITE_GEMINI_API_KEY environment variable
echo   2. Test your live site
echo   3. Check all features work
echo.
pause
