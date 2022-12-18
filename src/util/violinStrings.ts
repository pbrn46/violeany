export type ViolinStringNotes = string[]
export type ViolinString = {
  key: string,
  notes: ViolinStringNotes,
}

export type ViolinStrings = ViolinString[]
// Position 1 goes to index 7 of each string
export const VIOLIN_STRINGS: ViolinStrings = [
  {
    key: "G",
    notes: ["G3", "Ab3", "A3", "Bb3", "B3", "C4", "C#4", "D4", "Eb4", "E4", "F4", "F#4", "G4"]
  },
  {
    key: "D",
    notes: ["D4", "Eb4", "E4", "F4", "F#4", "G4", "G#4", "A4", "Bb4", "B4", "C5", "C#5", "D5",]
  },
  {
    key: "A",
    notes: ["A4", "Bb4", "B4", "C5", "C#5", "D5", "Eb5", "E5", "F5", "F#5", "G5", "G#5", "A5",]
  },
  {
    key: "E",
    notes: ["E5", "F5", "F#5", "G5", "G#5", "A5", "Bb5", "B5", "C6", "C#6", "D6", "Eb6", "E6",]
  },
]
export const STRINGS_ARRAY = VIOLIN_STRINGS.map(row => row.notes)
