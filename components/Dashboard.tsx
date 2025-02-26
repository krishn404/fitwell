"use client"

import { useState } from "react"
import FitnessPlans from "./FitnessPlans"
import NutritionPlanner from "./NutritionPlanner"
import HealthMonitoring from "./HealthMonitoring"
import AIAssistant from "./AIAssistant"
import Gamification from "./Gamification"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("fitness")

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">FitWell Dashboard</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${activeTab === "fitness" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("fitness")}
        >
          Fitness
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeTab === "nutrition" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("nutrition")}
        >
          Nutrition
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeTab === "health" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("health")}
        >
          Health
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeTab === "assistant" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("assistant")}
        >
          Assistant
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === "fitness" && <FitnessPlans />}
        {activeTab === "nutrition" && <NutritionPlanner />}
        {activeTab === "health" && <HealthMonitoring />}
        {activeTab === "assistant" && <AIAssistant />}
      </div>
      <Gamification />
    </div>
  )
}

