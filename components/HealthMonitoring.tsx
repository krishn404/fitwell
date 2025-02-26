"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Moon, Activity } from "lucide-react"

export default function HealthMonitoring() {
  const [steps, setSteps] = useState(0)
  const [heartRate, setHeartRate] = useState(0)
  const [sleepHours, setSleepHours] = useState(0)

  useEffect(() => {
    // Initialize step counting
    if ("DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion)
    }

    // Simulate heart rate and sleep data
    setHeartRate(Math.floor(Math.random() * (80 - 60 + 1) + 60))
    setSleepHours(Math.floor(Math.random() * (9 - 6 + 1) + 6))

    return () => {
      if ("DeviceMotionEvent" in window) {
        window.removeEventListener("devicemotion", handleMotion)
      }
    }
  }, [])

  const handleMotion = (event) => {
    const acceleration = event.accelerationIncludingGravity
    if (acceleration) {
      // Simple step detection algorithm
      const magnitude = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2)
      if (magnitude > 15) {
        // Threshold for step detection
        setSteps((prevSteps) => prevSteps + 1)
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Step Counter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-6 h-6 text-blue-500" />
            <p className="text-2xl font-bold">{steps}</p>
          </div>
          <Progress value={(steps / 10000) * 100} className="w-full" />
          <p className="text-center mt-2">Goal: 10,000 steps</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Heart className="w-8 h-8 text-red-500 mr-2" />
            <p className="text-3xl font-bold">{heartRate} BPM</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sleep Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Moon className="w-8 h-8 text-indigo-500 mr-2" />
            <p className="text-3xl font-bold">{sleepHours} hours</p>
          </div>
          <p className="text-center mt-2">Last night's sleep</p>
        </CardContent>
      </Card>
    </div>
  )
}

