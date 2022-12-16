import React from 'react'
import { useAppSelector } from "../redux/store"
import { makeDims } from "./ViolinDisplay"


type ViewProps = {
  children?: React.ReactNode
  dims: ReturnType<typeof makeDims>
}

export function ViolinDisplayView({ children, dims }: ViewProps) {
  const simulateMode = useAppSelector(state => state.simulateMode)
  return <div className={`${simulateMode ? "tw-text-right" : "tw-text-center"} ViolinDisplay tw-bg-orange-200 tw-float tw-p-2`}>
    <svg className="ViolinDisplay"
      width={dims.SVG_WIDTH} height={dims.SVG_HEIGHT}>
      {children}
    </svg>
  </div>
}
