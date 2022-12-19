import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BaseKey, PlayLoopMode, PlayMode } from "../../util/violin"

type ConfigState = {
  playMode: PlayMode
  playScale: string
  playTuningKey: BaseKey | "ALL"
  playLoopMode: PlayLoopMode
  simulateMode: boolean
  bpm: number
  volume: number
}

const initialState: ConfigState = {
  playMode: "SCALES",
  playScale: "D maj 1",
  playTuningKey: "G",
  playLoopMode: "UPDOWN",
  simulateMode: false,
  bpm: 120,
  volume: 80,
}

const slice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setPlayMode: (state, action: PayloadAction<ConfigState["playMode"]>) => {
      state.playMode = action.payload
    },
    setPlayScale: (state, action: PayloadAction<ConfigState["playScale"]>) => {
      state.playScale = action.payload
    },
    setPlayTuningKey: (state, action: PayloadAction<ConfigState["playTuningKey"]>) => {
      state.playTuningKey = action.payload
    },
    setPlayLoopMode: (state, action: PayloadAction<ConfigState["playLoopMode"]>) => {
      state.playLoopMode = action.payload
    },
    setSimulateMode: (state, action: PayloadAction<ConfigState["simulateMode"]>) => {
      state.simulateMode = action.payload
    },
    setBpm: (state, action: PayloadAction<ConfigState["bpm"]>) => {
      state.bpm = action.payload
    },
    setVolume: (state, action: PayloadAction<ConfigState["volume"]>) => {
      state.volume = action.payload
    },
  },
})

export const configReducer = slice.reducer
export const configActions = slice.actions