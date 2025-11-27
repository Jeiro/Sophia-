# 🪙 CRYPTO PAYMENT SETUP GUIDE - USDT, BTC & Apple Card

Setup crypto payments for your consultation bookings in Nigeria and worldwide!

---

## **Payment Methods Available**

### 1. **USDT (Tether)**
- ✅ Stablecoin (always ~$1 USD)
- ✅ Fast transfers (seconds to minutes)
- ✅ Low fees (< $1)
- ✅ Works on Polygon & Ethereum

### 2. **BTC (Bitcoin)**
- ✅ Decentralized
- ✅ No middleman
- ✅ Available worldwide
- ⚠️ Price volatile, slower confirmations

### 3. **Apple Card**
- ✅ Manual verification via image upload
- ✅ For non-crypto users
- ✅ You verify payments manually
- ✅ Send confirmation via email

---

## **PHASE 1: SETUP CRYPTO WALLETS**

### **Step 1: Create USDT Wallet (Polygon)**

1. Go to: https://metamask.io
2. Install MetaMask extension
3. Create new wallet
4. Save seed phrase securely
5. Add Polygon network:
   - RPC URL: `https://polygon-rpc.com`
   - Chain ID: `137`
6. Fund wallet with some MATIC for gas fees
7. Add USDT token to wallet (contract: `0xc2132D05D31c914a87C6611C10748AEb04B58e8F`)

**Your USDT Address:** `0x...` (from MetaMask)

---

### **Step 2: Create BTC Wallet**

Option A - **Coinbase** (Easiest):
1. Go to: https://coinbase.com
2. Create account
3. Create new BTC wallet
4. Your BTC address shown in wallet

Option B - **Electrum** (Self-custody):
1. Download: https://electrum.org
2. Create new wallet
3. Save seed phrase
4. Your address shown in interface

**Your BTC Address:** `bc1...` (Bitcoin address)

---

## **PHASE 2: ADD CREDENTIALS TO BACKEND**

Create `backend/.env` entries:

```env
# Crypto Wallets
USDT_WALLET_ADDRESS=0x1234567890abcdef...
BTC_WALLET_ADDRESS=bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4

# Payment timeouts (in seconds)
CRYPTO_PAYMENT_TIMEOUT=1800

# Blockchain monitoring (optional)
INFURA_API_KEY=your_infura_key_here
```

---

## **PHASE 3: INSTALL PACKAGES**

In your **backend** folder:

```bash
npm install multer uuid axios
```

In your **frontend** folder (if not already installed):

```bash
npm install
```

---

## **PHASE 4: ADD DATABASE TABLES**

In Supabase SQL Editor, run:

```sql
-- Crypto Payments Table
CREATE TABLE crypto_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id VARCHAR(255) UNIQUE NOT NULL,
  payment_type VARCHAR(50), -- usdt, btc
  amount_usd DECIMAL(10, 2),
  crypto_amount VARCHAR(50),
  conversion_rate DECIMAL(15, 8),
  payment_address VARCHAR(255),
  tx_hash VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed
  confirmations INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Apple Card Payments Table
CREATE TABLE apple_card_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id VARCHAR(255) UNIQUE NOT NULL,
  verification_id VARCHAR(255) UNIQUE NOT NULL,
  card_last4 VARCHAR(4),
  cardholder_name VARCHAR(255),
  amount_usd DECIMAL(10, 2),
  image_path VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending_verification',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_crypto_payments_order_id ON crypto_payments(order_id);
CREATE INDEX idx_apple_card_order_id ON apple_card_payments(order_id);
```

---

## **PHASE 5: UPDATE BACKEND SERVER**

In `backend/server.js`:

1. Add imports at the top:
```javascript
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
```

2. Copy the entire code from `CRYPTO_BACKEND_SETUP.md` file

3. Add to `backend/.env`:
```env
USDT_WALLET_ADDRESS=0x...
BTC_WALLET_ADDRESS=bc1...
```

4. Restart backend:
```bash
node server.js
```

---

## **PHASE 6: UPDATE FRONTEND .env.local**

Open `.env.local` and add:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_CRYPTO_ENABLED=true
```

---

## **PHASE 7: CREATE PAYMENT FORM COMPONENT**

Create: `src/components/CryptoPaymentForm.jsx`

```jsx
import { useState } from 'react';
import { cryptoService } from '../services/crypto';

