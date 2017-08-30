import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'
import * as actions from '../actions'

import * as ViolinUtil from '../violinUtil'

import './index.css'

const mapStateToProps = (store) => ({
  keysPlaying: store.keysPlaying,
  keyClicked: store.keyClicked,
  playMode: store.playMode,
  playScale: store.playScale,
  playTuningKey: store.playTuningKey,
  playLoopMode: store.playLoopMode,
  playStatus: store.playStatus,
  volume: store.volume,
  bpm: store.bpm,
})

const mapDispatchToProps = ({
  setPlayMode: actions.setPlayMode,
  setPlayScale: actions.setPlayScale,
  setPlayTuningKey: actions.setPlayTuningKey,
  setPlayLoopMode: actions.setPlayLoopMode,
  setKeysPlaying: actions.setKeysPlaying,
  setIndexPlaying: actions.setIndexPlaying,
  setPlayStatus: actions.setPlayStatus,
  setVolume: actions.setVolume,
  setBpm: actions.setBpm,
})

class ViolinPlayer extends Component {
  constructor(props) {
    super(props)
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.handleStopClick = this.handleStopClick.bind(this)
    this.synth = new Tone.PolySynth({
      polyphony: 6,
      voice: Tone.Synth,
      // voice: Tone.MembraneSynth,
    }).toMaster();
    this.synth.set({
      volume: ViolinUtil.percentToDecibel(this.props.volume),
      oscillator: {
        type: "square",
      },
      envelope: {
        "attack" : 0.05,
			  "decay" : 0.05,
			  "sustain" : 0.9,
			  "release" : 1.0,
      },
    })
  }
  componentDidMount() {
    this.updateSequence()
    Tone.Transport.on('start', this.transportEventHandlers('start'))
    Tone.Transport.on('stop', this.transportEventHandlers('stop'))
    Tone.Transport.on('pause', this.transportEventHandlers('pause'))
    Tone.Transport.on('loop', this.transportEventHandlers('loop'))
  }
  componentWillUnmount() {
    Tone.Transport.off('start', this.transportEventHandlers('start'))
    Tone.Transport.off('stop', this.transportEventHandlers('stop'))
    Tone.Transport.off('pause', this.transportEventHandlers('pause'))
    Tone.Transport.off('loop', this.transportEventHandlers('loop'))
  }
  componentDidUpdate(prevProps) {
    // TODO: Instead of check for changes here, make an invalidating reducer
    if (prevProps.playMode !== this.props.playMode
        || prevProps.playScale !== this.props.playScale
        || prevProps.playTuningKey !== this.props.playTuningKey
        || prevProps.playLoopMode !== this.props.playLoopMode
        || prevProps.bpm !== this.props.bpm) {
      this.updateSequence()
    }

    if (this.props.volume !== prevProps.volume) {
      this.synth.set("volume", ViolinUtil.percentToDecibel(this.props.volume))
    }

    if (this.props.keyClicked !== prevProps.keyClicked) {
      let note
      if (this.props.keyClicked !== null) {
        note = ViolinUtil.noteFromPosition(
          this.props.keyClicked.position)
        this.synth.triggerAttack(note)
      }
      else if (prevProps.keyClicked !== null) {
        note = ViolinUtil.noteFromPosition(
          prevProps.keyClicked.position)
        this.synth.triggerRelease(note)
      }
    }
  }
  transportEventHandlers(eventType) {
    switch (eventType) {
      case 'start':
        if (this.handleTransportStart) return this.handleTransportStart
        return this.handleTransportStart =
          (e) => this.props.setPlayStatus("started")
      case 'stop':
        if (this.handleTransportStop) return this.handleTransportStop
        return this.handleTransportStop =
          (e) => this.props.setPlayStatus("stopped")
      case 'pause':
        if (this.handleTransportPause) return this.handleTransportPause
        return this.handleTransportPause =
          (e) => this.props.setPlayStatus("paused")
      case 'loop':
        if (this.handleTransportLoop) return this.handleTransportLoop
        return this.handleTransportLoop =
          (e) => {}
      default:
        return null
    }
  }
  // Keys are finger positions, in the format [stringIndex, positionIndex, finger]
  getPlaySet() {
    if (this.props.playMode === "TUNING") {
      switch (this.props.playTuningKey) {
        case "G":
          return [{position: [0, 0], finger: 0}]
        case "D":
          return [{position: [1, 0], finger: 0}]
        case "A":
          return [{position: [2, 0], finger: 0}]
        case "E":
          return [{position: [3, 0], finger: 0}]
        case "ALL":
          return [
            {position: [0, 0], finger: 0},
            {position: [1, 0], finger: 0},
            {position: [2, 0], finger: 0},
            {position: [3, 0], finger: 0},
          ]
        default:
          return []
      }
    }
    return ViolinUtil.generatePlaySet(this.props.playScale, this.props.playLoopMode)
  }
  updateSequence() {
    if (this.seq) {
      this.seq.stop()
      this.seq.dispose()
    }
    var playSet = this.getPlaySet()
    var range = [...playSet.keys()]
    this.seq = new Tone.Sequence((time, index) => {
      let setItem = playSet[index]
      let note = ViolinUtil.noteFromPosition(setItem.position)
      this.synth.triggerAttackRelease(note, "8n", time)
      Tone.Draw.schedule(() => {
        this.props.setKeysPlaying([setItem])
        this.props.setIndexPlaying(index)
      }, time)
      Tone.Draw.schedule(() => {
        this.props.setKeysPlaying(null)
      }, Tone.Time(time).add("8n"))
    }, range, "4n").start("+0.1")
    if (Number.isInteger(this.props.bpm))
      Tone.Transport.bpm.value = this.props.bpm
    this.seq.loop = this.props.playLoopMode !== "ONCE"
  }
  play() {
    this.updateSequence()
    Tone.Transport.lookAhead = 0.5
    Tone.Transport.start("+0.1")
  }
  stop() {
    this.props.setKeysPlaying(null)
    Tone.Transport.stop()
  }
  handlePlayClick(e) {
    this.play()
  }
  handleStopClick(e) {
    this.stop()
  }
  render() {
    const PLAYLOOPMODE_OPTIONS = [
      ["ONCE", "Once"],
      ["UP", "Up"],
      ["DOWN", "Down"],
      ["UPDOWN", "UpDown"],
      ["UPDOWN_NODOUBLE", "UpDown_NoDouble"],
    ]
    const PLAYMODE_OPTIONS = [
      ["SCALES", "Scales"],
      ["TUNING", "Tuning"],
    ]
    const PLAYSCALE_OPTIONS = [
      ["---DIV1", "--- Grade 1 ---"],
      ["D maj 1", "D major, one octave"],
      ["A maj 1", "A major, one octaves"],
      ["E nat min 1", "E natural minor, one octave"],
      ["G maj 2", "G major, two octaves"],
      ["---DIV2", "--- Grade 2 ---"],
      ["G maj 2", "G major, two octaves"],
      ["A maj 2", "A major, two octaves"],
      ["Bb maj 2", "Bb major, two octaves"],
      ["C maj 1", "C major, one octave"],
      ["F maj 1", "F major, one octave"],
      ["D har min 1", "D harmonic minor, one octave"],
      ["D mel min 1", "D melodic minor, one octave"],
      ["D nat min 1", "D natural minor, one octave"],
      ["G har min 1", "G harmonic minor, one octave"],
      ["G mel min 1", "G melodic minor, one octave"],
      ["G nat min 1", "G natural minor, one octave"],
    ]

    const PLAYTUNINGKEY_OPTIONS = [
      ["G", "G"],
      ["D", "D"],
      ["A", "A"],
      ["E", "E"],
      ["ALL", "All"],
    ]
    return (
      <div className="form-inline ViolinPlayer">
        <div className="input-group input-group-sm mr-3">
          <button
            className={
              "btn btn-sm" +
              (this.props.playStatus === "started" ? " btn-primary" : " btn-secondary")}
            type="button"
            onClick={this.handlePlayClick}
          >Play</button>
          <button
            className={
              "btn btn-sm" +
              (this.props.playStatus === "stopped" ? " btn-primary" : " btn-secondary")}
            type="button"
            onClick={this.handleStopClick}
          >Stop</button>
        </div>


        <div className="input-group input-group-sm mr-3">
          <div className="input-group-addon">
            Volume
          </div>
          <input type="text"
            className="form-control"
            value={this.props.volume}
            onChange={(e) => this.props.setVolume(e.target.value)}
            size={3}
          />
          <div className="input-group-addon">
            ({ViolinUtil.percentToDecibel(this.props.volume)} dB)
          </div>
        </div>

        <div className="input-group input-group-sm mr-3">
          <div className="input-group-addon">
            BPM
          </div>
          <input type="text"
            className="form-control"
            value={this.props.bpm}
            onChange={(e) => this.props.setBpm(e.target.value)}
            size={3}
          />
        </div>

        <div className="input-group input-group-sm mr-3">
          <div className="input-group-addon">
            Play Mode
          </div>
          <select
            className="custom-select custom-select-sm"
            onChange={(e) => this.props.setPlayMode(e.target.value)}
            value={this.props.playMode}>
            {PLAYMODE_OPTIONS.map((v) => (
              <option key={v[0]} value={v[0]}>
                {v[1]}
              </option>
            ))}
          </select>
        </div>

        {this.props.playMode === "TUNING" ? (
           <div className="input-group input-group-sm mr-3">
             <div className="input-group-addon">
               Tuning Key
             </div>
             <select
               className="custom-select custom-select-sm"
               onChange={(e) => this.props.setPlayTuningKey(e.target.value)}
               value={this.props.playTuningKey}>
               {PLAYTUNINGKEY_OPTIONS.map((v) => (
                 <option key={v[0]} value={v[0]}>
                   {v[1]}
                 </option>
               ))}
             </select>
           </div>
        ) : null}
        {this.props.playMode === "SCALES" ? (
           <div className="input-group input-group-sm mr-3">
             <div className="input-group-addon">
               Scale
             </div>
             <select
               className="custom-select custom-select-sm"
               onChange={(e) => this.props.setPlayScale(e.target.value)}
               value={this.props.playScale}>
               {PLAYSCALE_OPTIONS.map((v, i) => (
                 <option key={i} value={v[0]}>
                   {v[1]}
                 </option>
               ))}
             </select>
           </div>
        ) : null}
        {this.props.playMode === "SCALES" ? (
           <div className="input-group input-group-sm mr-3">
             <div className="input-group-addon">
               Loop Mode
             </div>
             <select
               className="custom-select custom-select-sm"
               onChange={(e) => this.props.setPlayLoopMode(e.target.value)}
               value={this.props.playLoopMode}>
               {PLAYLOOPMODE_OPTIONS.map((v) => (
                 <option key={v[0]} value={v[0]}>
                   {v[1]}
                 </option>
               ))}
             </select>
           </div>
        ) : null}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViolinPlayer)
