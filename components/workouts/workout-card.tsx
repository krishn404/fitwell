"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/ui/progress-ring"
import { Confetti } from "@/components/ui/confetti"
import { motion } from "framer-motion"
import { Play, CheckCircle } from "lucide-react"

interface WorkoutCardProps {
  name: string
  duration: string
  type: string
  completed: boolean
  onComplete: () => void
}

export function WorkoutCard({ name, duration, type, completed, onComplete }: WorkoutCardProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleComplete = () => {
    setShowConfetti(true)
    onComplete()
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{duration}</p>
              <span className="inline-block px-2 py-1 mt-2 text-xs rounded-full bg-primary/10 text-primary">
                {type}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <ProgressRing progress={completed ? 100 : 0} size={48} strokeWidth={4} />
              <Button
                variant={completed ? "outline" : "default"}
                size="icon"
                onClick={handleComplete}
                disabled={completed}
                className="transition-transform hover:scale-105"
              >
                {completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Confetti trigger={showConfetti} />
    </motion.div>
  )
}

