import { OrderedMap } from 'immutable'
import SCALES from './scales'
import GRADE_SCALES from './gradeScales'

export { SCALES }
export { GRADE_SCALES }

// Position 1 goes to index 7 of each string
export const STRINGS = OrderedMap([
  ["G", ["G3", "Ab3", "A3", "Bb3", "B3", "C4", "C#4", "D4",
      "Eb4", "E4", "F4", "F#4", "G4"]],
  ["D", ["D4", "Eb4", "E4", "F4", "F#4", "G4", "G#4", "A4",
      "Bb4", "B4", "C5", "C#5", "D5",]],
  ["A", ["A4", "Bb4", "B4", "C5", "C#5", "D5", "Eb5", "E5",
      "F5", "F#5", "G5", "G#5", "A5",]],
  ["E", ["E5", "F5", "F#5", "G5", "G#5", "A5", "Bb5", "B5",
      "C6", "C#6", "D6", "Eb6", "E6",]],
])
export const STRINGS_ARRAY = STRINGS.toIndexedSeq().toArray()


export const NOTES = [
  "C1", "D1", "E1", "F1", "G1", "A1", "B1",
  "C2", "D2", "E2", "F2", "G2", "A2", "B2",
  "C3", "D3", "E3", "F3", "G3", "A3", "B3",
  "C4", "D4", "E4", "F4", "G4", "A4", "B4",
  "C5", "D5", "E5", "F5", "G5", "A5", "B5",
  "C6", "D6", "E6", "F6", "G6", "A6", "B6",
  "C7", "D7", "E7", "F7", "G7", "A7", "B7",
]

export function generatePlaySet(playScale, playLoopMode) {
    var playSet = SCALES.get(playScale, {}).keys
    let playSetDown = [...playSet]
    playSetDown.reverse()
    for (let i = 0; i < playSetDown.length; i++) {
      if (playSetDown[i].downPosition) {
        playSetDown[i] = {...playSetDown[i], position: playSetDown[i].downPosition}
      }
    }
    switch (playLoopMode) {
      case "UP":
        return playSet
      case "DOWN":
        return playSetDown
      case "UPDOWN":
        return playSet.concat(playSetDown)
      case "UPDOWN_NODOUBLE":
        playSetDown.pop()
        playSetDown.shift()
        return playSet.concat(playSetDown)
      case "ONCE":
      default:
        return playSet
    }
}

export function noteFromPosition(position) {
  if (position[0] === -1 || position[1] === -1)
    return "r0"
  return STRINGS_ARRAY[position[0]][position[1]]
}

export function maxNoteIndex() {
  return NOTES.length - 1
}

export function noteToIndex(note) {
  return NOTES.indexOf(note)
}

export function maxNote() {
  return NOTES[NOTES.length - 1]
}

export class PlaySets {

  // returns true if position is in playSet
  static hasPosition(playSet, position) {
    for (var i = 0; i < playSet.length; i++) {
      if (position[0] === playSet[i].position[0]
          && position[1] === playSet[i].position[1]) {
        return true
      }
    }
    return false
  }

  // Returns the fingers attribute of keysPlaying if found string and position found. null otherwise
  static fingerFromPosition(position, playSet) {
    for (var i = 0; i < playSet.length; i++) {
      if (position[0] === playSet[i].position[0]
          && position[1] === playSet[i].position[1]) {
        if (playSet[i].finger === undefined)
          return -1
        else
          return playSet[i].finger
      }
    }
    return null
  }
}

export function percentToDecibel(pct) {
  return 0 - (60 * (100 - pct) / 100)
}
