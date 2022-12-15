import { useCallback, useState } from 'react'
import { play, setBpm, setPlayLoopMode, setPlayMode, setPlayScale, setPlayTuningKey, setSimulateMode, setVolume, stop } from '../actions'
import { useAppDispatch, useAppSelector } from '../redux/store'

import * as Util from '../util'

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

const PLAYSCALE_OPTIONS = Util.Violin.GRADE_SCALES.reduce((acc, v, k) => {
  // Add heading/divider
  if (!acc) return []
  if (!v) return []
  acc.push([null, "--- " + k + " ---"])

  acc = acc.concat(v.reduce((acc, v) => {
    let scale = Util.Violin.SCALES.get(v)
    if (scale)
      acc.push([v, scale.title])
    return acc
  }, [] as any[]))
  return acc
}, [] as any[])

const PLAYTUNINGKEY_OPTIONS = [
  ["G", "G"],
  ["D", "D"],
  ["A", "A"],
  ["E", "E"],
  ["ALL", "All"],
]


export function Toolbar() {
  const dispatch = useAppDispatch()
  const handlePlayClick = useCallback(() => {
    dispatch(play())
  }, [dispatch])

  const handleStopClick = useCallback(() => {
    dispatch(stop())
  }, [dispatch])

  const playScale = useAppSelector(state => state.playScale)
  const transportStatus = useAppSelector(state => state.transportStatus)
  const volume = useAppSelector(state => state.volume)
  const bpm = useAppSelector(state => state.bpm)
  const playMode = useAppSelector(state => state.playMode)
  const playTuningKey = useAppSelector(state => state.playTuningKey)
  const playLoopMode = useAppSelector(state => state.playLoopMode)
  const simulateMode = useAppSelector(state => state.simulateMode)

  const [playScaleIndex, setPlayScaleIndex] = useState<number | null>(PLAYSCALE_OPTIONS.findIndex(v => playScale === v[0]))

  return <div className="Toolbar tw-grid tw-gap-2">

    <div className="tw-flex tw-gap-2">
      <div className="tw-input-group">
        <div className="tw-input-label">
          Volume
        </div>
        <input type="text"
          className="tw-input"
          value={volume}
          onChange={(e) => dispatch(setVolume(e.target.value))}
          size={3}
        />
        <div className="tw-input-label">
          ({Util.Violin.percentToDecibel(volume)} dB)
        </div>
      </div>

      <div className="tw-input-group">
        <div className="tw-input-label">
          BPM
        </div>
        <input type="text"
          className="tw-input"
          value={bpm}
          onChange={(e) => dispatch(setBpm(e.target.value))}
          size={3}
        />
      </div>
    </div>

    <div className="tw-flex tw-gap-2">
      <div className="tw-input-group">
        <div className="tw-input-label">
          Play Mode
        </div>
        <select
          className="tw-input"
          onChange={(e) => dispatch(setPlayMode(e.target.value))}
          value={playMode}>
          {PLAYMODE_OPTIONS.map((v) =>
            <option key={v[0]} value={v[0]}>
              {v[1]}
            </option>
          )}
        </select>
      </div>

      {playMode === "TUNING" ?
        <div className="tw-input-group">
          <div className="tw-input-label">
            Tuning Key
          </div>
          <select
            className="tw-input"
            onChange={(e) => dispatch(setPlayTuningKey(e.target.value))}
            value={playTuningKey}>
            {PLAYTUNINGKEY_OPTIONS.map((v) =>
              <option key={v[0]} value={v[0]}>
                {v[1]}
              </option>
            )}
          </select>
        </div>
        : null}
      {playMode === "SCALES" ?
        <div className="tw-input-group">
          <div className="tw-input-label">
            Scale
          </div>
          <select
            className="tw-input"
            onChange={(e) => {
              setPlayScaleIndex(parseInt(e.target.value))
              dispatch(setPlayScale(PLAYSCALE_OPTIONS[parseInt(e.target.value)][0]))
            }}
            value={playScaleIndex?.toString()}>
            {PLAYSCALE_OPTIONS.map((v, i) => (
              <option
                key={i}
                value={i}
                disabled={v[0] === null}>
                {v[1]}
              </option>
            ))}
          </select>
        </div>
        : null}
      {playMode === "SCALES" ? (
        <div className="tw-input-group">
          <div className="tw-input-label">
            Loop Mode
          </div>
          <select
            className="tw-input"
            onChange={(e) => dispatch(setPlayLoopMode(e.target.value))}
            value={playLoopMode}>
            {PLAYLOOPMODE_OPTIONS.map((v) => (
              <option key={v[0]} value={v[0]}>
                {v[1]}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
    <div className="tw-flex tw-gap-2">
      <div className="tw-input-group">
        <div className="tw-input-label">
          Simulate Mode
        </div>
        <select
          className="tw-input"
          onChange={(e) => dispatch(setSimulateMode(e.target.value === "true"))}
          value={simulateMode}>
          <option value="true">On</option>
          <option value="false">Off</option>
        </select>
        <div className="tw-input-label">
          <small>(experimental)</small>
        </div>
      </div>
    </div>

    <div className="tw-flex tw-gap-2">
      <button
        className={`tw-btn ${transportStatus === "started" ? "active" : ""}`}
        type="button"
        onClick={handlePlayClick}
      >Play</button>
      <button
        className={`tw-btn ${transportStatus === "stopped" ? "active" : ""}`}
        type="button"
        onClick={handleStopClick}
      >Stop</button>
    </div>
  </div>
}