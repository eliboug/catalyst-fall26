// Keep these in sync with the checks on public.participants in supabase/migrations.
export const NETID_PATTERN = /^[a-z][a-z0-9]{1,11}$/;
export const YALE_EMAIL_PATTERN = /^[^@\s]+@yale\.edu$/i;
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Only allow redirects to paths on this site, never to another domain.
 * Parsing with URL catches tricks like "//evil.com" and "/\evil.com", which
 * browsers treat as links to another site.
 */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith('/')) return '/';
  const base = 'https://catalyst.invalid';
  const url = new URL(value, base);
  if (url.origin !== base) return '/';
  return url.pathname + url.search + url.hash;
}

export function field(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}
