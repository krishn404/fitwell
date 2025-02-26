"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"

export default function FitnessPlans() {
  const [workoutPlan, setWorkoutPlan] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Fetch personalized workout plan from API
    // For now, we'll use a mock plan
    setWorkoutPlan({
      goal: "Weight Loss",
      workouts: [
        { name: "Cardio", duration: "30 min", completed: false },
        { name: "Strength Training", duration: "45 min", completed: false },
        { name: "Yoga", duration: "20 min", completed: false },
      ],
    })
  }, [])

  const completeWorkout = (index) => {
    const updatedPlan = { ...workoutPlan }
    updatedPlan.workouts[index].completed = true
    setWorkoutPlan(updatedPlan)
    setProgress((prev) => prev + 33)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Personalized Fitness Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold mb-4">Goal: {workoutPlan?.goal}</p>
          <div className="space-y-4">
            {workoutPlan?.workouts.map((workout, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{workout.name}</p>
                  <p className="text-sm text-gray-500">{workout.duration}</p>
                </div>
                <Button
                  onClick={() => completeWorkout(index)}
                  disabled={workout.completed}
                  variant={workout.completed ? "outline" : "default"}
                >
                  {workout.completed ? "Completed" : "Complete"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="text-center mt-2">{progress}% completed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Workout Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={new Date()} className="rounded-md border" />
        </CardContent>
      </Card>
    </div>
  )
}

