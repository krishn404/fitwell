"use client"

import { motion } from "framer-motion"
import { Activity, Heart, Brain, Droplet, Moon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DailyGoals from "@/components/home/DailyGoals"
import ActiveChallenges from "@/components/home/ActiveChallenges"
import LineChart from "@/components/charts/LineChart"
import BarChart from "@/components/charts/BarChart"

export default function Home() {
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

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-4xl font-bold">Welcome </h1>
        <p className="text-muted-foreground">Here's your health overview</p>
      </motion.div>

      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" variants={container}>
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,249</div>
              <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
              <div className="mt-4 h-[60px]">
                <BarChart
                  data={[
                    { name: "Mon", value: 6000 },
                    { name: "Tue", value: 7500 },
                    { name: "Wed", value: 8249 },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72 BPM</div>
              <p className="text-xs text-muted-foreground">Resting heart rate</p>
              <div className="mt-4 h-[60px]">
                <LineChart
                  data={[
                    { name: "1PM", value: 70 },
                    { name: "2PM", value: 75 },
                    { name: "3PM", value: 72 },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
              <Droplet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.8L</div>
              <p className="text-xs text-muted-foreground">of 2.5L daily goal</p>
              <div className="mt-4 h-[60px]">
                <BarChart
                  data={[
                    { name: "Morning", value: 0.6 },
                    { name: "Afternoon", value: 0.8 },
                    { name: "Evening", value: 0.4 },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sleep</CardTitle>
              <Moon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7h 24m</div>
              <p className="text-xs text-muted-foreground">+1.2h from average</p>
              <div className="mt-4 h-[60px]">
                <BarChart
                  data={[
                    { name: "Deep", value: 2.5 },
                    { name: "Light", value: 3.5 },
                    { name: "REM", value: 1.4 },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <motion.div className="lg:col-span-4" variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <LineChart
                  data={[
                    { name: "Mon", value: 65 },
                    { name: "Tue", value: 78 },
                    { name: "Wed", value: 85 },
                    { name: "Thu", value: 72 },
                    { name: "Fri", value: 89 },
                    { name: "Sat", value: 92 },
                    { name: "Sun", value: 84 },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-3" variants={item}>
          <DailyGoals />
        </motion.div>

        <motion.div className="lg:col-span-4" variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Wellness Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex flex-col items-center">
                  <Brain className="h-8 w-8 text-primary mb-2" />
                  <div className="text-2xl font-bold">85</div>
                  <p className="text-xs text-muted-foreground">Mental</p>
                </div>
                <div className="flex flex-col items-center">
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <div className="text-2xl font-bold">92</div>
                  <p className="text-xs text-muted-foreground">Physical</p>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-8 w-8 text-primary mb-2" />
                  <div className="text-2xl font-bold">78</div>
                  <p className="text-xs text-muted-foreground">Activity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-3" variants={item}>
          <ActiveChallenges />
        </motion.div>
      </div>
    </motion.div>
  )
}

