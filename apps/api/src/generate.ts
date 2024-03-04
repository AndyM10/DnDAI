import { APIGatewayProxyEventV2, Context, Handler } from "aws-lambda"
import OpenAI from "openai"
import { z } from "zod"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})


console.log(process.env.OPENAI_API_KEY)
const bodySchema = z.object({
  race: z.enum(['Human', 'Elf', 'Dwarf', 'Dragonborn', 'Drow', 'Gnome', 'Halfling', 'Fire Genasi']),
  style: z.enum(['hyperrealism', 'anime', 'pop-art', 'pixel-art', '3d', 'minimalist', 'isometric']),
  role: z.enum(['barbarian', 'sorcerer', 'rogue', 'cleric', 'druid', 'paladin', 'warlock']),
  story: z.string().max(500)
})

export const handler: Handler = async (event: APIGatewayProxyEventV2, context: Context) => {
  const { body } = event

  try {
    if (!body) throw new Error('No Body Found')
    console.log(JSON.parse(body))

    const userRequest = bodySchema.parse(JSON.parse(body))

    const { race, style, story, role } = userRequest
    console.log(race, style, story, role)

  } catch (error) {
    return {
      statusCode: 400,
      body: (error as Error).message
    }

  }
}

