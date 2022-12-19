import { useAppSelector } from "../redux/store"
import { generateCx, noteToY, staffDims } from "../util/staff"
import { ViolinKey, noteFromPosition, NOTES, PlaySet, PlaySets } from "../util/violin"

const NOTE_YS = (() => {
  const noteYs: Record<string, number> = {}
  for (let i = 0; i < NOTES.length; i++) {
    let note = NOTES[i]
    noteYs[note] = noteToY(note)
  }
  return noteYs
})()

type StaffDisplayNoteProps = {
  playSet: PlaySet
  noteKey: ViolinKey
  index: number
}
export function StaffDisplayNote({ playSet, noteKey, index }: StaffDisplayNoteProps) {
  // Note
  var note = noteFromPosition(noteKey.position)
  var finger = noteKey.finger
  var noteBase = note[0]
  var noteAccidental = null
  var octave = note[1]
  if (note.length >= 3) {
    noteAccidental = note[1]
    octave = note[2]
  }

  // Positioning
  const cx = generateCx(index)
  const cy = NOTE_YS[noteBase + octave]

  const { indexPlaying, keysClicked } = useAppSelector(state => state.status)

  // Fill Color
  const isPlaying = index === indexPlaying
  let isClicked = false
  if (keysClicked)
    // isClicked =
    //   this.props.keysClicked.position[0] === key.position[0] &&
    //   this.props.keysClicked.position[1] === key.position[1]
    isClicked =
      PlaySets.hasPosition(
        keysClicked, noteKey.position)
  const fill = isClicked ? "#8ff" :
    isPlaying ? "#8f8" : "#000"
  let transition = "fill 0.0s"
  if (!isClicked && !isPlaying)
    transition = "fill 0.5s"

  // TODO: Use key signatures instead
  let accidentalSvg = null
  if (noteAccidental) {
    accidentalSvg = <text
      x={cx - staffDims.NOTE_RADIUS * 1.75}
      y={cy + staffDims.NOTE_RADIUS + (noteAccidental === "b" ? -1 : 3)}
      // x={cx}
      // y={cy + NOTE_FONT_SIZE / 2 - NOTE_RADIUS - 10}
      textAnchor="middle"
      fontSize={staffDims.NOTE_RADIUS * 3.00}>
      {noteAccidental === "b" ? "♭" : noteAccidental === "#" ? "♯" : " "}
    </text>
  }
  // TODO: C4 (and other floating notes as necessary) needs a horizontal line
  return <g className="ViolinDisplay" key={index}>
    <circle
      className="Note"
      cx={cx}
      cy={cy}
      r={staffDims.NOTE_RADIUS - staffDims.STROKE_WIDTH}
      stroke="#000"
      strokeWidth={staffDims.STROKE_WIDTH}
      style={{ fill: fill, transition: transition }}
    />
    {accidentalSvg}
    <text
      x={cx}
      y={cy + staffDims.NOTE_FONT_SIZE / 2 - staffDims.NOTE_RADIUS - 10}
      textAnchor="middle"
      fontSize={staffDims.NOTE_FONT_SIZE}>
      {noteBase}{noteAccidental}
      <tspan
        fontSize={staffDims.OCTAVE_FONT_SIZE}>
        {octave}</tspan></text>
    {finger !== null ? <text
      x={cx}
      y={cy
        + staffDims.NOTE_RADIUS
        + staffDims.FINGER_FONT_SIZE}
      textAnchor="middle"
      fontSize={staffDims.FINGER_FONT_SIZE}>
      {finger}</text>
      : null}
  </g>
}