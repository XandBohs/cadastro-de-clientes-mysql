import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createSupabaseServerClient() {
  if (!supabaseUrl) {
    throw new Error(
      "Supabase URL is not configured. Set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) in Vercel and redeploy."
    );
  }

  if (!supabaseKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. Set it in Vercel for server-side CRUD and redeploy."
    );
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
