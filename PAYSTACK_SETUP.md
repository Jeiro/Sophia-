# 💳 PAYSTACK SETUP GUIDE - Payment for Nigeria

Paystack is the best payment solution for Nigeria. It supports:
- ✅ Nigerian bank accounts
- ✅ Debit/Credit cards
- ✅ Bank transfers
- ✅ USSD (Quick transfer)
- ✅ International cards

---

## **STEP 1: Create Paystack Account**

1. Go to: https://dashboard.paystack.com
2. Click **Sign Up**
3. Fill in:
   - Email
   - Password
   - Business type
4. Verify email
5. You're in! ✅

---

## **STEP 2: Get Your API Keys**

1. In dashboard, go to **Settings** (gear icon, top right)
2. Click **API Keys & Webhooks**
3. You'll see:
   - **Public Key** (starts with `pk_live_` or `pk_test_`)
   - **Secret Key** (starts with `sk_live_` or `sk_test_`)

**For Development:** Use **Test Keys** (they start with `pk_test_` and `sk_test_`)

---

## **STEP 3: Add to Frontend .env.local**

Open `.env.local` and add:
```env
# Remove or comment out Stripe keys
# VITE_STRIPE_PUBLIC_KEY=...

# Add Paystack
VITE_PAYSTACK_PUBLIC_KEY=pk_test_YOUR_PUBLIC_KEY_HERE
```

Example:
```env
VITE_PAYSTACK_PUBLIC_KEY=pk_test_1a2b3c4d5e6f7g8h9i0j
```

**IMPORTANT:** Only add the **Public Key** to frontend. Secret key goes in backend only! ✅

---

## **STEP 4: Add to Backend .env**

In `backend/.env`, replace or add:
```env
# Remove or comment out Stripe secret
# STRIPE_SECRET_KEY=...

# Add Paystack
PAYSTACK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
```

Example:
```env
PAYSTACK_SECRET_KEY=sk_test_9i0j8h7g6f5e4d3c2b1a
```

---

## **STEP 5: Install Paystack Package**

In your frontend folder, run:
```bash
npm install @paystack/inline-js
```

---

## **STEP 6: Update Backend (Add Paystack Endpoints)**

In `backend/server.js`, replace the Stripe payment endpoints with Paystack endpoints.

Copy the code from `PAYSTACK_BACKEND_SETUP.md` file and paste it into your `backend/server.js` (after imports, before PORT declaration).

---

## **STEP 7: Install axios in Backend**

Run in backend folder:
```bash
npm install axios
```

---

## **STEP 8: Restart Backend**

```bash
node server.js
```

Should show: `Backend running on port 3001` ✅

---

## **STEP 9: Add Paystack Script to HTML**

In your `index.html`, add this in the `<head>` section:

```html
<script src="https://js.paystack.co/v1/inline.js"></script>
```

Example:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sophia Cipher Wealth</title>
    <script src="https://js.paystack.co/v1/inline.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>
```

---

## **STEP 10: Restart Dev Server**

```bash
npm start
```

---

## **STEP 11: Create Test Payment Component**

Create a test file: `src/components/TestPaystack.jsx`

```jsx
import { useState } from 'react';
import { paystackService } from '../services/paystack';

