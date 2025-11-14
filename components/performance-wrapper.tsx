"use client"

import { PerformanceProvider } from "@/contexts/performance-context"
import { ReactNode } from "react"

export function PerformanceWrapper({ children }: { children: ReactNode }) {
  return <PerformanceProvider>{children}</PerformanceProvider>
}

