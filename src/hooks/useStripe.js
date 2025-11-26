import { useEffect, useState } from 'react';
import { getStripeInstance } from '../services/stripe';

export const useStripe = () => {
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        const stripeInstance = await getStripeInstance();
        setStripe(stripeInstance);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initStripe();
  }, []);

  return { stripe, loading, error };
};
