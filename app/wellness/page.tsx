"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Heart, Smile, Sun, Play, Pause, RotateCcw } from "lucide-react"

export default function WellnessPage() {
  const [meditationTime, setMeditationTime] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive) {
      interval = setInterval(() => {
        setMeditationTime((time) => time + 1)
      }, 1000)
    } else if (!isActive && meditationTime !== 0) {
      clearInterval(interval!)
    }
    return () => clearInterval(interval!)
  }, [isActive, meditationTime])

  const toggleMeditation = () => {
    setIsActive(!isActive)
  }

  const resetMeditation = () => {
    setIsActive(false)
    setMeditationTime(0)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

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

  const wellnessMetrics = [
    { name: "Stress Level", icon: Brain, value: "Low", color: "text-green-500" },
    { name: "Mood", icon: Smile, value: "Happy", color: "text-yellow-500" },
    { name: "Energy", icon: Sun, value: "High", color: "text-orange-500" },
    { name: "Mindfulness", icon: Heart, value: "30 min", color: "text-purple-500" },
  ]

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.h1 className="text-4xl font-bold" variants={item}>
        Wellness Tracking
      </motion.h1>
      <motion.div className="grid gap-6 md:grid-cols-2" variants={container}>
        {wellnessMetrics.map((metric) => (
          <motion.div key={metric.name} variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span>{metric.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <span>Meditation Timer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={meditationTime}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-6xl font-bold"
              >
                {formatTime(meditationTime)}
              </motion.div>
            </AnimatePresence>
            <div className="flex space-x-4">
              <Button onClick={toggleMeditation} variant="outline" size="icon">
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button onClick={resetMeditation} variant="outline" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

