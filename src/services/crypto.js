// Crypto Payment Service - USDT, BTC, and Apple Card

export const cryptoService = {
  // Generate crypto payment address
  generatePaymentAddress: async (paymentType, amount, orderId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments/crypto/generate-address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentType, // 'usdt', 'btc'
          amount,
          orderId
        })
      });

      if (!response.ok) throw new Error('Failed to generate payment address');
      return await response.json();
    } catch (error) {
      console.error('Crypto address generation error:', error);
      throw error;
    }
  },

  // Check payment status
  checkPaymentStatus: async (orderId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/crypto/status/${orderId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!response.ok) throw new Error('Failed to check payment status');
      return await response.json();
    } catch (error) {
      console.error('Payment status check error:', error);
      throw error;
    }
  },

  // Upload Apple Card image and verify manually
  uploadAppleCardImage: async (orderId, imageFile, cardDetails) => {
    try {
      const formData = new FormData();
      formData.append('orderId', orderId);
      formData.append('image', imageFile);
      formData.append('cardLast4', cardDetails.last4);
      formData.append('cardholderName', cardDetails.holderName);
      formData.append('amount', cardDetails.amount);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/apple-card/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) throw new Error('Failed to upload Apple Card image');
      return await response.json();
    } catch (error) {
      console.error('Apple Card upload error:', error);
      throw error;
    }
  },

  // Get supported cryptocurrencies
  getSupportedCryptos: () => [
    {
      id: 'usdt',
      name: 'USDT (Tether)',
      symbol: 'USDT',
      network: 'Polygon/Ethereum',
      icon: '💵',
      stable: true
    },
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      network: 'Bitcoin',
      icon: '₿',
      stable: false
    },
    {
      id: 'apple-card',
      name: 'Apple Card',
      symbol: 'CARD',
      network: 'Manual Verification',
      icon: '🍎',
      stable: true
    }
  ],

  // Convert USD to crypto
  convertUsdToCrypto: async (usdAmount, cryptoType) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/crypto/convert`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usdAmount,
            cryptoType
          })
        }
      );

      if (!response.ok) throw new Error('Failed to convert to crypto');
      return await response.json();
    } catch (error) {
      console.error('Crypto conversion error:', error);
      throw error;
    }
  },

  // Get crypto transaction details
  getTransactionDetails: async (transactionHash) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/crypto/transaction/${transactionHash}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!response.ok) throw new Error('Failed to get transaction details');
      return await response.json();
    } catch (error) {
      console.error('Transaction details error:', error);
      throw error;
    }
  }
};
