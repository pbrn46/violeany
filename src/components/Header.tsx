import { InfoButton } from "./InfoButton"

export function Header() {
  return <div className="tw-bg-orange-900 tw-text-white tw-shadow tw-border-b tw-border-b-orange-700 tw-shadow-orange-900/50">
    <div className="tw-container tw-mx-auto">
      <div className="tw-flex tw-items-center tw-py-2">
        <div className="tw-text-3xl">
          <span>Violeany</span>
        </div>
        <div className="tw-grow">
          <InfoButton />
        </div>
      </div>
    </div>
  </div>
}