import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[LOGIN] Missing Supabase env vars');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    console.log('[LOGIN] Attempt for:', email);

    const supabaseResponse = NextResponse.json({ success: true });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(request.headers.get('Cookie') ?? '');
          },
          setAll(cookiesToSet, headers) {
            console.log('[LOGIN] setAll called with', cookiesToSet.length, 'cookies');
            cookiesToSet.forEach(({ name, value, options }) => {
              try {
                supabaseResponse.cookies.set({
                  name,
                  value,
                  ...options,
                });
              } catch (e) {
                console.error('[LOGIN] Failed to set cookie', name, e);
              }
            });
            Object.entries(headers).forEach(([key, value]) => {
              supabaseResponse.headers.set(key, value);
            });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.log('[LOGIN] Auth error:', error.message, 'status:', error.status);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.log('[LOGIN] Success! User:', data.user?.email);
    return supabaseResponse;
  } catch (err) {
    console.error('[LOGIN] Unhandled error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
