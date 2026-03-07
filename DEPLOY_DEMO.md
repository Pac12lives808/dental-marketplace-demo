# Dental Marketplace Demo — Netlify Deployment Guide

Created: March 6, 2026
Purpose: Deploy the static demo site to Netlify for free, without any AWS dependency.

---

## Required Files

Before deploying, verify these files exist in the `dental-marketplace-demo` folder:

- `index.html` — Main landing page
- `style.css` — Stylesheet
- `get-started.html` — Onboarding page
- `submit.html` — Bid submission form
- `success.html` — Confirmation/success page
- `office-dashboard.html` — Office dashboard view

All links between pages must use **relative paths** (e.g. `href="get-started.html"`), NOT absolute paths (e.g. `href="http://localhost:3000/get-started.html"`).

---

## Option A: Deploy via Netlify Drop (No Account Needed)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the entire `dental-marketplace-demo` folder
3. Netlify will instantly generate a public URL like `https://random-name.netlify.app`
4. Share that URL immediately

---

## Option B: Deploy via Netlify with Account (Recommended for Persistence)

1. Go to [https://netlify.com](https://netlify.com)
2. Sign up or log in (free tier is sufficient)
3. Click **"Add new site"**
4. Choose **"Deploy manually"**
5. Drag the `dental-marketplace-demo` folder into the upload zone
6. Netlify generates a public URL (e.g. `https://dental-dash-demo.netlify.app`)
7. Optionally rename the site under **Site Settings > Site Name**

---

## Option C: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from the project folder
cd dental-marketplace-demo
netlify deploy --prod --dir .
```

---

## Option D: Connect to GitHub for Auto-Deploy

1. Push `dental-marketplace-demo` to GitHub (already done at https://github.com/Pac12lives808/dental-marketplace-demo)
2. Go to [https://netlify.com](https://netlify.com) and click **"Add new site"**
3. Choose **"Import an existing project"**
4. Connect to GitHub
5. Select `Pac12lives808/dental-marketplace-demo`
6. Set build command: *(leave blank for static sites)*
7. Set publish directory: `.` (root)
8. Click **Deploy site**

Every push to `main` will auto-deploy.

---

## Pre-Deploy Checklist

- [ ] All 6 HTML files exist in the folder
- [ ] No links use `localhost` or AWS URLs
- [ ] All CSS/JS references use relative paths
- [ ] `index.html` loads correctly when opened directly in a browser
- [ ] Navigation between pages works without a web server

---

## GitHub Repository

https://github.com/Pac12lives808/dental-marketplace-demo

---

## Free Hosting Alternatives

| Platform | Free Tier | Notes |
|---|---|---|
| Netlify | Yes (100GB bandwidth/mo) | Easiest drag-and-drop |
| GitHub Pages | Yes | Free from this repo |
| Vercel | Yes | Also supports static sites |
| Cloudflare Pages | Yes | Fast global CDN |

### GitHub Pages Alternative

1. Go to repo Settings > Pages
2. Set Source: main branch, root folder
3. GitHub will publish at: `https://pac12lives808.github.io/dental-marketplace-demo/`
