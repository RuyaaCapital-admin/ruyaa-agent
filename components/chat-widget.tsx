// Put this file in /components/ModernChatWidget.jsx (or .tsx)
import { useState } from "react";
import { motion } from "framer-motion";

export default function ModernChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Animated R Button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="w-14 h-14 bg-black border border-neutral-700 shadow-2xl flex items-center justify-center rounded-full hover:bg-neutral-900 hover:scale-110 transition"
        >
          <motion.span
            className="text-3xl font-extrabold text-blue-400 select-none"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            R
          </motion.span>
        </motion.button>
      )}
      {/* Chat Panel */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="w-[94vw] max-w-sm bg-black/90 border border-neutral-800 rounded-2xl shadow-2xl p-0 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-blue-400">Ruyaa AI</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700"
              aria-label="Close Chat"
            >
              <span className="text-lg font-bold text-white">×</span>
            </button>
          </div>
          {/* Chat Messages Area (placeholder) */}
          <div className="flex-1 min-h-[300px] max-h-[66vh] overflow-y-auto p-4 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black/90">
            {/* Messages go here */}
            <div className="text-neutral-400 text-sm">Start your conversation…</div>
          </div>
          {/* Input Area */}
          <form className="flex items-center gap-2 border-t border-neutral-800 bg-neutral-950 p-3">
            <input
              className="flex-1 rounded-xl bg-neutral-900 px-4 py-2 text-white placeholder-neutral-500 outline-none"
              placeholder="Type your message…"
              autoComplete="off"
              disabled
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-4 py-2 disabled:opacity-40 shadow"
              disabled
            >
              Send
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
