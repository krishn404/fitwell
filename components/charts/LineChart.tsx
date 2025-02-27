"use client"

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

interface LineChartProps {
  data: Array<{
    name: string
    value: number
  }>
}

export default function LineChart({ data }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0].payload.name}</span>
                      <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

