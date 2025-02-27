import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitWell - Your Personal Fitness & Wellness Companion",
  description: "Personalized fitness plans, nutrition tracking, and wellness monitoring",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navigation />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-6">{children}</main>
            <div className="h-24 md:h-0" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}