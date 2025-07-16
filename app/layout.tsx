import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context"; // Import LanguageProvider
import { ChatProvider } from "@/context/chat-context";
import { AuthProvider } from "@/context/auth-context";
import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
