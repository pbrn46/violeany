import { ViolinKey } from "./violin"

// D nat min 1 = D natural minor, one octave
// TODO: position to notes may change sharps and flats. use key signature instead?
// TODO: include note size (quarter, eigth, sixteenth, etc)
export type Scale = {
  key: string,
  title: string,
  keys: ViolinKey[]
}
export const SCALES: Scale[] = [
  {
    key: "test1",
    title: "Test 1",
    keys: [
      { position: [1, 0], finger: 0, dur: "4n" },
      { position: [-1, -1], finger: -1, dur: "1n" },
      { position: [1, 2], finger: 1 },
      { position: [1, 4], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 2], finger: 1 },
      { position: [2, 4], finger: 2 },
      { position: [2, 5], finger: 3 },
    ],
  },
  {
    key: "D maj 1",
    title: "D major, one octave",
    keys: [
      { position: [1, 0], finger: 0 },
      { position: [1, 2], finger: 1 },
      { position: [1, 4], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 2], finger: 1 },
      { position: [2, 4], finger: 2 },
      { position: [2, 5], finger: 3 },
    ],
  },
  {
    key: "A maj 1",
    title: "A major, one octave",
    keys: [
      { position: [2, 0], finger: 0 },
      { position: [2, 2], finger: 1 },
      { position: [2, 4], finger: 2 },
      { position: [2, 5], finger: 3 },
      { position: [3, 0], finger: 0 },
      { position: [3, 2], finger: 1 },
      { position: [3, 4], finger: 2 },
      { position: [3, 5], finger: 3 },
    ],
  },
  {
    key: "G maj 2",
    title: "G major, two octaves",
    keys: [
      { position: [0, 0], finger: 0 },
      { position: [0, 2], finger: 1 },
      { position: [0, 4], finger: 2 },
      { position: [0, 5], finger: 3 },
      { position: [1, 0], finger: 0 },
      { position: [1, 2], finger: 1 },
      { position: [1, 4], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 2], finger: 1 },
      { position: [2, 3], finger: 2 },
      { position: [2, 5], finger: 3 },
      { position: [3, 0], finger: 0 },
      { position: [3, 2], finger: 1 },
      { position: [3, 3], finger: 2 },
    ],
  },
  {
    key: "E nat min 1",
    title: "E natural minor, one octave",
    keys: [
      { position: [1, 2], finger: 1 },
      { position: [1, 4], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 2], finger: 1 },
      { position: [2, 3], finger: 2 },
      { position: [2, 5], finger: 3 },
      { position: [3, 0], finger: 0 },
    ],
  },
  {
    key: "A maj 2",
    title: "A major, two octaves",
    keys: [
      { position: [0, 2], finger: 1 },
      { position: [0, 4], finger: 2 },
      { position: [0, 6], finger: 3 },
      { position: [1, 0], finger: 0 },
      { position: [1, 2], finger: 1 },
      { position: [1, 4], finger: 2 },
      { position: [1, 6], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 2], finger: 1 },
      { position: [2, 4], finger: 2 },
      { position: [2, 5], finger: 3 },
      { position: [3, 0], finger: 0 },
      { position: [3, 2], finger: 1 },
      { position: [3, 4], finger: 2 },
      { position: [3, 5], finger: 3 },
    ],
  },
  {
    key: "Bb maj 2",
    title: "Bb major, two octaves",
    keys: [
      { position: [0, 3], finger: 2 },
      { position: [0, 5], finger: 3 },
      { position: [1, 0], finger: 0 },
      { position: [1, 1], finger: 1 },
      { position: [1, 3], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 1], finger: 1 },
      { position: [2, 3], finger: 2 },
      { position: [2, 5], finger: 3 },
      { position: [2, 6], finger: 4 },
      { position: [3, 1], finger: 1 },
      { position: [3, 3], finger: 2 },
      { position: [3, 5], finger: 3 },
      { position: [3, 6], finger: 4 },
    ],
  },
  {
    key: "C maj 1",
    title: "C major, one octave",
    keys: [
      { position: [0, 5], finger: 3 },
      { position: [1, 0], finger: 0 },
      { position: [1, 2], finger: 1 },
      { position: [1, 3], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 2], finger: 1 },
      { position: [2, 3], finger: 2 },
    ],
  },
  {
    key: "F maj 1",
    title: "F major, one octave",
    keys: [
      { position: [1, 3], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 1], finger: 1 },
      { position: [2, 3], finger: 2 },
      { position: [2, 5], finger: 3 },
      { position: [3, 0], finger: 0 },
      { position: [3, 1], finger: 1 },
    ],
  },
  {
    key: "D har min 1",
    title: "D harmonic minor, one octave",
    keys: [
      { position: [1, 0], finger: 0 },
      { position: [1, 2], finger: 1 },
      { position: [1, 3], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 1], finger: 1 },
      { position: [2, 4], finger: 2 },
      { position: [2, 5], finger: 3 },
    ],
  },
  {
    key: "D mel min 1",
    title: "D melodic minor, one octave",
    keys: [
      { position: [1, 0], finger: 0 },
      { position: [1, 2], finger: 1 },
      { position: [1, 3], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 2], finger: 1, downPosition: [2, 1] },
      { position: [2, 4], finger: 2, downPosition: [2, 3] },
      { position: [2, 5], finger: 3 },
    ],
  },
  {
    key: "D nat min 1",
    title: "D natural minor, one octave",
    keys: [
      { position: [1, 0], finger: 0 },
      { position: [1, 2], finger: 1 },
      { position: [1, 3], finger: 2 },
      { position: [1, 5], finger: 3 },
      { position: [2, 0], finger: 0 },
      { position: [2, 1], finger: 1 },
      { position: [2, 3], finger: 2 },
      { position: [2, 5], finger: 3 },
    ],
  },
  {
    key: "G har min 1",
    title: "G harmonic minor, one octave",
    keys: [
      { position: [0, 0], finger: 0 },
      { position: [0, 2], finger: 1 },
      { position: [0, 3], finger: 2 },
      { position: [0, 5], finger: 3 },
      { position: [1, 0], finger: 0 },
      { position: [1, 1], finger: 1 },
      { position: [1, 4], finger: 2 },
      { position: [1, 5], finger: 3 },
    ],
  },
  {
    key: "G mel min 1",
    title: "G melodic minor, one octave",
    keys: [
      { position: [0, 0], finger: 0 },
      { position: [0, 2], finger: 1 },
      { position: [0, 3], finger: 2 },
      { position: [0, 5], finger: 3 },
      { position: [1, 0], finger: 0 },
      { position: [1, 2], finger: 1, downPosition: [1, 1] },
      { position: [1, 4], finger: 2, downPosition: [1, 3] },
      { position: [1, 5], finger: 3 },
    ],
  },
  {
    key: "G nat min 1",
    title: "G natural minor, one octave",
    keys: [
      { position: [0, 0], finger: 0 },
      { position: [0, 2], finger: 1 },
      { position: [0, 3], finger: 2 },
      { position: [0, 5], finger: 3 },
      { position: [1, 0], finger: 0 },
      { position: [1, 1], finger: 1 },
      { position: [1, 3], finger: 2 },
      { position: [1, 5], finger: 3 },
    ],
  },
]


export function getPlayScaleByKey(playScaleKey: string) {
  return SCALES.find(row => row.key === playScaleKey) || null
}