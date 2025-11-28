/**
 * Communication Service
 * 
 * Handles email (Resend) and SMS (Twilio)
 * All calls go through your backend API for security
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const communicationService = {
  // Resend - Email Service
  email: {
    send: async (to, subject, html, from = 'noreply@yourdomain.com') => {
      const response = await fetch(`${API_BASE_URL}/api/communication/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, html, from })
      });

      if (!response.ok) throw new Error('Failed to send email');
      return await response.json();
    },

    sendTemplate: async (to, templateId, variables = {}) => {
      const response = await fetch(`${API_BASE_URL}/api/communication/email/send-template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, templateId, variables })
      });

      if (!response.ok) throw new Error('Failed to send template email');
      return await response.json();
    }
  },

  // Twilio - SMS Service
  sms: {
    send: async (to, message) => {
      const response = await fetch(`${API_BASE_URL}/api/communication/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, message })
      });

      if (!response.ok) throw new Error('Failed to send SMS');
      return await response.json();
    },

    sendOTP: async (to) => {
      const response = await fetch(`${API_BASE_URL}/api/communication/sms/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to })
      });

      if (!response.ok) throw new Error('Failed to send OTP');
      return await response.json();
    },

    verifyOTP: async (to, code) => {
      const response = await fetch(`${API_BASE_URL}/api/communication/sms/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, code })
      });

      if (!response.ok) throw new Error('Failed to verify OTP');
      return await response.json();
    }
  }
};
