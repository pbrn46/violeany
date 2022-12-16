import { Header } from "./components/Header"
import { StaffDisplay } from "./components/StaffDisplay"
import { Toolbar } from "./components/Toolbar"
import { ViolinDisplay } from "./components/ViolinDisplay"
import { useViolinPlayer } from "./util/violinPlayer"

export function Main() {
  useViolinPlayer()
  return <>
    <Header />
    <div className="tw-container tw-mx-auto tw-mt-2 tw-grid tw-gap-3">
      <div className="tw-grid sm:tw-flex tw-grid-cols-12 tw-gap-3">
        <div className="tw-order-1 sm:tw-order-12 tw-col-span-12 sm:tw-flex-grow tw-flex tw-flex-col tw-gap-3">
          <div className="">
            <Toolbar />
          </div>
          <div className="">
            <StaffDisplay />
          </div>
        </div>
        <div className="tw-order-12 sm:tw-order-1 tw-col-span-12">
          <div className="">
            <ViolinDisplay />
          </div>
        </div>
      </div>
      <div className="tw-text-sm tw-text-center">
        By Boris Wong, Copyright 2022, All Rights Reserved
      </div>
    </div>
  </>
}