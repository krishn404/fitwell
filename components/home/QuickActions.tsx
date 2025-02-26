"use client"

import { motion } from "framer-motion"
import { Dumbbell, Apple, Activity, Brain } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Workouts",
    description: "AI-powered personal training plans",
    icon: Dumbbell,
    href: "/workouts",
    color: "bg-blue-500/10",
  },
  {
    title: "Nutrition",
    description: "Personalized meal plans and tracking",
    icon: Apple,
    href: "/nutrition",
    color: "bg-green-500/10",
  },
  {
    title: "Health",
    description: "Monitor your vital statistics",
    icon: Activity,
    href: "/health",
    color: "bg-red-500/10",
  },
  {
    title: "Wellness",
    description: "Mental health and meditation",
    icon: Brain,
    href: "/wellness",
    color: "bg-purple-500/10",
  },
]

export default function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={action.href}
            className="group block rounded-lg border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <div className={`mb-4 inline-flex rounded-lg p-3 ${action.color}`}>
              <action.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">{action.title}</h3>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

