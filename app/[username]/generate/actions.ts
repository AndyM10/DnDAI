'use server'
import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const cookieStore = cookies()
const supabase = createServerComponentClient<Database>({
  cookies: () => cookieStore
})

export async function credCheck() {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User not found')
    }
    const { username } = user.user_metadata
    const { data, error } = await supabase.from('profiles').select('credits').eq('username', username)
    if (error) {
      throw new Error(error.message)
    }
    if (!data) {
      throw new Error('credits not found')
    }

    console.log(data[0].credits)
    if (data[0].credits! < 5) {
      console.log('not enough credits')
      return false
    }

    return true
  } catch (error) {
    console.log(error)
  }

}
