'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send } from 'lucide-react'
import { getAIResponse } from '../actions/ai'

interface ChatMessage {
  text: string
  sender: string
}

interface ChatBotProps {
  timetable: any
}

export default function ChatBot({ timetable }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (input.trim()) {
      setIsLoading(true)
      const userMessage = { text: input, sender: 'user' }
      setMessages(prev => [...prev, userMessage])
      setInput('')

      try {
        const aiResponse = await getAIResponse(input, timetable)
        setMessages(prev => [...prev, { text: aiResponse, sender: 'bot' }])
      } catch (error) {
        console.error('Error getting AI response:', error)
        setMessages(prev => [...prev, { text: "Sorry, I'm having trouble responding right now. Please try again later.", sender: 'bot' }])
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Card className={`dark:bg-gray-800 border-gray-700`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto mb-4 space-y-2">
          {messages.map((message, idx) => (
            <div key={idx} className={`p-2 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-100 text-blue-800 ml-auto' 
                : 'bg-gray-100 text-gray-800'
              } max-w-[80%] break-words`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

