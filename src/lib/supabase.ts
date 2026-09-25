import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

function env() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_PUBLISHABLE_KEY. Copy .env.example to .env.local.');
  }
  return { url, key };
}

// Uses the publishable key, so it can only read what RLS and the column grants
// allow (see supabase/migrations). The session lives in cookies.
export function createSupabaseServerClient(request: Request, cookies: AstroCookies) {
  const { url, key } = env();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '').map(({ name, value }) => ({
          name,
          value: value ?? '',
        }));
      },
      setAll(toSet) {
        for (const { name, value, options } of toSet) cookies.set(name, value, options);
      },
    },
  });
}
