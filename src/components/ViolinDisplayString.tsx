import React from "react"
import { PlaySet } from "../util/violin"
import { ViolinString } from "../util/violinStrings"
import { Dims } from "./ViolinDisplay"
import { ViolinDisplayNote } from "./ViolinDisplayNote"

type ViolinDisplayStringProps = {
  dims: Dims
  playSet: PlaySet
  string: ViolinString | undefined
  stringIndex: number
}
export function ViolinDisplayString({ dims, playSet, string, stringIndex }: ViolinDisplayStringProps) {
  const ret: React.ReactNode[] = []
  if (!string) return null
  for (let i = 0; i < string.notes.length; i++) {
    ret.push(<ViolinDisplayNote
      key={i}
      dims={dims}
      playSet={playSet}
      note={string.notes[i]}
      noteIndex={i}
      stringIndex={stringIndex}
    />)
  }
  return <>{ret}</>
}