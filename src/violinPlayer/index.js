import { Component } from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'
import * as actions from '../actions'

import * as Util from '../util'

import './index.css'

const mapStateToProps = (store) => ({
  keysClicked: store.keysClicked,
  playMode: store.playMode,
  playScale: store.playScale,
  playTuningKey: store.playTuningKey,
  playLoopMode: store.playLoopMode,
  volume: store.volume,
  bpm: store.bpm,
  isPlaying: store.isPlaying,
})

const mapDispatchToProps = ({
  setKeysPlaying: actions.setKeysPlaying,
  setIndexPlaying: actions.setIndexPlaying,
  setTransportStatus: actions.setTransportStatus,
})

class ViolinPlayer extends Component {
  constructor(props) {
    super(props)
    this.synth = new Tone.PolySynth(6, Tone.SimpleAM)
    this.synth.set({
      volume: Util.Violin.percentToDecibel(this.props.volume),
      envelope: {
        "attack": 0.50,
		    "decay": 0.15,
		    "sustain": 1.0,
		    "release": 0.5,
      },
    })

    this.reverb = new Tone.Freeverb(0.3, 4000)
    this.reverb.wet.value = 0.3;
    this.delay = new Tone.PingPongDelay(0.1, 0.1)
    this.delay.wet.value = 0.2;

    this.synth.chain(this.delay, this.reverb, Tone.Master)

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
    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying)
        this.play()
      else
        this.stop()
    }

    // TODO: Instead of check for changes here, make an invalidating reducer
    if (prevProps.playMode !== this.props.playMode
        || prevProps.playScale !== this.props.playScale
        || prevProps.playTuningKey !== this.props.playTuningKey
        || prevProps.playLoopMode !== this.props.playLoopMode
        || prevProps.bpm !== this.props.bpm) {
      this.updateSequence()
    }

    if (this.props.volume !== prevProps.volume) {
      this.synth.set("volume", Util.Violin.percentToDecibel(this.props.volume))
    }

    if (this.props.keysClicked !== prevProps.keysClicked) {
      let note
      let notes = []
      let prevNotes = []

      for (let key of prevProps.keysClicked) {
        note = Util.Violin.noteFromPosition(
          key.position)
        prevNotes.push(note)
      }
      for (let key of this.props.keysClicked) {
        note = Util.Violin.noteFromPosition(
          key.position)
        notes.push(note)
      }

      for (let note of notes) {
        if (prevNotes.indexOf(note) === -1) {
          this.synth.triggerAttack(note)
        }
      }

      for (let note of prevNotes) {
        if (notes.indexOf(note) === -1) {
          this.synth.triggerRelease(note)
        }
      }
    }
  }
  transportEventHandlers(eventType) {
    switch (eventType) {
      case 'start':
        if (this.handleTransportStart) return this.handleTransportStart
        return this.handleTransportStart =
          (e) => this.props.setTransportStatus("started")
      case 'stop':
        if (this.handleTransportStop) return this.handleTransportStop
        return this.handleTransportStop =
          (e) => this.props.setTransportStatus("stopped")
      case 'pause':
        if (this.handleTransportPause) return this.handleTransportPause
        return this.handleTransportPause =
          (e) => this.props.setTransportStatus("paused")
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
    return Util.Violin.generatePlaySet(this.props.playScale, this.props.playLoopMode)
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
      let note = Util.Violin.noteFromPosition(setItem.position)
      this.synth.triggerAttackRelease(note, "8n", time)
      Tone.Draw.schedule(() => {
        this.props.setKeysPlaying([setItem])
        if (this.props.playMode === "TUNING")
          this.props.setIndexPlaying(null)
        else
          this.props.setIndexPlaying(index)
      }, time)
      // Tone.Draw.schedule(() => {
      //   this.props.setKeysPlaying(null)
      // }, Tone.Time(time).add("8n"))
    }, range, "8n").start("+0.1")
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
    this.props.setIndexPlaying(null)
    Tone.Transport.stop()
  }
  render() {
    return (null)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViolinPlayer)
