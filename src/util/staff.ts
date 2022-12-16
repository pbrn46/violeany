/** Staff helper functions */

import { maxNoteIndex, noteToIndex } from "./violin"


function makeStaffDims() {
  const staffDims = {
    PADL_X: 80,
    PADR_X: 30,
    TRIMT_Y: 13, // Amount of notes to take off of top
    TRIMB_Y: 8,
    NOTE_DISTANCE_X: 30,
    NOTE_DISTANCE_Y: 8,
    NOTE_RADIUS: 6,
    NOTE_FONT_SIZE: 12,
    OCTAVE_FONT_SIZE: 10,
    FINGER_FONT_SIZE: 12,
    STROKE_WIDTH: 1,
    SVG_HEIGHT: 0,
    // SVG_HEIGHT: NOTE_DISTANCE_Y * (maxNoteIndex() - 1) + NOTE_RADIUS * 2 + 2 - TRIMT_Y * NOTE_DISTANCE_Y - TRIMB_Y * NOTE_DISTANCE_Y,
  }
  staffDims.SVG_HEIGHT =
    staffDims.NOTE_DISTANCE_Y * (maxNoteIndex() - 1)
    + staffDims.NOTE_RADIUS * 2 + 2 - staffDims.TRIMT_Y * staffDims.NOTE_DISTANCE_Y
    - staffDims.TRIMB_Y * staffDims.NOTE_DISTANCE_Y
  return staffDims
}
export const staffDims = makeStaffDims()

/** Convert to Y position on staff */
export const noteToY = (note: string) => {
  // Note
  var noteBase = note[0]
  var octave = note[1]
  if (note.length >= 3) {
    octave = note[2]
  }
  var cy = noteToIndex(noteBase + octave)
  cy *= staffDims.NOTE_DISTANCE_Y
  cy += staffDims.NOTE_RADIUS
  cy = staffDims.SVG_HEIGHT - cy + staffDims.TRIMB_Y * staffDims.NOTE_DISTANCE_Y
  return cy
}

export function generateCx(index: number) {
  return index * staffDims.NOTE_DISTANCE_X + staffDims.NOTE_RADIUS + staffDims.PADL_X
}

/** Notes that have a staff line */
const STAFF_LINE_NOTES = ["G2", "B2", "D3", "F3", "A3",
  "E4", "G4", "B4", "D5", "F5",]

/** Return Y positions of all notes that has a staff line */
function makeStaffYs() {
  const staffYs = []
  for (let i = 0; i < STAFF_LINE_NOTES.length; i++) {
    let note = STAFF_LINE_NOTES[i]
    staffYs.push(noteToY(note))
  }
  return staffYs
}

/** Y position of all staff lines*/
export const STAFF_LINE_YS = makeStaffYs()