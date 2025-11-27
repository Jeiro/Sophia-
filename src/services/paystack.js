// Paystack Payment Service - Works in Nigeria!
import logger from '../utils/logger';

const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const paystackService = {
  // Initialize payment
  initializePayment: async (email, amount, reference) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/paystack/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: Math.round(amount * 100), // Convert to kobo (cents)
          reference
        })
      });

      if (!response.ok) throw new Error('Failed to initialize payment');
      return await response.json();
    } catch (error) {
      logger.error('Paystack initialization error:', error);
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (reference) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/paystack/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference })
      });

      if (!response.ok) throw new Error('Failed to verify payment');
      return await response.json();
    } catch (error) {
      logger.error('Payment verification error:', error);
      throw error;
    }
  },

  // Open payment modal
  openPaymentModal: (accessCode, onClose) => {
    if (!window.PaystackPop) {
      throw new Error('Paystack library not loaded');
    }

    return new Promise((resolve, reject) => {
      PaystackPop.setup({
        key: paystackPublicKey,
        accessCode: accessCode,
        onClose: () => {
          logger.log('Payment modal closed');
          if (onClose) onClose();
          reject(new Error('Payment cancelled'));
        },
        onSuccess: (transaction) => {
          logger.log('Payment successful:', transaction);
          resolve(transaction);
        }
      }).openIframe();
    });
  },

  // Get test credentials for development
  getTestCredentials: () => ({
    testCard: '4111 1111 1111 1111',
    testOTP: '123456',
    testPin: '1234',
    currency: 'NGN'
  })
};
