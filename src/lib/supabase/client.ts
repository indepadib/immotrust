import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseAnonKey;

if (!isConfigured) {
  console.warn('Supabase URL or Anon Key is missing. Supabase client will not be initialized.');
}

// Hard-coding 'realestate' schema as the primary since 'public' appears to be 
// completely empty or restricted in the USER's Supabase instance (404/400 errors).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder',
  {
    db: {
      schema: 'realestate'
    }
  }
);
