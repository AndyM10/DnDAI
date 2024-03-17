import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../database"

export async function getAvatar(path: string, supabase: SupabaseClient<Database>) {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path)
    if (error) throw error
    const url = URL.createObjectURL(data)
    return url
  } catch (error) {
    console.error(error)
  }
}

