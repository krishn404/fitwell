import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export const runtime = "nodejs"
export const maxDuration = 60

const SYSTEM_PROMPT = `You are a helpful fitness and wellness assistant. Provide clear and concise health advice on exercise, diet, and mental well-being.`

const apiKey = process.env.GROQ_API_KEY

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    if (!apiKey) {
      return new Response("API key is missing", { status: 500 })
    }

    const { text } = await generateText({
      model: groq("mixtral-8x7b-32768"),
      system: SYSTEM_PROMPT,
      prompt: lastMessage,
    })

    return new Response(JSON.stringify({ response: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error processing request" }), {
      status: 500,
    })
  }
}
