# 🚀 COMPLETE PAYMENT & EMAIL SETUP - Quick Start

You now have:
- ✅ Crypto payments (USDT, BTC)
- ✅ Apple Card manual verification
- ✅ Admin dashboard to verify payments
- ✅ Email confirmations via Resend

---

## **QUICK SETUP (15 minutes)**

### **Step 1: Install All Packages**

In backend folder:
```bash
npm install resend multer uuid axios
```

### **Step 2: Create backend/.env**

```env
# Server
PORT=3001

# Crypto Wallets
USDT_WALLET_ADDRESS=0x...your_polygon_address...
BTC_WALLET_ADDRESS=bc1...your_bitcoin_address...

# Resend Email
RESEND_API_KEY=re_...get_from_resend_dashboard...
BUSINESS_EMAIL=payments@sophiacipherwealth.com
ADMIN_EMAIL=admin@sophiacipherwealth.com
APP_URL=http://localhost:4028
```

### **Step 3: Add Backend Code**

Copy the code from `CRYPTO_BACKEND_SETUP.md` into `backend/server.js`
Copy the code from `RESEND_SETUP.md` into `backend/server.js`

### **Step 4: Setup Supabase Tables**

Copy SQL from `CRYPTO_SETUP.md` and run in Supabase SQL Editor

### **Step 5: Create Database Endpoints**

Add these to `backend/server.js`:

```javascript
// List Apple Card payments
app.get('/api/payments/apple-card/list', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('apple_card_payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Crypto payments
app.get('/api/payments/crypto/list', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('crypto_payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **Step 6: Create Resend Account**

1. Go to: https://resend.com
2. Sign up
3. Copy API key to `backend/.env`

### **Step 7: Restart Backend**

```bash
node server.js
```

Should see: `Backend running on port 3001` ✅

---

## **HOW TO USE IN YOUR APP**

### **1. In Booking Page - Show Payment Options**

```jsx
import { useState } from 'react';
import { CryptoPaymentForm } from './components/CryptoPaymentForm';
import { AppleCardPaymentForm } from './components/AppleCardPaymentForm';

