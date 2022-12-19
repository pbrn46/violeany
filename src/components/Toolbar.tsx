import { useCallback, useState } from 'react'
import { configActions } from "../redux/reducers/config"
import { statusActions } from "../redux/reducers/status"
import { useAppDispatch, useAppSelector } from '../redux/store'
import { GRADE_SCALES } from "../util/gradeScales"
import { getPlayScaleByKey, } from "../util/scales"
import { BaseKey, percentToDecibel, PlayLoopMode, PlayMode } from "../util/violin"

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

const PLAYSCALE_OPTIONS = GRADE_SCALES.reduce((acc, gradeScale) => {
  if (!acc) return []
  const { grade, scales } = gradeScale

  // Add heading/divider
  acc.push([null, "--- " + grade + " ---"])

  acc = acc.concat(scales.reduce((acc, v) => {
    let scale = getPlayScaleByKey(v)
    if (scale) acc.push([v, scale.title])
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
    dispatch(statusActions.setIsPlaying(true))
  }, [dispatch])

  const handleStopClick = useCallback(() => {
    dispatch(statusActions.setIsPlaying(false))
  }, [dispatch])

  const transportStatus = useAppSelector(state => state.status.transportStatus)
  const playScale = useAppSelector(state => state.config.playScale)
  const volume = useAppSelector(state => state.config.volume)
  const bpm = useAppSelector(state => state.config.bpm)
  const playMode = useAppSelector(state => state.config.playMode)
  const playTuningKey = useAppSelector(state => state.config.playTuningKey)
  const playLoopMode = useAppSelector(state => state.config.playLoopMode)
  const simulateMode = useAppSelector(state => state.config.simulateMode)

  const [playScaleIndex, setPlayScaleIndex] = useState<number | null>(PLAYSCALE_OPTIONS.findIndex(v => playScale === v[0]))

  return <div className="tw-grid tw-gap-2 tw-float tw-p-3 tw-bg-emerald-100/50 tw-shadow-emerald-900/50">

    <div className="tw-flex tw-flex-wrap tw-gap-2">
      <div className="tw-input-group">
        <div className="tw-input-label">
          Volume
        </div>
        <input type="text"
          className="tw-input"
          value={volume}
          onChange={(e) => dispatch(configActions.setVolume(parseInt(e.target.value)))}
          size={3}
        />
        <div className="tw-input-label">
          {percentToDecibel(volume)} dB
        </div>
      </div>

      <div className="tw-input-group">
        <div className="tw-input-label">
          BPM
        </div>
        <input type="text"
          className="tw-input"
          value={bpm}
          onChange={(e) => dispatch(configActions.setBpm(parseInt((e.target.value))))}
          size={3}
        />
      </div>
    </div>

    <div className="tw-flex tw-flex-wrap tw-gap-2">
      <div className="tw-input-group">
        <div className="tw-input-label">
          Play Mode
        </div>
        <select
          className="tw-input"
          onChange={(e) => dispatch(configActions.setPlayMode(e.target.value as PlayMode))}
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
            onChange={(e) => dispatch(configActions.setPlayTuningKey(e.target.value as BaseKey))}
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
              dispatch(configActions.setPlayScale(PLAYSCALE_OPTIONS[parseInt(e.target.value)][0]))
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
            onChange={(e) => dispatch(configActions.setPlayLoopMode(e.target.value as PlayLoopMode))}
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
          onChange={(e) => dispatch(configActions.setSimulateMode(e.target.value === "true"))}
          value={simulateMode ? "true" : "false"}>
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