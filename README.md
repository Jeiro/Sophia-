# Sophia Cipher Wealth - Complete Project Guide

A modern React-based project with **11 professional integrations** for database, payments, analytics, email, SMS, and AI services.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Copy Environment Template
```bash
cp .env.local.example .env.local
```

### Step 2: Add Your First API Key
```env
# Get from supabase.com
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

### Step 3: Install Packages
```bash
npm install @supabase/supabase-js @stripe/react-stripe-js @stripe/js axios
npm start
```

### Step 4: Test Connection
Check browser console for Supabase connection confirmation.

---

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- API accounts (start with Supabase - free tier available)

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # Integration modules
│   ├── supabase.js     # Database & Auth
│   ├── stripe.js       # Payments
│   ├── analytics.js    # Google Analytics
│   ├── adsense.js      # Google AdSense
│   ├── aiApis.js       # AI Services
│   └── communication.js# Email & SMS
├── hooks/              # Custom React hooks
│   ├── useSupabase.js  # Auth & data
│   ├── useStripe.js    # Payments
│   └── useExternal.js  # AI & Communication
├── styles/             # Global styles
├── App.jsx             # Main app component
├── Routes.jsx          # Application routes
└── index.jsx           # Entry point

.env.local             # Environment variables (create from .env.local.example)
tailwind.config.js     # Tailwind CSS config
vite.config.mjs        # Vite config
package.json           # Dependencies
```

---

## 🔧 Available Services

### 🔴 CRITICAL (Implement First)
1. **Supabase** - Database & Authentication
2. **Google Analytics** - User tracking

### 🟡 HIGH PRIORITY (Implement Second)
3. **Stripe** - Payment processing
4. **Resend** - Email service

### 🟢 MEDIUM PRIORITY (Implement Third)
5. **Twilio** - SMS messaging
6. **Google AdSense** - Ad revenue

### 🔵 OPTIONAL (Implement Last)
7. **OpenAI** - ChatGPT integration
8. **Anthropic** - Claude AI
9. **Google Gemini** - Google's AI
10. **Perplexity** - Web search AI

---

## 📖 How to Use Each Service

### Import Services or Use Hooks

```javascript
// Option 1: Direct service imports
import { authService, dbService } from '../services/supabase';
import { stripeService, getStripeInstance } from '../services/stripe';
import { analyticsService } from '../services/analytics';
import { adSenseService } from '../services/adsense';
import { aiService } from '../services/aiApis';
import { communicationService } from '../services/communication';

// Option 2: Use React Hooks (Recommended)
import { useSupabaseAuth, useSupabaseData } from '../hooks/useSupabase';
import { useStripe } from '../hooks/useStripe';
import { useAI, useCommunication } from '../hooks/useExternal';
```

### Common Code Examples

#### Authentication
```jsx
import { useSupabaseAuth } from '../hooks/useSupabase';

function LoginComponent() {
  const { signIn, user, loading } = useSupabaseAuth();
  
  const handleLogin = async (email, password) => {
    await signIn(email, password);
  };

  return user ? <div>Welcome, {user.email}!</div> : <LoginForm />;
}
```

#### Database Queries
```jsx
import { useSupabaseData } from '../hooks/useSupabase';

function BookingsList() {
  const { data: bookings, loading } = useSupabaseData('bookings');
  
  if (loading) return <div>Loading...</div>;
  return <div>{bookings.map(b => <div key={b.id}>{b.title}</div>)}</div>;
}
```

#### Stripe Payments
```jsx
import { useStripe } from '../hooks/useStripe';

function PaymentForm() {
  const { stripe, createPaymentIntent } = useStripe();
  
  const handlePayment = async (amount) => {
    const { clientSecret } = await createPaymentIntent(amount * 100, 'usd');
    // Use clientSecret with Stripe Payment Element
  };

  return <button onClick={() => handlePayment(99.99)}>Pay $99.99</button>;
}
```

#### Email Sending
```jsx
import { useCommunication } from '../hooks/useExternal';

function ContactForm() {
  const { sendEmail, loading } = useCommunication();
  
  const handleSubmit = async (data) => {
    await sendEmail(
      'contact@yourdomain.com',
      'New Contact Submission',
      `<h1>From: ${data.email}</h1><p>${data.message}</p>`
    );
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

#### SMS Sending
```jsx
import { communicationService } from '../services/communication';

// Send SMS (Backend/Environment setup required)
await communicationService.sms.send('+1234567890', 'Your message here');
```

#### Analytics Tracking
```jsx
import { analyticsService } from '../services/analytics';

