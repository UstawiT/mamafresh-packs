import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The client is null when env vars are missing - every caller falls back
// gracefully so WhatsApp ordering ALWAYS works even if the database is down.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
