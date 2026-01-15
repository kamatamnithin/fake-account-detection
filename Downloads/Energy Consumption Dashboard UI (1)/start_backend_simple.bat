@echo off
echo.
echo 🚀 SmartEnergy Backend - Quick Start
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found! Please install Python 3.8+
    echo Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python found!
python --version
echo.

REM Navigate to backend directory
cd /d "%~dp0backend"

REM Check and install dependencies
echo 📦 Checking dependencies...
python -c "import flask, flask_cors, numpy, pandas, sklearn" >nul 2>&1

if errorlevel 1 (
    echo ⚠️  Some packages missing. Installing...
    echo.
    pip install flask flask-cors numpy pandas scikit-learn joblib
    echo.
)

echo ✅ All dependencies ready!
echo.
echo 🚀 Starting backend server...
echo 📍 Backend will run on: http://localhost:5000
echo 💡 Press Ctrl+C to stop
echo.
echo ----------------------------------------
echo.

REM Start the backend
python app.py

pause
