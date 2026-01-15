# 🚀 SmartEnergy ML Backend

Flask API for serving Random Forest energy consumption predictions.

---

## 📦 Quick Start

### 1️⃣ **Place Your Model File**

```
/backend/random_forest_model.pkl  ← Put your model here
```

### 2️⃣ **Install Dependencies**

```bash
pip install -r requirements.txt
```

### 3️⃣ **Run Server**

```bash
python app.py
```

Server starts on: `http://localhost:5000`

---

## 🎯 API Endpoints

### **Health Check**
```bash
GET /health
```
Check if server and model are loaded.

### **Make Prediction**
```bash
POST /predict
Content-Type: application/json

{
  "features": [{
    "temperature": 22.5,
    "humidity": 65.0,
    "occupancy": 150,
    "renewable": 45.0,
    "hvac_status": 1,
    "lighting_status": 1,
    "day_of_week": 1,
    "is_holiday": 0,
    "hour": 14,
    "month": 1,
    "day_of_month": 15,
    "is_weekend": 0,
    "is_business_hour": 1
  }]
}
```

### **Model Info**
```bash
GET /model-info
```
Get information about loaded model.

### **Reload Model**
```bash
POST /reload-model
```
Reload model from disk without restarting server.

---

## 📚 Documentation

- **Quick Reference:** `QUICK_REFERENCE.md` - Fast setup guide
- **Integration Guide:** `MODEL_INTEGRATION_GUIDE.md` - Detailed instructions
- **Visual Guide:** `WHERE_TO_PUT_MODEL.md` - Diagrams and visuals

---

## ✅ Success Check

When properly configured, you'll see:

```
============================================================
🚀 SmartEnergy ML Prediction API
============================================================
✅ Model loaded and ready!
📊 Model type: RandomForestRegressor
📡 Starting server on http://localhost:5000
============================================================
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Model not found | Place `random_forest_model.pkl` in this folder |
| Import errors | Run `pip install -r requirements.txt` |
| Port already in use | Kill process on port 5000 or change port in `app.py` |

---

## 📊 Model Requirements

- **Type:** RandomForestRegressor (or compatible scikit-learn model)
- **Format:** Pickled (.pkl)
- **Python:** 3.8+
- **scikit-learn:** 1.3.2 (or compatible)

---

## 🛠️ Dependencies

```
flask==3.0.0          # Web framework
flask-cors==4.0.0     # CORS support
pandas==2.1.4         # Data handling
numpy==1.26.2         # Numerical operations
scikit-learn==1.3.2   # ML model support
```

---

## 🎯 How It Works

```
Frontend Request → Flask API → Load Model → Make Prediction → Return JSON
```

---

## 💡 Features

- ✅ Auto model loading
- ✅ Health checks
- ✅ CORS enabled for React frontend
- ✅ Error handling
- ✅ Prediction intervals
- ✅ Model info endpoint
- ✅ Hot reload capability

---

## 🚀 Production Deployment

For production, consider:

1. **Use Gunicorn:**
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

2. **Add environment variables:**
```python
PORT = os.getenv('PORT', 5000)
MODEL_PATH = os.getenv('MODEL_PATH', 'random_forest_model.pkl')
```

3. **Deploy to:**
- Heroku
- AWS EC2/Lambda
- Google Cloud Run
- Azure App Service

---

## 📞 Support

**Need help?** Check the documentation files in this folder:
- `QUICK_REFERENCE.md`
- `MODEL_INTEGRATION_GUIDE.md`
- `WHERE_TO_PUT_MODEL.md`

---

## ⚡ TL;DR

```bash
# Put model in this folder → Install deps → Run server
cp /path/to/random_forest_model.pkl .
pip install -r requirements.txt
python app.py
```

**Done!** Your ML model is now serving predictions! 🎉
