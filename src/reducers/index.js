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
      if (action.keysPlaying === null) return []
      return action.keysPlaying
    default:
      return state
  }
}

function keysClicked(state = [], action) {
  switch (action.type) {
    case actions.SET_KEYSCLICKED:
      if (action.keysClicked === null) return []
      return action.keysClicked
    case actions.ADD_KEYCLICKED:
      return [...state, action.keyClicked]
    case actions.REMOVE_KEYCLICKED:
      return state.filter((value) => {
        return (
          value.position[0] !== action.keyClicked.position[0]
          && value.position[1] !== action.keyClicked.position[1]
        )
      })
      // return state
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

function transportStatus(state = "stopped", action) {
  switch (action.type) {
    case actions.SET_TRANSPORTSTATUS:
      return action.transportStatus
    default:
      return state
  }
}

function simulateMode(state = false, action) {
  switch (action.type) {
    case actions.SET_SIMULATEMODE:
      return action.simulateMode
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


function isPlaying(state = false, action) {
  switch (action.type) {
    case actions.PLAY:
      return true
    case actions.STOP:
      return false
    case actions.SET_ISPLAYING:
      return action.isPlaying
    default:
      return state
  }
}

export default combineReducers({
  indexPlaying,
  keysPlaying,
  keysClicked,
  handPosition,
  playMode,
  playScale,
  playTuningKey,
  playLoopMode,
  transportStatus,
  simulateMode,
  bpm,
  volume,
  isPlaying,
})
