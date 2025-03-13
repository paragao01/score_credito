import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { MockAuthProvider } from "@/providers/mock-auth-provider"
import { UserAvatar } from "@/components/user-avatar"
import { Header } from "@/components/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>Score de Crédito</title>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MockAuthProvider>
            <Header />
            {children}
          </MockAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
