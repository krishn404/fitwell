"use client"

import { useEffect, useState } from "react"

interface ProgressRingProps {
  progress: number
  size: number
  strokeWidth: number
  color?: string
}

export function ProgressRing({ progress, size, strokeWidth, color = "#3b82f6" }: ProgressRingProps) {
  const [offset, setOffset] = useState(0)
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = radius * 2 * Math.PI

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference
    setOffset(progressOffset)
  }, [progress, circumference])

  return (
    <svg width={size} height={size}>
      <circle
        className="stroke-muted"
        stroke-width={strokeWidth}
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        className="progress-ring"
        stroke={color}
        stroke-width={strokeWidth}
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
      />
    </svg>
  )
}

