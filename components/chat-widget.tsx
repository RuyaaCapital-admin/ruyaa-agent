"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, X, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/language-context";
import { useChatWidget } from "@/context/chat-context";

// ----
// IMPORTANT: The "You need to call 'initialize' before calling this" error
// means the `useChat` hook is being called without the required provider or context initialization.
// This version does NOT use useChat from ai/react. Instead, it fetches the API directly.
// ----

function useSimpleChat(api: string, initialMessages: any[]) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = {
      id: Math.random().toString(36).slice(2),
      role: "user",
      content: input,
    };
    setMessages((prev: any) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: input }],
        }),
      });
      const data = await res.json();
      // Accept both text or content keys
      const assistantMessage = {
        id: data.id || Math.random().toString(36).slice(2),
        role: "assistant",
        content: data.text || data.content || "[No response]",
      };
      setMessages((prev: any) => [...prev, assistantMessage]);
    } catch (e) {
      setMessages((prev: any) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          role: "assistant",
          content: "[Error: No response from server]",
        },
      ]);
    }
    setIsLoading(false);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}

export default function ChatWidget() {
  const { isOpen, setIsOpen } = useChatWidget();
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  // Replace useChat with useSimpleChat
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useSimpleChat("/api/chat", [
      {
        id: "welcome",
        role: "assistant",
        content: t("chat_welcome_message"),
      },
    ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black border-2 border-gray-800 hover:border-gray-600 shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gray-900 to-black opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          <MessageSquare className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-200 transition-colors duration-300" />
          <div className="absolute inset-0 rounded-full border-2 border-gray-600 opacity-0 group-hover:opacity-100 animate-ping" />
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Card className="w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-black border-2 border-gray-800 shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white font-semibold text-sm">
                {t("ruyaa_ai_assistant")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(false)}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg w-8 h-8 p-0"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Card className="w-80 sm:w-96 h-[500px] sm:h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-black border-2 border-gray-800 shadow-2xl rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                {t("ruyaa_ai_assistant")}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-400 text-xs">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg w-8 h-8 p-0"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 p-0 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
          <ScrollArea className="h-full px-4 py-4">
            <div className="space-y-4">
              {messages.map((m: any) => (
                <div key={m.id} className="flex items-start space-x-3">
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700 flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {m.role === "user" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600 flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`flex-1 p-3 rounded-xl max-w-[80%] ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700 ml-auto"
                        : "bg-gradient-to-br from-gray-900 to-black text-gray-200 border border-gray-800"
                    }`}
                  >
                    <p
                      className="text-sm leading-relaxed whitespace-pre-wrap"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                    >
                      {m.content || m.text}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700 flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-gray-900 to-black p-3 rounded-xl border border-gray-800">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* Input */}
        <CardFooter className="p-4 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800">
          <form onSubmit={handleFormSubmit} className="flex w-full space-x-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder={t("type_your_message")}
                disabled={isLoading}
                dir={lang === "ar" ? "rtl" : "ltr"}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-xl px-4 py-3 pr-12"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 text-white border border-gray-600 rounded-xl px-4 py-3 transition-all duration-200 hover:scale-105 disabled:scale-100"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
