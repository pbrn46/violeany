import { useCallback, useEffect, useRef } from "react"
import * as Tone from "tone"
import { statusActions } from "../redux/reducers/status"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { generatePlaySet, ViolinKey, noteFromPosition, percentToDecibel } from "./violin"

// Ref: view-source:https://tonejs.github.io/examples/polySynth

export function useViolinPlayer() {
  const dispatch = useAppDispatch()

  const { playMode, playScale, playTuningKey, playLoopMode, volume, bpm, }
    = useAppSelector(state => state.config)

  const { keysClicked, isPlaying, }
    = useAppSelector(state => state.status)
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
        volume: percentToDecibel(volume),
        envelope: {
          attack: 0.2,
          decay: 0.5,
          sustain: 0.5,
          release: 0.1,
        },
      })
      const reverb = new Tone.Freeverb(0.3, 4000)
      reverb.wet.value = 0.3;
      const delay = new Tone.PingPongDelay(0.1, 0.1)
      delay.wet.value = 0.2;

      const vibrato = new Tone.Vibrato({
        maxDelay: 0.005,
        frequency: 5,
        depth: 0.05
      })
      synth.chain(vibrato, delay, reverb, Tone.Destination)
      synthRef.current = synth
    }

    return () => {
    }
  }, [volume])

  // Watch bpm changes
  useEffect(() => {
    if (Number.isInteger(bpm))
      Tone.Transport.bpm.value = bpm
  }, [bpm])

  // Register transport events
  useEffect(() => {
    const handleTransportStart = () => { dispatch(statusActions.setTransportStatus("started")) }
    const handleTransportStop = () => { dispatch(statusActions.setTransportStatus("stopped")) }
    const handleTransportPause = () => { dispatch(statusActions.setTransportStatus("paused")) }
    const handleTransportLoop = () => { }

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
  }, [dispatch])

  const seqRef = useRef<Tone.Part | null>(null)

  const getPlaySet = useCallback((): ViolinKey[] => {
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
    return generatePlaySet(playScale, playLoopMode)
  }, [playLoopMode, playMode, playScale, playTuningKey])

  const updateSequence = useCallback(() => {
    const synth = synthRef.current
    if (!synth) return
    let seq = seqRef.current
    if (seq) {
      seq.stop()
      seq.dispose()
    }

    // Make sure bpm is up to date
    if (Number.isInteger(bpm))
      Tone.Transport.bpm.value = bpm

    const playSet = getPlaySet()
    let timeOffset = 0
    const parts = playSet.map((key, v) => {
      let dur = key.dur
      if (dur == null) {
        dur = "4n"
      }
      let t = timeOffset
      timeOffset = timeOffset + Tone.Time(dur).toSeconds()
      return [t, [v, dur]]
    })

    seq = new Tone.Part((time, part) => {
      let [index, dur] = part as [number, string]
      let setItem = playSet[index]
      let note = noteFromPosition(setItem.position)
      if (note !== "r0")
        synth.triggerAttackRelease(note, dur, time)
      Tone.Draw.schedule(() => {
        dispatch(statusActions.setKeysPlaying([setItem]))
        if (playMode === "TUNING")
          dispatch(statusActions.setIndexPlaying(-1))
        else
          dispatch(statusActions.setIndexPlaying(index))
      }, time)
    }, parts)
    seq.start()
    seq.loopEnd = timeOffset
    seq.loop = playLoopMode !== "ONCE"

    seqRef.current = seq
  }, [bpm, dispatch, getPlaySet, playLoopMode, playMode])

  const play = useCallback(() => {
    updateSequence()
    // Lookahead seems to cause bad race conditions with drawing and delays in keypressing
    // Tone.Transport.context.lookAhead = 0.5
    Tone.Transport.start()
  }, [updateSequence])

  const stop = useCallback(() => {
    dispatch(statusActions.setKeysPlaying([]))
    dispatch(statusActions.setIndexPlaying(-1))
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
      volume: percentToDecibel(volume)
    })
  }, [volume])

  /** Notes that should currently be played */
  const notesRef = useRef<string[]>([])

  // If keys clicked or released, attack or release note
  useEffect(() => {
    const synth = synthRef.current
    if (!synth) return

    const notes = keysClicked.map((note: any) =>
      noteFromPosition(note.position))

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