// Backend Crypto Payment Endpoints
// Add this to backend/server.js

import axios from 'axios';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configure multer for image uploads
const upload = multer({
  dest: 'uploads/apple-cards/',
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// ============================================
// CRYPTO PAYMENT ENDPOINTS
// ============================================

// Generate crypto payment address
app.post('/api/payments/crypto/generate-address', async (req, res) => {
  const { paymentType, amount, orderId } = req.body;

  if (!paymentType || !amount || !orderId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let paymentAddress, conversionRate, cryptoAmount;

    if (paymentType === 'usdt') {
      // USDT is 1:1 with USD
      conversionRate = 1;
      cryptoAmount = amount;
      paymentAddress = generateUSDTAddress(); // Your wallet address
    } else if (paymentType === 'btc') {
      // Get current BTC rate
      const priceResponse = await axios.get(
        'https://api.coinbase.com/v2/prices/BTC-USD'
      );
      conversionRate = parseFloat(priceResponse.data.data.amount);
      cryptoAmount = (amount / conversionRate).toFixed(8);
      paymentAddress = generateBTCAddress(); // Your wallet address
    } else {
      return res.status(400).json({ error: 'Invalid payment type' });
    }

    // Store payment request in database
    await supabase.from('crypto_payments').insert({
      order_id: orderId,
      payment_type: paymentType,
      amount_usd: amount,
      crypto_amount: cryptoAmount,
      conversion_rate: conversionRate,
      payment_address: paymentAddress,
      status: 'pending',
      created_at: new Date().toISOString()
    });

    res.json({
      success: true,
      paymentAddress,
      cryptoAmount,
      amount,
      conversionRate,
      paymentType,
      orderId,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 min expiry
    });
  } catch (error) {
    console.error('Crypto address generation error:', error);
    res.status(500).json({ error: 'Failed to generate payment address' });
  }
});

// Check payment status
app.get('/api/payments/crypto/status/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const { data, error } = await supabase
      .from('crypto_payments')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({
      orderId,
      status: data.status, // pending, confirmed, completed
      paymentType: data.payment_type,
      amountUsd: data.amount_usd,
      cryptoAmount: data.crypto_amount,
      txHash: data.tx_hash || null,
      confirmations: data.confirmations || 0
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to check status' });
  }
});

// Convert USD to Crypto
app.post('/api/payments/crypto/convert', async (req, res) => {
  const { usdAmount, cryptoType } = req.body;

  if (!usdAmount || !cryptoType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let conversionRate, cryptoAmount;

    if (cryptoType === 'usdt') {
      conversionRate = 1;
      cryptoAmount = usdAmount;
    } else if (cryptoType === 'btc') {
      const priceResponse = await axios.get(
        'https://api.coinbase.com/v2/prices/BTC-USD'
      );
      conversionRate = parseFloat(priceResponse.data.data.amount);
      cryptoAmount = (usdAmount / conversionRate).toFixed(8);
    } else if (cryptoType === 'eth') {
      const priceResponse = await axios.get(
        'https://api.coinbase.com/v2/prices/ETH-USD'
      );
      conversionRate = parseFloat(priceResponse.data.data.amount);
      cryptoAmount = (usdAmount / conversionRate).toFixed(8);
    }

    res.json({
      usdAmount,
      cryptoType,
      cryptoAmount,
      conversionRate,
      exchangeRate: `1 ${cryptoType.toUpperCase()} = $${conversionRate}`
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert currency' });
  }
});

// Get transaction details
app.get('/api/payments/crypto/transaction/:txHash', async (req, res) => {
  const { txHash } = req.params;

  try {
    // This would integrate with blockchain APIs
    // For now, return stored data
    const { data, error } = await supabase
      .from('crypto_payments')
      .select('*')
      .eq('tx_hash', txHash)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({
      txHash,
      paymentType: data.payment_type,
      amount: data.crypto_amount,
      status: data.status,
      confirmations: data.confirmations,
      timestamp: data.created_at
    });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: 'Failed to get transaction' });
  }
});

// ============================================
// APPLE CARD PAYMENT ENDPOINTS
// ============================================

// Upload Apple Card image
app.post('/api/payments/apple-card/upload', upload.single('image'), async (req, res) => {
  const { orderId, cardLast4, cardholderName, amount } = req.body;

  if (!orderId || !cardLast4 || !cardholderName || !amount || !req.file) {
    return res.status(400).json({ error: 'Missing required fields or image' });
  }

  try {
    const verificationId = uuidv4();
    const fileName = `${verificationId}-${req.file.originalname}`;
    const filePath = path.join('uploads/apple-cards/', fileName);

    // Store in database
    const { data, error } = await supabase.from('apple_card_payments').insert({
      order_id: orderId,
      verification_id: verificationId,
      card_last4: cardLast4,
      cardholder_name: cardholderName,
      amount_usd: amount,
      image_path: filePath,
      status: 'pending_verification', // pending_verification, verified, rejected
      created_at: new Date().toISOString()
    });

    if (error) throw error;

    res.json({
      success: true,
      verificationId,
      status: 'pending_verification',
      message: 'Image uploaded successfully. Awaiting verification.',
      estimatedVerificationTime: '24-48 hours'
    });
  } catch (error) {
    console.error('Apple Card upload error:', error);
    res.status(500).json({ error: 'Failed to upload Apple Card image' });
  }
});

// Get Apple Card verification status
app.get('/api/payments/apple-card/status/:verificationId', async (req, res) => {
  const { verificationId } = req.params;

  try {
    const { data, error } = await supabase
      .from('apple_card_payments')
      .select('*')
      .eq('verification_id', verificationId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Verification not found' });
    }

    res.json({
      verificationId,
      status: data.status,
      amountUsd: data.amount_usd,
      cardLast4: data.card_last4,
      createdAt: data.created_at,
      verifiedAt: data.verified_at || null
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to check verification status' });
  }
});

// Admin: Verify Apple Card payment (for your verification)
app.post('/api/payments/apple-card/verify/:verificationId', async (req, res) => {
  const { verificationId } = req.params;
  const { approved, notes } = req.body;

  // TODO: Add admin authentication

  try {
    const { data, error } = await supabase
      .from('apple_card_payments')
      .update({
        status: approved ? 'verified' : 'rejected',
        verified_at: new Date().toISOString(),
        admin_notes: notes
      })
      .eq('verification_id', verificationId);

    if (error) throw error;

    // If approved, update booking/payment status
    if (approved) {
      const { data: payment } = await supabase
        .from('apple_card_payments')
        .select('order_id')
        .eq('verification_id', verificationId)
        .single();

      // Update booking status
      await supabase
        .from('bookings')
        .update({ status: 'confirmed', payment_status: 'completed' })
        .eq('id', payment.order_id);

      // Send confirmation email
      // ... send email via Resend
    }

    res.json({
      success: true,
      status: approved ? 'verified' : 'rejected',
      message: approved
        ? 'Payment verified successfully'
        : 'Payment rejected'
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateUSDTAddress() {
  // Return your USDT wallet address
  // For Polygon: 0x...
  return process.env.USDT_WALLET_ADDRESS || '0x...';
}

function generateBTCAddress() {
  // Return your BTC wallet address
  return process.env.BTC_WALLET_ADDRESS || 'bc1...';
}
