// Add this to your backend/server.js

import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API_BASE = 'https://api.paystack.co';

// Initialize Paystack Payment
app.post('/api/payments/paystack/initialize', async (req, res) => {
  const { email, amount, reference } = req.body;

  if (!email || !amount || !reference) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await axios.post(
      `${PAYSTACK_API_BASE}/transaction/initialize`,
      {
        email,
        amount, // in kobo (1 NGN = 100 kobo)
        reference,
        channels: ['card', 'bank_transfer', 'ussd'] // Multiple payment methods for Nigeria
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Paystack initialization error:', error.response?.data || error.message);
    res.status(400).json({ error: error.response?.data?.message || 'Payment initialization failed' });
  }
});

// Verify Paystack Payment
app.post('/api/payments/paystack/verify', async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ error: 'Reference is required' });
  }

  try {
    const response = await axios.get(
      `${PAYSTACK_API_BASE}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const { data } = response.data;

    if (data.status === 'success') {
      // Payment successful - do your business logic here
      // e.g., create booking, send email, etc.
      
      res.json({
        success: true,
        data: {
          reference: data.reference,
          amount: data.amount / 100, // Convert back to NGN
          currency: data.currency,
          status: data.status,
          customer_email: data.customer.email,
          payment_method: data.authorization.channel
        }
      });
    } else {
      res.status(400).json({ success: false, error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    res.status(400).json({ error: 'Failed to verify payment' });
  }
});

// List payment methods available (for UI)
app.get('/api/payments/methods', (req, res) => {
  res.json({
    methods: [
      { id: 'card', name: 'Debit/Credit Card', icon: 'credit-card' },
      { id: 'bank_transfer', name: 'Bank Transfer', icon: 'bank' },
      { id: 'ussd', name: 'USSD (Quick Transfer)', icon: 'phone' }
    ]
  });
});
