import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ViolinKey } from "../../util/violin"


type StatusState = {
  transportStatus: "started" | "stopped" | "paused",
  isPlaying: boolean
  indexPlaying: number
  keysPlaying: ViolinKey[]
  keysClicked: ViolinKey[]
}

const initialState: StatusState = {
  transportStatus: "stopped",
  isPlaying: false,
  indexPlaying: -1,
  keysPlaying: [],
  keysClicked: [],
}

const slice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setTransportStatus: (state, action: PayloadAction<StatusState["transportStatus"]>) => {
      state.transportStatus = action.payload
    },
    setIsPlaying: (state, action: PayloadAction<StatusState["isPlaying"]>) => {
      state.isPlaying = action.payload
    },
    setIndexPlaying: (state, action: PayloadAction<StatusState["indexPlaying"]>) => {
      state.indexPlaying = action.payload
    },
    setKeysPlaying: (state, action: PayloadAction<StatusState["keysPlaying"]>) => {
      state.keysPlaying = action.payload
    },
    setKeysClicked: (state, action: PayloadAction<StatusState["keysClicked"]>) => {
      state.keysClicked = action.payload
    },
    addKeyClicked: (state, action: PayloadAction<ViolinKey>) => {
      state.keysClicked.push(action.payload)
    },
    removeKeyClicked: (state, action: PayloadAction<ViolinKey>) => {
      state.keysClicked = state.keysClicked
        .filter(key =>
          key.position[0] !== action.payload.position[0]
          && key.position[1] !== action.payload.position[1]
        )
    },
  }
})

export const statusReducer = slice.reducer
export const statusActions = slice.actions