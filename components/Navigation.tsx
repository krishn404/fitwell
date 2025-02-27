"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Dumbbell, Apple, Activity, Brain, Target, MessageSquare, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export default function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

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
            FitWell
          </Link>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 transition-colors hover:text-primary group",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <span className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
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
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4 p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
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
        className="relative w-[320px]"
      >
        <nav className="bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 shadow-lg shadow-black/20 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide px-6 py-4 items-center">
            <div className="flex space-x-8 min-w-max">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className="relative flex flex-col items-center space-y-1 w-6">
                    <span className="relative">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            layoutId="navbar-highlight"
                            className="absolute inset-0 rounded-full bg-yellow-400/20"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                      <item.icon
                        className={cn("h-6 w-6 transition-colors", isActive ? "text-yellow-400" : "text-zinc-400")}
                      />
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-medium transition-colors",
                        isActive ? "text-zinc-100" : "text-zinc-500",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-4 p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </button>
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