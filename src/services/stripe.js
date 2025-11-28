import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

let stripePromise = null;

export const getStripeInstance = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublicKey);
  }
  return stripePromise;
};

export const stripeService = {
  // Initialize payment intent
  createPaymentIntent: async (amount, currency = 'usd') => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments/create-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency })
    });

    if (!response.ok) throw new Error('Failed to create payment intent');
    return await response.json();
  },

  // Confirm payment
  confirmPayment: async (stripe, elements, clientSecret) => {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirm: true,
      redirect: 'if_required'
    });

    if (error) throw error;
    return paymentIntent;
  },

  // Handle card errors
  handleCardChange: (event) => {
    const { error } = event;
    if (error) {
      return error.message;
    }
    return null;
  }
};
