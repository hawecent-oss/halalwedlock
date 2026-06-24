import { createClient } from '@supabase/supabase-js'

// Hardcoded credentials to bypass Vercel Environment Variable issues
const supabaseUrl = 'https://vvjqvjvbmzsnvrvlsibh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2anF2anZibXpzbnZydmxzaWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNTAwMTcsImV4cCI6MjA5NjgyNjAxN30.uEn_EAH28uHzdW6Pn0xIxZ09x3UO9MO9Q4z5hsYMhFA';

export const isSupabaseConfigured = true;

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }), insert: () => Promise.resolve({ data: [], error: null }) }),
            update: () => ({ eq: () => Promise.resolve({ error: null }) }),
            insert: () => Promise.resolve({ data: [], error: null })
        }),
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            signOut: () => Promise.resolve({ error: null })
        }
    };