// Track page view
analyticsService.trackPageView('/booking');

// Track custom event
analyticsService.trackEvent('booking_completed', {
  consultationId: '123',
  amount: 9999,
  currency: 'usd'
});
```

#### AI Chat
```jsx
import { useAI } from '../hooks/useExternal';

function ChatComponent() {
  const { chat, loading } = useAI();
  
  const handleChat = async (messages) => {
    const response = await chat(messages, 'openai'); // or 'claude', 'gemini'
    return response;
  };

  return <ChatInterface onSendMessage={handleChat} />;
}
```

---

## 🔒 Environment Variables Required

### Frontend (.env.local - Public)
```env
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyXxxxx

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx

# Google Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Google AdSense
VITE_GOOGLE_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx

# Backend API
VITE_API_BASE_URL=http://localhost:3001
```

### Backend (.env - Secret Keys Only)
```env
# Never use these in frontend!
STRIPE_SECRET_KEY=sk_live_xxxxx
OPENAI_API_KEY=sk-xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx
GEMINI_API_KEY=xxxxx
PERPLEXITY_API_KEY=xxxxx
RESEND_API_KEY=re_xxxxx
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
```

---

## 🏗️ Architecture Overview

```
FRONTEND (React + Vite)
├── Components use Hooks
├── Hooks call Services
├── Services use API keys from .env
└── Public keys only (pk_*, anon_key)

↓ (HTTPS Connection)

BACKEND (Node.js Express)
├── Handles all secret operations
├── Stores secret API keys
├── Validates requests from frontend
└── Returns processed data

↓ (Secure API Connection)

