
import { createClient } from "@supabase/supabase-js"
import { Database } from "./database"

export function supabaseClient() {
  const { SUPABASE_URL, SUPABASE_ANON_KEY, SERVICE_ROLE_KEY } = process.env

  console.log(SUPABASE_URL, SUPABASE_ANON_KEY)

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("MISSING SUPABASE CREDS")
  }
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
  return { supabase }
}
