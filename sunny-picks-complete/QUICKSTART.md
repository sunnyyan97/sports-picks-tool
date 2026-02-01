# 🚀 QUICKSTART GUIDE - Sunny's Expert Picks

Get your sports betting analysis tool up and running in minutes!

## ✅ What You Have

A complete, production-ready sports betting web app:
- ✅ Works on mobile, tablet, and desktop
- ✅ AI-powered picks using Claude Sonnet 4.5
- ✅ Real-time web search for current stats
- ✅ Secure backend (API key never exposed)
- ✅ Professional design with your custom logo

---

## 🎯 Two Ways to Deploy

### **Option 1: Deploy to Vercel (5 Minutes) - RECOMMENDED**

**This is the easiest way to get online!**

#### Step 1: Get Your API Key
1. Go to https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Copy the key (starts with `sk-ant-...`)
4. Save it somewhere safe

#### Step 2: Deploy
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Import Project"
4. Drag and drop the entire project folder OR connect your GitHub repo
5. When prompted for environment variables, add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your API key from Step 1
6. Click "Deploy"

#### Step 3: Access Your App
- Vercel will give you a URL like: `https://sunnys-picks-xyz.vercel.app`
- Open it on your phone, tablet, or computer
- Start making picks! 🎉

**That's it! Your app is live and works on mobile!**

---

### **Option 2: Run Locally (Testing)**

**Use this to test on your computer first**

#### Prerequisites
- Node.js 18+ installed (download from https://nodejs.org)

#### Steps

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure API key:**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key:
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

3. **Start the server:**
```bash
npm start
```

4. **Open your browser:**
```
http://localhost:3000
```

The app will work on your local machine, but **only on the computer running the server**.

---

## 📁 What's Included

```
sunny-picks-complete.zip
├── frontend/           # Web interface (HTML/CSS/JS)
│   ├── index.html     # Main page
│   ├── styles.css     # All styling
│   └── app.js         # Frontend logic
├── backend/           # API server
│   ├── server.js      # Express server
│   ├── package.json   # Dependencies
│   └── .env.example   # API key template
├── vercel.json        # Vercel deployment config
├── README.md          # Full documentation
├── DEPLOY.md          # Detailed deployment guide
└── start.sh           # Quick start script (Mac/Linux)
```

---

## 🎨 Features

### AI Analysis
- Claude Sonnet 4.5 with web search
- Finds current team records, injuries, and stats
- Confidence ratings (1-10 scale)
- Detailed logic and concerns

### Mobile-Optimized
- Responsive design
- Touch-friendly buttons
- Fast loading
- Works offline (after first load)

### Safety Features
- Verification warnings
- Quick verify buttons
- Source checking
- Secure API key storage

---

## 🔧 Customization

### Change Model
Edit `backend/server.js`, line ~80:
```javascript
model: 'claude-sonnet-4-20250514',  // Change this
```

Options:
- `claude-sonnet-4-20250514` - Fast, smart (current)
- `claude-opus-4-20250514` - Most powerful
- `claude-haiku-4-20250514` - Fastest, cheapest

### Add More Leagues
Edit `frontend/index.html`, add options to the `<select>` dropdown

### Change Colors
Edit `frontend/styles.css`:
- `#4a90e2` = Blue accent color
- `#0a0a0a` = Background color
- `#FFD700` = Gold (logo sun)

---

## ❓ Troubleshooting

### "API Key not set"
- **Vercel:** Add environment variable in dashboard
- **Local:** Create `.env` file in `backend/` folder

### "Failed to parse response"
- The AI returned invalid JSON
- Just try again - it usually works the second time

### Works on desktop but not mobile
- Make sure you deployed to Vercel (mobile can't access localhost)
- Check that HTTPS is enabled (Vercel does this automatically)

### API rate limits
- You're using your Claude Pro API allocation
- Monitor at https://console.anthropic.com

---

## 💰 Costs

### Your Current Setup (Claude Pro)
- **Subscription:** $20/month (you already have this!)
- **API Usage:** Included in your Pro plan
- **Each Pick:** ~2000-6000 tokens
- **Hosting:** FREE on Vercel

### Example Usage
With Claude Pro, you can typically make:
- ~50-100 picks per day
- Plenty for personal use!

---

## 📱 Mobile Tips

### Add to Home Screen (iPhone)
1. Open your Vercel URL in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Now it's an app icon!

### Add to Home Screen (Android)
1. Open your Vercel URL in Chrome
2. Tap the menu (3 dots)
3. Tap "Add to Home Screen"
4. Now it's an app icon!

---

## 🆘 Need Help?

**Check these resources:**
- Full docs: `README.md`
- Deployment guide: `DEPLOY.md`
- Anthropic docs: https://docs.anthropic.com
- Vercel docs: https://vercel.com/docs

**Common issues solved in README.md!**

---

## 🎉 You're Ready!

1. Deploy to Vercel (5 min)
2. Add to your phone's home screen
3. Start making expert picks!

Good luck with your bets! 🏀🏈⚽🎯
