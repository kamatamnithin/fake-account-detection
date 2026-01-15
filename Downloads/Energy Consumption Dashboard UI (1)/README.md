# ⚡ SmartEnergy - AI-Powered Energy Consumption Forecasting

<div align="center">

![SmartEnergy](https://img.shields.io/badge/SmartEnergy-v2.0-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Flask](https://img.shields.io/badge/Flask-3.0-black?style=for-the-badge&logo=flask)
![ML](https://img.shields.io/badge/ML-Random%20Forest-orange?style=for-the-badge)

**Professional energy consumption forecasting platform powered by Random Forest machine learning**

**⚠️ Follows proper time series forecasting - NO data leakage!**

</div>

---

## 🚀 Super Quick Start (2 Minutes)

**IMPORTANT: App works WITHOUT backend! Uses realistic mock data.**

```bash
# Just run the frontend - that's it!
npm install
npm run dev
# Open browser → http://localhost:5173
```

**Want backend too?** See **[QUICK_START.md](QUICK_START.md)** for the easiest setup guide!

**Having trouble?** Check **[BACKEND_CONNECTION_HELP.md](BACKEND_CONNECTION_HELP.md)** for common fixes.

---

## 🎓 Mentor Requirements - IMPLEMENTED ✅

Following proper time series forecasting practices (no data leakage):

✅ **Historical Lags** - Uses t-1h, t-24h, t-168h (NOT current values)  
✅ **Cyclical Time** - Sine/cosine encoding for hour/day  
✅ **Weather Trends** - Rolling 24h averages  
✅ **Historical Usage** - Lagged appliances (hvac_lag_1h, not hvac_status)  

📖 **Read:** [FEATURE_ENGINEERING_GUIDE.md](FEATURE_ENGINEERING_GUIDE.md) - Complete tutorial  
📖 **Read:** [MENTOR_REQUIREMENTS.md](MENTOR_REQUIREMENTS.md) - Compliance details

---

## 📚 Documentation

### **🎯 Start Here:**
- **[📖 DOCUMENTATION INDEX](DOCUMENTATION_INDEX.md)** - All guides in one place!

### **⚡ Quick Guides:**
- **[🎨 Quick Customization](QUICK_CUSTOMIZATION.md)** - Change branding in 5 minutes
- **[🤖 How to Add Your ML Model](HOW_TO_SHARE_YOUR_MODEL.md)** - Model integration
- **[✅ Testing Report](TESTING_REPORT.md)** - Complete test results

### **📖 Detailed Guides:**
- **[🎨 Complete Branding Guide](BRANDING_GUIDE.md)** - Full customization options
- **[Backend Setup](backend/README.md)** - API endpoints & testing
- **[ML Model Integration](backend/MODEL_INTEGRATION_GUIDE.md)** - Detailed ML setup

### **🧪 Backend Documentation:**
- **[Quick Reference](backend/QUICK_REFERENCE.md)** - Fast setup commands
- **[Visual Guide](backend/WHERE_TO_PUT_MODEL.md)** - Diagrams for model placement
- **[API Documentation](backend/README.md)** - Complete API reference

---

## 🎯 Usage

### Upload Your Data

1. Go to **Prediction** page
2. Click **"Upload Data"**
3. Drag & drop your CSV file or click to browse
4. Required columns: `timestamp`, `consumption`
5. Optional columns: `temperature`, `occupancy`, `renewable`

### View Predictions

- **7-Day Forecast** - Weekly consumption predictions
- **30-Day Forecast** - Monthly trends
- **Hourly Breakdown** - Intraday patterns
- **Confidence Intervals** - Prediction uncertainty bounds

### Export Results

1. Click **"Export"** button
2. CSV file downloads with all predictions
3. Use for reporting or further analysis

### AI Chat Assistant

1. Go to **AI Chat** page
2. Ask questions about your energy data
3. Get insights powered by Google Gemini AI

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Motion (Framer Motion)** - Animations
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Vite** - Build tool

### Backend
- **Flask 3.0** - Web framework
- **pandas** - Data processing
- **numpy** - Numerical operations
- **scikit-learn** - ML model support
- **Flask-CORS** - API access

### Machine Learning
- **Random Forest Regressor**
- **Feature Engineering**
- **Time Series Analysis**
- **Statistical Modeling**

---

## 📁 Project Structure

```
smartenergy/
├── backend/                    # Python Flask API
│   ├── app.py                 # Main API server
│   ├── requirements.txt       # Python dependencies
│   ├── random_forest_model.pkl # Your ML model (place here)
│   └── README.md              # Backend docs
├── src/
│   ├── app/
│   │   ├── pages/             # React pages
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Prediction.tsx # Main prediction page
│   │   │   ├── AIChat.tsx
│   │   │   └── About.tsx
│   │   └── components/        # React components
│   │       ├── Navigation.tsx
│   │       ├── DataUploadModal.tsx
│   │       ├── KPICard.tsx
│   │       └── ...
│   ├── services/
│   │   └── predictionService.ts # API client
│   └── data/
│       └── mockData.ts        # Fallback data
├── SETUP_GUIDE.md             # Complete setup instructions
├── ML_MODEL_INTEGRATION.md    # Model integration guide
├── start_backend.bat          # Windows backend starter
├── start_backend.sh           # Linux/Mac backend starter
└── README.md                  # This file
```

---

## 🔌 API Endpoints

### Health Check
```bash
GET /api/health
```

### Model Information
```bash
GET /api/model-info
```

### Make Predictions
```bash
POST /api/predict
Content-Type: application/json

{
  "features": [
    {
      "timestamp": "2024-01-01 00:00:00",
      "temperature": 22.5,
      "occupancy": 45
    }
  ]
}
```

### Generate Forecast
```bash
POST /api/predict/forecast
Content-Type: application/json

{
  "days": 7,
  "base_features": {
    "temperature": 22.5,
    "occupancy": 45
  }
}
```

### Upload CSV Data
```bash
POST /api/upload
Content-Type: multipart/form-data

file: energy_data.csv
```

### Get Metrics
```bash
GET /api/metrics
```

See [Backend API Documentation](backend/README.md) for full API details.

---

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Get model info
curl http://localhost:5000/api/model-info

# Make prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"features":[{"timestamp":"2024-01-01 00:00:00","temperature":22.5}]}'
```

### Test Frontend

```bash
npm run test
```

---

## 📊 Model Performance

Your Random Forest model metrics displayed in real-time:

- **MAPE** - Mean Absolute Percentage Error
- **RMSE** - Root Mean Square Error
- **R² Score** - Coefficient of Determination  
- **MAE** - Mean Absolute Error
- **Accuracy %** - Overall prediction accuracy

---

## 🔧 Configuration

### Backend Configuration

Edit `backend/app.py`:

```python
# Model file path
model_path = 'random_forest_model.pkl'

# API port
app.run(port=5000)

# CORS settings
CORS(app, resources={r"/api/*": {"origins": "*"}})
```

### Frontend Configuration

Edit `src/services/predictionService.ts`:

```typescript
// API base URL
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🚀 Deployment

### Backend (Heroku)

```bash
# Login to Heroku
heroku login

# Create app
heroku create smartenergy-api

# Deploy
git push heroku main
```

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Update API URL in `predictionService.ts` after deployment.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **scikit-learn** - Machine learning library
- **Flask** - Python web framework
- **React** - UI library
- **Recharts** - Chart library
- **Google Gemini** - AI chat capabilities

---

## 📞 Support

- **Documentation:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Issues:** [GitHub Issues](https://github.com/yourusername/smartenergy/issues)
- **Email:** contact@smartenergy.ai

---

## 🎉 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Random Forest Model | ✅ | Integrated and working |
| Real-time Predictions | ✅ | Live forecasting |
| CSV Upload | ✅ | Drag & drop support |
| Export Data | ✅ | Download predictions |
| Interactive Charts | ✅ | Beautiful visualizations |
| AI Chat | ✅ | Gemini integration |
| Responsive Design | ✅ | Mobile-friendly |
| Backend API | ✅ | RESTful endpoints |
| Model Metrics | ✅ | Real-time performance |
| Confidence Intervals | ✅ | Prediction bounds |

---

<div align="center">

**Made with ❤️ for sustainable energy management**

[⬆ Back to Top](#-smartenergy---ai-powered-energy-consumption-forecasting)

</div>