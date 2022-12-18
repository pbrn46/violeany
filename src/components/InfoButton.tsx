import React, { useState } from 'react'
import { Modal } from "./Modal"

export function InfoButton() {
  const [modalShow, setModalShow] = useState(false)
  return <div className="InfoButton">
    <button type="button"
      className="tw-p-2.5 tw-outline-1 tw-outline-black/0 focus:tw-outline-1 focus:tw-outline-black"
      onClick={() => setModalShow(true)}
      style={{ lineHeight: "10px" }}>
      <svg width="20" height="20">
        <circle
          cx="10" cy="10" r="9"
          strokeWidth="1"
          stroke="#000"
          fill="#fff"
        />
        <text
          x="10" y="15"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fontStyle="italic">i</text>
      </svg>
    </button>
    <Modal show={modalShow} onClose={() => setModalShow(false)}>
      <div className="tw-w-96 tw-p-3 tw-grid gap-2">
        <h2>About</h2>
        Practice your violin scales here!

        <div className="tw-border tw-rounded tw-p-2 tw-grid tw-gap-2">
          <h3>Documentation</h3>

          <div className="tw-border tw-rounded tw-p-1">
            <h4 className="">
              Getting Started
            </h4>
            <p className="">
              Press <kbd>Play</kbd> to begin.
            </p>
          </div>

          <div className="tw-border tw-rounded tw-p-1">
            <h4 className="">
              Play Mode
            </h4>
            <p className="">
              Practice scales in <code>Scales</code>, or tune your instrument in <code>Tuning</code> mode.
            </p>
          </div>
        </div>

        <p className="tw-text-sm">Created by Boris Wong.</p>
      </div>
    </Modal>
  </div>
}
