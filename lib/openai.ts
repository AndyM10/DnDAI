import { Configuration, OpenAIApi } from "openai";


const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
})

const openai = new OpenAIApi(config);


export async function generateImage(prompt: string) {

  try {
    const resp = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024"
    })

    const data = resp.data

    return data
  } catch (e) {
    throw e
  }
}
