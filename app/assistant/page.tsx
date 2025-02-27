"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send } from "lucide-react"

export default function AssistantPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you with your fitness and wellness journey today?" },
  ])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      // Here you would typically send the message to your AI backend
      // and then add the response to the messages
      setInput("")
    }
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.h1 className="text-4xl font-bold" variants={item}>
        AI Wellness Assistant
      </motion.h1>
      <motion.div variants={item}>
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Chat with your AI Assistant</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                } max-w-[80%]`}
              >
                {message.content}
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