export function BookingPage() {
  const [paymentMethod, setPaymentMethod] = useState('crypto'); // or 'apple-card'

  return (
    <div>
      <h2>Choose Payment Method</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <button
          onClick={() => setPaymentMethod('crypto')}
          style={{
            flex: 1,
            padding: '15px',
            backgroundColor: paymentMethod === 'crypto' ? '#0052FF' : '#f0f0f0',
            color: paymentMethod === 'crypto' ? 'white' : 'black',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🪙 Crypto (USDT, BTC)
        </button>
        
        <button
          onClick={() => setPaymentMethod('apple-card')}
          style={{
            flex: 1,
            padding: '15px',
            backgroundColor: paymentMethod === 'apple-card' ? '#000' : '#f0f0f0',
            color: paymentMethod === 'apple-card' ? 'white' : 'black',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🍎 Apple Card
        </button>
      </div>

      {paymentMethod === 'crypto' && (
        <CryptoPaymentForm
          amount={100}
          orderId={`booking_${Date.now()}`}
          onSuccess={(payment) => {
            console.log('Crypto payment:', payment);
            // Send confirmation email
          }}
        />
      )}

      {paymentMethod === 'apple-card' && (
        <AppleCardPaymentForm
          amount={100}
          orderId={`booking_${Date.now()}`}
          onSuccess={(payment) => {
            console.log('Apple Card payment:', payment);
            // Show success message
          }}
        />
      )}
    </div>
  );
}
```

### **2. Create Admin Page**

```jsx
import { AdminPaymentDashboard } from './components/AdminPaymentDashboard';

export function AdminPage() {
  return (
    <div>
      <AdminPaymentDashboard />
    </div>
  );
}
```

---

## **TESTING PAYMENTS**

### **Test Apple Card Payment:**

1. Open booking page
2. Select "Apple Card"
3. Fill in:
   - Last 4: `1234`
   - Name: `Test User`
   - Image: Any screenshot
4. Click Submit
5. Go to admin dashboard
6. Review payment
7. Click Approve/Reject
8. Check your email ✅

### **Test Crypto Payment:**

1. Open booking page
2. Select "Crypto"
3. Choose USDT or BTC
4. Get payment address
5. **Don't actually send money yet** - just test the flow
6. Check if address displays correctly

### **Test Email:**

```bash
curl -X POST http://localhost:3001/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com"}'
```

---

## **PRODUCTION SETUP**

### **1. Get Real Crypto Wallets**

**USDT on Polygon:**
- Use MetaMask or Blockchain.com
- Get mainnet address (not testnet!)
- Fund with some MATIC for gas fees

**Bitcoin:**
- Use Blockchain.com or Electrum
- Generate receive address
- Keep private key safe

### **2. Setup Custom Email Domain**

In Resend dashboard:
1. Go to Domains
2. Add your domain (e.g., `payments@sophiacipherwealth.com`)
3. Follow DNS instructions
4. Update `BUSINESS_EMAIL` in backend

### **3. Deploy Backend**

Options:
- Railway.app
- Vercel (with serverless functions)
- AWS Lambda
- Your own VPS

### **4. Setup Payment Monitoring**

For auto-detection of crypto payments:

```bash
npm install ethers web3
```

### **5. Security Checklist**

- [ ] Private keys never in code
- [ ] Use environment variables for all secrets
- [ ] Enable 2FA on Resend account
- [ ] Enable 2FA on Crypto exchanges
- [ ] Use hardware wallet for large amounts
- [ ] Backup seed phrases securely
- [ ] Test on testnet first

---

## **TROUBLESHOOTING**

| Problem | Solution |
|---------|----------|
| "RESEND_API_KEY not found" | Add to backend/.env and restart |
| "Email not sending" | Check RESEND_API_KEY format, check spam folder |
| "Upload not working" | Check multer config, ensure uploads folder exists |
| "Backend won't start" | Check port 3001 not in use: `npx kill-port 3001` |
| "No payments showing" | Check Supabase tables created, check database connection |
| "Images not saving" | Check uploads folder permissions, ensure path is correct |

---

## **FILE SUMMARY**

| File | Purpose |
|------|---------|
| `src/services/crypto.js` | Frontend crypto payment service |
| `src/services/email.js` | Frontend email service |
| `src/components/CryptoPaymentForm.jsx` | Crypto payment UI |
| `src/components/AppleCardPaymentForm.jsx` | Apple Card payment UI |
| `src/components/AdminPaymentDashboard.jsx` | Admin verification dashboard |
| `CRYPTO_SETUP.md` | Complete crypto setup guide |
| `CRYPTO_BACKEND_SETUP.md` | Backend crypto code |
| `RESEND_SETUP.md` | Email setup and code |

---

## **NEXT STEPS**

1. ✅ Run backend: `node server.js`
2. ✅ Create Resend account and get API key
3. ✅ Create Supabase tables
4. ✅ Add backend code
5. ✅ Integrate payment forms into booking page
6. ✅ Test payment flow
7. ✅ Deploy to production
8. ✅ Monitor payments via admin dashboard

---

## **USEFUL COMMANDS**

```bash
# Install all packages
npm install resend multer uuid axios

# Test backend is running
curl http://localhost:3001/health

# Test email
curl -X POST http://localhost:3001/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com"}'

# Check ports in use
netstat -ano | findstr :3001

# Kill port 3001
npx kill-port 3001
```

---

## **SUPPORT RESOURCES**

- **Resend Docs:** https://resend.com/docs
- **Crypto Setup:** See CRYPTO_SETUP.md
- **Backend Code:** See CRYPTO_BACKEND_SETUP.md & RESEND_SETUP.md

---

🎉 **You're all set!**

Your customers can now pay with:
- 💵 USDT (stablecoin)
- ₿ Bitcoin (decentralized)
- 🍎 Apple Card (manual verification)

All payments tracked in admin dashboard and confirmed via email! 🚀
