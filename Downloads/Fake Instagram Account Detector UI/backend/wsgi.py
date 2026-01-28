#!/usr/bin/env python
"""
Production WSGI server for Fake Instagram Account Detector
Uses Waitress WSGI server instead of Flask dev server
"""
import os
from backend_api import app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    from waitress import serve
    
    print(f"Starting Waitress WSGI server on port {port}...")
    print("=" * 60)
    
    # Serve the app with Waitress (production-ready)
    serve(app, host='0.0.0.0', port=port, threads=4)
