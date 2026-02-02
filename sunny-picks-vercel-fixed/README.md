# Sunny's Expert Picks - Sports Betting Analysis Tool

AI-powered sports betting picks using Claude API with web search. Works on desktop, tablet, and mobile devices.

## Features

- ⚡ AI-powered betting analysis using Claude Sonnet 4.5
- 🔍 Real-time web search for current stats, injuries, and betting lines
- 📊 Confidence ratings on 1-10 scale
- 📱 Fully responsive (works perfectly on mobile)
- ✅ Data verification warnings and quick verify buttons
- 🏀 Supports all major leagues (NBA, NFL, NHL, MLB, NCAA, Premier League)

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- Claude Pro subscription (you already have this!)
- Anthropic API key (get from https://console.anthropic.com/settings/keys)

### Installation

1. **Install backend dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

3. **Start the server:**
```bash
npm start
```

4. **Open your browser:**
```
http://localhost:3000
```

That's it! The app should now work on your local machine.

---

## Deploy to Vercel (Recommended - FREE!)

This is the easiest way to get your app online and working on mobile.

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Copy the key (starts with `sk-ant-...`)

### Step 2: Deploy to Vercel

**Option A: Deploy with Git (Recommended)**

1. Create a GitHub account if you don't have one
2. Install Git and GitHub Desktop (or use command line)
3. Create a new repository called `sunnys-expert-picks`
4. Copy all these files to your repository:
   ```
   frontend/
   backend/
   vercel.json
   README.md
   ```
5. Push to GitHub
6. Go to https://vercel.com and sign in with GitHub
7. Click "Import Project"
8. Select your `sunnys-expert-picks` repository
9. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your API key from Step 1
10. Click "Deploy"

**Option B: Deploy with Vercel CLI**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. From the project root directory:
```bash
vercel
```

3. Follow the prompts and add your API key when asked

4. Your app will be live at a URL like: `https://sunnys-expert-picks.vercel.app`

### Step 3: Access on Mobile

Once deployed, you can access your app from:
- Your iPhone/iPad: Open Safari and go to your Vercel URL
- Any Android device: Open Chrome and go to your Vercel URL
- Any computer: Works in all modern browsers

The app is fully responsive and works perfectly on mobile!

---

## Alternative Deployment Options

### Railway (Also Free Tier)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variable `ANTHROPIC_API_KEY`
6. Railway will auto-deploy

### Render (Free Tier Available)

1. Go to https://render.com
2. Create a "New Web Service"
3. Connect your GitHub repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variable `ANTHROPIC_API_KEY`
7. Deploy!

---

## Project Structure

```
.
├── frontend/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # All styling (mobile-responsive)
│   └── app.js          # Frontend JavaScript
├── backend/
│   ├── server.js       # Express server (API proxy)
│   ├── package.json    # Dependencies
│   └── .env.example    # Environment variables template
├── vercel.json         # Vercel deployment config
└── README.md           # This file
```

## How It Works

1. **Frontend** (HTML/CSS/JS) runs in the user's browser
2. **Backend** (Node.js/Express) acts as a secure proxy
3. Backend calls Claude API with your API key (safely stored server-side)
4. Claude uses web search to find current sports data
5. Results are returned to the frontend and displayed

This architecture keeps your API key secure while allowing the app to work on any device!

---

## API Usage & Costs

With Claude Pro ($20/month), you have generous API usage included:
- The API calls count against your Pro subscription
- Each analysis uses ~2000-6000 tokens
- Claude Pro includes substantial API usage
- You can monitor usage at https://console.anthropic.com

**Tip:** The free tier of Vercel/Railway is more than enough for personal use!

---

## Customization

### Change the API Model

Edit `backend/server.js` line with model:
```javascript
model: 'claude-sonnet-4-20250514',  // You can change this
```

Available models:
- `claude-sonnet-4-20250514` (current, recommended)
- `claude-opus-4-20250514` (more powerful, uses more tokens)
- `claude-haiku-4-20250514` (faster, cheaper, less capable)

### Modify Leagues

Edit `frontend/index.html` to add/remove leagues in the dropdown.

### Change Styling

All styles are in `frontend/styles.css` - fully customizable!

---

## Troubleshooting

**"Server configuration error: ANTHROPIC_API_KEY not set"**
- Make sure you added your API key to the environment variables in Vercel/Railway

**"Failed to parse Claude response"**
- The AI sometimes returns invalid JSON. Try the request again.
- If it persists, the prompt may need adjustment in `backend/server.js`

**App works on desktop but not mobile**
- Check that your Vercel deployment succeeded
- Make sure you're using HTTPS (Vercel provides this automatically)
- Clear browser cache on mobile

**API rate limits**
- You're using Claude Pro's API allocation
- Monitor usage at https://console.anthropic.com
- Consider caching results for frequently requested matchups

---

## Security Notes

✅ **API Key is Secure:** Your API key is stored server-side only, never exposed to browsers
✅ **HTTPS:** Vercel provides free SSL certificates
✅ **CORS:** Configured to accept requests from your domain only

---

## Support

- **Anthropic API Docs:** https://docs.anthropic.com
- **Vercel Docs:** https://vercel.com/docs
- **Claude Console:** https://console.anthropic.com

---

## License

MIT License - Feel free to modify and use as you wish!

---

**Built with:**
- Claude Sonnet 4.5 (AI analysis)
- Express.js (Backend)
- Vanilla JavaScript (Frontend)
- Love for sports betting 🏀⚽🏈

Enjoy your picks! 🎯
