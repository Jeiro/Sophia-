// Resend Email Service for Payment Confirmations

export const emailService = {
  // Send booking confirmation email
  sendBookingConfirmation: async (userEmail, bookingDetails) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/booking-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          bookingDetails
        })
      });

      if (!response.ok) throw new Error('Failed to send email');
      return await response.json();
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  },

  // Send payment approved email
  sendPaymentApprovalEmail: async (userEmail, paymentDetails) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/payment-approved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          paymentDetails
        })
      });

      if (!response.ok) throw new Error('Failed to send email');
      return await response.json();
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  },

  // Send payment rejection email
  sendPaymentRejectionEmail: async (userEmail, paymentDetails, reason) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/payment-rejected`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          paymentDetails,
          reason
        })
      });

      if (!response.ok) throw new Error('Failed to send email');
      return await response.json();
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  },

  // Send crypto payment pending email
  sendCryptoPaymentPendingEmail: async (userEmail, paymentDetails) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/crypto-pending`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          paymentDetails
        })
      });

      if (!response.ok) throw new Error('Failed to send email');
      return await response.json();
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  },

  // Send crypto payment received email
  sendCryptoPaymentReceivedEmail: async (userEmail, paymentDetails) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/crypto-received`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          paymentDetails
        })
      });

      if (!response.ok) throw new Error('Failed to send email');
      return await response.json();
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  }
};
