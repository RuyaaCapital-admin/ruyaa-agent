"use client";

import type React from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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

function useSimpleChat(api: string, initialMessages: any[]) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [],
  );

  const detectLanguage = (text: string): "ar" | "en" => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "ar" : "en";
  };

  const checkIdentityQuestion = (
    text: string,
    lang: "ar" | "en",
  ): string | null => {
    const lowerText = text.toLowerCase();
    const identityKeywords = {
      ar: [
        "من انت",
        "مين انت",
        "شو انت",
        "ايش انت",
        "who are you",
        "what are you",
      ],
      en: [
        "who are you",
        "what are you",
        "who r u",
        "what r u",
        "introduce yourself",
      ],
    };

    const keywords = identityKeywords[lang];
    const hasIdentityKeyword = keywords.some((keyword) =>
      lowerText.includes(keyword),
    );

    if (hasIdentityKeyword) {
      return lang === "ar"
        ? "أنا مساعد رؤيا كابيتال، بخلي شغلك أسهل وأسرع وبدون أخطاء—أي خدمة بتحتاجها جاهز فوراً."
        : "I'm your RuyaaCapital Smart Assistant. I help you boost sales, avoid mistakes, and get things done fast—24/7.";
    }

    return null;
  };

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("sb-auth-token") ||
        sessionStorage.getItem("sb-auth-token") ||
        "guest-token"
      ); // Fallback for anonymous users
    }
    return "guest-token";
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim()) return;

      const userLang = detectLanguage(input);

      const userMessage = {
        id: Math.random().toString(36).slice(2),
        role: "user",
        content: input,
      };
      setMessages((prev: any) => [...prev, userMessage]);
      const currentInput = input;
      setInput("");
      setIsLoading(true);

      try {
        const identityResponse = checkIdentityQuestion(currentInput, userLang);

        if (identityResponse) {
          const assistantMessage = {
            id: Math.random().toString(36).slice(2),
            role: "assistant",
            content: identityResponse,
          };
          setMessages((prev: any) => [...prev, assistantMessage]);
          setIsLoading(false);
          return;
        }

        const token = getAuthToken();

        const res = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: currentInput }],
            sessionId: sessionId,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Update session ID if returned
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId);
        }

        const assistantMessage = {
          id: Math.random().toString(36).slice(2),
          role: "assistant",
          content: data.reply || data.text || data.content || "[No response]",
        };
        setMessages((prev: any) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev: any) => [
          ...prev,
          {
            id: Math.random().toString(36).slice(2),
            role: "assistant",
            content:
              userLang === "ar"
                ? "عذراً، حدث خطأ. جرب مرة أخرى."
                : "Sorry, an error occurred. Please try again.",
          },
        ]);
      }
      setIsLoading(false);
    },
    [api, input, sessionId],
  );

  return useMemo(
    () => ({
      messages,
      input,
      handleInputChange,
      handleSubmit,
      isLoading,
    }),
    [messages, input, handleInputChange, handleSubmit, isLoading],
  );
}

export default function ChatWidget() {
  const { isOpen, setIsOpen } = useChatWidget();
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  // Memoize initial messages to prevent re-initialization
  const initialMessages = useMemo(
    () => [
      {
        id: "welcome",
        role: "assistant",
        content: t("chat_welcome_message"),
      },
    ],
    [t],
  );

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useSimpleChat("/api/chat", initialMessages);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e);
    },
    [handleSubmit],
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black border-2 border-gray-800 hover:border-gray-600 shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gray-900 to-black opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          <div
            className="relative z-10 text-white group-hover:text-gray-200 transition-colors duration-300 animate-spin"
            style={{ animation: "spin 4s linear infinite" }}
          >
            <span className="text-xl sm:text-2xl font-bold font-serif">R</span>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-gray-600 opacity-0 group-hover:opacity-100 animate-ping" />
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-auto max-w-[280px] sm:max-w-sm">
        <Card className="w-full bg-black border-2 border-gray-800 shadow-2xl rounded-xl overflow-hidden">
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
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:w-auto sm:max-w-md z-50">
      <div className="w-full h-[60vh] max-h-[500px] sm:h-[600px] sm:max-h-[calc(100vh-3rem)]">
        <Card className="w-full h-full bg-black border-2 border-gray-800 shadow-2xl rounded-t-xl sm:rounded-xl overflow-hidden flex flex-col backdrop-blur-sm">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 shrink-0">
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
          <CardContent className="flex-1 p-0 bg-gradient-to-b from-gray-950 to-black overflow-hidden min-h-0">
            <ScrollArea className="h-full px-3 sm:px-4 py-3 sm:py-4">
              <div className="space-y-3 sm:space-y-4">
                {messages.map((m: any) => (
                  <div
                    key={m.id}
                    className="flex items-start space-x-2 sm:space-x-3"
                  >
                    {m.role === "assistant" && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700 flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                    {m.role === "user" && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600 flex-shrink-0 mt-1">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`flex-1 p-2 sm:p-3 rounded-lg sm:rounded-xl max-w-[80%] sm:max-w-[75%] ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700 ml-auto"
                          : "bg-gradient-to-br from-gray-900 to-black text-gray-200 border border-gray-800"
                      }`}
                    >
                      <p
                        className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap"
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
          <CardFooter className="p-3 sm:p-4 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 shrink-0">
            <form
              onSubmit={handleFormSubmit}
              className="flex w-full space-x-2 sm:space-x-3"
            >
              <div className="flex-1 relative min-w-0">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={t("type_your_message")}
                  disabled={isLoading}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-xl px-4 py-3 text-sm w-full h-12 min-h-[48px]"
                  style={{ fontSize: "16px" }}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 text-white border border-gray-600 rounded-xl px-4 py-3 transition-all duration-200 hover:scale-105 disabled:scale-100 shrink-0 h-12 min-h-[48px] w-12"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
