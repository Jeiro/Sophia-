# 🚀 Deployment Quick Start

This guide gets your project live in **5-10 minutes** using Vercel (recommended).

---

## ✅ Pre-Flight Check (2 minutes)

```bash
# 1. Test build locally
npm run build

# 2. Test production build
npm run serve

# 3. Verify no errors in console
# (Open http://localhost:4173)
```

**Expected:** Build completes, no errors, site works locally ✅

---

## 🎯 Deploy to Vercel (5 minutes)

### Step 1: Create GitHub Repository (2 min)

If you don't have one:
```bash
git init
git add .
git commit -m "Initial commit - ready for deployment"
git branch -M main

# Create empty repo on GitHub.com, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Step 2: Connect to Vercel (2 min)

1. Go to https://vercel.com
2. Sign up/Log in with GitHub
3. Click "New Project"
4. Select your repository
5. Click "Import"

### Step 3: Add Environment Variables (1 min)

In Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add these variables (copy from your `.env.local`):
   ```
   VITE_SUPABASE_URL = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJxxxxx
   VITE_STRIPE_PUBLIC_KEY = pk_live_xxxxx
   VITE_GOOGLE_ANALYTICS_ID = G-XXXXXXXX
   VITE_GOOGLE_ADSENSE_ID = ca-pub-xxxxxxxxx
   VITE_API_BASE_URL = https://api.yourdomain.com
   VITE_APP_URL = https://yourdomain.com
   ```
3. Click "Save"

### Step 4: Deploy! (0.5 min)

1. Click "Deploy"
2. Wait for build to complete (~2 minutes)
3. Get your live URL
4. Your site is live! 🎉

---

## 🌐 Add Custom Domain (Optional, 2 min)

In Vercel Dashboard:
1. Go to **Settings** → **Domains**
2. Enter your domain (e.g., `yourdomain.com`)
3. Follow DNS instructions from your registrar
4. Wait for DNS propagation (5-60 minutes)

---

## 📊 What Happens After Deploy

### First Hour
- [ ] Visit your live site
- [ ] Test all features work
- [ ] Check browser console for errors
- [ ] Test payment form (in test/sandbox mode if applicable)
- [ ] Verify analytics tracking

### First Day
- [ ] Monitor error logs (Vercel Dashboard → Functions)
- [ ] Check analytics for real traffic
- [ ] Monitor performance metrics
- [ ] Verify emails/SMS sending (if applicable)

### First Week
- [ ] Review user feedback
- [ ] Monitor for errors
- [ ] Optimize performance if needed
- [ ] Plan next release

---

## 🔄 Deploy Updates (After Initial Deploy)

Push new code:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel automatically redeploys! (Watch the build progress in Vercel Dashboard)

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs, verify .env vars, try `npm run build` locally |
| Variables undefined | Redeploy after adding to Vercel (Dashboard → Settings → Redeploy) |
| Site shows 404 | Verify build output folder is "build/" in vite.config.mjs |
| Styles missing | Check Tailwind configured, check CSS imports, check build logs |
| API calls fail | Check CORS, verify `VITE_API_BASE_URL`, check backend running |
| Payments not working | Use `pk_live_` keys in production, not `pk_test_` |

---

## 📱 Test on Mobile

Your live site: `https://your-project.vercel.app`

Open on phone and test:
- [ ] Pages load
- [ ] Forms work
- [ ] Responsive design works
- [ ] No horizontal scroll
- [ ] Touch targets easy to click

---

## 🎯 Alternative Platforms

### Netlify (Similar to Vercel)
1. Connect GitHub repo
2. Build: `npm run build`
3. Publish: `build`
4. Add environment variables
5. Deploy

### Self-Hosted
1. Build: `npm run build`
2. Upload `build/` folder to server
3. Configure web server (nginx/apache)
4. Enable HTTPS
5. Point domain DNS

---

## 🔐 Post-Deployment Security

- [ ] Never expose `.env.local` in code or logs
- [ ] Never use `pk_test_` keys in production
- [ ] Keep dependencies updated
- [ ] Monitor for security alerts
- [ ] Enable HTTPS everywhere (Vercel does this)
- [ ] Set up backup strategy

---

## 📚 Next Steps

After deployment:

1. **Monitor** - Watch for errors/issues
2. **Iterate** - Get user feedback, improve
3. **Optimize** - Speed up page loads
4. **Scale** - Add new features
5. **Maintain** - Keep dependencies updated

---

## ✨ You're Live!

Your project is now deployed! 

**Next:** Share with users, monitor analytics, celebrate! 🎉

---

**Questions?**
- Vercel Docs: https://vercel.com/docs
- Check Vercel Dashboard for logs
- See DEPLOYMENT_GUIDE.md for detailed help

**Last Updated:** November 26, 2025
