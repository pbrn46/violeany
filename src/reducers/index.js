import { combineReducers } from 'redux'
import * as actions from '../actions'

function indexPlaying(state = null, action) {
  switch (action.type) {
    case actions.SET_INDEXPLAYING:
      return action.indexPlaying
    default:
      return state
  }
}

// In the format [{string: 0-4, position: 0-12, finger: 0-4}, ...]
function keysPlaying(state = [], action) {
  switch (action.type) {
    case actions.SET_KEYSPLAYING:
      var keysPlaying = action.keysPlaying
      if (keysPlaying === null) return []
      return keysPlaying
    default:
      return state
  }
}

function keyClicked(state = null, action) {
  switch (action.type) {
    case actions.SET_KEYCLICKED:
      return action.keyClicked
    default:
      return state
  }
}

function playMode(state = "SCALES", action) {
  switch (action.type) {
    case actions.SET_PLAYMODE:
      return action.playMode
    default:
      return state
  }
}

function playScale(state = "D maj 1", action) {
  switch (action.type) {
    case actions.SET_PLAYSCALE:
      return action.playScale
    default:
      return state
  }
}

function playTuningKey(state = "G", action) {
  switch (action.type) {
    case actions.SET_PLAYTUNINGKEY:
      return action.playTuningKey
    default:
      return state
  }
}

// "UP", "DOWN", "UPDOWN", "UPDOWN_NODOUBLE", "ONCE"
// UPDOWN_NODOUBLE means the ends of the loops aren't repeated (ie, 12321 rather than 123321)
function playLoopMode(state = "UPDOWN_NODOUBLE", action) {
  switch (action.type) {
    case actions.SET_PLAYLOOPMODE:
      return action.playLoopMode
    default:
      return state
  }
}

function playStatus(state = "stopped", action) {
  switch (action.type) {
    case actions.SET_PLAYSTATUS:
      return action.playStatus
    default:
      return state
  }
}

function volume(state = 80, action) {
  switch (action.type) {
    case actions.SET_VOLUME:
      return action.volume
    default:
      return state
  }
}

function handPosition(state = 1, action) {
  return state
}

// Scales BPM, Arpeggios BPM:
function bpm(state = 104, action) {
  switch (action.type) {
    case actions.SET_BPM:
      var bpm = parseInt(action.bpm, 10)
      if (isNaN(bpm)) return ""
      else return bpm
    default:
      return state
  }
}

export default combineReducers({
  indexPlaying,
  keysPlaying,
  keyClicked,
  handPosition,
  playMode,
  playScale,
  playTuningKey,
  playLoopMode,
  playStatus,
  bpm,
  volume,
})
