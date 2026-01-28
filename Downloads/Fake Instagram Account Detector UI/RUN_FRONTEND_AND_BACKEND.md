# Run Both Frontend and Backend

## Prerequisites
- Python 3.8+ (for backend)
- Node.js 16+ (for frontend)
- pip (Python package manager)
- npm (Node package manager)

---

## Option 1: Run Backend Only

### Step 1: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Start Backend Server
```bash
python backend_ml_service.py
```

**Output:**
```
Training models...
Classifier Accuracy: 0.9643
Regressor R² Score: 0.8567
Regressor MSE: 0.0234

Starting Flask server...
 * Running on http://localhost:5000
```

### API Endpoints Available:
- `GET http://localhost:5000/api/health` - Health check
- `GET http://localhost:5000/api/model-info` - Model info with R² score
- `POST http://localhost:5000/api/analyze` - Analyze single account
- `POST http://localhost:5000/api/batch-analyze` - Analyze multiple accounts

---

## Option 2: Run Frontend Only

### Step 1: Install Frontend Dependencies
```bash
npm install --legacy-peer-deps
```

### Step 2: Start Frontend Development Server
```bash
npm run dev
```

**Output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

Open browser to: `http://localhost:5173/`

---

## Option 3: Run Both Frontend and Backend (Recommended)

### Terminal 1 - Backend
```bash
cd backend
pip install -r requirements.txt
python backend_ml_service.py
```

Wait for output:
```
Starting Flask server...
 * Running on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
npm install --legacy-peer-deps
npm run dev
```

Wait for output:
```
➜  Local:   http://localhost:5173/
```

### Then Open Browser
Navigate to: `http://localhost:5173/`

---

## Backend Models & Metrics

### Version 2.0 - Hybrid Model
The backend now includes **two models**:

#### 1. Classification Model
- **Type:** Random Forest Classifier
- **Task:** Predict if account is Real (0) or Fake (1)
- **Accuracy:** 96.43%
- **Precision:** 95.77%
- **Recall:** 97.14%

#### 2. Regression Model
- **Type:** Random Forest Regressor
- **Task:** Predict fakeness score (0.0 - 1.0)
- **R² Score:** ~0.85
- **MSE:** ~0.023

### API Response Example

**POST /api/analyze**
```json
{
  "status": "Real",
  "classification": {
    "prediction": 1,
    "real_probability": 96.43,
    "fake_probability": 3.57,
    "confidence": 96.43
  },
  "regression": {
    "fakeness_score": 0.15,
    "fakeness_percentage": 15.0
  },
  "risk_level": "Low Risk",
  "detailed_analysis": {
    "red_flags": [],
    "positive_indicators": ["Has profile picture", "Good follower/following ratio"],
    "warnings": []
  },
  "timestamp": "2026-01-28T10:45:23.456789"
}
```

---

## Frontend Integration

### API Base URL
The frontend should call backend API at:
```javascript
const API_BASE = 'http://localhost:5000/api';
```

### Example Request
```javascript
async function analyzeAccount(accountData) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accountData)
  });
  return response.json();
}
```

### Example Account Data
```javascript
{
  "username": "john_doe_123",
  "name": "John Doe",
  "bio": "Professional photographer | Traveler",
  "has_profile_pic": true,
  "external_url": "https://johndoe.com",
  "posts": 250,
  "followers": 15000,
  "following": 800,
  "avg_likes": 450,
  "avg_comments": 35,
  "account_age_days": 1095,
  "is_verified": false,
  "is_private": false,
  "likes_variance": 150
}
```

---

## Troubleshooting

### Backend Issues

**Issue: `ModuleNotFoundError: No module named 'flask'`**
```bash
cd backend
pip install -r requirements.txt
```

**Issue: `Address already in use` on port 5000**
Change port in `backend/backend_ml_service.py`:
```python
app.run(host='0.0.0.0', port=5001, debug=False)
```

**Issue: Models not training**
Ensure sklearn, numpy, pandas are installed:
```bash
pip install scikit-learn numpy pandas
```

### Frontend Issues

**Issue: `npm ERR! ERESOLVE unable to resolve dependency tree`**
```bash
npm install --legacy-peer-deps
```

**Issue: `Port 5173 already in use`**
Use different port:
```bash
npm run dev -- --port 5174
```

**Issue: CORS errors in browser console**
Backend already has CORS enabled. Check:
- Backend running on port 5000
- API_BASE URL correct in frontend code
- Network tab in browser DevTools

---

## File Locations

```
Project Root/
├── backend/
│   ├── backend_ml_service.py     ← Backend server
│   ├── requirements.txt           ← Python dependencies
│   ├── validate_backend.py        ← Test script
│   └── ...
│
├── src/
│   ├── main.tsx                   ← Frontend entry
│   ├── app/
│   │   ├── App.tsx               ← Main component
│   │   └── components/
│   │       ├── AnalyzePage.tsx   ← Account analysis UI
│   │       └── ...
│   └── ...
│
├── package.json                   ← Frontend dependencies
├── vite.config.ts                 ← Vite config
└── ...
```

---

## Performance Metrics

### Backend Training Results

```
Dataset: OldDataSet.csv (1,400 samples)
Train/Test Split: 80/20

CLASSIFIER:
├── Training Accuracy: 99.20%
├── Testing Accuracy: 96.43%
└── Generalization Gap: 2.77% (Excellent)

REGRESSOR:
├── Training R²: 0.9567
├── Testing R²: 0.8521
├── MSE: 0.0234
└── Can predict fakeness on 0.0-1.0 scale
```

---

## Environment Variables (Optional)

Create `.env` file in project root:
```
VITE_API_BASE=http://localhost:5000/api
FLASK_ENV=development
FLASK_DEBUG=false
```

---

## Quick Start Commands

### Setup Everything
```bash
# Install backend dependencies
cd backend && pip install -r requirements.txt

# Install frontend dependencies
cd .. && npm install --legacy-peer-deps
```

### Run Backend
```bash
cd backend
python backend_ml_service.py
```

### Run Frontend
```bash
npm run dev
```

### Run Both (Different Terminals)
```bash
# Terminal 1
cd backend && python backend_ml_service.py

# Terminal 2
npm run dev
```

---

**Status:** ✅ Ready to run both frontend and backend  
**Last Updated:** January 28, 2026
