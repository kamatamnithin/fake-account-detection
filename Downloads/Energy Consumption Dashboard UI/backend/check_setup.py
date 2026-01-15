"""
Setup Checker - Verify SmartEnergy is ready to run
Run this before starting the servers
"""

import os
import sys
from pathlib import Path

def check_model_file():
    """Check if model file exists"""
    model_path = 'random_forest_model.pkl'
    if os.path.exists(model_path):
        file_size = os.path.getsize(model_path) / (1024 * 1024)  # MB
        print(f"✅ Model file found ({file_size:.2f} MB)")
        return True
    else:
        print("❌ Model file NOT found")
        print("   Expected: backend/random_forest_model.pkl")
        print("\n   📝 To fix:")
        print("   cp your/model/random_forest_model.pkl backend/random_forest_model.pkl")
        return False

def check_python_packages():
    """Check if required Python packages are installed"""
    required_packages = [
        'flask',
        'flask_cors',
        'pandas',
        'numpy',
        'sklearn'
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing.append(package)
    
    if missing:
        print(f"❌ Missing Python packages: {', '.join(missing)}")
        print("\n   📝 To fix:")
        print("   pip install flask flask-cors pandas numpy scikit-learn")
        return False
    else:
        print("✅ All Python packages installed")
        return True

def check_python_version():
    """Check Python version"""
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor} (need 3.8+)")
        return False

def main():
    print("=" * 60)
    print("SmartEnergy Setup Checker")
    print("=" * 60)
    print()
    
    checks = []
    
    # Check Python version
    print("1️⃣ Checking Python version...")
    checks.append(check_python_version())
    print()
    
    # Check Python packages
    print("2️⃣ Checking Python packages...")
    checks.append(check_python_packages())
    print()
    
    # Check model file
    print("3️⃣ Checking model file...")
    checks.append(check_model_file())
    print()
    
    # Summary
    print("=" * 60)
    if all(checks):
        print("✅ ALL CHECKS PASSED!")
        print("=" * 60)
        print("\n🚀 You're ready to start!")
        print("\nNext steps:")
        print("   1. python app.py        ← Start backend")
        print("   2. npm run dev          ← Start frontend (new terminal)")
        print("   3. Open http://localhost:5173")
        print()
        return 0
    else:
        print("❌ SOME CHECKS FAILED")
        print("=" * 60)
        print("\nPlease fix the issues above and run again:")
        print("   python check_setup.py")
        print()
        return 1

if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)
