"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function ActiveChallenges() {
  const challenges = [
    { name: "7-Day Workout Streak", progress: 5 },
    { name: "Hydration Challenge", progress: 3 },
    { name: "Mindfulness Challenge", progress: 4 },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
        <Badge variant="secondary">{challenges.length}</Badge>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {challenges.map((challenge, index) => (
            <motion.li
              key={challenge.name}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div>
                <p className="text-sm font-medium">{challenge.name}</p>
                <p className="text-xs text-muted-foreground">{challenge.progress}/7 days</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

