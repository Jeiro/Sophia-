# 💻 EXACT TERMINAL COMMANDS

Copy-paste these exact commands in order. Don't skip any!

---

## 📋 SUMMARY

```
Total setup time: ~2 hours
Services: 4 (Supabase, Google Analytics, Stripe, Resend)
Result: Production-ready integrations ready for features
```

---

## ⏱️ STEP 1: PREPARE (5 minutes)

### 1.1 Open your project in VS Code
```bash
# Already in project? Skip this
# If not, navigate to your project folder
cd "C:\Users\Damian Ejiro Onos\Desktop\New pof"
```

### 1.2 Make sure you have .env.local (copy the template)
```bash
# In PowerShell or command line, in your project root:
copy .env.local.example .env.local
```

If `.env.local.example` doesn't exist, create it manually with content from `COPY_PASTE_CODE.md`

---

## ⏱️ STEP 2: INSTALL PACKAGES (10 minutes)

### 2.1 Install frontend packages
```bash
# Make sure you're in project root
npm install @supabase/supabase-js @stripe/react-stripe-js @stripe/js axios
```

**Expected output:** Should show `added X packages` (no errors)

### 2.2 Verify installation
```bash
npm list @supabase/supabase-js
npm list @stripe/react-stripe-js
```

Both should show version numbers ✅

---

## ⏱️ STEP 3: CONFIGURE SUPABASE (30 minutes)

### 3.1 Get Supabase credentials
**Do this manually:**
1. Go to https://supabase.com
2. Sign up → Create project → Copy URL and API key
3. Keep them handy

### 3.2 Add to .env.local
**Edit .env.local and add:**
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_LONG_KEY_HERE
```

Replace YOUR_PROJECT_ID and YOUR_LONG_KEY_HERE with actual values

### 3.3 Create database tables
**Do this manually:**
1. In Supabase dashboard → SQL Editor → New Query
2. Copy entire SQL from `COPY_PASTE_CODE.md` section "SUPABASE - Create Tables"
3. Paste and click "Run"
4. Should see "Success" ✅

### 3.4 Restart development server
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm start
```

**Should see:** `VITE v5.0.0 ready in XXX ms`

---

## ⏱️ STEP 4: CONFIGURE GOOGLE ANALYTICS (15 minutes)

### 4.1 Get Google Analytics ID
**Do this manually:**
1. Go to https://analytics.google.com
2. Sign up → Create account & property
3. Get Measurement ID (looks like: G-XXXXXXXXXX)
4. Keep it handy

### 4.2 Add to .env.local
**Edit .env.local and add:**
```
VITE_GOOGLE_ANALYTICS_ID=G-YOUR_ID_HERE
```

### 4.3 Restart dev server
```bash
# Ctrl+C to stop
npm start
```

### 4.4 Test analytics (in browser console)
```javascript
// Open DevTools (F12) → Console → paste:
if (window.gtag) {
  console.log('✅ Google Analytics loaded!');
  gtag('event', 'test_event', {test: true});
} else {
  console.log('❌ Analytics not loaded');
}
```

---

## ⏱️ STEP 5: SETUP BACKEND (45 minutes)

### 5.1 Create backend folder
```bash
# In your project root
mkdir backend
cd backend
```

### 5.2 Initialize Node project
```bash
npm init -y
```

**Expected:** Creates `package.json`

### 5.3 Install backend packages
```bash
npm install express cors dotenv stripe resend
```

**Expected:** `added X packages`

### 5.4 Create server.js
```bash
# Still in backend folder
# Copy entire code from COPY_PASTE_CODE.md "BACKEND - Complete server.js File"
# Create new file: backend/server.js
# Paste the code
```

### 5.5 Create .env file
```bash
# Create backend/.env file
# Add this content:
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:4028
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
RESEND_API_KEY=re_YOUR_KEY_HERE
```

### 5.6 Update backend package.json
**Edit backend/package.json and add this script section:**
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

(Just add it after `"type": "module"` line)

### 5.7 Get Stripe Secret Key
**Do this manually:**
1. Go to https://dashboard.stripe.com
2. Go to Developers → API Keys
3. Copy Secret Key (starts with sk_test_)
4. Paste in backend/.env

### 5.8 Get Resend API Key
**Do this manually:**
1. Go to https://resend.com
2. Sign up → API Keys → Create key
3. Copy key (starts with re_)
4. Paste in backend/.env

### 5.9 Test backend
```bash
# In backend folder:
node server.js
```

**Expected output:** `Backend server running on port 3001`

### 5.10 Test backend health check
**In another terminal (while backend is running):**
```bash
curl http://localhost:3001/health
```

**Expected:** `{"status":"OK",...}`

---

## ⏱️ STEP 6: CONFIGURE FRONTEND FOR BACKEND (5 minutes)

### 6.1 Add backend URL to .env.local
**Edit .env.local and add:**
```
VITE_API_BASE_URL=http://localhost:3001
```

### 6.2 Add Stripe Public Key
**Edit .env.local and add:**
```
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
```

Get this from https://dashboard.stripe.com (Developers → API Keys)

