/**
 * AI API Service
 * 
 * IMPORTANT: Never call AI APIs directly from the frontend.
 * Always use a backend API gateway for these services.
 * 
 * This file provides helper functions to call your backend endpoints
 * which then communicate with AI services securely.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const aiService = {
  // OpenAI - GPT models
  openai: {
    chat: async (messages, model = 'gpt-3.5-turbo') => {
      const response = await fetch(`${API_BASE_URL}/api/ai/openai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, model })
      });

      if (!response.ok) throw new Error('OpenAI request failed');
      return await response.json();
    },

    complete: async (prompt, model = 'text-davinci-003') => {
      const response = await fetch(`${API_BASE_URL}/api/ai/openai/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model })
      });

      if (!response.ok) throw new Error('OpenAI completion failed');
      return await response.json();
    }
  },

  // Anthropic - Claude models
  anthropic: {
    chat: async (messages) => {
      const response = await fetch(`${API_BASE_URL}/api/ai/anthropic/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });

      if (!response.ok) throw new Error('Anthropic request failed');
      return await response.json();
    },

    complete: async (prompt) => {
      const response = await fetch(`${API_BASE_URL}/api/ai/anthropic/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error('Anthropic completion failed');
      return await response.json();
    }
  },

  // Google Gemini
  gemini: {
    generate: async (prompt, model = 'gemini-pro') => {
      const response = await fetch(`${API_BASE_URL}/api/ai/gemini/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model })
      });

      if (!response.ok) throw new Error('Gemini request failed');
      return await response.json();
    }
  },

  // Perplexity
  perplexity: {
    search: async (query) => {
      const response = await fetch(`${API_BASE_URL}/api/ai/perplexity/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) throw new Error('Perplexity search failed');
      return await response.json();
    }
  }
};
