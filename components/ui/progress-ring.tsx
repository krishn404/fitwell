"use client"

import { useEffect, useState } from "react"

interface ProgressRingProps {
  progress: number
  size: number
  strokeWidth: number
  color?: string
}

export function ProgressRing({ progress, size, strokeWidth, color = "#3b82f6" }: ProgressRingProps) {
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = radius * 2 * Math.PI
  
  // Calculate offset directly instead of using state and useEffect
  const progressOffset = ((100 - progress) / 100) * circumference

  return (
    <svg width={size} height={size}>
      <circle
        className="stroke-muted"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        className="progress-ring"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
        style={{
          strokeDasharray: `${circumference}`,
          strokeDashoffset: progressOffset,
        }}
      />
    </svg>
  )
}