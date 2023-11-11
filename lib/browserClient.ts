'use client'
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database";

export function browserClient() {

  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const supabase = createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  return { supabase }

}
