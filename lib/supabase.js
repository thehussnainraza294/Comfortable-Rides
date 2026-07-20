import { createClient } from '@supabase/supabase-js';

// Values pasted into a hosting dashboard often arrive with a stray space
// or line break on the end, which is enough to break createClient and fail
// the whole build. Trimming and validating here keeps that from happening.
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

function isValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export const isConfigured = isValidUrl(url) && key.length > 20;

// When the settings are missing or malformed the site still builds and
// renders. It simply shows no fleet, and the admin page explains why.
export const supabase = isConfigured ? createClient(url, key) : null;