import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (typeof window === 'undefined') {
      return createBrowserClient('http://localhost:54321', 'fallback-key');
    }
    return createBrowserClient(window.location.origin, 'fallback-key');
  }

  return createBrowserClient(url, key);
}
