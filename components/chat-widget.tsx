"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function RuyaaModernChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const newMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, newMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMsg] }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.reply || "..." },
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Error: Could not reply." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-full">
      {/* Floating Spinning R Button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-tr from-black to-blue-900 border-2 border-blue-600 shadow-2xl flex items-center justify-center rounded-full hover:bg-neutral-900 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 group"
        >
          <motion.span
            className="text-4xl font-extrabold text-blue-400 select-none drop-shadow-[0_2px_8px_rgba(30,144,255,0.8)] group-hover:text-blue-300"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            R
          </motion.span>
        </motion.button>
      )}
      {/* Chat Panel */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="w-[93vw] max-w-xs sm:max-w-sm bg-black/90 border border-blue-800 rounded-3xl shadow-2xl p-0 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-800 bg-gradient-to-r from-neutral-950 via-black to-blue-950">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-blue-400 tracking-wide drop-shadow-sm">
                Ruyaa Agent
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-blue-700 shadow border border-blue-900 focus:outline-none"
              aria-label="Close Chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6 6l8 8M6 14L14 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          {/* Chat Messages */}
          <div className="flex-1 min-h-[300px] max-h-[62vh] overflow-y-auto p-3 bg-gradient-to-b from-neutral-950 via-black to-neutral-900">
            {messages.length === 0 && (
              <div className="text-neutral-400 text-center text-sm pt-12">
                ابدأ الدردشة مع وكيل رؤيا الذكي…
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "text-right text-base text-white mb-2"
                    : "text-left text-base text-blue-300 mb-2"
                }
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Area */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-blue-800 bg-gradient-to-r from-black via-neutral-950 to-blue-950 p-3"
          >
            <input
              className="flex-1 rounded-xl bg-neutral-900 px-4 py-2 text-white placeholder-blue-300 outline-none focus:ring focus:ring-blue-500/40 text-base"
              placeholder={loading ? "انتظر الرد…" : "اكتب رسالتك…"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-gradient-to-tr from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-700 text-white font-bold rounded-xl px-4 py-2 shadow-lg focus:outline-none focus:ring focus:ring-blue-400/30 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading || !input.trim()}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 12l16-4-4 16-4-7-7-4z" />
              </svg>
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
