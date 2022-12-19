import React, { useCallback } from "react"
import { statusActions } from "../redux/reducers/status"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { ViolinKey, PlaySet, PlaySets } from "../util/violin"
import { Dims } from "./ViolinDisplay"

type ViolinDisplayNoteProps = {
  dims: Dims
  playSet: PlaySet
  note: string
  noteIndex: number
  stringIndex: number
}
export function ViolinDisplayNote({ dims, playSet, note, noteIndex, stringIndex }: ViolinDisplayNoteProps) {
  const dispatch = useAppDispatch()
  const playMode = useAppSelector(state => state.config.playMode)
  const keysPlaying = useAppSelector(state => state.status.keysPlaying)
  const keysClicked = useAppSelector(state => state.status.keysClicked)

  type EventType = "mousedown" | "mouseup" | "mouseout" | "touchstart" | "touchend"
  const handlePointEvent = useCallback((eventType: EventType, e: React.MouseEvent | React.TouchEvent, key: ViolinKey) => {
    switch (eventType) {
      case 'mousedown':
        dispatch(statusActions.setKeysClicked([key]))
        break
      case 'mouseup':
        dispatch(statusActions.setKeysClicked([]))
        break
      case 'mouseout':
        dispatch(statusActions.setKeysClicked([]))
        break
      case 'touchstart':
        if (e instanceof TouchEvent && e.touches.length > 0) {
          dispatch(statusActions.addKeyClicked(key))
        }
        break
      case 'touchend':
        if (e instanceof TouchEvent && e.touches.length === 0) {
          dispatch(statusActions.setKeysClicked([]))
          // this.props.removeKeyClicked(key)
        } else {
          dispatch(statusActions.removeKeyClicked(key))
        }
        e.preventDefault()
        break
      default:
        break
    }
  }, [dispatch])


  // Positioning
  let cx = dims.STRING_XS[stringIndex]
  let cy = dims.NOTE_YS[noteIndex]
  if (noteIndex !== 0) {
    cy += dims.FIRST_ROW_MARGIN_Y
  }

  // Fill Color
  if (playMode === "TUNING")
    playSet = []
  const positionIsInPLaySet = PlaySets.hasPosition(
    playSet, [stringIndex, noteIndex])
  const isPlaying = PlaySets.hasPosition(
    keysPlaying, [stringIndex, noteIndex])
  let isClicked = false
  if (keysClicked)
    isClicked =
      PlaySets.hasPosition(
        keysClicked, [stringIndex, noteIndex])
  const fill = isClicked ? "#8ff" :
    isPlaying ? "#8f8" :
      positionIsInPLaySet ? "#ff8" : "#fff"
  let transition = "fill 0.1s"
  if (!isClicked && !isPlaying)
    transition = "fill 1s"

  // Event callback data
  const key: ViolinKey = { position: [stringIndex, noteIndex], finger: -1 }

  // Text
  const finger = PlaySets.fingerFromPosition(
    [stringIndex, noteIndex], playSet)
  let noteBase = note[0]
  let octave = note[1]
  if (note.length >= 3) {
    noteBase += note[1]
    octave = note[2]
  }

  return <g className="ViolinDisplay"
    key={note + "-" + stringIndex + "-" + noteIndex}>
    <circle
      className="Note"
      cx={cx}
      cy={cy}
      r={dims.NOTE_RADIUS - dims.STROKE_WIDTH}
      stroke="#000"
      strokeWidth={dims.STROKE_WIDTH}
      style={{ fill: fill, transition: transition }}
      onMouseDown={e => handlePointEvent('mousedown', e, key)}
      onMouseUp={e => handlePointEvent('mouseup', e, key)}
      onMouseOut={e => handlePointEvent('mouseout', e, key)}
      onTouchStart={e => handlePointEvent('touchstart', e, key)}
      onTouchEnd={e => handlePointEvent('touchend', e, key)}
    />
    <text
      x={cx}
      y={cy + dims.NOTE_FONT_SIZE / 2 - 3}
      textAnchor="middle"
      fontSize={dims.NOTE_FONT_SIZE} >
      {noteBase}
      <tspan
        fontSize={dims.OCTAVE_FONT_SIZE}>
        {octave}</tspan></text>
    {finger !== null ? (
      <text
        x={cx}
        y={cy
          + dims.NOTE_FONT_SIZE / 2
          + dims.FINGER_FONT_SIZE - 2}
        textAnchor="middle"
        fontSize={dims.FINGER_FONT_SIZE}>
        {finger}</text>
    ) : null}
  </g>

}