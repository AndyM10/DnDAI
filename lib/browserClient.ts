'use client'
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database";

export function browserClient() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return { supabase }

}
