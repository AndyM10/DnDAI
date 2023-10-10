
import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
})
const openai = new OpenAIApi(config);
const bodySchema = z.object({
  race: z.enum(['human', 'elf', 'dwarf']),
  style: z.enum(['hyperrealism', 'anime', 'cartoon']),
  role: z.enum(['barbarian', 'sorcerer', 'rogue']),
  story: z.string().max(500)
})

export async function POST(request: Request) {

  try {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({
      cookies: () => cookieStore
    })
    const { data: { session } } = await supabase.auth.getSession()

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
    const prompt = `${style} concept art of a ${race} ${role} character, high fantasy, dungeons and dragons, inspired by the best fantasy ${style} artists, backstory for character is ${story} `
    const resp = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512"
    })


    if (resp.status !== 200) {
      return NextResponse.json({ error: `OpenAI API error: ${resp.statusText}` }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }

      })
    }

    const data = resp.data.data

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
