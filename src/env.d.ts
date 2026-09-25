declare namespace App {
  interface Locals {
    supabase: import('@supabase/supabase-js').SupabaseClient;
    /** The signed-in user, or null. Only set on pages rendered on demand. */
    user: {
      id: string;
      email: string;
      name: string;
      netid: string;
    } | null;
  }
}
