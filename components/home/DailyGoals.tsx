"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy } from "lucide-react"
import { motion } from "framer-motion"

export default function DailyGoals() {
  const goals = [
    { name: "Steps", progress: 67, goal: 10000, current: 6700 },
    { name: "Water", progress: 50, goal: 2000, current: 1000 },
    { name: "Sleep", progress: 80, goal: 8, current: 6.4 },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Trophy className="mr-2 inline-block h-4 w-4" />
          Daily Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-1 text-sm">
                <span>{goal.name}</span>
                <span>
                  {goal.current} / {goal.goal}
                </span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

