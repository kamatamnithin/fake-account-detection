#!/bin/bash

echo "🚀 SmartEnergy Backend - Quick Start"
echo "===================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null
then
    echo "❌ Python not found! Please install Python 3.8+"
    exit 1
fi

# Determine Python command
if command -v python3 &> /dev/null
then
    PYTHON_CMD=python3
    PIP_CMD=pip3
else
    PYTHON_CMD=python
    PIP_CMD=pip
fi

echo "✅ Python found: $($PYTHON_CMD --version)"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend" || exit 1

# Check if requirements are installed
echo "📦 Checking dependencies..."
$PYTHON_CMD -c "import flask, flask_cors, numpy, pandas, sklearn" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Some packages missing. Installing..."
    echo ""
    $PIP_CMD install flask flask-cors numpy pandas scikit-learn joblib
    echo ""
fi

echo "✅ All dependencies ready!"
echo ""
echo "🚀 Starting backend server..."
echo "📍 Backend will run on: http://localhost:5000"
echo "💡 Press Ctrl+C to stop"
echo ""
echo "----------------------------------------"
echo ""

# Start the backend
$PYTHON_CMD app.py
