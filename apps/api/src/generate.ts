import middy from "@middy/core"
import httpJsonBodyParser from "@middy/http-json-body-parser"
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from "aws-lambda"
import OpenAI from "openai"
import { z } from "zod"
import { supabaseClient } from "./lib/supabase"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const bodySchema = z.object({
  race: z.enum(['Human', 'Elf', 'Dwarf', 'Dragonborn', 'Drow', 'Gnome', 'Halfling', 'Fire Genasi']),
  style: z.enum(['hyperrealism', 'anime', 'pop-art', 'pixel-art', '3d', 'minimalist', 'isometric']),
  role: z.enum(['barbarian', 'sorcerer', 'rogue', 'cleric', 'druid', 'paladin', 'warlock']),
  story: z.string().max(500)
})

const lambda = async (event: APIGatewayProxyEventV2, context: Context) => {
  const { body, headers } = event

  try {
    if (!body) throw new Error('No Body Found')
    const auth = headers['authorization']
    const { supabase } = supabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser(auth?.split(' ')[1])
    if (error) {
      throw new Error(error.message)
    }
    console.log(body)
    const userRequest = bodySchema.parse(body)
    const { race, style, story, role } = userRequest

    const prompt = `Generate a concept art for a Dungeons & Dragons character based on the following parameters:
        the characters race is ${race},
        the art style should be ${style},
        the character is a ${role},
        the character's backstory is: ${story}`

    const resp = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      size: "1024x1024"
    })

    if (!resp) {
      throw new Error('OpenAI API error: ' + resp)
    }

    console.info('OpenAI API response: ', resp)

    const data = resp.data

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 400,
      body: (error as Error).message
    }
  }
}


export const handler = middy<APIGatewayProxyEventV2, APIGatewayProxyResultV2>()
  .use(httpJsonBodyParser())
  .handler(lambda)

