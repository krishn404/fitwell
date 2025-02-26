"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function NutritionPlanner() {
  const [mealPlan, setMealPlan] = useState(null)
  const [caloriesConsumed, setCaloriesConsumed] = useState(0)
  const [waterIntake, setWaterIntake] = useState(0)

  useEffect(() => {
    // Fetch personalized meal plan from API
    // For now, we'll use a mock plan
    setMealPlan({
      type: "High-Protein",
      meals: [
        { name: "Breakfast", description: "Oatmeal with berries and nuts", calories: 350 },
        { name: "Lunch", description: "Grilled chicken salad", calories: 450 },
        { name: "Dinner", description: "Baked salmon with vegetables", calories: 500 },
        { name: "Snack", description: "Greek yogurt with honey", calories: 200 },
      ],
    })
  }, [])

  const addWater = () => {
    setWaterIntake((prev) => Math.min(prev + 250, 2000))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Personalized Meal Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold mb-4">Type: {mealPlan?.type}</p>
          <div className="space-y-4">
            {mealPlan?.meals.map((meal, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-sm text-gray-500">{meal.description}</p>
                </div>
                <p className="text-sm font-semibold">{meal.calories} cal</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Calorie Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <p>Daily Goal: 2000 cal</p>
            <p>Consumed: {caloriesConsumed} cal</p>
          </div>
          <Progress value={(caloriesConsumed / 2000) * 100} className="w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Water Intake</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <p>Daily Goal: 2000 ml</p>
            <p>Consumed: {waterIntake} ml</p>
          </div>
          <Progress value={(waterIntake / 2000) * 100} className="w-full mb-4" />
          <button
            onClick={addWater}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add 250ml
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

