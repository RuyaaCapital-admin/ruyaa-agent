// components/chat-widget.tsx

"use client";

import React, { useState, useRef, useCallback } from "react";
import { Send, X, Minimize2, Bot, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { useLanguage } from "../context/language-context";
import { useChatWidget } from "../context/chat-context";

export default function ChatWidget() {
  const { isOpen, setIsOpen } = useChatWidget();
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ id: string; role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Guard: only one in-flight call
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const payload = [{ role: 'user', content: input }];
    setInput("");

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload, sessionId }),
      });
      const data = await res.json();
      const reply = data.reply || data.text || '[No response]';
      if (data.sessionId) setSessionId(data.sessionId);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: t('error_message') }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  }, [input, isLoading, sessionId, t]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen(true)}>Open Chat</Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsMinimized(false)}>Restore Chat</Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:max-w-md mx-auto z-50">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <span>{t('chat_title')}</span>
          <div className="space-x-2">
            <Button onClick={() => setIsMinimized(true)}><Minimize2 /></Button>
            <Button onClick={() => setIsOpen(false)}><X /></Button>
          </div>
        </CardHeader>
        <CardContent className="h-60 overflow-y-auto">
          <ScrollArea>
            {messages.map(m => (
              <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <strong>{m.role}:</strong> {m.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex">
          <form onSubmit={handleSubmit} className="flex flex-1 space-x-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isLoading}
              placeholder={t('type_message')}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}><Send /></Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
