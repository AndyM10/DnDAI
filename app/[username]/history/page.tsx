import { Database } from "@/lib/database"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import StashCard, { StashCardProps } from "./StashCard"
import { serverClient } from "@/lib/serverClient"
import { SupabaseClient, User } from "@supabase/supabase-js"


const getStash = async (supabase: SupabaseClient<Database>, user: User) => {
  try {
    const { data, error } = await supabase
      .from('history')
      .select('*')
      .eq('user', user.id)

    if (error) {
      throw Error(error.message)
    }

    return data
  } catch (error) {
    throw (error)
  }
}

const getImageUrl = async (supabase: SupabaseClient<Database>, url: string) => {
  try {
    const { data, error } = await supabase.storage.from('stash').createSignedUrl(url, 60)
    if (error) {
      throw Error(error.message)
    }
    return data
  } catch (error) {
    throw (error)
  }
}

export default async function Page() {
  const cookieStore = cookies()
  const { supabase } = serverClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }
  const stash = await getStash(supabase, user)

  return (
    <div className="flex flex-col items-center">
      <h1 className="label text-3xl">Your Stash</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4">
        {stash.map(async (image, index) => {
          const { signedUrl } = await getImageUrl(supabase, image.image_url!)
          return (
            <StashCard key={index} imageDate={image.created_at} imageData={image.image_data as StashCardProps['imageData']} url={signedUrl} />
          )
        })}
      </div>
    </div>
  )
}
