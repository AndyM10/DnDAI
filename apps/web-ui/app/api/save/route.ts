import { serverClient } from "@/lib/serverClient"
import { AuthError, Session, SupabaseClient, } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

const getUserId = (session: Session) => session.user.id
const getBufferFromUrl = async (url: string) => {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  return buffer
}

const bucketUpload = async (
  image: string,
  supabase: SupabaseClient,
  id: string
) => {
  const buffer = await getBufferFromUrl(image)
  const { data, error } = await supabase.storage.from('stash').upload(`${id}/${Date.now()}.png`, buffer)

  if (error) {
    throw error
  }
  return { data }
}
const bodySchema = z.object({
  image: z.string().url(),
  formData: z.object({
    race: z.enum(['Human', 'Elf', 'Dwarf', 'Dragonborn', 'Drow', 'Gnome', 'Halfling', 'Fire Genasi']),
    style: z.enum(['hyperrealism', 'anime', 'pop-art', 'pixel-art', '3d', 'minimalist', 'isometric']),
    role: z.enum(['barbarian', 'sorcerer', 'rogue', 'cleric', 'druid', 'paladin', 'warlock']),
    story: z.string().max(500)
  })
})

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const { supabase } = serverClient(cookieStore)
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user || !session?.access_token) {
      throw new AuthError('No session found')
    }

    const { image, formData } = bodySchema.parse(await request.json())
    const id = getUserId(session)
    const { data } = await bucketUpload(image, supabase, id)
    const { error } = await supabase.from('history').insert({
      image_url: data.path,
      image_data: formData,
      user: id
    })

    if (error) {
      throw error
    }

    return NextResponse.json({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    })
  } catch (error) {

    switch (error) {
      case error instanceof AuthError:
        return NextResponse.json({ error: `Not authorized: ${error}` }, {
          status: 401,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        })
      case error instanceof z.ZodError:
        return NextResponse.json({ error: error }, {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        })
      default:
        return NextResponse.json({ error: error }, {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        })
    }
  }
}
