"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/ui/progress-ring"
import { Confetti } from "@/components/ui/confetti"
import { motion, AnimatePresence } from "framer-motion"
import { Droplet, Plus, Minus } from "lucide-react"

export function WaterTracker() {
  const [intake, setIntake] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const goalIntake = 2000 // ml
  const increment = 250 // ml

  useEffect(() => {
    if (intake > 0 && intake % 1000 === 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [intake])

  const addWater = () => {
    setIntake((prev) => Math.min(prev + increment, goalIntake))
  }

  const removeWater = () => {
    setIntake((prev) => Math.max(prev - increment, 0))
  }

  const progress = (intake / goalIntake) * 100

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplet className="h-5 w-5 text-blue-500" />
            <span>Water Intake</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative mb-6">
            <ProgressRing progress={progress} size={150} strokeWidth={8} color="#3b82f6" />
            <AnimatePresence mode="wait">
              <motion.div
                key={intake}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span className="text-3xl font-bold">{intake}</span>
                <span className="text-sm text-muted-foreground">ml</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={removeWater} disabled={intake === 0}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="default" onClick={addWater} disabled={intake === goalIntake} className="px-6">
              Add {increment}ml
            </Button>
            <Button variant="outline" size="icon" onClick={addWater} disabled={intake === goalIntake}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Goal: {goalIntake}ml</p>
        </CardContent>
      </Card>
      <Confetti trigger={showConfetti} />
    </motion.div>
  )
}

