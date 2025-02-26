"use client"

import { motion } from "framer-motion"
import { Sparkles, Dumbbell, Apple, Activity, Brain } from "lucide-react"
import DailyGoals from "@/components/home/DailyGoals"
import ActiveChallenges from "@/components/home/ActiveChallenges"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-4xl font-bold">Welcome To Fitwell</h1>
        <p className="text-muted-foreground">Track your fitness journey and stay motivated</p>
      </motion.div>

      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={container}>
        <motion.div variants={item} className="md:col-span-2 lg:col-span-1">
          <DailyGoals />
        </motion.div>
        <motion.div variants={item}>
          <ActiveChallenges />
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href="/assistant"
                className="inline-block w-full rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90"
              >
                Get Personalized Tips
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="mb-4 text-2xl font-bold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Workouts", icon: Dumbbell, href: "/workouts", color: "bg-blue-500/10" },
            { title: "Nutrition", icon: Apple, href: "/nutrition", color: "bg-green-500/10" },
            { title: "Health", icon: Activity, href: "/health", color: "bg-red-500/10" },
            { title: "Wellness", icon: Brain, href: "/wellness", color: "bg-purple-500/10" },
          ].map((action, index) => (
            <motion.div key={action.title} variants={item}>
              <Link
                href={action.href}
                className="group block rounded-lg border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className={`mb-4 inline-flex rounded-lg p-3 ${action.color}`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{action.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

