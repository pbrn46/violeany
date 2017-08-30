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

export const SET_KEYCLICKED = "SET_KEYCLICKED"
export const setKeyClicked = (keyClicked) => ({
  type: SET_KEYCLICKED,
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

export const SET_PLAYSTATUS = "SET_PLAYSTATUS"
export const setPlayStatus = (playStatus) => ({
  type: SET_PLAYSTATUS,
  playStatus,
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