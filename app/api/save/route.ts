import { serverClient } from "@/lib/serverClient"
import { AuthError, Session, } from "@supabase/supabase-js"
import { StorageError } from "@supabase/storage-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

const getUserId = (session: Session) => session.user.id

const getBufferFromUrl = async (url: string) => {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()

  return buffer
}

const bodySchema = z.object({
  image: z.string().url(),
  formData: z.object({
    race: z.enum(['human', 'elf', 'dwarf', 'dragonborn', 'drow', 'gnome', 'halfling', 'wood-elf']),
    style: z.enum(['hyperrealism', 'anime', 'cartoon', 'pop-art', 'pixel-art', '3d', 'minimalist']),
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
    const buffer = await getBufferFromUrl(image)
    const id = getUserId(session)
    const { data, error } = await supabase.storage.from('stash').upload(`${id}/${Date.now()}.png`, buffer)

    if (error) {
      throw error
    }

    const insert = await supabase.from('history').insert({
      id: id,
      image_url: data.path,
      image_data: formData,

    })

    if (insert.error) {
      throw insert.error
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