export function CryptoPaymentForm({ amount, orderId, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('usdt');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Handle crypto payment
  const handleCryptoPayment = async () => {
    setLoading(true);
    setStatus('Generating payment address...');

    try {
      const details = await cryptoService.generatePaymentAddress(
        paymentMethod,
        amount,
        orderId
      );

      setPaymentDetails(details);
      setStatus('Payment address generated! Send crypto to the address above.');
    } catch (error) {
      setStatus('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Apple Card upload
  const handleAppleCardUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Uploading image...');

    try {
      if (!imageFile) {
        throw new Error('Please select an image');
      }

      const result = await cryptoService.uploadAppleCardImage(
        orderId,
        imageFile,
        {
          last4: document.getElementById('cardLast4').value,
          holderName: document.getElementById('holderName').value,
          amount
        }
      );

      setStatus('✅ Image uploaded! Verification in progress (24-48 hours)');
      setPaymentDetails(result);
      if (onSuccess) onSuccess(result);
    } catch (error) {
      setStatus('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const cryptos = cryptoService.getSupportedCryptos();

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>💰 Payment Options</h2>

      {/* Crypto Payment Methods */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Cryptocurrency Payment</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {cryptos.slice(0, 2).map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => setPaymentMethod(crypto.id)}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: paymentMethod === crypto.id ? '#0052FF' : '#f0f0f0',
                color: paymentMethod === crypto.id ? 'white' : 'black',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {crypto.icon} {crypto.symbol}
            </button>
          ))}
        </div>

        <button
          onClick={handleCryptoPayment}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0052FF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Processing...' : `Pay with ${paymentMethod.toUpperCase()}`}
        </button>
      </div>

      {/* Crypto Payment Details */}
      {paymentDetails && paymentMethod !== 'apple-card' && (
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p><strong>Amount to Send:</strong> {paymentDetails.cryptoAmount} {paymentDetails.paymentType.toUpperCase()}</p>
          <p><strong>USD Value:</strong> ${paymentDetails.amount}</p>
          <p><strong>Send To:</strong></p>
          <code style={{
            display: 'block',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '4px',
            wordBreak: 'break-all',
            margin: '5px 0'
          }}>
            {paymentDetails.paymentAddress}
          </code>
          <p style={{ fontSize: '12px', color: '#666' }}>
            ⏱️ Expires in 30 minutes
          </p>
          <button onClick={() => navigator.clipboard.writeText(paymentDetails.paymentAddress)}>
            📋 Copy Address
          </button>
        </div>
      )}

      {/* Apple Card Payment */}
      <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <h3>🍎 Apple Card Payment</h3>
        <form onSubmit={handleAppleCardUpload}>
          <div style={{ marginBottom: '10px' }}>
            <label>Last 4 Digits:</label>
            <input
              id="cardLast4"
              type="text"
              placeholder="1234"
              maxLength="4"
              pattern="[0-9]{4}"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Cardholder Name:</label>
            <input
              id="holderName"
              type="text"
              placeholder="Your Name"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Card Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
            <small>Upload a clear image showing the transaction. Max 5MB.</small>
          </div>

          <button
            type="submit"
            disabled={loading || !imageFile}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#000',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Uploading...' : 'Verify with Apple Card'}
          </button>
        </form>
      </div>

      {/* Status Messages */}
      {status && (
        <p style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: status.includes('❌') ? '#ffe6e6' : '#e6f2ff',
          borderRadius: '4px',
          color: status.includes('❌') ? '#c00' : '#00c'
        }}>
          {status}
        </p>
      )}
    </div>
  );
}
```

---

## **PHASE 8: TEST PAYMENT FLOW**

1. Add component to a page:
```jsx
import { CryptoPaymentForm } from './components/CryptoPaymentForm';

export function BookingPage() {
  return (
    <CryptoPaymentForm
      amount={100}
      orderId={`booking_${Date.now()}`}
      onSuccess={(details) => console.log('Payment submitted:', details)}
    />
  );
}
```

2. Run dev server:
```bash
npm start
```

3. Test with testnet (don't use real money):
   - Use test USDT on Polygon testnet
   - Use test BTC faucet for Bitcoin testnet

---

## **PHASE 9: MONITOR PAYMENTS**

Create admin dashboard to verify payments:

```jsx
// Admin component to verify Apple Card payments
import { useState } from 'react';

export function AdminVerifyPayment({ verificationId }) {
  const handleVerify = async (approved) => {
    const response = await fetch(
      `/api/payments/apple-card/verify/${verificationId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approved,
          notes: approved ? 'Approved' : 'Please resubmit'
        })
      }
    );

    const result = await response.json();
    console.log('Verification result:', result);
  };

  return (
    <div>
      <button onClick={() => handleVerify(true)}>✅ Approve</button>
      <button onClick={() => handleVerify(false)}>❌ Reject</button>
    </div>
  );
}
```

---

## **REAL CRYPTO SETUP (Production)**

### **1. Get Wallet Addresses**

**For USDT:**
- Create account on https://blockchain.com (holds your real USDT)
- Get your Polygon address from MetaMask
- Deploy to Polygon mainnet (not testnet)

**For BTC:**
- Create account on https://blockchain.com
- Generate receive address
- This is where customers send BTC

### **2. Setup Payment Monitoring**

Use blockchain APIs to auto-detect payments:

```bash
npm install ethers web3
```

Monitor Polygon for USDT transfers:
```javascript
import { Contract, providers } from 'ethers';

const usdtAbi = [...]; // USDT contract ABI
const provider = new providers.JsonRpcProvider('https://polygon-rpc.com');
const usdtContract = new Contract(USDT_ADDRESS, usdtAbi, provider);

usdtContract.on('Transfer', (from, to, amount) => {
  if (to === YOUR_WALLET) {
    console.log('Payment received!', amount);
    // Update booking to confirmed
  }
});
```

### **3. Security**

- ✅ Never expose private keys
- ✅ Use hardware wallet for large amounts
- ✅ Enable 2FA on exchanges
- ✅ Use multi-sig wallets for business accounts

---

## **TROUBLESHOOTING**

| Issue | Solution |
|-------|----------|
| "MetaMask not connected" | Install MetaMask extension, create account |
| "Invalid payment address" | Verify you're using correct network (Polygon for USDT) |
| "Transaction not confirmed" | Wait for blockchain confirmation (5-10 min for Polygon, 30+ min for BTC) |
| "Upload file too large" | Resize image to < 5MB |
| "Payment not showing in admin" | Check uploads folder permissions |

---

## **BENEFITS OF CRYPTO PAYMENTS**

✅ **No Chargebacks** - Transactions are final
✅ **Lower Fees** - No credit card fees (2.9% + $0.30)
✅ **Global** - Works anywhere, no borders
✅ **Fast** - Instant or minutes (USDT on Polygon)
✅ **Trackable** - All payments on public ledger
✅ **Private** - No personal financial info exposed

---

## **SUCCESS CHECKLIST**

- [ ] MetaMask wallet created with USDT
- [ ] Bitcoin wallet created
- [ ] Wallet addresses added to `backend/.env`
- [ ] Database tables created in Supabase
- [ ] Backend packages installed (multer, uuid, axios)
- [ ] Backend endpoints added to `server.js`
- [ ] Frontend crypto service created
- [ ] Payment form component created
- [ ] Payment form integrated into booking page
- [ ] Test payment submitted successfully
- [ ] Admin verification working
- [ ] Confirmation emails sent on approval

---

## **NEXT STEPS**

1. Set up real wallets on mainnet
2. Deploy backend to production
3. Monitor payments via blockchain
4. Send confirmation emails via Resend
5. Update booking status automatically
6. Create payment history for customers

---

## **RESOURCES**

- **MetaMask:** https://metamask.io
- **Polygon Network:** https://polygon.technology
- **Ethers.js Docs:** https://docs.ethers.org
- **Bitcoin Testnet Faucet:** https://testnet-faucet.mempool.co
- **Coinbase API:** https://developers.coinbase.com

---

🎉 **You now have crypto payments set up!**

Your customers can pay with:
- 💵 USDT (stable, fast)
- ₿ Bitcoin (decentralized)
- 🍎 Apple Card (manual verification)

**All fully integrated into your booking system!**
