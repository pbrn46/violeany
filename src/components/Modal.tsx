import React from "react"

type ModalProps = {
  show?: boolean
  children?: React.ReactNode
  onClose?: () => void
}
export function Modal({ children, show = true, onClose }: ModalProps) {
  if (!show) return null
  return <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-black/50">
    <div className="tw-flex tw-flex-col tw-items-center tw-w-full tw-h-full tw-mt-12">
      <div className="tw-bg-white tw-border tw-rounded tw-text-black">
        {children}
        <div className="tw-flex tw-justify-end">
          <button className="btn" onClick={() => onClose?.()}>Close</button>
        </div>
      </div>
    </div>
  </div>
}