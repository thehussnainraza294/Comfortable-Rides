import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(url && key);

// When the environment variables are missing the site still renders,
// it simply shows no fleet. That keeps local previews from crashing.
export const supabase = isConfigured ? createClient(url, key) : null;
