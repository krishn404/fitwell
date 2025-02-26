"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressRing } from "@/components/ui/progress-ring"
import { Confetti } from "@/components/ui/confetti"
import { motion } from "framer-motion"
import { Footprints } from "lucide-react"

export function StepCounter() {
  const [steps, setSteps] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const goalSteps = 10000

  useEffect(() => {
    if ("DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion)
    }

    return () => {
      if ("DeviceMotionEvent" in window) {
        window.removeEventListener("devicemotion", handleMotion)
      }
    }
  }, [])

  useEffect(() => {
    if (steps > 0 && steps % 1000 === 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [steps])

  const handleMotion = (event: DeviceMotionEvent) => {
    const acceleration = event.accelerationIncludingGravity
    if (acceleration) {
      const magnitude = Math.sqrt(acceleration.x! ** 2 + acceleration.y! ** 2 + acceleration.z! ** 2)
      if (magnitude > 15) {
        setSteps((prev) => prev + 1)
      }
    }
  }

  const progress = (steps / goalSteps) * 100

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Footprints className="h-5 w-5 text-primary" />
            <span>Step Counter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative">
            <ProgressRing progress={progress} size={120} strokeWidth={8} color="var(--primary)" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                key={steps}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <span className="text-3xl font-bold">{steps}</span>
              </motion.div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Goal: {goalSteps.toLocaleString()} steps</p>
        </CardContent>
      </Card>
      <Confetti trigger={showConfetti} />
    </motion.div>
  )
}

