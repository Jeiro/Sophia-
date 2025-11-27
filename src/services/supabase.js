import { createClient } from '@supabase/supabase-js';
import logger from '../utils/logger';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  logger.warn('Supabase credentials not configured');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Auth helpers
export const authService = {
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
};

// Database helpers
export const dbService = {
  // Generic query builder
  query: (table) => supabase.from(table),

  // Example: Get data
  getData: async (table, filters = {}) => {
    let query = supabase.from(table).select('*');

    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Example: Insert data
  insertData: async (table, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data]);
    if (error) throw error;
    return result;
  },

  // Example: Update data
  updateData: async (table, id, updates) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    return data;
  },

  // Example: Delete data
  deleteData: async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    if (error) throw error;
    return data;
  }
};
