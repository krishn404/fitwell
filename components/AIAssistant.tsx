"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export default function AIAssistant() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState([])

  const sendMessage = async () => {
    if (!message.trim()) return

    // Add user message to conversation
    setConversation((prev) => [...prev, { role: "user", content: message }])

    // Call GROQ AI API
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()

      // Add AI response to conversation
      setConversation((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error:", error)
      // Handle error (e.g., show error message to user)
    }

    // Clear input
    setMessage("")
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle>AI Wellness Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${msg.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"}`}
            >
              <p className={msg.role === "user" ? "text-right" : "text-left"}>{msg.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about fitness or wellness..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </Card>
  )
}

