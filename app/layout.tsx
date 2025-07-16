import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context"; // Import LanguageProvider
import { ChatProvider } from "@/context/chat-context";
import { AuthProvider } from "@/context/auth-context";
import Navigation from "@/components/navigation";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      {/* lang attribute will be set dynamically by LanguageProvider */}
      <body>
        <LanguageProvider>
          <AuthProvider>
            <ChatProvider>
              <Navigation />
              {children}
            </ChatProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
