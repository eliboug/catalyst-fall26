import type { EmailOtpType } from '@supabase/supabase-js';
import type { APIRoute } from 'astro';

export const prerender = false;

// Target of the "confirm your email" link. Handles both the token_hash link
// (works on any device) and the PKCE code link (same browser only).
export const GET: APIRoute = async ({ url, locals, redirect }) => {
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;
  const code = url.searchParams.get('code');

  const { error } = tokenHash && type
    ? await locals.supabase.auth.verifyOtp({ token_hash: tokenHash, type })
    : code
      ? await locals.supabase.auth.exchangeCodeForSession(code)
      : { error: new Error('Missing confirmation token') };

  if (error) {
    console.error('Email confirmation failed:', error.message);
    return redirect('/signin?confirm=failed', 303);
  }
  return redirect('/', 303);
};
