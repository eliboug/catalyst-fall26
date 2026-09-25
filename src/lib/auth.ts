// Keep these in sync with the checks on public.participants in supabase/migrations.
export const NETID_PATTERN = /^[a-z][a-z0-9]{1,11}$/;
export const YALE_EMAIL_PATTERN = /^[^@\s]+@yale\.edu$/i;
export const MIN_PASSWORD_LENGTH = 8;

/** Only allow redirects to paths on this site, never to another domain. */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/';
  return value;
}

export function field(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}