export function TestPaystack() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setStatus('Initializing payment...');

    try {
      // Step 1: Initialize payment on backend
      const initResponse = await paystackService.initializePayment(
        'test@example.com',
        1000, // 1000 NGN
        `ref_${Date.now()}` // Unique reference
      );

      if (!initResponse.data) {
        throw new Error('Failed to initialize payment');
      }

      setStatus('Opening payment modal...');

      // Step 2: Open payment modal
      await paystackService.openPaymentModal(
        initResponse.data.access_code,
        () => {
          setStatus('Payment cancelled');
          setLoading(false);
        }
      );

      // Step 3: Verify payment on backend
      const verifyResponse = await paystackService.verifyPayment(
        initResponse.data.reference
      );

      if (verifyResponse.success) {
        setStatus('✅ Payment successful! ' + verifyResponse.data.amount + ' NGN received');
        console.log('Payment data:', verifyResponse.data);
      } else {
        setStatus('❌ Payment failed');
      }
    } catch (error) {
      setStatus('❌ Error: ' + error.message);
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Test Paystack Payment</h2>
      <button 
        onClick={handlePayment} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0052FF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? 'Processing...' : 'Pay 1000 NGN'}
      </button>
      {status && <p style={{ marginTop: '10px', fontSize: '14px' }}>{status}</p>}
    </div>
  );
}
```

---

## **STEP 12: Test Payment**

1. Add this component to a page (temporarily):
   ```jsx
   import { TestPaystack } from '../components/TestPaystack';
   
   export function SomePage() {
     return <TestPaystack />;
   }
   ```

2. Run dev server: `npm start`
3. Click the button
4. Use test details below:

---

## **PAYSTACK TEST CREDENTIALS**

Use these to test payments:

### **Test Card:**
- **Card Number:** `5053 0574 4239 2500`
- **Expiry:** Any future date (e.g., `12/25`)
- **CVV:** Any 3 digits (e.g., `123`)
- **PIN:** `1234`
- **OTP:** `123456` (when prompted)

### **Test Bank Transfer:**
- Use **Wema Bank** (Account number will be generated)
- Reference will be shown

---

## **SUPPORTED PAYMENT METHODS IN NIGERIA**

1. **Debit/Credit Card** ✅
   - Visa, Mastercard
   - Both local and international cards

2. **Bank Transfer** ✅
   - All Nigerian banks
   - Instant or within 24 hours

3. **USSD** ✅
   - Quick transfer via phone
   - No card needed
   - Fastest for many Nigerians

4. **Mobile Money** (through integrations)
   - MTN Mobile Money
   - Airtel Money

---

## **STEP 13: Real Payment Setup**

When ready for live payments:

1. **Kyc Verification:**
   - Go to Paystack dashboard
   - Complete KYC (Know Your Customer)
   - Upload business documents
   - Wait for approval (usually 2-4 hours)

2. **Switch to Live Keys:**
   - In Paystack settings, get your **Live Keys**
   - Update `.env` files:
     ```env
     VITE_PAYSTACK_PUBLIC_KEY=pk_live_YOUR_LIVE_KEY
     PAYSTACK_SECRET_KEY=sk_live_YOUR_LIVE_SECRET
     ```

3. **Update database:**
   - Store payment data with `currency: 'NGN'`
   - Update booking amounts for NGN pricing

---

## **WEBHOOK SETUP (Optional but Recommended)**

Webhooks allow Paystack to notify your backend of payment events:

1. In Paystack dashboard → **Settings** → **API Keys & Webhooks**
2. Scroll to **Webhooks**
3. Add your webhook URL:
   ```
   https://yourdomain.com/api/payments/paystack/webhook
   ```
4. For development with localhost, use a tunneling service like Ngrok

---

## **COMMON PAYSTACK ERRORS & FIXES**

| Error | Solution |
|-------|----------|
| "Public key is invalid" | Check `VITE_PAYSTACK_PUBLIC_KEY` in `.env.local` |
| "Failed to initialize payment" | Verify backend is running, check `PAYSTACK_SECRET_KEY` |
| "PaystackPop is not defined" | Ensure `<script src="https://js.paystack.co/v1/inline.js"></script>` is in `index.html` |
| "Invalid amount" | Amount must be in kobo (whole number, no decimals) |
| "Connection refused on port 3001" | Restart backend: `node server.js` |

---

## **ADVANTAGES OF PAYSTACK OVER STRIPE FOR NIGERIA**

| Feature | Paystack | Stripe |
|---------|----------|--------|
| Nigerian Bank Support | ✅ Direct | ❌ Not supported |
| Nigerian Users | ✅ Easy | ❌ Requires workaround |
| USSD Transfer | ✅ Yes | ❌ No |
| Bank Transfer | ✅ Yes | ❌ No |
| Setup Complexity | ✅ Simple | ❌ Complex |
| Fees in Nigeria | ✅ 1.5% (cards) | ❌ Higher for NGN |

---

## **NEXT STEPS**

1. ✅ Set up Paystack account
2. ✅ Get API keys
3. ✅ Update `.env` files
4. ✅ Install packages
5. ✅ Add backend endpoints
6. ✅ Test with test credentials
7. ✅ Complete KYC for live payments
8. ✅ Switch to live keys

---

## **USEFUL RESOURCES**

- **Paystack Documentation:** https://paystack.com/docs
- **API Reference:** https://paystack.com/docs/api/
- **Test Cards:** https://paystack.com/docs/testing/
- **Support:** support@paystack.com

---

## **SUCCESS CHECKLIST**

- [ ] Paystack account created
- [ ] API keys obtained
- [ ] `.env.local` updated with public key
- [ ] `backend/.env` updated with secret key
- [ ] Packages installed (`@paystack/inline-js`, `axios`)
- [ ] Backend endpoints added
- [ ] Backend running on port 3001
- [ ] Paystack script added to `index.html`
- [ ] Test payment component created
- [ ] Test payment successful with test card
- [ ] Payment data stored in database
- [ ] Booking confirmation sent via email

---

🎉 **You're ready to accept payments in Nigeria!**

All your customers can now pay via:
- Nigerian bank transfer
- Debit/Credit card
- USSD
- Bank cards globally

**Next:** Connect this to your booking system to charge for consultations.
