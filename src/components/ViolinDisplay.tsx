// import * as actions from "../actions"
import { useAppSelector } from "../redux/store"
import { STRINGS, generatePlaySet } from "../util/violin"
import { ViolinDisplayStrings } from "./ViolinDisplayStrings"

import { ViolinDisplayView } from "./ViolinDisplayView"

export function makeDims(isSimulateMode: boolean) {
  // TODO: Move these dimensions into its own object
  const NOTE_RADIUS = isSimulateMode ? 30 : 25
  const FIRST_ROW_MARGIN_Y = 10
  const NOTE_DISTANCE_X = NOTE_RADIUS * 2 + (isSimulateMode ? 0 : 5)
  const NOTE_DISTANCE_Y = NOTE_RADIUS * 2
  const NOTE_FONT_SIZE = 16
  const OCTAVE_FONT_SIZE = 10
  const FINGER_FONT_SIZE = 10
  const STROKE_WIDTH = 1
  const SVG_WIDTH = NOTE_DISTANCE_X * (4 - 1) + NOTE_RADIUS * 2
  const SVG_HEIGHT = NOTE_DISTANCE_Y * (13 - 1) + NOTE_RADIUS * 2 + FIRST_ROW_MARGIN_Y
  const STRING_XS = [
    0 * NOTE_DISTANCE_X + NOTE_RADIUS,
    1 * NOTE_DISTANCE_X + NOTE_RADIUS,
    2 * NOTE_DISTANCE_X + NOTE_RADIUS,
    3 * NOTE_DISTANCE_X + NOTE_RADIUS,
  ]
  const NOTE_YS = (() => {
    const noteYs = []
    for (let i = 0; i < 13; i++) {
      noteYs.push(i * NOTE_DISTANCE_Y + NOTE_RADIUS)
    }
    return noteYs
  })()

  return {
    NOTE_RADIUS,
    FIRST_ROW_MARGIN_Y,
    NOTE_DISTANCE_X,
    NOTE_DISTANCE_Y,
    NOTE_FONT_SIZE,
    OCTAVE_FONT_SIZE,
    FINGER_FONT_SIZE,
    STROKE_WIDTH,
    SVG_WIDTH,
    SVG_HEIGHT,
    STRING_XS,
    NOTE_YS,
  }
}

export type Dims = ReturnType<typeof makeDims>

export function ViolinDisplay() {
  const { playScale, playLoopMode, simulateMode } = useAppSelector(state => state)
  const playSet = generatePlaySet(playScale, playLoopMode)
  const dims = makeDims(simulateMode)
  return <ViolinDisplayView dims={dims}>
    <line
      x1={0}
      x2={dims.SVG_WIDTH}
      y1={dims.NOTE_RADIUS * 2 + dims.FIRST_ROW_MARGIN_Y / 2}
      y2={dims.NOTE_RADIUS * 2 + dims.FIRST_ROW_MARGIN_Y / 2}
      stroke="#000"
      strokeWidth={dims.FIRST_ROW_MARGIN_Y / 2}
    />
    <ViolinDisplayStrings dims={dims} playSet={playSet} strings={STRINGS} />
  </ViolinDisplayView>
}