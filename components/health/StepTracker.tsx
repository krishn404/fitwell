"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Footprints } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const StepTracker = () => {
  const [steps, setSteps] = useState(0)

  const resetStepsIfNewDay = useCallback(() => {
    const lastUpdate = localStorage.getItem("lastStepUpdateDate")
    const today = new Date().toDateString()
    if (lastUpdate !== today) {
      setSteps(0)
      localStorage.setItem("dailySteps", "0")
      localStorage.setItem("lastStepUpdateDate", today)
    }
  }, [])

  useEffect(() => {
    resetStepsIfNewDay()

    const storedSteps = localStorage.getItem("dailySteps")
    if (storedSteps) {
      setSteps(Number.parseInt(storedSteps))
    }

    const handleStep = () => {
      setSteps((prevSteps) => {
        const newSteps = prevSteps + 1
        localStorage.setItem("dailySteps", newSteps.toString())
        return newSteps
      })
    }

    window.addEventListener("devicemotion", handleStep)

    return () => {
      window.removeEventListener("devicemotion", handleStep)
    }
  }, [resetStepsIfNewDay])

  const percentage = Math.min((steps / 10000) * 100, 100)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Footprints className="w-4 h-4" /> Step Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={steps}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="text-2xl font-bold text-center"
          >
            {steps}
          </motion.div>
        </AnimatePresence>
        <p className="text-muted-foreground text-sm text-center">Daily Steps</p>
        <Progress value={percentage} className="mt-4" />
        <p className="text-muted-foreground text-sm text-center mt-2">{percentage}% of your daily goal</p>
      </CardContent>
    </Card>
  )
}

export default StepTracker

