import React, { useCallback, useEffect, useRef } from 'react'
import { generatePlaySet } from "../util/violin"
import { staffDims, generateCx } from "../util/staff"
import { StaffDisplayStaves } from './StaffDisplayStaves'
import { StaffDisplayNotes } from './StaffDisplayNotes'
import { useAppSelector } from "../redux/store"

export function StaffDisplay() {
  const { indexPlaying, playScale, playLoopMode } = useAppSelector(state => state)
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const scrollToIndexAsNeeded = useCallback((index: number) => {
    const scrollBox = scrollBoxRef.current
    if (!scrollBox) return

    const rect = scrollBox.getBoundingClientRect()
    const notePos = generateCx(index)
    const scrollLeft = scrollBox.scrollLeft
    const offset14 = rect.width * 1 / 4
    const offset34 = rect.width * 3 / 4
    const thresholdMax = scrollLeft + offset34
    const thresholdMin = scrollLeft + offset14
    if (notePos > thresholdMax || notePos < thresholdMin)
      scrollBox.scrollLeft = notePos - offset14
  }, [])

  useEffect(() => {
    scrollToIndexAsNeeded(indexPlaying)
  }, [indexPlaying, scrollToIndexAsNeeded])
  const playSet = generatePlaySet(playScale, playLoopMode)
  const svgWidth = (playSet.length - 1) * staffDims.NOTE_DISTANCE_X + staffDims.NOTE_RADIUS * 2 + staffDims.PADL_X + staffDims.PADR_X
  return <div
    className="StaffDisplay"
    ref={scrollBoxRef}
    style={{ overflowX: "auto" }}>
    <div
      style={{ width: "0px" }}>
      <svg className="StaffDisplay tw-border tw-border-black"
        height={staffDims.SVG_HEIGHT}
        style={{
          width: svgWidth,
        }}
      >
        <StaffDisplayStaves />
        <StaffDisplayNotes playSet={playSet} />
      </svg>
    </div>
  </div>

}