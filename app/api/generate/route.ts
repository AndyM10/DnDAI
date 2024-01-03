
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"
import OpenAi, { ClientOptions } from 'openai';
import { serverClient } from "@/lib/serverClient";
import { AuthError } from "@supabase/supabase-js";

const config: ClientOptions = {
  apiKey: process.env.OPEN_AI_KEY,
}
const openai = new OpenAi(config);
const bodySchema = z.object({
  race: z.enum(['Human', 'Elf', 'Dwarf', 'Dragonborn', 'Drow', 'Gnome', 'Halfling', 'Fire Genasi']),
  style: z.enum(['hyperrealism', 'anime', 'pop-art', 'pixel-art', '3d', 'minimalist', 'isometric']),
  role: z.enum(['barbarian', 'sorcerer', 'rogue', 'cleric', 'druid', 'paladin', 'warlock']),
  story: z.string().max(500)
})

export async function POST(request: Request) {

  try {
    const cookieStore = cookies()
    const { supabase } = serverClient(cookieStore)

    const { data: { session }, error } = await supabase.auth.getSession()

    if (!session?.user || !session?.access_token) {
      throw new AuthError('No session found')
    }

    if (error) {
      throw error
    }

    const { race, style, story, role } = bodySchema.parse(await request.json())
    const prompt = `Generate a concept art for a Dungeons & Dragons character based on the following parameters:
        the characters race is ${race},
        the art style should be ${style},
        the character is a ${role},
        the character's backstory is: ${story}
`

    const resp = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      size: "1024x1024"
    })

    if (!resp) {
      throw new Error('OpenAI API error: ' + resp)
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
