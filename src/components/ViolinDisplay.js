import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { STRINGS, generatePlaySet, PlaySets } from "../util/violin"

import { View } from "./ViolinDisplayView"

export function makeDims(isSimulateMode) {
  // TODO: Move these dimensions into its own object
  const NOTE_RADIUS = isSimulateMode ? 30 : 25
  const FIRST_ROW_MARGIN_Y = 10
  const NOTE_DISTANCE_X = NOTE_RADIUS * 2 + (isSimulateMode ? 0 : 5)
  const NOTE_DISTANCE_Y = NOTE_RADIUS * 2
  const NOTE_FONT_SIZE = 16
  const OCTAVE_FONT_SIZE = 10
  const FINGER_FONT_SIZE = 10
  const STROKE_WIDTH = 1
  const SVG_WIDTH = NOTE_DISTANCE_X * (4 - 1) + NOTE_RADIUS * 2
  const SVG_HEIGHT = NOTE_DISTANCE_Y * (13 - 1) + NOTE_RADIUS * 2 + FIRST_ROW_MARGIN_Y
  const STRING_XS = [
    0 * NOTE_DISTANCE_X + NOTE_RADIUS,
    1 * NOTE_DISTANCE_X + NOTE_RADIUS,
    2 * NOTE_DISTANCE_X + NOTE_RADIUS,
    3 * NOTE_DISTANCE_X + NOTE_RADIUS,
  ]
  const NOTE_YS = (() => {
    const noteYs = []
    for (let i = 0; i < 13; i++) {
      noteYs.push(i * NOTE_DISTANCE_Y + NOTE_RADIUS)
    }
    return noteYs
  })()

  return {
    NOTE_RADIUS,
    FIRST_ROW_MARGIN_Y,
    NOTE_DISTANCE_X,
    NOTE_DISTANCE_Y,
    NOTE_FONT_SIZE,
    OCTAVE_FONT_SIZE,
    FINGER_FONT_SIZE,
    STROKE_WIDTH,
    SVG_WIDTH,
    SVG_HEIGHT,
    STRING_XS,
    NOTE_YS,
  }
}

const mapStateToProps = (store) => ({
  keysPlaying: store.keysPlaying,
  playScale: store.playScale,
  playMode: store.playMode,
  playLoopMode: store.playLoopMode,
  keysClicked: store.keysClicked,
  simulateMode: store.simulateMode,
})

const mapDispatchToProps = ({
  setKeysClicked: actions.setKeysClicked,
  addKeyClicked: actions.addKeyClicked,
  removeKeyClicked: actions.removeKeyClicked,
})

class ViolinDisplay extends Component {
  handlePointEvent(eventType, e, key) {
    switch (eventType) {
      case 'mousedown':
        this.props.setKeysClicked([key])
        break
      case 'mouseup':
        this.props.setKeysClicked(null)
        break
      case 'mouseout':
        this.props.setKeysClicked(null)
        break
      case 'touchstart':
        if (e.touches.length > 0) {
          this.props.addKeyClicked(key)
        }
        break
      case 'touchend':
        if (e.touches.length === 0) {
          this.props.setKeysClicked(null)
          // this.props.removeKeyClicked(key)
        } else {
          this.props.removeKeyClicked(key)
        }
        e.preventDefault()
        break
      default:
        break
    }
  }
  renderNote(dims, playSet, note, noteIndex, stringIndex) {
    // Positioning
    let cx = dims.STRING_XS[stringIndex]
    let cy = dims.NOTE_YS[noteIndex]
    if (noteIndex !== 0) {
      cy += dims.FIRST_ROW_MARGIN_Y
    }

    // Fill Color
    if (this.props.playMode === "TUNING")
      playSet = {}
    const positionIsInPLaySet = PlaySets.hasPosition(
      playSet, [stringIndex, noteIndex])
    const isPlaying = PlaySets.hasPosition(
      this.props.keysPlaying, [stringIndex, noteIndex])
    let isClicked = false
    if (this.props.keysClicked)
      isClicked =
        PlaySets.hasPosition(
          this.props.keysClicked, [stringIndex, noteIndex])
    const fill = isClicked ? "#8ff" :
      isPlaying ? "#8f8" :
        positionIsInPLaySet ? "#ff8" : "#fff"
    let transition = "fill 0.1s"
    if (!isClicked && !isPlaying)
      transition = "fill 1s"

    // Event callback data
    const key = { position: [stringIndex, noteIndex], finger: -1 }

    // Text
    const finger = PlaySets.fingerFromPosition(
      [stringIndex, noteIndex], playSet)
    let noteBase = note[0]
    let octave = note[1]
    if (note.length >= 3) {
      noteBase += note[1]
      octave = note[2]
    }

    return (
      <g className="ViolinDisplay"
        key={note + "-" + stringIndex + "-" + noteIndex}>
        <circle
          className="Note"
          cx={cx}
          cy={cy}
          r={dims.NOTE_RADIUS - dims.STROKE_WIDTH}
          stroke="#000"
          strokeWidth={dims.STROKE_WIDTH}
          style={{ fill: fill, transition: transition }}
          onMouseDown={e => this.handlePointEvent('mousedown', e, key)}
          onMouseUp={e => this.handlePointEvent('mouseup', e, key)}
          onMouseOut={e => this.handlePointEvent('mouseout', e, key)}
          onTouchStart={e => this.handlePointEvent('touchstart', e, key)}
          onTouchEnd={e => this.handlePointEvent('touchend', e, key)}
        />
        <text
          x={cx}
          y={cy + dims.NOTE_FONT_SIZE / 2 - 3}
          textAnchor="middle"
          fontSize={dims.NOTE_FONT_SIZE} >
          {noteBase}
          <tspan
            fontSize={dims.OCTAVE_FONT_SIZE}>
            {octave}</tspan></text>
        {finger !== null ? (
          <text
            x={cx}
            y={cy
              + dims.NOTE_FONT_SIZE / 2
              + dims.FINGER_FONT_SIZE - 2}
            textAnchor="middle"
            fontSize={dims.FINGER_FONT_SIZE}>
            {finger}</text>
        ) : null}
      </g>
    )
  }
  renderString(dims, playSet, string, stringIndex) {
    const ret = []
    for (let i = 0; i < string.length; i++) {
      ret.push(this.renderNote(dims, playSet, string[i], i, stringIndex))
    }
    return ret
  }
  renderStrings(dims, playSet, strings) {
    const ret = []
    let index = 0
    strings.forEach((v, k) => {
      ret.push(this.renderString(dims, playSet, v, index))
      index++
    })
    return ret
  }
  render() {
    const playSet = generatePlaySet(this.props.playScale, this.props.playLoopMode)
    const dims = makeDims(this.props.simulateMode)
    return <View {...this.props} dims={dims}>
      <line
        x1={0}
        x2={dims.SVG_WIDTH}
        y1={dims.NOTE_RADIUS * 2 + dims.FIRST_ROW_MARGIN_Y / 2}
        y2={dims.NOTE_RADIUS * 2 + dims.FIRST_ROW_MARGIN_Y / 2}
        stroke="#000"
        strokeWidth={dims.FIRST_ROW_MARGIN_Y / 2}
      />
      {this.renderStrings(dims, playSet, STRINGS)}
    </View>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViolinDisplay)
