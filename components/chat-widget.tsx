// components/chat-widget.tsx

"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Send, X, Minimize2, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useLanguage } from "../context/language-context";
import { useChatWidget } from "../context/chat-context";

function useSimpleChat(api: string, initialMessages: any[]) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const detectLanguage = (text: string): "ar" | "en" => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "ar" : "en";
  };

  const checkIdentityQuestion = (text: string, lang: "ar" | "en"): string | null => {
    const lowerText = text.toLowerCase();
    const identityKeywords = {
      ar: ["من انت", "مين انت", "شو انت", "ايش انت", "who are you", "what are you"],
      en: ["who are you", "what are you", "who r u", "what r u", "introduce yourself"],
    };

    if (identityKeywords[lang].some(keyword => lowerText.includes(keyword))) {
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
      );
    }
    return "guest-token";
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (!input.trim()) return;

    const currentInput = input;
    setInput("");
    setIsLoading(true);
    console.log("🔵 handleSubmit start", currentInput);

    setMessages(prev => [...prev, { id: Math.random().toString(36), role: 'user', content: currentInput }]);
    const userLang = detectLanguage(currentInput);

    try {
      const identity = checkIdentityQuestion(currentInput, userLang);
      if (identity) {
        setMessages(prev => [...prev, { id: Math.random().toString(36), role: 'assistant', content: identity }]);
        setIsLoading(false);
        return;
      }

      const res = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: currentInput }], sessionId })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.sessionId && !sessionId) setSessionId(data.sessionId);

      setMessages(prev => [...prev, { id: Math.random().toString(36), role: 'assistant', content: data.reply || '[No response]' }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { id: Math.random().toString(36), role: 'assistant', content: userLang === 'ar' ? 'عذراً، حدث خطأ.' : 'Sorry, an error occurred.' }]);
    }
    setIsLoading(false);
  }, [api, input, isLoading, sessionId]);

  return useMemo(() => ({ messages, input, handleInputChange, handleSubmit, isLoading }), [messages, input, handleInputChange, handleSubmit, isLoading]);
}

export default function ChatWidget() {
  const { isOpen, setIsOpen } = useChatWidget();
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();
  
  const initial = useMemo(() => [{ id: 'welcome', role: 'assistant', content: t('chat_welcome_message') }], [t]);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useSimpleChat('/api/chat', initial);

  const scroll = useCallback(() => messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }), []);
  useEffect(() => { scroll(); }, [messages, scroll]);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); handleSubmit(e); }, [handleSubmit]);

  if (!isOpen) return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setIsOpen(true)}>Open Chat</Button>
    </div>
  );

  if (isMinimized) return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setIsMinimized(false)}>Restore Chat</Button>
    </div>
  );

  return (
    <div className="fixed bottom-0 right-0 left-0 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-md z-50">
      <Card>
        <CardHeader>
          <h3>{t('ruyaa_ai_assistant')}</h3>
          <Button onClick={() => setIsMinimized(true)}><Minimize2 /></Button>
          <Button onClick={() => setIsOpen(false)}><X /></Button>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            {messages.map(m => <div key={m.id}>{m.content}</div>)}
            <div ref={messagesEnd} />
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={onSubmit} className="flex space-x-2">
            <Input value={input} onChange={handleInputChange} disabled={isLoading} />
            <Button type="submit" disabled={isLoading || !input.trim()}><Send /></Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
