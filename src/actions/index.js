export const SET_INDEXPLAYING = "SET_INDEXPLAYING"
export const setIndexPlaying = (indexPlaying) => ({
  type: SET_INDEXPLAYING,
  indexPlaying,
})

export const SET_KEYSPLAYING = "SET_KEYSPLAYING"
export const setKeysPlaying = (keysPlaying) => ({
  type: SET_KEYSPLAYING,
  keysPlaying,
})

export const SET_KEYSCLICKED = "SET_KEYSCLICKED"
export const setKeysClicked = (keysClicked) => ({
  type: SET_KEYSCLICKED,
  keysClicked,
})

export const ADD_KEYCLICKED = "ADD_KEYCLICKED"
export const addKeyClicked = (keyClicked) => ({
  type: ADD_KEYCLICKED,
  keyClicked,
})

export const REMOVE_KEYCLICKED = "REMOVE_KEYCLICKED"
export const removeKeyClicked = (keyClicked) => ({
  type: REMOVE_KEYCLICKED,
  keyClicked,
})

export const SET_PLAYMODE = "SET_PLAYMODE"
export const setPlayMode = (playMode) => ({
  type: SET_PLAYMODE,
  playMode,
})

export const SET_PLAYSCALE = "SET_PLAYSCALE"
export const setPlayScale = (playScale) => ({
  type: SET_PLAYSCALE,
  playScale,
})

export const SET_PLAYTUNINGKEY = "SET_PLAYTUNINGKEY"
export const setPlayTuningKey = (playTuningKey) => ({
  type: SET_PLAYTUNINGKEY,
  playTuningKey,
})

export const SET_PLAYLOOPMODE = "SET_PLAYLOOPMODE"
export const setPlayLoopMode = (playLoopMode) => ({
  type: SET_PLAYLOOPMODE,
  playLoopMode,
})

export const SET_TRANSPORTSTATUS = "SET_TRANSPORTSTATUS"
export const setTransportStatus = (transportStatus) => ({
  type: SET_TRANSPORTSTATUS,
  transportStatus,
})

export const SET_SIMULATEMODE = "SET_SIMULATEMODE"
export const setSimulateMode = (simulateMode) => ({
  type: SET_SIMULATEMODE,
  simulateMode,
})

export const SET_VOLUME = "SET_VOLUME"
export const setVolume = (volume) => ({
  type: SET_VOLUME,
  volume,
})

export const SET_BPM = "SET_BPM"
export const setBpm = (bpm) => ({
  type: SET_BPM,
  bpm,
})

export const SET_ISPLAYING = "SET_ISPLAYING"
export const setIsPlaying = (isPlaying) => ({
  type: SET_ISPLAYING,
  isPlaying,
})

export const PLAY = "PLAY"
export const play = () => ({
  type: PLAY,
})

export const STOP = "STOP"
export const stop = () => ({
  type: STOP,
})
