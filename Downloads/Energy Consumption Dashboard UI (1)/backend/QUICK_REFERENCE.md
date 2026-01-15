# ⚡ QUICK REFERENCE - ML MODEL INTEGRATION

## 📍 FILE LOCATION

```
PUT YOUR MODEL HERE:
/backend/random_forest_model.pkl
```

---

## 🚀 SETUP (5 STEPS)

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Place your model file here (random_forest_model.pkl)

# 4. Start server
python app.py

# 5. Open your website - it will use your model automatically!
```

---

## 🎯 WHAT YOU NEED

### **Required:**
- ✅ Your `random_forest_model.pkl` file
- ✅ Python 3.8+ installed
- ✅ Place model in `/backend` folder

### **Commands:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## ✅ SUCCESS CHECK

### **When it works, you'll see:**
```
✅ Model loaded successfully
📊 Model type: RandomForestRegressor
📡 Starting server on http://localhost:5000
```

### **Test it:**
```bash
curl http://localhost:5000/health
# Should return: {"model_loaded": true}
```

---

## 🔧 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| File not found | Put model in `/backend` folder |
| Import error | Run `pip install -r requirements.txt` |
| Port in use | Kill process on port 5000 |
| Model error | Check scikit-learn version |

---

## 📊 FEATURE ORDER

Your model expects these features **in this order**:

```python
1. temperature
2. humidity
3. occupancy
4. renewable
5. hvac_status
6. lighting_status
7. day_of_week
8. is_holiday
9. hour
10. month
11. day_of_month
12. is_weekend
13. is_business_hour
```

**⚠️ Important:** If your model uses different features, edit `/backend/app.py` line 80

---

## 🎯 HOW IT WORKS

```
User enters data → Frontend sends to backend
                           ↓
Backend loads your model → Makes prediction
                           ↓
Prediction sent back → Shows on screen + charts
```

---

## 📁 FILES CREATED FOR YOU

- ✅ `/backend/app.py` - Flask server
- ✅ `/backend/requirements.txt` - Dependencies
- ✅ `/backend/MODEL_INTEGRATION_GUIDE.md` - Full guide
- ✅ `/backend/WHERE_TO_PUT_MODEL.md` - Visual guide
- ⏳ `/backend/random_forest_model.pkl` - **YOU ADD THIS**

---

## 💡 TIPS

1. **Keep backend running** while using the website
2. **Frontend auto-detects** if backend is available
3. **Simulation mode** kicks in if backend is offline
4. **No code changes needed** in frontend!

---

## 🚀 READY TO GO?

### **Your Steps:**
1. ⬜ Copy your model to `/backend/`
2. ⬜ Install dependencies
3. ⬜ Start backend server
4. ⬜ Test predictions
5. ⬜ Show your mentor! 🎉

---

## 📞 HELP

**Detailed guides:**
- `/backend/MODEL_INTEGRATION_GUIDE.md` - Complete instructions
- `/backend/WHERE_TO_PUT_MODEL.md` - Visual guide with diagrams

**Quick question?** 
Just ask! The guides have everything covered.

---

**TL;DR:** Put your `.pkl` file in `/backend` folder and run `python app.py` 🚀
