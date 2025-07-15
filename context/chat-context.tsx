"use client";

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openChat: () => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <ChatContext.Provider value={{ isOpen, setIsOpen, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatWidget = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatWidget must be used within a ChatProvider");
  }
  return context;
};
