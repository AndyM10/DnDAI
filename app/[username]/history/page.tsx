import { Database } from "@/lib/database"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import StashCard, { StashCardProps } from "./StashCard"
import { serverClient } from "@/lib/serverClient"
import { SupabaseClient, User } from "@supabase/supabase-js"


const getStash = async (supabase: SupabaseClient<Database>, user: User) => {
  try {
    const { data: history, error: historyErr } = await supabase
      .from('history')
      .select('*')
      .eq('user', user.id)

    if (historyErr) {
      throw Error(historyErr.message)
    }

    await Promise.all(history.map(async (image) => {
      const { data, error } = await supabase.storage.from('stash').createSignedUrl(image.image_url!, 60)
      if (error) {
        throw Error(error.message)
      }
      image.image_url = data.signedUrl
    }))


    return history
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stash.map((image, index) => {
          return (
            <StashCard key={index} imageDate={image.created_at} imageData={image.image_data as StashCardProps['imageData']} url={image.image_url!} />
          )
        })}
      </div>
    </div>
  )
}
