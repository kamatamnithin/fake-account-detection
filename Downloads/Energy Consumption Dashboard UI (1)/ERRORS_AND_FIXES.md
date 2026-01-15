# 🔧 Common Errors & Quick Fixes

## ✅ FIRST: Remember This!

**Your app WORKS WITHOUT the backend!**
- Uses realistic mock data automatically
- All features work perfectly
- Backend is 100% optional

---

## Frontend Errors

### ❌ `npm: command not found`
**What it means:** Node.js isn't installed

**Fix:**
1. Download Node.js from https://nodejs.org
2. Install it (choose LTS version)
3. Restart terminal
4. Try again: `npm install`

---

### ❌ `Port 5173 is already in use`
**What it means:** Another app is using that port

**Fix Option 1 - Use different port:**
```bash
npm run dev -- --port 3000
```

**Fix Option 2 - Kill the other process:**
```bash
# Mac/Linux
lsof -ti:5173 | xargs kill -9

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

---

### ❌ `Module not found` errors in React
**What it means:** Dependencies aren't installed

**Fix:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ React component errors
**What it means:** Usually a typo or missing import

**Fix:**
1. Check browser console (F12)
2. Read the error message carefully
3. Check the file and line number mentioned
4. Make sure all imports are correct

---

## Backend Errors (Only if you're using backend)

### ❌ `python: command not found`
**What it means:** Python isn't installed

**Fix:**
1. Download Python from https://www.python.org/downloads/
2. Install Python 3.8 or higher
3. Make sure to check "Add Python to PATH"
4. Restart terminal

---

### ❌ `No module named 'flask'` or similar
**What it means:** Python packages aren't installed

**Fix:**
```bash
cd backend
pip install flask flask-cors numpy pandas scikit-learn joblib
```

**Still not working? Try:**
```bash
python -m pip install flask flask-cors numpy pandas scikit-learn joblib
```

**Or use pip3:**
```bash
pip3 install flask flask-cors numpy pandas scikit-learn joblib
```

---

### ❌ `Address already in use` (Port 5000)
**What it means:** Something else is using port 5000

**Fix:**

**Option 1 - Use different port:**
1. Edit `backend/app.py`
2. Change this line:
```python
app.run(debug=True, port=5001)  # Changed from 5000 to 5001
```
3. Edit `src/services/backendService.ts`
4. Change this line:
```typescript
const API_BASE_URL = 'http://localhost:5001/api';  // Changed 5000 to 5001
```

**Option 2 - Kill the process using port 5000:**
```bash
# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

---

### ❌ `Model file not found: random_forest_model.pkl`
**What it means:** The ML model isn't in the backend folder

**Fix:**
1. This is NORMAL if you don't have a trained model yet
2. The app works fine without it (uses mock data)
3. If you have a model: Copy it to `backend/random_forest_model.pkl`

---

### ❌ `CORS policy` errors in browser
**What it means:** Backend isn't allowing frontend to connect

**Fix:**
1. Make sure backend is running (`python app.py`)
2. Backend already has CORS enabled
3. Restart backend server
4. Clear browser cache (Ctrl+Shift+Delete)

---

## Connection Errors

### ❌ `Failed to fetch` or `Network error`
**What it means:** Frontend can't reach backend

**Is this a problem?** NO! App uses mock data automatically.

**Want to connect anyway?**
1. Make sure backend is running:
```bash
cd backend
python app.py
```
2. You should see: `Backend running on http://localhost:5000`
3. Check browser console for connection status

---

### ❌ `Failed to get metrics` in console
**What it means:** Backend isn't available

**Fix:** This is NORMAL! The app is designed to work without backend.
- Not an error - just informational
- App continues with mock data
- Everything works fine

---

## AI Chat Errors

### ❌ `API key not configured` or `Invalid API key`
**What it means:** Google Gemini API key issue

**Fix:**
1. Get free API key from: https://aistudio.google.com/app/apikey
2. Edit `src/services/geminiService.ts`
3. Add your key:
```typescript
const API_KEY = 'your-actual-api-key-here';
```

**Don't want AI Chat?** Just don't use that page - everything else works!

---

## Build Errors

### ❌ `Build failed` or `Type errors`
**What it means:** TypeScript found issues

**Fix:**
```bash
# Clean and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

---

### ❌ `Out of memory` during build
**What it means:** Not enough RAM

**Fix:**
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## Still Stuck?

### Debug Checklist:
1. ✅ Node.js installed? `node --version` (need 16+)
2. ✅ Dependencies installed? `npm install`
3. ✅ Port 5173 free? Try different port
4. ✅ Backend needed? NO - works without it!
5. ✅ Check browser console (F12) for actual errors

### Nuclear Option (Reset Everything):
```bash
# Frontend
rm -rf node_modules package-lock.json dist
npm install

# Backend (only if using it)
cd backend
pip uninstall flask flask-cors numpy pandas scikit-learn -y
pip install flask flask-cors numpy pandas scikit-learn joblib
```

---

## 💡 Important Reminders

1. **Frontend works WITHOUT backend** - Don't stress about connection errors!

2. **"Failed to fetch" is NORMAL** - App uses mock data automatically

3. **Backend is OPTIONAL** - Only needed for real ML predictions

4. **Port conflicts are easy** - Just use a different port

5. **Missing packages?** - Just install them with pip/npm

---

## 🆘 Emergency Mode

**Just want it to work RIGHT NOW?**

```bash
# This is all you need:
npm install
npm run dev

# Open http://localhost:5173
# Everything works with mock data!
```

**That's it!** No backend, no database, no complexity. Just works! ✨

---

## 📚 More Help

- **[QUICK_START.md](QUICK_START.md)** - Simple setup guide
- **[BACKEND_CONNECTION_HELP.md](BACKEND_CONNECTION_HELP.md)** - Backend help
- **[README.md](README.md)** - Full documentation

---

Made with ❤️ to help you succeed!
