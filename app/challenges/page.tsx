"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Target, Zap, CheckCircle } from "lucide-react"

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([
    { id: 1, name: "30-Day Fitness Challenge", icon: Trophy, progress: 60, daysLeft: 12, completed: false },
    { id: 2, name: "Hydration Challenge", icon: Target, progress: 80, daysLeft: 4, completed: false },
    { id: 3, name: "10k Steps Daily", icon: Zap, progress: 40, daysLeft: 18, completed: false },
  ])

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

  const handleComplete = (id: number) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === id ? { ...challenge, completed: true, progress: 100, daysLeft: 0 } : challenge,
      ),
    )
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.h1 className="text-4xl font-bold" variants={item}>
        Active Challenges
      </motion.h1>
      <motion.div className="grid gap-6 md:grid-cols-2" variants={container}>
        {challenges.map((challenge) => (
          <motion.div key={challenge.id} variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <challenge.icon className="h-5 w-5 text-primary" />
                  <span>{challenge.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={challenge.progress}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Progress value={challenge.progress} className="mb-2" />
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-between text-sm mb-4">
                  <span>{challenge.progress}% Complete</span>
                  <span>{challenge.daysLeft} days left</span>
                </div>
                <Button onClick={() => handleComplete(challenge.id)} disabled={challenge.completed} className="w-full">
                  {challenge.completed ? (
                    <span className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

