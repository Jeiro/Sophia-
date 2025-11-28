# Sophia Cipher Wealth - Crypto Trading & Real Estate Investment Platform

Production-ready web application built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server
npm start

# Production build
npm run build:prod

# Preview production build
npm run preview
```

## 📋 Requirements

- Node.js 16+
- npm 8+

## 🌐 Deployment

The application is optimized for deployment on:
- Netlify (recommended)
- Vercel
- AWS Amplify
- Any static hosting with SPA support

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Email Service
VITE_RESEND_API_KEY=your-resend-key
VITE_BUSINESS_EMAIL=your-email@example.com
VITE_ADMIN_EMAIL=admin@example.com

# Analytics
VITE_GOOGLE_ANALYTICS_ID=your-ga-id

# Database (Optional)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key

# Payments (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-key
VITE_PAYSTACK_PUBLIC_KEY=your-paystack-key

# API Gateway (For backend services)
VITE_API_BASE_URL=http://localhost:3001
```

## 📁 Project Structure

```
src/
├── pages/           # Page components
├── components/      # Reusable components
├── services/        # API services
├── hooks/           # Custom React hooks
├── styles/          # Global styles
└── utils/           # Utility functions

build/              # Production build output
Public/             # Static assets
```

## ✨ Features

- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 📊 Data visualization with Recharts
- 🔒 Environment variable management
- 📧 Email service integration (Resend)
- 💳 Payment processing (Stripe, Paystack)
- 🔐 Supabase authentication (optional)
- 📈 Google Analytics integration
- ⚡ Code splitting & optimization

## 🔍 Code Quality

- ✅ Production-safe logging (logger.js)
- ✅ Error boundary for crash handling
- ✅ Proper async/await patterns
- ✅ Clean component structure
- ✅ Optimized bundle size (~405 KB)

## 🚀 Building for Production

```bash
# Build optimized production version
npm run build:prod

# The build output is in the 'build/' directory
# It's ready for deployment
```

## 📝 Configuration Files

- `vite.config.mjs` - Build configuration with code splitting
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins
- `netlify.toml` - Netlify deployment config
- `jsconfig.json` - JavaScript path aliases

## 🔐 Security

- API keys stored in environment variables
- No sensitive data in client code
- CORS configured for allowed origins
- Security headers configured in netlify.toml

## 📞 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify environment variables are set
3. Check build output for warnings
4. Review component error boundary messages

## 📄 License

All rights reserved. Proprietary software.

---

**Status:** ✅ Production Ready | Last Updated: November 2025
