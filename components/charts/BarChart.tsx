"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis } from "recharts"

interface BarChartProps {
  data: Array<{
    name: string
    value: number
  }>
}

export default function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

