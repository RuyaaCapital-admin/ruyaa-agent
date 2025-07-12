import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context" // Import LanguageProvider

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* lang attribute will be set dynamically by LanguageProvider */}
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