EXTERNAL SERVICES
├── Supabase (Database)
├── Stripe (Payments)
├── Resend (Email)
├── Twilio (SMS)
├── OpenAI, Anthropic, Gemini, Perplexity (AI)
├── Google Analytics (Tracking)
└── Google AdSense (Ads)
```

---

## 🎯 Implementation Roadmap

### Week 1: Foundation (8 hours)
- [ ] Set up Supabase account (free tier)
- [ ] Configure Supabase credentials in `.env.local`
- [ ] Test Supabase connection
- [ ] Set up Google Analytics
- [ ] Add Analytics tracking to pages

**Cost:** Free

### Week 2: Revenue (12 hours)
- [ ] Create Stripe account
- [ ] Add Stripe payment form to checkout
- [ ] Test payment processing (test mode)
- [ ] Set up Resend for emails
- [ ] Create and send confirmation emails

**Cost:** $0 (Stripe charges only on transactions)

### Week 3: Notifications (4 hours)
- [ ] Set up Twilio account (optional)
- [ ] Add SMS verification
- [ ] Add booking reminders

**Cost:** $1-10/month

### Week 4: Monetization (2 hours)
- [ ] Apply for Google AdSense
- [ ] Add ad slots to pages
- [ ] Configure ad preferences

**Cost:** Free (revenue sharing)

---

## 🛠️ Complete Booking Flow Example

```
┌─────────────────────────────────────────────┐
│ 1. USER VISITS BOOKING PAGE                 │
├─────────────────────────────────────────────┤
│ - Analytics: page_view                      │
│ - AdSense: load ads                         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 2. USER FILLS BOOKING FORM & SUBMITS        │
├─────────────────────────────────────────────┤
│ - Save booking to Supabase                  │
│ - Create Stripe PaymentIntent               │
│ - Show Stripe payment form                  │
│ - Analytics: booking_started                │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 3. USER COMPLETES PAYMENT                   │
├─────────────────────────────────────────────┤
│ - Stripe confirms payment                   │
│ - Update Supabase: status = "confirmed"     │
│ - Analytics: booking_paid                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 4. SEND CONFIRMATIONS (Backend)             │
├─────────────────────────────────────────────┤
│ - Send email via Resend                     │
│ - Send SMS via Twilio                       │
│ - Analytics: confirmation_sent              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 5. BOOKING COMPLETE                         │
├─────────────────────────────────────────────┤
│ - Show success page                         │
│ - User receives email + SMS                 │
└─────────────────────────────────────────────┘
```

---

## 📊 Service Comparison & Costs

| Service | Purpose | Free Tier | Monthly Cost |
|---------|---------|-----------|--------------|
| Supabase | Database & Auth | 500MB | $0-100+ |
| Stripe | Payments | Test mode | 2.9% + $0.30 |
| Google Analytics | Tracking | Unlimited | Free |
| Google AdSense | Ads | Revenue share | Revenue share |
| Resend | Email | 100/month | $0-99+ |
| Twilio | SMS | Trial credits | $0.0075/SMS |
| OpenAI | ChatGPT | Pay per use | $0.002-0.015/token |
| Anthropic | Claude | Pay per use | $3-15/M tokens |
| Gemini | Google AI | Free tier | Free-pay per use |
| Perplexity | Search AI | Pay per use | $0.015/call |

**Estimated monthly cost:** Free → $500+ (depending on usage)

---

## 🎯 Where to Get API Keys

| Service | URL | Notes |
|---------|-----|-------|
| Supabase | https://supabase.com | Create free project |
| Stripe | https://dashboard.stripe.com | Test mode first |
| Google Analytics | https://analytics.google.com | Connect property |
| Google AdSense | https://adsense.google.com | Requires approval |
| Resend | https://resend.com | Free tier: 100/month |
| Twilio | https://www.twilio.com | Free trial credits |
| OpenAI | https://platform.openai.com | Add payment method |
| Anthropic | https://console.anthropic.com | Beta access |
| Gemini | https://ai.google.dev | Free tier available |
| Perplexity | https://perplexity.ai | Check API docs |

---

## ✅ Pre-Launch Checklist

- [ ] All API keys added to `.env.local`
- [ ] `.env.local` is in `.gitignore` (never commit secrets!)
- [ ] Backend server created and running (if needed)
- [ ] Supabase connection tested
- [ ] Stripe test mode working
- [ ] Email template created
- [ ] SMS verified (if using)
- [ ] Analytics tracking active
- [ ] CORS configured
- [ ] Error handling in place
- [ ] Rate limiting enabled
- [ ] HTTPS enabled (production)

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Supabase undefined | Restart dev server after adding .env vars |
| Stripe not loading | Check public key has `pk_` prefix, restart server |
| Analytics not tracking | Wait 5 min, check GA Real-Time dashboard |
| Backend not responding | Check CORS, verify URL in .env, restart backend |
| Email not sending | Verify API key is correct, check spam folder |
| SMS not sending | Check phone format (+1234567890), verify key |
| AI API errors | Confirm backend has correct API key |
| 404 errors | Check routes in Routes.jsx |

---

## 🏃 Installation & Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Add your API keys to .env.local

# Start development server
npm start

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📚 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TailwindCSS** - Styling
- **React Router v6** - Navigation
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling
- **Framer Motion** - Animations
- **D3.js & Recharts** - Data visualization
- **Supabase** - Database & Auth
- **Stripe** - Payments

---

## 🎓 Common Questions

**Q: Do I need a backend?**
A: Only for: OpenAI, Anthropic, Gemini, Perplexity, Resend, Twilio. Frontend-only works for: Supabase, Stripe, Analytics.

**Q: Which service should I add first?**
A: Supabase - it's your database. You need it for everything.

**Q: Can I skip some services?**
A: Yes! Start with the 5 essentials: Supabase, Analytics, Stripe, Resend, Twilio.

**Q: Is this secure?**
A: Yes! All secrets stay on backend. Frontend only sees public keys. Never commit `.env.local`.

**Q: How do I test payments?**
A: Use Stripe test mode (test cards provided). Don't use real cards during development.

**Q: What if I need more storage than Supabase free tier?**
A: Upgrade plan or move to PostgreSQL on Render/Railway.

---

## 📞 Getting Help

1. **Check error messages** - They usually tell you what's wrong
2. **Read relevant service docs** - Links provided above
3. **Test in console** - Use browser DevTools to debug
4. **Verify API keys** - Most errors are incorrect credentials
5. **Restart server** - Fixes many .env issues

---

## 🚀 Ready to Deploy?

### Frontend Deployment Options
- **Vercel** (Recommended) - Best for Vite + React
- **Netlify** - Great alternative
- **GitHub Pages** - Free but limited

### Backend Deployment Options
- **Vercel** - Serverless functions
- **Railway** - Simple Docker deployment
- **Render** - Generous free tier
- **Heroku** - Easy but paid

### Database
- **Supabase** - All included

---

## 🎉 You're Ready!

Everything is set up. All integrations are ready to use. Pick one from the priority list and start building!

**Next Steps:**
1. Choose a service (start with Supabase)
2. Get API keys from their website
3. Add to `.env.local`
4. Copy code examples above
5. Test in your components
6. Deploy when ready

Good luck! 🚀

---

**Project:** Sophia Cipher Wealth  
**Last Updated:** November 26, 2025  
**Version:** 1.0
