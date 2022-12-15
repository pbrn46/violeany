import { noteToY } from "../util/staff"

const STAFF_LINE_NOTES = ["G2", "B2", "D3", "F3", "A3",
  "E4", "G4", "B4", "D5", "F5",]


function makeStaffYs() {
  const staffYs = []
  for (let i = 0; i < STAFF_LINE_NOTES.length; i++) {
    let note = STAFF_LINE_NOTES[i]
    staffYs.push(noteToY(note))
  }
  return staffYs
}
const STAFF_LINE_YS = makeStaffYs()

export function StaffDisplayStaves() {
  const ret = []
  for (let i = 0; i < STAFF_LINE_YS.length; i++) {
    ret.push(
      <line key={i}
        x1="0" x2="3000"
        y1={STAFF_LINE_YS[i]}
        y2={STAFF_LINE_YS[i]}
        stroke="#aaa"
        strokeWidth="1"
      />
    )
  }
  return <>{ret}</>
}