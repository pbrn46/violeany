import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as ViolinUtil from '../violinUtil'

import './index.css'

const NOTE_RADIUS = 25
const FIRST_ROW_MARGIN_Y = 10
const NOTE_DISTANCE_X = 55
const NOTE_DISTANCE_Y = 50
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
  var noteYs = []
  for (let i = 0; i < 13; i++) {
    noteYs.push(i * NOTE_DISTANCE_Y + NOTE_RADIUS)
  }
  return noteYs
})()

const mapStateToProps = (store) => ({
  keysPlaying: store.keysPlaying,
  playScale: store.playScale,
  playMode: store.playMode,
  playLoopMode: store.playLoopMode,
  keyClicked: store.keyClicked,
})

const mapDispatchToProps = ({
  setKeyClicked: actions.setKeyClicked,
})

class ViolinDisplay extends Component {
  renderNote(playSet, note, noteIndex, stringIndex) {

    // Positioning
    var cx = STRING_XS[stringIndex]
    var cy = NOTE_YS[noteIndex]
    if (noteIndex !== 0) {
      cy += FIRST_ROW_MARGIN_Y
    }

    // Fill Color
    if (this.props.playMode === "TUNING")
      playSet = {}
    var isInPlaySet = ViolinUtil.isInPlaySet(
      [stringIndex, noteIndex], playSet)
    var isPlaying = ViolinUtil.isInPlaySet(
      [stringIndex, noteIndex], this.props.keysPlaying)
    var isClicked = false
    if (this.props.keyClicked)
      isClicked =
        this.props.keyClicked.position[0] === stringIndex &&
        this.props.keyClicked.position[1] === noteIndex
    var fill = isClicked ? "#8ff" :
               isPlaying ? "#8f8" :
               isInPlaySet ? "#ff8" : "#fff"
    var transition = "fill 0.1s"
    if (!isClicked && !isPlaying)
      transition = "fill 1s"


    // Event callback data
    var key = {position: [stringIndex, noteIndex], finger: -1}

    // Text
    var finger = ViolinUtil.fingerInPlaySet(
      [stringIndex, noteIndex], playSet)
    var noteBase = note[0]
    var octave = note[1]
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
          r={NOTE_RADIUS - STROKE_WIDTH}
          stroke="#000"
          strokeWidth={STROKE_WIDTH}
        style={{fill: fill, transition: transition}}
          onMouseDown={e => this.props.setKeyClicked(key)}
          onMouseUp={e => this.props.setKeyClicked(null)}
          onMouseOut={e => this.props.setKeyClicked(null)}
        />
        <text
          x={cx}
          y={cy + NOTE_FONT_SIZE / 2 - 3}
          textAnchor="middle"
          fontSize={NOTE_FONT_SIZE} >
          {noteBase}
          <tspan
            fontSize={OCTAVE_FONT_SIZE}>
            {octave}</tspan></text>
        {finger !== null ? (
           <text
             x={cx}
             y={cy
               + NOTE_FONT_SIZE / 2
               + FINGER_FONT_SIZE - 2}
             textAnchor="middle"
             fontSize={FINGER_FONT_SIZE}>
             {finger}</text>
        ) : null}
      </g>
    )
  }
  renderString(playSet, string, stringIndex) {
    var ret = []
    for (let i = 0; i < string.length; i++) {
      ret.push(this.renderNote(playSet, string[i], i, stringIndex))
    }
    return ret
  }
  renderStrings(playSet, strings) {
    var ret = []
    var index = 0
    strings.forEach((v, k) => {
      ret.push(this.renderString(playSet, v, index))
      index++
    })
    return ret
  }
  render() {
    var playSet = ViolinUtil.generatePlaySet(this.props.playScale, this.props.playLoopMode)
    return (
      <div className="text-center ViolinDisplay">
        <svg className="ViolinDisplay"
          width={SVG_WIDTH} height={SVG_HEIGHT}>
          <line
            x1={0}
            x2={SVG_WIDTH}
            y1={NOTE_RADIUS * 2 + FIRST_ROW_MARGIN_Y / 2}
            y2={NOTE_RADIUS * 2 + FIRST_ROW_MARGIN_Y / 2}
            stroke="#000"
            strokeWidth={FIRST_ROW_MARGIN_Y / 2}
          />
          {this.renderStrings(playSet, ViolinUtil.STRINGS)}
        </svg>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViolinDisplay)
