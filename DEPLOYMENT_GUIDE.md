# 🚀 Deployment Guide - Sophia Cipher Wealth

Complete step-by-step instructions to deploy your project to production.

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] No console errors or warnings in development
- [ ] All components render without errors
- [ ] Forms submit successfully
- [ ] Payment flows work in test mode
- [ ] Analytics events fire correctly
- [ ] Responsive design works on mobile
- [ ] All images load correctly
- [ ] No broken links

### Security
- [ ] `.env.local` is in `.gitignore` (never committed)
- [ ] All API keys are in `.env.local` (not in code)
- [ ] Secret keys are only in backend `.env`
- [ ] CORS properly configured
- [ ] HTTPS enabled in production
- [ ] No sensitive data in commit history
- [ ] Password fields use type="password"

### Performance
- [ ] Build completes without errors
- [ ] Bundle size is reasonable (< 500KB gzipped)
- [ ] Images optimized
- [ ] Code splitting working
- [ ] No memory leaks in React components
- [ ] API calls optimized (no unnecessary requests)

### API Keys Setup
- [ ] Supabase URL and key obtained
- [ ] Stripe public key obtained (pk_live_ for production)
- [ ] Google Analytics ID obtained
- [ ] All keys added to deployment platform's environment variables
- [ ] Backend keys stored securely (if applicable)

### Testing
- [ ] Unit tests passing (if applicable)
- [ ] Integration tests passing
- [ ] E2E tests passing (if applicable)
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Tested on different screen sizes

---

## 🏗️ Deployment Platforms

### Option 1: Vercel (Recommended) ⭐

**Best for:** React + Vite projects. Fastest deployment.

#### Steps:

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from your `.env.local`:
     ```
     VITE_SUPABASE_URL=...
     VITE_SUPABASE_ANON_KEY=...
     VITE_STRIPE_PUBLIC_KEY=...
     VITE_GOOGLE_ANALYTICS_ID=...
     VITE_GOOGLE_ADSENSE_ID=...
     VITE_APP_URL=https://your-domain.com
     ```
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

5. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS instructions from your domain provider

#### Vercel Production Checklist:
- [ ] Environment variables added
- [ ] Build succeeds (check logs)
- [ ] App loads without errors
- [ ] Forms and payments work
- [ ] Analytics tracking active
- [ ] Custom domain configured (optional)

---

### Option 2: Netlify

**Best for:** Developers who prefer Netlify. Good free tier.

#### Steps:

1. **Push code to GitHub** (same as Vercel)

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"

4. **Add Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Click "Edit variables"
   - Add all variables from `.env.local`
   - Trigger a new deploy

5. **Configure Domain**
   - Go to Domain management
   - Add your custom domain
   - Update DNS settings

#### Netlify Production Checklist:
- [ ] GitHub connected
- [ ] Build settings correct
- [ ] Environment variables added
- [ ] Build succeeds
- [ ] Production site works
- [ ] Analytics active

---

### Option 3: Self-Hosted (Advanced)

**Best for:** Full control, specific requirements.

