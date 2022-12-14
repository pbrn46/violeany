import { useCallback, useEffect, useRef } from "react"
import * as Tone from "tone"
import { setIndexPlaying, setKeysPlaying, setTransportStatus } from "../actions"
import { useAppDispatch, useAppSelector } from "../redux/store"
import * as Util from "./index"

// Ref: view-source:https://tonejs.github.io/examples/polySynth

export function useViolinPlayer() {
  const dispatch = useAppDispatch()

  const {
    keysClicked,
    playMode,
    playScale,
    playTuningKey,
    playLoopMode,
    volume,
    bpm,
    isPlaying,
  } = useAppSelector(state => state)

  const synthRef = useRef<Tone.PolySynth<Tone.Synth<Tone.SynthOptions>> | null>(null)

  // Create PolySynth
  useEffect(() => {
    if (!synthRef.current) {
      const synth = synthRef.current || new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          partials: [0, 2, 3, 4]
        }
      }) // .toDestination() // (6, Tone.SimpleAM)
      synth.set({
        volume: Util.Violin.percentToDecibel(volume),
        envelope: {
          "attack": 0.10,
          "decay": 0.15,
          "sustain": 1.0,
          "release": 0.5,
        },
      })
      const reverb = new Tone.Freeverb(0.3, 4000)
      reverb.wet.value = 0.3;
      const delay = new Tone.PingPongDelay(0.1, 0.1)
      delay.wet.value = 0.2;
      synth.chain(delay, reverb, Tone.Destination)
      synthRef.current = synth
    }

    return () => {
    }
  }, [volume])

  const handleTransportStart = useCallback(() => {
    dispatch(setTransportStatus("started"))
  }, [dispatch])

  const handleTransportStop = useCallback(() => {
    dispatch(setTransportStatus("stopped"))
  }, [dispatch])

  const handleTransportPause = useCallback(() => {
    dispatch(setTransportStatus("paused"))
  }, [dispatch])

  const handleTransportLoop = useCallback(() => {
  }, [])

  // Watch bpm changes
  useEffect(() => {
    if (Number.isInteger(bpm))
      Tone.Transport.bpm.value = bpm
  }, [bpm])

  // Register transport events
  useEffect(() => {
    Tone.Transport.on('start', handleTransportStart)
    Tone.Transport.on('stop', handleTransportStop)
    Tone.Transport.on('pause', handleTransportPause)
    Tone.Transport.on('loop', handleTransportLoop)
    return () => {
      Tone.Transport.off('start', handleTransportStart)
      Tone.Transport.off('stop', handleTransportStop)
      Tone.Transport.off('pause', handleTransportPause)
      Tone.Transport.off('loop', handleTransportLoop)
    }
  }, [handleTransportLoop, handleTransportPause, handleTransportStart, handleTransportStop])

  const seqRef = useRef<Tone.Part | null>(null)

  const getPlaySet = useCallback(() => {
    if (playMode === "TUNING") {
      switch (playTuningKey) {
        case "G":
          return [{ position: [0, 0], finger: 0 }]
        case "D":
          return [{ position: [1, 0], finger: 0 }]
        case "A":
          return [{ position: [2, 0], finger: 0 }]
        case "E":
          return [{ position: [3, 0], finger: 0 }]
        case "ALL":
          return [
            { position: [0, 0], finger: 0 },
            { position: [1, 0], finger: 0 },
            { position: [2, 0], finger: 0 },
            { position: [3, 0], finger: 0 },
          ]
        default:
          return []
      }
    }
    return Util.Violin.generatePlaySet(playScale, playLoopMode)
  }, [playLoopMode, playMode, playScale, playTuningKey])

  const updateSequence = useCallback(() => {
    const synth = synthRef.current
    if (!synth) return
    let seq = seqRef.current
    if (seq) {
      seq.stop()
      seq.dispose()
    }
    const playSet = getPlaySet()
    let timeOffset = Tone.Time(0)
    const parts = [...playSet.keys()].map((v) => {
      let dur = playSet[v].dur
      if (dur == null) {
        dur = "4n"
      }
      let t = timeOffset.toNotation()
      timeOffset = Tone.Time(timeOffset.valueOf() + Tone.Time(dur).valueOf()) //.add(dur).valueOf
      return [t, [v, dur]]
    })

    seq = new Tone.Part((time, part) => {
      let index = part[0]
      let setItem = playSet[index]
      let dur = part[1]
      let note = Util.Violin.noteFromPosition(setItem.position)
      if (note !== "r0")
        synth.triggerAttackRelease(note, dur, time)
      Tone.Draw.schedule(() => {
        dispatch(setKeysPlaying([setItem]))
        if (playMode === "TUNING")
          dispatch(setIndexPlaying(null))
        else
          dispatch(setIndexPlaying(index))
      }, time)
    }, parts).start("+0.1")
    seq.loopEnd = timeOffset.toNotation()
    seq.loop = playLoopMode !== "ONCE"

    seqRef.current = seq

  }, [dispatch, getPlaySet, playLoopMode, playMode])

  const play = useCallback(() => {
    updateSequence()
    Tone.Transport.context.lookAhead = 0.5
    Tone.Transport.start("+0.1")
  }, [updateSequence])

  const stop = useCallback(() => {
    dispatch(setKeysPlaying(null))
    dispatch(setIndexPlaying(null))
    synthRef.current?.releaseAll()
    Tone.Transport.stop()
  }, [dispatch])

  // Watch for isPlaying
  useEffect(() => {
    if (isPlaying) play()
    else stop()
  }, [isPlaying, play, stop])

  // Update sequence if it changes
  useEffect(() => {
    updateSequence()
  }, [updateSequence])

  useEffect(() => {
    synthRef.current?.set({
      volume: Util.Violin.percentToDecibel(volume)
    })
  }, [volume])

  /** Notes that should currently be played */
  const notesRef = useRef<string[]>([])

  // If keys clicked or released, attack or release note
  useEffect(() => {
    const synth = synthRef.current
    if (!synth) return

    const notes = keysClicked.map((note: any) =>
      Util.Violin.noteFromPosition(note.position))

    const prevNotes = notesRef.current || []

    const newNotes = notes.filter((note: any) =>
      prevNotes.indexOf(note) === -1)

    const oldNotes = prevNotes.filter((note: any) =>
      notes.indexOf(note) === -1)

    // Attack new notes
    newNotes.forEach((note: any) => {
      synth.triggerAttack(note)
    })

    // Release old notes
    oldNotes.forEach((note: any) => {
      synth.triggerRelease(note)
    })

    notesRef.current = notes
  }, [keysClicked])
}