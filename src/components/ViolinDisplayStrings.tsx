import React from "react"
import { PlaySet } from "../util/violin"
import { ViolinStrings } from "../util/violinStrings"
import { Dims } from "./ViolinDisplay"
import { ViolinDisplayString } from "./ViolinDisplayString"

type ViolinDisplayStringsProps = {
  dims: Dims
  playSet: PlaySet
  strings: ViolinStrings
}
export function ViolinDisplayStrings({ dims, playSet, strings }: ViolinDisplayStringsProps) {
  const ret: React.ReactNode[] = []
  let index = 0
  strings.forEach((v, k) => {
    ret.push(<ViolinDisplayString
      key={k}
      dims={dims}
      playSet={playSet}
      string={v}
      stringIndex={index}
    />)
    index++
  })
  return <>{ret}</>
}