#### Requirements:
- Node.js server or static hosting
- SSL certificate (get free one from Let's Encrypt)
- Domain name

#### Steps:

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload to server**
   ```bash
   # Using SSH/SCP
   scp -r build/* user@your-server.com:/var/www/your-app/
   ```

3. **Configure nginx/apache**
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com;
       
       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
       
       root /var/www/your-app;
       
       # Redirect all non-file requests to index.html
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Start SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔑 Setting Up API Keys for Production

### Supabase
1. Go to https://supabase.com
2. Create new project (or use existing)
3. Copy project URL from Settings → API
4. Copy "anon" public key
5. Add to deployment platform's environment variables

### Stripe
1. Go to https://dashboard.stripe.com
2. Switch to Live mode (toggle at top)
3. Copy Publishable Key (starts with `pk_live_`)
4. Add to environment variables
5. Save Secret Key in backend `.env` only

### Google Analytics
1. Go to https://analytics.google.com
2. Create new property or use existing
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add to `VITE_GOOGLE_ANALYTICS_ID`

### Other Services
- **Google AdSense:** https://adsense.google.com
- **Resend (Email):** https://resend.com
- **Twilio (SMS):** https://www.twilio.com

---

## 🧪 Testing Before Deployment

### Local Testing
```bash
# Run development server
npm start

# Test production build locally
npm run build
npm run serve
```

### In Staging
- Test all features
- Test on real phone
- Test slow network (DevTools → Throttling)
- Check console for errors
- Verify all API calls work

### Performance Check
```bash
# Check bundle size
npm run build

# Analyze build
npm install -g vite-plugin-visualizer
# Then check bundle analysis
```

---

## 📊 Post-Deployment

### Monitoring
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Set up alerts for errors
- [ ] Monitor analytics dashboard

### Analytics
- [ ] Track first page view
- [ ] Check real-time visitors
- [ ] Monitor key events (bookings, payments)
- [ ] Track bounce rate and user flow

### Backup
- [ ] Enable Supabase backups
- [ ] Set up database backups
- [ ] Document backup restoration process

### Updates
- [ ] Set up automatic dependency updates (Dependabot)
- [ ] Plan regular security audits
- [ ] Monitor for deprecated APIs
- [ ] Plan regular feature releases

---

## 🐛 Troubleshooting

### Build Fails
**Problem:** `npm run build` fails
- [ ] Check Node.js version (should be 14+)
- [ ] Delete `node_modules` and `package-lock.json`
- [ ] Run `npm install` again
- [ ] Check for syntax errors in console
- [ ] Try `npm cache clean --force`

### Environment Variables Not Working
**Problem:** Variables undefined in deployed app
- [ ] Verify all VITE_ prefixed (Vite exposes only VITE_)
- [ ] Redeploy after adding variables
- [ ] Check variable names match exactly
- [ ] Clear browser cache

### CORS Errors
**Problem:** API calls fail with CORS error
- [ ] Check backend CORS configuration
- [ ] Verify frontend domain is whitelisted
- [ ] Ensure HTTPS if production
- [ ] Check credentials are being sent

### Payment Not Working
**Problem:** Stripe integration fails in production
- [ ] Verify using pk_live_ key (not pk_test_)
- [ ] Check Stripe account is in Live mode
- [ ] Verify webhook endpoints configured
- [ ] Check for Stripe dashboard alerts

### Analytics Not Tracking
**Problem:** Google Analytics shows no data
- [ ] Verify GA ID is correct
- [ ] Wait 24-48 hours for data to appear
- [ ] Check GA real-time dashboard
- [ ] Verify analytics.js loaded (Network tab)

---

## 🔒 Security Checklist

### Before Going Live
- [ ] Never commit `.env.local` to git
- [ ] Use environment-specific variables
- [ ] Enable HTTPS everywhere
- [ ] Set security headers (Vercel/Netlify does this)
- [ ] Add rate limiting to API
- [ ] Validate all user input
- [ ] Use CSRF tokens for forms
- [ ] Enable HSTS (HTTP Strict Transport Security)
- [ ] Set Content Security Policy headers
- [ ] Enable bot protection if applicable

### After Going Live
- [ ] Monitor for security vulnerabilities
- [ ] Keep dependencies updated
- [ ] Review access logs regularly
- [ ] Set up security alerts
- [ ] Document security procedures
- [ ] Train team on security practices

---

## 📈 Performance Optimization

### Images
- Use optimized formats (WebP)
- Compress before uploading
- Use lazy loading for below-fold images

### Code
- Enable code splitting
- Remove unused packages
- Minimize CSS/JS bundles
- Use CDN for assets

### Server
- Enable gzip compression
- Set proper cache headers
- Use edge caching (Vercel/Netlify)
- Minify resources

---

## 🎯 Deployment Workflow

```
Local Development
    ↓
    ├─ Test features
    ├─ Test forms & payments
    ├─ Run: npm run build
    ├─ Test: npm run serve
    └─ Check for errors
    ↓
GitHub Commit & Push
    ↓
    ├─ Push to main branch
    └─ Trigger automatic deployment
    ↓
Deployment Platform (Vercel/Netlify)
    ↓
    ├─ Build runs
    ├─ Tests run (if configured)
    ├─ Deploy to production
    └─ DNS updated
    ↓
Production Live
    ↓
    ├─ Monitor errors
    ├─ Check analytics
    ├─ Verify payments working
    └─ Update status page
    ↓
✅ Done!
```

---

## 🚀 Quick Start Deployment (Vercel)

Fastest way to deploy in 5 minutes:

1. **Create GitHub repo and push code**
   ```bash
   git init && git add . && git commit -m "Initial" && git branch -M main
   ```

2. **Create Vercel account and import repo**
   - Go to vercel.com
   - Sign up with GitHub
   - Click "Import" on your repo

3. **Add environment variables**
   - Settings → Environment Variables
   - Paste all from .env.local

4. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your app is live! 🎉

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Tailwind Docs:** https://tailwindcss.com
- **Stripe Docs:** https://stripe.com/docs
- **Supabase Docs:** https://supabase.com/docs

---

## ✅ Final Checklist

Before clicking deploy:

- [ ] No console errors in dev mode
- [ ] `npm run build` succeeds
- [ ] `npm run serve` works
- [ ] All forms work
- [ ] Payment test works
- [ ] Images load
- [ ] Mobile responsive
- [ ] `.env.local` in `.gitignore`
- [ ] Environment variables configured on platform
- [ ] Domain name ready (optional)
- [ ] Error monitoring set up
- [ ] Analytics set up
- [ ] Backups configured

**You're ready to deploy! 🚀**

---

**Last Updated:** November 26, 2025  
**Project:** Sophia Cipher Wealth
