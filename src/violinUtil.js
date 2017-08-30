import { OrderedMap } from 'immutable'

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

export const NOTES_ARRAY = STRINGS.toIndexedSeq().toArray()

// D nat min 1 = D natural minor, one octave
export const SCALES = OrderedMap({
  "D maj 1": [
    {position: [1, 0], finger: 0},
    {position: [1, 2], finger: 1},
    {position: [1, 4], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 2], finger: 1},
    {position: [2, 4], finger: 2},
    {position: [2, 5], finger: 3},
  ],
  "A maj 1": [
    {position: [2, 0], finger: 0},
    {position: [2, 2], finger: 1},
    {position: [2, 4], finger: 2},
    {position: [2, 5], finger: 3},
    {position: [3, 0], finger: 0},
    {position: [3, 2], finger: 1},
    {position: [3, 4], finger: 2},
    {position: [3, 5], finger: 3},
  ],
  "G maj 2": [
    {position: [0, 0], finger: 0},
    {position: [0, 2], finger: 1},
    {position: [0, 4], finger: 2},
    {position: [0, 5], finger: 3},
    {position: [1, 0], finger: 0},
    {position: [1, 2], finger: 1},
    {position: [1, 4], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 2], finger: 1},
    {position: [2, 3], finger: 2},
    {position: [2, 5], finger: 3},
    {position: [3, 0], finger: 0},
    {position: [3, 2], finger: 1},
    {position: [3, 3], finger: 2},
  ],
  "E nat min 1": [
    {position: [1, 2], finger: 1},
    {position: [1, 4], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 2], finger: 1},
    {position: [2, 3], finger: 2},
    {position: [2, 5], finger: 3},
    {position: [3, 0], finger: 0},
  ],
  "A maj 2": [
    {position: [0, 2], finger: 1},
    {position: [0, 4], finger: 2},
    {position: [0, 6], finger: 3},
    {position: [1, 0], finger: 0},
    {position: [1, 2], finger: 1},
    {position: [1, 4], finger: 2},
    {position: [1, 6], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 2], finger: 1},
    {position: [2, 4], finger: 2},
    {position: [2, 5], finger: 3},
    {position: [3, 0], finger: 0},
    {position: [3, 2], finger: 1},
    {position: [3, 4], finger: 2},
    {position: [3, 5], finger: 3},
  ],
  "Bb maj 2": [
    {position: [0, 3], finger: 2},
    {position: [0, 5], finger: 3},
    {position: [1, 0], finger: 0},
    {position: [1, 1], finger: 1},
    {position: [1, 3], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 1], finger: 1},
    {position: [2, 3], finger: 2},
    {position: [2, 5], finger: 3},
    {position: [2, 6], finger: 4},
    {position: [3, 1], finger: 1},
    {position: [3, 3], finger: 2},
    {position: [3, 5], finger: 3},
    {position: [3, 6], finger: 4},
  ],
  "C maj 1": [
    {position: [0, 5], finger: 3},
    {position: [1, 0], finger: 0},
    {position: [1, 2], finger: 1},
    {position: [1, 3], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 2], finger: 1},
    {position: [2, 3], finger: 2},
  ],
  "F maj 1": [
    {position: [1, 3], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 1], finger: 1},
    {position: [2, 3], finger: 2},
    {position: [2, 5], finger: 3},
    {position: [3, 0], finger: 0},
    {position: [3, 1], finger: 1},
  ],
  "D har min 1": [
    {position: [1, 0], finger: 0},
    {position: [1, 2], finger: 1},
    {position: [1, 3], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 1], finger: 1},
    {position: [2, 4], finger: 2},
    {position: [2, 5], finger: 3},
  ],
  "D mel min 1": [
    {position: [1, 0], finger: 0},
    {position: [1, 2], finger: 1},
    {position: [1, 3], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 2], finger: 1, downPosition: [2, 1]},
    {position: [2, 4], finger: 2, downPosition: [2, 3]},
    {position: [2, 5], finger: 3},
  ],
  "D nat min 1": [
    {position: [1, 0], finger: 0},
    {position: [1, 2], finger: 1},
    {position: [1, 3], finger: 2},
    {position: [1, 5], finger: 3},
    {position: [2, 0], finger: 0},
    {position: [2, 1], finger: 1},
    {position: [2, 3], finger: 2},
    {position: [2, 5], finger: 3},
  ],
  "G har min 1": [
    {position: [0, 0], finger: 0},
    {position: [0, 2], finger: 1},
    {position: [0, 3], finger: 2},
    {position: [0, 5], finger: 3},
    {position: [1, 0], finger: 0},
    {position: [1, 1], finger: 1},
    {position: [1, 4], finger: 2},
    {position: [1, 5], finger: 3},
  ],
  "G mel min 1": [
    {position: [0, 0], finger: 0},
    {position: [0, 2], finger: 1},
    {position: [0, 3], finger: 2},
    {position: [0, 5], finger: 3},
    {position: [1, 0], finger: 0},
    {position: [1, 2], finger: 1, downPosition: [1, 1]},
    {position: [1, 4], finger: 2, downPosition: [1, 3]},
    {position: [1, 5], finger: 3},
  ],
  "G nat min 1": [
    {position: [0, 0], finger: 0},
    {position: [0, 2], finger: 1},
    {position: [0, 3], finger: 2},
    {position: [0, 5], finger: 3},
    {position: [1, 0], finger: 0},
    {position: [1, 1], finger: 1},
    {position: [1, 3], finger: 2},
    {position: [1, 5], finger: 3},
  ],
})

export function generatePlaySet(playScale, playLoopMode) {
    var playSet = SCALES.get(playScale, [])
  // let playSetDown = [...playSet]
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
  return NOTES_ARRAY[position[0]][position[1]]
}

export function isInPlaySet(position, playSet) {
  for (var i = 0; i < playSet.length; i++) {
    if (position[0] === playSet[i].position[0]
        && position[1] === playSet[i].position[1]) {
        return true
    }
  }
  return false
}

// Returns the fingers attribute of keysPlaying if found string and position found. null otherwise
export function fingerInPlaySet(position, playSet) {
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

export function percentToDecibel(pct) {
  return 0 - (60 * (100 - pct) / 100)
}
