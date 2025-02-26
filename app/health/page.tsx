"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StepCounter } from "@/components/health/step-counter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Moon, Sun } from "lucide-react"

export default function HealthPage() {
  const [sleepStart, setSleepStart] = useState<Date | null>(null)
  const [sleepEnd, setSleepEnd] = useState<Date | null>(null)
  const [sleepDuration, setSleepDuration] = useState<string | null>(null)

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

  useEffect(() => {
    if (sleepStart && sleepEnd) {
      const duration = sleepEnd.getTime() - sleepStart.getTime()
      const hours = Math.floor(duration / (1000 * 60 * 60))
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
      setSleepDuration(`${hours}h ${minutes}m`)
    }
  }, [sleepStart, sleepEnd])

  const handleSleepToggle = () => {
    if (!sleepStart) {
      setSleepStart(new Date())
      setSleepEnd(null)
      setSleepDuration(null)
    } else if (!sleepEnd) {
      setSleepEnd(new Date())
    } else {
      setSleepStart(null)
      setSleepEnd(null)
      setSleepDuration(null)
    }
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.h1 className="text-4xl font-bold" variants={item}>
        Health Tracking
      </motion.h1>
      <motion.div className="grid gap-6 md:grid-cols-2" variants={container}>
        <motion.div variants={item}>
          <StepCounter />
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Heart Rate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">72 BPM</div>
              <p className="text-sm text-muted-foreground">Resting heart rate</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-blue-500" />
                <span>Sleep Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={sleepDuration || "tracking"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {sleepDuration ? (
                    <div className="text-3xl font-bold mb-2">{sleepDuration}</div>
                  ) : (
                    <div className="text-xl font-semibold mb-2">
                      {sleepStart ? "Sleep in progress..." : "Start tracking sleep"}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <Button
                onClick={handleSleepToggle}
                className="w-full"
                variant={sleepStart && !sleepEnd ? "destructive" : "default"}
              >
                {sleepStart && !sleepEnd ? (
                  <span className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <span>Wake Up</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Moon className="h-4 w-4" />
                    <span>Go to Sleep</span>
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

