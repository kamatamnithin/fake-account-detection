# 🚀 Deploy SmartEnergy in 5 Minutes!

## ⚡ Super Quick Deploy (Choose One)

### Option 1: Vercel (Easiest - RECOMMENDED) ⭐

**One-line deploy:**
```bash
npx vercel --prod
```

That's it! Your app will be live at `https://your-app.vercel.app`

---

### Option 2: Netlify

**One-line deploy:**
```bash
npx netlify-cli deploy --prod
```

Live at: `https://your-app.netlify.app`

---

### Option 3: Use Deploy Script

**Windows:**
```bash
deploy.bat
```

**Mac/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔑 Important: Add Your Gemini API Key

After deploying, add your environment variable:

### Get API Key:
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Add to Vercel:
```bash
vercel env add VITE_GEMINI_API_KEY
```
(Paste your key when prompted)

### Add to Netlify:
- Dashboard → Site Settings → Environment Variables
- Add: `VITE_GEMINI_API_KEY` = `your_key_here`

### Redeploy:
```bash
vercel --prod
# or
netlify deploy --prod
```

---

## ✅ Test Before Deploying

```bash
# Build locally
npm run build

# Preview production build
npm run preview
```

Open http://localhost:4173 and test everything works!

---

## 🎯 All Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Test build then preview
npm run test:build

# Deploy to Vercel
npm run deploy:vercel

# Deploy to Netlify
npm run deploy:netlify
```

---

## 📋 Quick Checklist

Before deploying:
- [ ] Test build: `npm run build` ✅
- [ ] No errors in console ✅
- [ ] All pages work ✅
- [ ] Get Gemini API key ✅

After deploying:
- [ ] Add `VITE_GEMINI_API_KEY` ✅
- [ ] Redeploy ✅
- [ ] Test live site ✅
- [ ] Share your app! 🎉

---

## 🎊 You're Ready!

**Fastest way to deploy RIGHT NOW:**

```bash
npx vercel --prod
```

Then add your API key and enjoy your live app! 🚀

**Full guide:** See `DEPLOYMENT_GUIDE.md` for detailed instructions.
