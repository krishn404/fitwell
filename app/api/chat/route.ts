import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    const response = await fetch("https://api.groq.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          { role: "system", content: "You are a helpful fitness and wellness assistant." },
          { role: "user", content: message },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to get response from GROQ AI")
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

