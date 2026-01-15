# 🚀 ML MODEL INTEGRATION GUIDE

## 📦 **WHERE TO PUT YOUR MODEL FILE**

### **Step 1: Place Your Model File**

Put your `random_forest_model.pkl` file in the `/backend` folder:

```
/backend/
  ├── app.py                      ← Backend server (already created)
  ├── requirements.txt            ← Dependencies (already created)
  └── random_forest_model.pkl     ← PUT YOUR MODEL HERE
```

---

## 🛠️ **SETUP INSTRUCTIONS**

### **Step 2: Install Python Dependencies**

Open a terminal in the `/backend` folder and run:

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### **Step 3: Start the Backend Server**

```bash
# Make sure you're in the /backend folder
cd backend

# Run the Flask server
python app.py
```

You should see:
```
🚀 SmartEnergy ML Prediction API
✅ Model loaded and ready!
📊 Model type: RandomForestRegressor
📡 Starting server on http://localhost:5000
```

### **Step 4: Test the Backend**

Open a new terminal and test:

```bash
# Test health check
curl http://localhost:5000/health

# Should return:
# {"model_loaded": true, "status": "healthy"}
```

---

## 🔗 **CONNECT FRONTEND TO BACKEND**

Your frontend is **already configured** to connect to the backend!

The file `/src/services/predictionService.ts` already has:
- Backend URL: `http://localhost:5000`
- Auto health checks
- Fallback to simulation mode

### **How It Works:**

1. **Backend Running** → Real ML predictions ✅
2. **Backend Offline** → Simulation mode (mock predictions) 🔄

---

## 📋 **COMPLETE SETUP CHECKLIST**

### **Backend Setup:**
- [ ] Navigate to `/backend` folder
- [ ] Place `random_forest_model.pkl` in `/backend` folder
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate venv: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Start server: `python app.py`
- [ ] Verify: Should see "✅ Model loaded and ready!"

### **Frontend Setup:**
- [ ] Frontend already configured (no changes needed!)
- [ ] Prediction page will automatically use backend when available

### **Testing:**
- [ ] Backend health check: `curl http://localhost:5000/health`
- [ ] Open website: `http://localhost:5173` (or your dev server)
- [ ] Go to Prediction page
- [ ] Sign in
- [ ] Enter parameters
- [ ] Click "Predict"
- [ ] Check if using real model or simulation

---

## 🎯 **MODEL FEATURE ORDER**

**IMPORTANT:** Your model expects features in a specific order!

### **Current Feature Order in Backend:**

```python
feature_values = [
    temperature,          # Feature 0
    humidity,            # Feature 1
    occupancy,           # Feature 2
    renewable,           # Feature 3
    hvac_status,         # Feature 4
    lighting_status,     # Feature 5
    day_of_week,         # Feature 6
    is_holiday,          # Feature 7
    hour,                # Feature 8
    month,               # Feature 9
    day_of_month,        # Feature 10
    is_weekend,          # Feature 11
    is_business_hour,    # Feature 12
]
```

### **⚠️ IMPORTANT: Adjust Feature Order**

If your model was trained with **different features** or **different order**, you need to:

1. Open `/backend/app.py`
2. Find the `feature_values` list in the `/predict` endpoint
3. Reorder the features to match your training data

**Example:** If your model was trained with lag features:

```python
feature_values = [
    # Lag features (if your model uses them)
    features.get('consumption_t_1h', 0),   # t-1 hour lag
    features.get('consumption_t_24h', 0),  # t-24 hour lag
    
    # Cyclical time encoding
    features.get('hour_sin', 0),
    features.get('hour_cos', 0),
    features.get('day_sin', 0),
    features.get('day_cos', 0),
    
    # Rolling weather averages
    features.get('temp_rolling_24h', 0),
    features.get('humidity_rolling_24h', 0),
    
    # Current features
    features.get('temperature', 0),
    features.get('humidity', 0),
    # ... etc
]
```

---

## 🔧 **TROUBLESHOOTING**

### **Issue 1: "Model file not found"**

**Solution:**
- Make sure `random_forest_model.pkl` is in `/backend` folder
- Check filename is exactly `random_forest_model.pkl`
- Try absolute path in `app.py`: `MODEL_PATH = '/full/path/to/random_forest_model.pkl'`

### **Issue 2: "Error loading model"**

**Possible causes:**
- Model was saved with different scikit-learn version
- Model file is corrupted
- Python version mismatch

