import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  // Static pages are built ahead of time and have no request cookies.
  if (context.isPrerendered) return next();

  const supabase = createSupabaseServerClient(context.request, context.cookies);
  context.locals.supabase = supabase;

  // getClaims verifies the session token instead of trusting the cookie as-is.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  context.locals.user = claims
    ? {
        id: claims.sub,
        email: claims.email ?? '',
        name: String(claims.user_metadata?.name ?? ''),
        netid: String(claims.user_metadata?.netid ?? ''),
      }
    : null;

  const response = await next();
  // Pages that know who you are must never be cached for someone else.
  if (context.locals.user) response.headers.set('Cache-Control', 'private, no-store');
  return response;
});
