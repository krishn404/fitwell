"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { WaterTracker } from "@/components/nutrition/water-tracker"
import { Apple, Beef, CroissantIcon as Bread, Fish } from "lucide-react"

export default function NutritionPage() {
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

  const macros = [
    { name: "Calories", icon: Apple, current: 1200, goal: 2000 },
    { name: "Protein", icon: Fish, current: 60, goal: 120 },
    { name: "Carbs", icon: Bread, current: 150, goal: 250 },
    { name: "Fat", icon: Beef, current: 40, goal: 65 },
  ]

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.h1 className="text-4xl font-bold" variants={item}>
        Nutrition Tracking
      </motion.h1>
      <motion.div className="grid gap-6 md:grid-cols-2" variants={container}>
        {macros.map((macro) => (
          <motion.div key={macro.name} variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <macro.icon className="mr-2 inline-block h-4 w-4" />
                  {macro.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{macro.current}</div>
                <Progress value={(macro.current / macro.goal) * 100} className="mt-2" />
                <p className="mt-2 text-xs text-muted-foreground">Goal: {macro.goal}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={item}>
        <WaterTracker />
      </motion.div>
    </motion.div>
  )
}