### 6.3 Your complete .env.local should now look like:
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=ey...
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
VITE_GOOGLE_ANALYTICS_ID=G-xxx
VITE_API_BASE_URL=http://localhost:3001
```

### 6.4 Restart frontend server
```bash
# In main project folder (not backend)
npm start
```

---

## ⏱️ STEP 7: RUN BOTH SERVERS (ongoing)

### 7.1 Terminal 1: Frontend
```bash
# Terminal 1 - Main project folder
npm start
```

Should show: `http://localhost:4028/`

### 7.2 Terminal 2: Backend
```bash
# Terminal 2 - Open new terminal, cd backend folder
cd backend
node server.js
```

Should show: `Backend server running on port 3001`

**Keep both running during development!**

---

## ⏱️ STEP 8: TEST INTEGRATIONS (15 minutes)

### 8.1 Test Supabase
```bash
# In browser console (F12):
import { supabase } from './src/services/supabase.js';
const { data } = await supabase.from('users').select('*');
console.log(data);
```

Should return: `[]` (empty array, which is correct)

### 8.2 Test Google Analytics
```bash
# In browser console:
if (window.gtag) {
  console.log('✅ Analytics ready');
} else {
  console.log('❌ Not loaded');
}
```

Should show: `✅ Analytics ready`

### 8.3 Test Stripe
```bash
# In browser console:
import { getStripeInstance } from './src/services/stripe.js';
const stripe = await getStripeInstance();
console.log('Stripe:', !!stripe);
```

Should show: `Stripe: true`

### 8.4 Test Backend Connection
```bash
# In browser console:
const res = await fetch('http://localhost:3001/health');
const data = await res.json();
console.log(data);
```

Should show: `{status: "OK", ...}`

### 8.5 Test Email Sending
```bash
# In browser console:
const res = await fetch('http://localhost:3001/api/communication/email/send', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    to: 'your-email@gmail.com',
    subject: 'Test Email',
    html: '<h1>Test</h1>'
  })
});
const data = await res.json();
console.log(data);
```

Should return email ID, check your inbox for email ✅

### 8.6 Test Stripe Payment Intent
```bash
# In browser console:
const res = await fetch('http://localhost:3001/api/payments/create-intent', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({amount: 2000, currency: 'usd'})
});
const data = await res.json();
console.log(data.clientSecret);
```

Should return a client secret ✅

---

## 🎯 QUICK REFERENCE: What to Run

### Development (Every time you work)

**Terminal 1 (Frontend):**
```bash
cd "C:\Users\Damian Ejiro Onos\Desktop\New pof"
npm start
```

**Terminal 2 (Backend):**
```bash
cd "C:\Users\Damian Ejiro Onos\Desktop\New pof\backend"
node server.js
```

---

## 🚨 TROUBLESHOOTING COMMANDS

### If frontend won't start:
```bash
# Clear cache and reinstall
rm -r node_modules
npm install
npm start
```

### If port 4028 in use:
```bash
# Kill the process using port 4028
npx kill-port 4028
npm start
```

### If port 3001 in use:
```bash
# Kill the process using port 3001
npx kill-port 3001
cd backend
node server.js
```

### If packages conflict:
```bash
# Clear and reinstall everything
cd backend
rm -r node_modules
npm install
node server.js
```

---

## ✅ SUCCESS CHECKLIST

Run these to verify everything works:

```bash
# 1. Frontend starts without errors
npm start
# ✅ Check: Can visit http://localhost:4028

# 2. Backend starts without errors  
cd backend && node server.js
# ✅ Check: Shows "Backend server running on port 3001"

# 3. Backend health check works
curl http://localhost:3001/health
# ✅ Check: Returns JSON with "status":"OK"

# 4. Can reach backend from frontend
# ✅ Check: Browser console - no CORS errors

# 5. All .env variables filled
# ✅ Check: echo %VITE_SUPABASE_URL% shows value
```

---

## 📋 FINAL CHECKLIST

Before you start building features:

- [ ] npm start works (frontend on port 4028)
- [ ] node server.js works (backend on port 3001)
- [ ] Both terminals show no errors
- [ ] .env.local has all 5 variables filled
- [ ] backend/.env has STRIPE_SECRET_KEY and RESEND_API_KEY
- [ ] Supabase tables created (check dashboard)
- [ ] Google Analytics showing real-time visits
- [ ] Test email received in inbox
- [ ] Backend health check returns success
- [ ] Browser console shows no errors

**All checked?** ✅ **You're ready to build!** 🚀

---

## 🎓 WHAT EACH COMMAND DOES

| Command | What it does | When to run |
|---------|------------|-----------|
| `npm install X` | Installs package | Once per package |
| `npm start` | Starts frontend dev server | Every dev session |
| `node server.js` | Starts backend | Every dev session |
| `npm init -y` | Creates package.json | Once per project |
| `mkdir X` | Creates folder | Once |
| `copy X Y` | Copies file | Once |
| `curl URL` | Tests endpoint | When debugging |

---

**You're all set! Copy-paste these commands and everything will work!** ✅
