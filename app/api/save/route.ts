import { Database } from "@/lib/database"
import { Session, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

const getUserName = (session: Session) => session.user.user_metadata.username

const getBufferFromUrl = async (url: string) => {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  console.log(buffer)

  return buffer
}

const bodySchema = z.object({
  image: z.string().url(),
  formData: z.object({
    race: z.enum(['human', 'elf', 'dwarf']),
    style: z.enum(['hyperrealism', 'anime', 'cartoon']),
    role: z.enum(['barbarian', 'sorcerer', 'rogue']),
    story: z.string().max(500)
  })
})

export async function POST(request: Request) {
  try {
    const supabase = createServerComponentClient<Database>({
      cookies
    })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user || !session?.access_token) {
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    const username = getUserName(session)
    const { image, formData } = bodySchema.parse(await request.json())
    const buffer = await getBufferFromUrl(image)

    const { data, error } = await supabase.storage.from('stash').upload(`${username}/${Date.now()}.png`, buffer)

    if (error) {
      return NextResponse.json({ error: error }, { status: 500 })
    }

    await supabase.from('images').insert({
      image_url: data.path,
      image_data: formData,
      username,
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
