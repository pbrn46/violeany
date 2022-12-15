import React from "react"
import { PlaySet, String } from "../util/violin"
import { Dims } from "./ViolinDisplay"
import { ViolinDisplayNote } from "./ViolinDisplayNote"

type ViolinDisplayStringProps = {
  dims: Dims
  playSet: PlaySet
  string: String | undefined
  stringIndex: number
}
export function ViolinDisplayString({ dims, playSet, string, stringIndex }: ViolinDisplayStringProps) {
  const ret: React.ReactNode[] = []
  if (!string) return null
  for (let i = 0; i < string.length; i++) {
    ret.push(<ViolinDisplayNote
      key={i}
      dims={dims}
      playSet={playSet}
      note={string[i]}
      noteIndex={i}
      stringIndex={stringIndex}
    />)
  }
  return <>{ret}</>
}