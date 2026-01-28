#!/bin/bash
set -e
cd backend
pip install --no-cache-dir -r requirements.txt
python -u backend_ml_service.py
