"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Award } from "lucide-react"

export default function Gamification() {
  const [streak, setStreak] = useState(0)
  const [points, setPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [challengeProgress, setChallengeProgress] = useState(0)

  useEffect(() => {
    // Simulate streak and points
    setStreak(Math.floor(Math.random() * 10))
    setPoints(Math.floor(Math.random() * 1000))
    setChallengeProgress(Math.floor(Math.random() * 100))
  }, [])

  useEffect(() => {
    // Update level based on points
    setLevel(Math.floor(points / 100) + 1)
  }, [points])

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <div>
              <p className="font-medium">Streak</p>
              <p className="text-2xl font-bold">{streak} days</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-purple-500" />
            <div>
              <p className="font-medium">Points</p>
              <p className="text-2xl font-bold">{points}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-blue-500" />
            <div>
              <p className="font-medium">Level</p>
              <p className="text-2xl font-bold">{level}</p>
            </div>
          </div>
          <div>
            <p className="font-medium mb-1">Weekly Challenge</p>
            <Progress value={challengeProgress} className="w-full" />
            <p className="text-sm text-right mt-1">{challengeProgress}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

