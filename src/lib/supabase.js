import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Refined defensive check: prevent crash if ENV is missing
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase')) {
    console.warn('Supabase credentials missing or invalid. Check your .env file.')
}

export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your_supabase'))
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
