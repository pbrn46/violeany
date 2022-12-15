import { PlaySet } from "../util/violin"
import { StaffDisplayNote } from "./StaffDisplayNote"

type StaffDisplayNotesProps = {
  playSet: PlaySet
}
export function StaffDisplayNotes({ playSet }: StaffDisplayNotesProps) {
  var ret = []
  for (let i = 0; i < playSet.length; i++) {
    ret.push(<StaffDisplayNote key={i} playSet={playSet} index={i} noteKey={playSet[i]} />)
  }
  return <>{ret}</>
}