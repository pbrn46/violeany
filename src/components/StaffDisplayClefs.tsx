import { noteToY } from "../util/staff"

export function StaffDisplayClefs() {
  const trebleYs = [noteToY("E4"), noteToY("B5")]
  const bassYs = [noteToY("G2"), noteToY("C4")]
  return <g>
    <text x={5} y={trebleYs[0]} style={{ fontSize: trebleYs[0] - trebleYs[1] }}>𝄞</text>
    <text x={5} y={bassYs[0]} style={{ fontSize: bassYs[0] - bassYs[1] }}>𝄢</text>
  </g>
}