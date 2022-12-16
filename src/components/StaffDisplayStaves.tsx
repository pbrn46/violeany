import { STAFF_LINE_YS } from "../util/staff"

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