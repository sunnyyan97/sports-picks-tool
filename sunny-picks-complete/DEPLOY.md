# 5-Minute Deployment Guide for Vercel

## What You'll Need
1. Your Anthropic API key (from https://console.anthropic.com/settings/keys)
2. A GitHub account (free at https://github.com)
3. That's it!

## Step-by-Step Instructions

### Step 1: Get Your API Key (2 minutes)

1. Go to https://console.anthropic.com/settings/keys
2. Click "Create Key" 
3. Give it a name like "Sunnys Expert Picks"
4. Click Create
5. **COPY THE KEY** (starts with `sk-ant-...`) - you'll need this in Step 4

### Step 2: Create a GitHub Repository (2 minutes)

1. Go to https://github.com and sign in (or create free account)
2. Click the "+" in the top right → "New repository"
3. Name it: `sunnys-expert-picks`
4. Make it Public or Private (your choice)
5. Click "Create repository"
6. Follow GitHub's instructions to upload your files:
   ```bash
   # On your computer, in the project folder:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/sunnys-expert-picks.git
   git push -u origin main
   ```

### Step 3: Deploy to Vercel (1 minute)

1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel
4. Click "Import Project"
5. Find and select your `sunnys-expert-picks` repository
6. Click "Import"

### Step 4: Add Your API Key (30 seconds)

1. On the Vercel import screen, scroll to "Environment Variables"
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Paste your API key from Step 1
3. Click "Add"
4. Click "Deploy"

### Step 5: Wait for Deployment (30 seconds)

Vercel will build and deploy your app. You'll see a confetti animation when it's done! 🎉

### Step 6: Get Your URL

Once deployed, Vercel gives you a URL like:
```
https://sunnys-expert-picks.vercel.app
```

**Save this URL!** This is your app's permanent address.

### Step 7: Test on Mobile

1. Open Safari on your iPhone (or Chrome on Android)
2. Go to your Vercel URL
3. Make a pick!
4. (Optional) Add to Home Screen for easy access

---

## What If Something Goes Wrong?

**Build Failed?**
- Check that all files are in the repository
- Make sure `vercel.json` is in the root directory

**API Key Error?**
- Go to your Vercel dashboard → Your Project → Settings → Environment Variables
- Make sure `ANTHROPIC_API_KEY` is set correctly
- Redeploy the project

**Still Not Working?**
- Check the Vercel deployment logs
- Make sure your Claude Pro subscription is active
- Try redeploying

---

## Pro Tips

### Custom Domain
Want `picks.yourdomain.com` instead of the Vercel URL?
1. Go to your Vercel project → Settings → Domains
2. Add your custom domain
3. Follow the DNS instructions

### Auto-Deploy
Every time you push to GitHub, Vercel automatically redeploys!
```bash
# Make changes, then:
git add .
git commit -m "Updated styles"
git push
# Vercel auto-deploys in 30 seconds!
```

### Monitor Usage
Check your Claude API usage:
- https://console.anthropic.com → Usage

---

## Alternative: One-Click Deploy

If Git seems complicated, use this method:

1. Download all project files as a ZIP
2. Go to https://vercel.com/new
3. Drag and drop the folder
4. Add environment variable `ANTHROPIC_API_KEY`
5. Deploy!

---

## You're Done! 🎉

Your sports betting picks app is now:
- ✅ Live on the internet
- ✅ Works on mobile, tablet, desktop
- ✅ Secure (API key hidden server-side)
- ✅ Fast (served from Vercel's CDN)
- ✅ Free (Vercel free tier is generous!)

Share your URL with friends and enjoy making picks! 🏀
