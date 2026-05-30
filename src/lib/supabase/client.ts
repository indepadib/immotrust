import { createClient } from '@supabase/supabase-js'; const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; const isConfigured = supabaseUrl && supabaseAnonKey; if (!isConfigured) { console.warn('Supabase URL or Anon Key is missing. Supabase client will not be initialized.');
} // Using 'public' as default. Services will handle retries with 'realestate' // if the public schema is restricted or if tables are placed elsewhere.
export const supabase = createClient( supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder', { db: { schema: 'public' } }
);
