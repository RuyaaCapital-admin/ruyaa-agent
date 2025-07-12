"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import type { Message } from "ai"
import { Send, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "أهلاً! أنا مساعد رؤيا الذكي – جاهز أشرح كيف وكلاؤنا بيخلّصوا شغلك تلقائياً. شو بتحتاج؟",
      },
    ],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          className="rounded-full w-16 h-16 bg-gray-950 hover:bg-gray-900 text-gray-100 shadow-lg flex items-center justify-center border border-gray-800 transition-colors duration-200"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-80 max-w-[90vw] sm:max-w-sm md:max-w-md lg:max-w-lg h-[calc(100vh-8rem)] sm:h-[500px] flex flex-col bg-black text-gray-100 border border-gray-950 shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-900 bg-gray-950">
            <CardTitle className="text-lg font-semibold text-gray-50">مساعد رؤيا الذكي</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors duration-200"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-hidden bg-gray-950">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {messages.map((m: Message) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                        m.role === "user"
                          ? "bg-gray-800 text-gray-50" // User message bubble
                          : "bg-gray-900 text-gray-200" // AI message bubble
                      }`}
                    >
                      <p className="text-sm leading-relaxed" dir="rtl">
                        {m.content}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t border-gray-900 bg-gray-950">
            <form onSubmit={handleFormSubmit} className="flex w-full space-x-2 rtl:space-x-reverse">
              <Input
                className="flex-1 bg-gray-900 border-gray-800 text-gray-50 placeholder:text-gray-600 focus:ring-gray-700 focus:border-gray-700 rounded-md px-3 py-2 text-sm"
                placeholder="اكتب رسالتك..."
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                dir="rtl"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gray-800 hover:bg-gray-700 text-gray-50 border border-gray-800 rounded-md px-3 py-2 transition-colors duration-200"
              >
                <Send className="w-5 h-5" />
                <span className="sr-only">إرسال</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