**Solution:**
```python
# Check your model's scikit-learn version
import pickle
with open('random_forest_model.pkl', 'rb') as f:
    model = pickle.load(f)
print(model)  # See model details
```

### **Issue 3: "Predictions are way off"**

**Possible causes:**
- Feature order doesn't match training
- Feature scaling mismatch
- Wrong units (kWh vs Wh)

**Solution:**
1. Check your training notebook/script
2. Verify feature order
3. Check if you used StandardScaler or MinMaxScaler
4. Add scaler to backend if needed

### **Issue 4: "CORS errors"**

**Solution:**
- Already handled with `flask-cors`
- If issues persist, check browser console
- Try: `CORS(app, origins=['http://localhost:5173'])`

### **Issue 5: "Connection refused"**

**Solution:**
- Make sure backend is running: `python app.py`
- Check port 5000 is not blocked
- Try: `http://127.0.0.1:5000` instead of `localhost`

---

## 🧪 **TESTING THE MODEL**

### **Test 1: Health Check**

```bash
curl http://localhost:5000/health
```

**Expected:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "random_forest_model.pkl"
}
```

### **Test 2: Model Info**

```bash
curl http://localhost:5000/model-info
```

**Expected:**
```json
{
  "success": true,
  "model_type": "RandomForestRegressor",
  "n_estimators": 100,
  "n_features": 13
}
```

### **Test 3: Make Prediction**

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "features": [{
      "timestamp": "2024-01-15T14:30:00",
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
  }'
```

**Expected:**
```json
{
  "success": true,
  "predictions": [{
    "timestamp": "2024-01-15T14:30:00",
    "predicted": 245.67,
    "lower_bound": 230.12,
    "upper_bound": 261.22,
    "confidence": 0.95
  }]
}
```

---

## 📊 **CHECKING MODEL PERFORMANCE**

### **If Your Model Shows Data Leakage (R² > 0.99)**

Your mentor mentioned this - if your model is too accurate, it might have data leakage.

**Signs of data leakage:**
- R² score > 0.99
- Perfect predictions
- Model knows "future" information

**How to check:**

```python
# In your training script
from sklearn.metrics import r2_score

# On test set
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
print(f"R² Score: {r2}")

if r2 > 0.99:
    print("⚠️ Warning: Possible data leakage!")
```

**If you have leakage, retrain with:**
- Historical lags (t-1h, t-24h) instead of current values
- Cyclical time encoding (sine/cosine)
- Rolling averages instead of instant values
- Remove any "future" information

---

## 🎯 **INTEGRATION STATUS**

### **✅ What's Already Done:**

1. ✅ Backend API created (`/backend/app.py`)
2. ✅ Requirements file created (`requirements.txt`)
3. ✅ Frontend service configured (`predictionService.ts`)
4. ✅ Prediction page ready
5. ✅ Error handling implemented
6. ✅ Fallback simulation mode
7. ✅ CORS configured
8. ✅ Health checks implemented

### **⏳ What You Need to Do:**

1. ⏳ Place your `random_forest_model.pkl` in `/backend` folder
2. ⏳ Install Python dependencies
3. ⏳ Start the backend server
4. ⏳ Test the predictions

---

## 🚀 **QUICK START COMMANDS**

### **One-Time Setup:**

```bash
# 1. Navigate to backend folder
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Place your model file here (random_forest_model.pkl)
```

### **Every Time You Start:**

```bash
# Terminal 1: Backend
cd backend
venv\Scripts\activate  # or source venv/bin/activate
python app.py

# Terminal 2: Frontend
npm run dev
```

---

## 📞 **NEED HELP?**

### **Common Questions:**

**Q: Where exactly do I put the .pkl file?**  
A: In `/backend/random_forest_model.pkl` (same folder as app.py)

**Q: Do I need to change the frontend code?**  
A: No! It's already configured to use the backend automatically

**Q: What if my model uses different features?**  
A: Edit the `feature_values` list in `/backend/app.py` line ~80

**Q: Can I use a different model type?**  
A: Yes! The backend works with any scikit-learn model

**Q: How do I know if it's using my model or simulation?**  
A: Check the toast notification - it will say "Simulation Mode" if backend is offline

---

## ✨ **YOU'RE READY!**

Once you:
1. Place your model file in `/backend`
2. Install dependencies
3. Start the server

Your ML model will be **live** and making real predictions! 🎉

---

**Next:** Place your model file and run the setup commands above!
