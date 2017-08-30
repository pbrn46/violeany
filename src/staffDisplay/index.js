import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as ViolinUtil from '../violinUtil'

import './index.css'

const SharpSvg = require('../assets/sharp.svg')
const FlatSvg = require('../assets/flat.svg')

const PADL_X = 30
const PADR_X = 30
const TRIMT_Y = 13  // Amount of notes to take off of top
const TRIMB_Y = 8
const NOTE_DISTANCE_X = 30
const NOTE_DISTANCE_Y = 8
const NOTE_RADIUS = 6
const NOTE_FONT_SIZE = 12
const OCTAVE_FONT_SIZE = 10
const FINGER_FONT_SIZE = 12
const STROKE_WIDTH = 1
const SVG_HEIGHT = NOTE_DISTANCE_Y * (ViolinUtil.maxNoteIndex() - 1) + NOTE_RADIUS * 2 + 2 - TRIMT_Y * NOTE_DISTANCE_Y - TRIMB_Y * NOTE_DISTANCE_Y
// const SVG_WIDTH = "600px"
// From G3 to E6 (34 total?)

const mapStateToProps = (store) => ({
  indexPlaying: store.indexPlaying,
  playScale: store.playScale,
  playLoopMode: store.playLoopMode,
  keyClicked: store.keyClicked,
})

const mapDispatchToProps = ({
  setKeyClicked: actions.setKeyClicked,
})

const NoteToY = (note) => {
  // Note
  var noteBase = note[0]
  var octave = note[1]
  if (note.length >= 3) {
    octave = note[2]
  }
  var cy = ViolinUtil.noteToIndex(noteBase + octave)
  cy *= NOTE_DISTANCE_Y
  cy += NOTE_RADIUS
  cy = SVG_HEIGHT - cy + TRIMB_Y * NOTE_DISTANCE_Y
  return cy
}
const NOTE_YS = (() => {
  var noteYs = {}
  for (let i = 0; i < ViolinUtil.NOTES.length; i++) {
    let note = ViolinUtil.NOTES[i]
    noteYs[note] = NoteToY(note)
  }
  return noteYs
})()

const STAFF_LINE_NOTES = ["G2", "B2", "D3", "F3", "A3",
  "E4", "G4", "B4", "D5", "F5",]

const STAFF_LINE_YS = (() => {
  var staffYs =[]
  for (let i = 0; i < STAFF_LINE_NOTES.length; i++) {
    let note = STAFF_LINE_NOTES[i]
    staffYs.push(NoteToY(note))
  }
  return staffYs
})()

class StaffDisplay extends Component {
  scrollToIndexAsNeeded(index) {
    var notePos = this.generateCx(index)
    var scrollLeft = this.scrollBox.scrollLeft()
    var offset14 = this.scrollBox.width() * 1 / 4
    var offset34 = this.scrollBox.width() * 3 / 4
    var thresholdMax = scrollLeft + offset34
    var thresholdMin = scrollLeft + offset14
    if (notePos > thresholdMax || notePos < thresholdMin)
      this.scrollBox.scrollLeft(notePos - offset14)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.indexPlaying !== this.props.indexPlaying) {
      this.scrollToIndexAsNeeded(this.props.indexPlaying)
    }
  }
  generateCx(index) {
    return index * NOTE_DISTANCE_X + NOTE_RADIUS + PADL_X
  }
  renderNote(playSet, index, key) {
    // Note
    var note = ViolinUtil.noteFromPosition(key.position)
    var finger = key.finger
    var noteBase = note[0]
    var noteAccidental = null
    var octave = note[1]
    if (note.length >= 3) {
      noteAccidental = note[1]
      octave = note[2]
    }

    // Positioning
    var cx = this.generateCx(index)
    var cy = NOTE_YS[noteBase + octave]

    // Fill Color
    var isPlaying = index === this.props.indexPlaying
    var isClicked = false
    if (this.props.keyClicked)
      isClicked =
        this.props.keyClicked.position[0] === key.position[0] &&
        this.props.keyClicked.position[1] === key.position[1]
    var fill = isClicked ? "#8ff" :
               isPlaying ? "#8f8" : "#000"
    var transition = "fill 0.0s"
    if (!isClicked && !isPlaying)
      transition = "fill 0.5s"

    // TODO: Use key signatures instead
    var accidentalSvg = null
    if (noteAccidental) {
      accidentalSvg = (
        <image
          xlinkHref={
            noteAccidental === "b" ?
                     FlatSvg
                   : noteAccidental === "#" ? SharpSvg
                   : ""
          }
          x={cx - NOTE_RADIUS * 3}
          y={cy - NOTE_RADIUS * 1.25}
          height={NOTE_RADIUS * 2.5}
          width={NOTE_RADIUS * 2.5}
        />
      )
    }
    // TODO: C4 (and other floating notes as necessary) needs a horizontal line
    return (
      <g className="ViolinDisplay"
        key={index}>
        <circle
          className="Note"
          cx={cx}
          cy={cy}
          r={NOTE_RADIUS - STROKE_WIDTH}
          stroke="#000"
          strokeWidth={STROKE_WIDTH}
          style={{fill: fill, transition: transition}}
        />
        {accidentalSvg}
        <text
          x={cx}
          y={cy + NOTE_FONT_SIZE / 2 - NOTE_RADIUS - 10}
          textAnchor="middle"
          fontSize={NOTE_FONT_SIZE}>
          {noteBase}{noteAccidental}
          <tspan
            fontSize={OCTAVE_FONT_SIZE}>
            {octave}</tspan></text>
        {finger !== null ? (
           <text
             x={cx}
             y={cy
               + NOTE_RADIUS
               + FINGER_FONT_SIZE}
             textAnchor="middle"
             fontSize={FINGER_FONT_SIZE}>
             {finger}</text>
        ) : null}
      </g>
    )
  }
  renderNotes(playSet) {
    var ret = []
    for (let i = 0; i < playSet.length; i++) {
      ret.push(this.renderNote(playSet, i, playSet[i]))
    }
    return ret
  }
  renderStaves() {
    var ret = []
    for (let i = 0; i < STAFF_LINE_YS.length; i++) {
      ret.push(
        <line key={i}
          x1="0" x2="3000"
          y1={STAFF_LINE_YS[i]}
          y2={STAFF_LINE_YS[i]}
          stroke="#aaa"
          strokeWidth="1"
        />
      )
    }
    return ret
  }
  render() {
    var playSet = ViolinUtil.generatePlaySet(this.props.playScale, this.props.playLoopMode)
    var svgWidth = (playSet.length - 1) * NOTE_DISTANCE_X + NOTE_RADIUS * 2 + PADL_X + PADR_X
    return (
      <div
        className="StaffDisplay"
        ref={el => this.scrollBox = window.$(el)}
        style={{overflowX: "auto"}}>
        <div
          style={{width: "0px"}}>
          <svg className="StaffDisplay"
            height={SVG_HEIGHT}
            style={{
              width: svgWidth,
            }}
          >
            {this.renderStaves()}
            {this.renderNotes(playSet)}
          </svg>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffDisplay)
