import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** False in a fresh clone without .env.local. Static pages still work then. */
export const supabaseConfigured = Boolean(url && key);

// Uses the publishable key, so it can only read what RLS and the column grants
// allow (see supabase/migrations). The session lives in cookies.
// Returns null when Supabase isn't configured.
export function createSupabaseServerClient(request: Request, cookies: AstroCookies) {
  if (!url || !key) return null;
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
