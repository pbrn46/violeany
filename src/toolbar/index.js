import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import * as Util from '../util'

import './index.css'

const mapStateToProps = (store) => ({
  playMode: store.playMode,
  playScale: store.playScale,
  playTuningKey: store.playTuningKey,
  playLoopMode: store.playLoopMode,
  transportStatus: store.transportStatus,
  volume: store.volume,
  bpm: store.bpm,
  simulateMode: store.simulateMode,
})

const mapDispatchToProps = ({
  setPlayMode: actions.setPlayMode,
  setPlayScale: actions.setPlayScale,
  setPlayTuningKey: actions.setPlayTuningKey,
  setPlayLoopMode: actions.setPlayLoopMode,
  setTransportStatus: actions.setTransportStatus,
  setVolume: actions.setVolume,
  setBpm: actions.setBpm,
  setSimulateMode: actions.setSimulateMode,
  play: actions.play,
  stop: actions.stop,
})

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

const PLAYSCALE_OPTIONS = Util.Violin.GRADE_SCALES.reduce((r, v, k) => {
  r.push([null, "--- " + k + " ---"])
  r = r.concat(v.reduce((r, v) => {
    let scale = Util.Violin.SCALES.get(v)
    if (scale)
      r.push([v, scale.title])
    return r
  }, []))
  return r
}, [])

const PLAYTUNINGKEY_OPTIONS = [
  ["G", "G"],
  ["D", "D"],
  ["A", "A"],
  ["E", "E"],
  ["ALL", "All"],
]


class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.handleStopClick = this.handleStopClick.bind(this)

    this.state = {}
  }
  handlePlayClick(e) {
    this.props.play()
  }
  handleStopClick(e) {
    this.props.stop()
  }
  render() {
    var playScaleIndex = this.state["playScaleIndex"]
    if (playScaleIndex == null)
      playScaleIndex = PLAYSCALE_OPTIONS.findIndex(v => this.props.playScale === v[0])

    return (
      <div className="Toolbar">
        <div className="form-inline mb-2">
          <div className="input-group input-group mr-3">
            <button
              className={
                "btn" +
                (this.props.transportStatus === "started" ? " btn-primary" : " btn-secondary")}
              type="button"
              onClick={this.handlePlayClick}
            >Play</button>
            <button
              className={
                "btn" +
                (this.props.transportStatus === "stopped" ? " btn-primary" : " btn-secondary")}
              type="button"
              onClick={this.handleStopClick}
            >Stop</button>
          </div>
        </div>

        <div className="form-inline mb-2">
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
              ({Util.Violin.percentToDecibel(this.props.volume)} dB)
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
        </div>

        <div className="form-inline mb-2">
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
                 onChange={
                   (e) => {
                     this.setState({playScaleIndex: e.target.value})
                     this.props.setPlayScale(PLAYSCALE_OPTIONS[e.target.value][0])}}
                 value={playScaleIndex}>
                 {PLAYSCALE_OPTIONS.map((v, i) => (
                   <option
                     key={i}
                     value={i}
                     name={v[1]}
                     disabled={v[0] === null}>
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
        <div className="form-inline mb-2">
          <div className="input-group input-group-sm mr-3">
            <div className="input-group-addon">
              Simulate Mode
            </div>
            <select
              className="custom-select custom-select-sm"
              onChange={(e) => this.props.setSimulateMode(e.target.value === "true")}
              value={this.props.simulateMode}>
              <option value={true}>On</option>
              <option value={false}>Off</option>
            </select>
            <div className="input-group-addon text-danger">
              <small>(experimental)</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
