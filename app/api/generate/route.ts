
import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"
import OpenAi, { ClientOptions } from 'openai';

const config: ClientOptions = {
  apiKey: process.env.OPEN_AI_KEY,
}
const openai = new OpenAi(config);
const bodySchema = z.object({
  race: z.enum(['human', 'elf', 'dwarf', 'dragonborn', 'drow', 'gnome', 'halfling', 'wood-elf']),
  style: z.enum(['hyperrealism', 'anime', 'cartoon', 'pop-art', 'pixel-art', '3d', 'minimalist', 'isometric']),
  role: z.enum(['barbarian', 'sorcerer', 'rogue', 'cleric', 'druid', 'paladin', 'warlock']),
  story: z.string().max(500)
})

export async function POST(request: Request) {

  try {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({
      cookies: () => cookieStore
    })
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      return NextResponse.json({ error: error.message }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      })
    }

    if (!session?.user || !session?.access_token) {
      return NextResponse.json({ error: "No session found" }, {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }

      })
    }

    const { race, style, story, role } = bodySchema.parse(await request.json())
    const prompt = `${style} concept art of a ${race} ${role} character, high fantasy, dungeons and dragons, inspired by the best fantasy ${style} artists.`

    const resp = await openai.images.generate({
      prompt: 'A drawing of a dragon',
      n: 1,
      size: "512x512"
    })

    console.log('HEHEHEHE')

    if (!resp) {
      return NextResponse.json({ error: `OpenAI API error: ${resp}` }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }

      })
    }

    const data = resp.data

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      })
    }
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
