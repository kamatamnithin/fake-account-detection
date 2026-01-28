# Fake Instagram Account Detector - Complete Setup

## System Overview
A full-stack machine learning application that uses a trained Random Forest Classifier to detect fake Instagram accounts with 96.07% accuracy.

## Dataset & Model

### Dataset
- **File**: `OldDataSet.csv`
- **Total Samples**: 1400 accounts
- **Class Distribution**: 700 Real (50%), 700 Fake (50%)
- **Train/Test Split**: 80% / 20% (1120 / 280 samples)

### Machine Learning Model
- **Algorithm**: Random Forest Classifier
- **Trees**: 100 estimators
- **Max Depth**: 15
- **Features**: 11 Instagram account metrics

### Model Performance
- **Accuracy**: 96.07%
- **Precision**: 95.10%
- **Recall**: 97.14%
- **Confusion Matrix**:
  - True Negatives: 133
  - False Positives: 7
  - False Negatives: 4
  - True Positives: 136

## Features (11 total)
1. Profile Pic (binary)
2. Nums/Length Username (ratio)
3. Full Name Words (count)
4. Bio Length (characters)
5. External Url (binary)
6. Private (binary)
7. Verified (binary)
8. Business (binary)
9. #Posts (count)
10. #Followers (count)
11. #Following (count)

### Feature Importance
| Feature | Importance |
|---------|-----------|
| #Followers | 36.29% |
| #Posts | 21.01% |
| #Following | 17.68% |
| Bio Length | 10.53% |
| Business | 4.04% |
| Nums/Length Username | 4.02% |
| Private | 2.06% |
| Full Name Words | 1.99% |
| External Url | 1.12% |
| Profile Pic | 0.84% |

## Files & Structure

### Backend Files
- **train_model.py** - Training script that loads the dataset, trains the model, and saves pickle files
- **backend_api.py** - Flask API server with endpoints for model predictions
- **requirements.txt** - Python dependencies
- **classifier_model.pkl** - Trained Random Forest model (binary file)
- **scaler_model.pkl** - StandardScaler for feature normalization
- **feature_names.pkl** - List of feature column names
- **OldDataSet.csv** - Training dataset

### Frontend Integration
- **AnalyzePageEnhanced.tsx** - Updated React component that sends requests to the backend API

## Running the System

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python backend_api.py
```
Backend runs on: `http://localhost:5000`

### 2. Frontend Setup
```bash
npm run dev
```
Frontend runs on: `http://localhost:5175/`

## API Endpoints

### GET /api/health
Health check endpoint
```bash
curl http://localhost:5000/api/health
```
Response: `{"status": "ok", "message": "Backend is running", "models_loaded": true}`

### POST /api/analyze
Analyze a single Instagram account
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "Profile Pic": 1,
    "Nums/Length Username": 0.5,
    "Full Name Words": 2,
    "Bio Length": 50,
    "External Url": 1,
    "Private": 0,
    "Verified": 1,
    "Business": 0,
    "#Posts": 500,
    "#Followers": 5000,
    "#Following": 2000
  }'
```

Response Example:
```json
{
  "status": "Likely Real",
  "is_fake": false,
  "confidence": 86.0,
  "fake_probability": 14.0,
  "real_probability": 86.0,
  "risk_level": "Low Risk",
  "timestamp": "2026-01-28T12:00:00.000000"
}
```

### POST /api/batch-analyze
Analyze multiple accounts at once
```bash
curl -X POST http://localhost:5000/api/batch-analyze \
  -H "Content-Type: application/json" \
  -d '[
    { "Profile Pic": 1, ... },
    { "Profile Pic": 0, ... }
  ]'
```

### GET /api/features
Get list of required features
```bash
curl http://localhost:5000/api/features
```

## Frontend Integration

The AnalyzePageEnhanced component sends a POST request to `/api/analyze` with the following mapping:

```typescript
const payload = {
  'Profile Pic': accountData.has_profile_pic ? 1 : 0,
  'Nums/Length Username': username_ratio,
  'Full Name Words': accountData.name.split(' ').length,
  'Bio Length': accountData.bio.length,
  'External Url': accountData.external_url ? 1 : 0,
  'Private': accountData.is_private ? 1 : 0,
  'Verified': accountData.is_verified ? 1 : 0,
  'Business': 0,
  '#Posts': parseInt(accountData.posts),
  '#Followers': parseInt(accountData.followers),
  '#Following': parseInt(accountData.following)
};
```

## Model Persistence

Models are saved as pickle files for fast loading without retraining:
- **classifier_model.pkl** - 50KB (RandomForest object)
- **scaler_model.pkl** - 761 bytes (StandardScaler object)
- **feature_names.pkl** - Small (list of feature names)

No retraining needed - the models load in milliseconds at startup.

## Risk Levels

Based on fake probability:
- **Low Risk**: Fake probability ≤ 40%
- **Medium Risk**: 40% < Fake probability ≤ 70%
- **High Risk**: Fake probability > 70%

## Testing

### Test with Real Account Profile
```python
import requests

test_account = {
    'Profile Pic': 1,
    'Nums/Length Username': 0.5,
    'Full Name Words': 2,
    'Bio Length': 100,
    'External Url': 1,
    'Private': 0,
    'Verified': 1,
    'Business': 0,
    '#Posts': 500,
    '#Followers': 5000,
    '#Following': 2000
}

response = requests.post('http://localhost:5000/api/analyze', json=test_account)
print(response.json())
```

Expected: Likely Real with high confidence

## Troubleshooting

### Backend not starting
- Check port 5000 is available
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check that pickle files exist in backend folder

### API returns error
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check that all required features are provided
- Verify JSON format is correct

### Frontend can't connect to backend
- Ensure backend is running on http://localhost:5000
- Check browser console for CORS errors
- Verify request headers include `Content-Type: application/json`

## Performance Notes

- **Model Loading**: < 100ms (from pickle files)
- **Prediction Time**: ~5ms per account
- **Batch Processing**: ~50ms for 10 accounts
- **Memory Usage**: ~100MB for loaded models

## Next Steps

1. Open frontend: http://localhost:5175/
2. Navigate to Analyze page
3. Enter Instagram account details
4. Click "Analyze"
5. View ML predictions and risk assessment

---
**Status**: ✅ Production Ready
**Last Updated**: January 28, 2026
