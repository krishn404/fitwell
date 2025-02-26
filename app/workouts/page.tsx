"use client"

import { motion } from "framer-motion"
import { WorkoutCard } from "@/components/workouts/workout-card"
import { useState } from "react"

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Morning Cardio", duration: "30 min", type: "Cardio", completed: false },
    { id: 2, name: "Upper Body Strength", duration: "45 min", type: "Strength", completed: false },
    { id: 3, name: "Yoga Flow", duration: "20 min", type: "Flexibility", completed: false },
    { id: 4, name: "HIIT Session", duration: "25 min", type: "High Intensity", completed: false },
  ])

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

  const handleComplete = (id: number) => {
    setWorkouts(workouts.map((workout) => (workout.id === id ? { ...workout, completed: true } : workout)))
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.h1 className="text-4xl font-bold" variants={item}>
        Your Workouts
      </motion.h1>
      <motion.div className="grid gap-6 md:grid-cols-2" variants={container}>
        {workouts.map((workout) => (
          <motion.div key={workout.id} variants={item}>
            <WorkoutCard
              name={workout.name}
              duration={workout.duration}
              type={workout.type}
              completed={workout.completed}
              onComplete={() => handleComplete(workout.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

