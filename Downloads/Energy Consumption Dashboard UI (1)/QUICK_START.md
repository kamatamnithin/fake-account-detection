# ⚡ SmartEnergy - Quick Start Guide

## 🎯 What You Have
A professional Energy Forecasting Dashboard with:
- ✅ **7 Pages**: Home, Dashboard, Analysis, Prediction, Scenarios, AI Chat, About
- ✅ **Dark/Light Theme** toggle
- ✅ **Works Without Backend** (uses realistic mock data)
- ✅ **Optional Backend** for real ML predictions

---

## 🚀 Run the App (Frontend)

### Option 1: Just Frontend (Easiest)
```bash
npm install
npm run dev
```
Open browser to `http://localhost:5173`

**That's it!** Everything works with mock data. Perfect for demos!

---

## 🔌 Connect Backend (Optional)

### Windows:
1. Double-click `start_backend_simple.bat`
2. Wait for "Backend running on http://localhost:5000"
3. Done!

### Mac/Linux:
```bash
chmod +x start_backend_simple.sh
./start_backend_simple.sh
```

### Manual Method:
```bash
cd backend
pip install flask flask-cors numpy pandas scikit-learn
python app.py
```

---

## 📋 Pages Overview

| Page | What It Does | Backend Needed? |
|------|-------------|----------------|
| **Home** | Landing page with features | ❌ No |
| **Dashboard** | Real-time energy monitoring | ❌ No (uses mock) |
| **Analysis** | Anomaly detection & analytics | ❌ No (uses mock) |
| **Prediction** | ML forecast with charts | ✅ Yes (optional) |
| **Scenarios** | What-if planning tool | ❌ No |
| **AI Chat** | Google Gemini chatbot | ⚠️ Needs API key |
| **About** | Project information | ❌ No |

---

## 🔧 Troubleshooting

### ❌ "Failed to connect to backend"
**Solution:** This is NORMAL! App uses mock data automatically.
- Want real backend? Run `start_backend_simple.bat` (Windows) or `./start_backend_simple.sh` (Mac/Linux)

### ❌ "Module not found" (Python)
**Solution:**
```bash
pip install flask flask-cors numpy pandas scikit-learn joblib
```

### ❌ Port 5173 already in use
**Solution:** Kill the other process or change port in `package.json`:
```json
"dev": "vite --port 3000"
```

### ❌ Backend port 5000 in use
**Solution:** 
1. Edit `backend/app.py` - change `port=5000` to `port=5001`
2. Edit `src/services/backendService.ts` - change `5000` to `5001`

---

## 🎨 Features

### Current Features (All Working!)
1. ✅ Real-Time Dashboard
2. ✅ Advanced Analytics
3. ✅ Anomaly Detection
4. ✅ Cost Analysis
5. ✅ What-If Scenarios
6. ✅ AI Chat (needs Gemini API key)
7. ✅ Dark/Light Theme
8. ✅ CSV/JSON Export
9. ✅ PDF Reports
10. ✅ Responsive Design

### Mock Data vs Real Backend

**Mock Data (No Backend):**
- ✅ Works immediately
- ✅ Realistic energy patterns
- ✅ Perfect for demos
- ✅ No setup required

**Real Backend (Optional):**
- ✅ Actual ML predictions
- ✅ Custom data upload
- ✅ Better accuracy
- ⚠️ Requires Python setup

---

## 📝 File Structure

```
SmartEnergy/
├── src/
│   ├── app/
│   │   ├── pages/          # 7 main pages
│   │   └── components/     # Reusable components
│   ├── services/           # API & backend services
│   ├── contexts/           # Theme & auth
│   └── styles/             # CSS files
├── backend/
│   ├── app.py             # Flask API server
│   └── requirements.txt   # Python dependencies
├── start_backend_simple.bat   # Windows quick start
├── start_backend_simple.sh    # Mac/Linux quick start
└── BACKEND_CONNECTION_HELP.md # Detailed help
```

---

## 💡 Pro Tips

1. **Want to work offline?** Just use frontend - no backend needed!

2. **Backend keeps failing?** Don't worry! The app is designed to work without it.

3. **Testing without backend?** Perfect! Mock data is realistic and complete.

4. **Need AI Chat?** Get free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## 🆘 Still Having Issues?

### Check These:
1. ✅ Is `npm install` complete?
2. ✅ Is port 5173 free? (or change it)
3. ✅ Using Node.js 16+? Check: `node --version`

### Common Fixes:
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install

# Use different port
npm run dev -- --port 3000
```

---

## 🎉 You're Ready!

**Remember:** 
- Frontend works perfectly WITHOUT backend
- Backend is optional for advanced features
- Don't stress about connection issues - it's designed to work offline!

**Need More Help?** Check `BACKEND_CONNECTION_HELP.md`

---

Made with ❤️ for SmartEnergy Dashboard
