"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Dumbbell, Apple, Activity, Brain, Target, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/workouts", icon: Dumbbell, label: "Workouts" },
    { href: "/nutrition", icon: Apple, label: "Nutrition" },
    { href: "/health", icon: Activity, label: "Health" },
    { href: "/wellness", icon: Brain, label: "Wellness" },
    { href: "/challenges", icon: Target, label: "Challenges" },
    { href: "/assistant", icon: MessageSquare, label: "Assistant" },
  ]

  // Desktop Navigation
  const DesktopNav = () => (
    <nav className="hidden md:block border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            FitAI
          </Link>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <span className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator-desktop"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )

  // Mobile Navigation
  const MobileNav = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-[320px]" // Fixed width to show exactly 5 icons
      >
        <nav className="bg-zinc-900/90 backdrop-blur-xl rounded-full overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide px-6 py-4">
            <div className="flex space-x-8 min-w-max">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className="flex flex-col items-center">
                    <item.icon className={`h-6 w-6 ${isActive ? "text-white" : "text-gray-400"}`} />
                    <span className={`text-xs ${isActive ? "text-white" : "text-gray-400"}`}>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </motion.div>
    </div>
  )

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  )
}

