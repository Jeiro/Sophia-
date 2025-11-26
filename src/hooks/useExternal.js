import { useEffect, useState } from 'react';
import { aiService } from '../services/aiApis';
import { communicationService } from '../services/communication';

// AI Hooks
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateText = async (prompt, service = 'openai') => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (service === 'openai') {
        result = await aiService.openai.complete(prompt);
      } else if (service === 'anthropic') {
        result = await aiService.anthropic.complete(prompt);
      } else if (service === 'gemini') {
        result = await aiService.gemini.generate(prompt);
      } else if (service === 'perplexity') {
        result = await aiService.perplexity.search(prompt);
      }
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const chat = async (messages, service = 'openai') => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (service === 'openai') {
        result = await aiService.openai.chat(messages);
      } else if (service === 'anthropic') {
        result = await aiService.anthropic.chat(messages);
      }
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateText, chat, loading, error };
};

// Communication Hooks
export const useCommunication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = async (to, subject, html) => {
    setLoading(true);
    setError(null);
    try {
      const result = await communicationService.email.send(to, subject, html);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendSMS = async (to, message) => {
    setLoading(true);
    setError(null);
    try {
      const result = await communicationService.sms.send(to, message);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, sendSMS, loading, error };
};
