import React, { Component } from 'react'
import { Provider } from 'react-redux'

import InfoButton from './components/InfoButton'
import Toolbar from './components/Toolbar'
import StaffDisplay from './components/StaffDisplay'
import ViolinDisplay from './components/ViolinDisplay'
import ViolinPlayer from './components/ViolinPlayer'

import { store } from "./redux/store"

import './App.css'

declare global {
  interface Window {
    jQuery: any
    $: any
    Popper: any
    Tether: any
  }
}

window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Popper = require('popper.js')
require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap')

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid mx-auto App">
          <ViolinPlayer />

          <div className="tw-flex tw-items-center">
            <div className="">
              <h3>Violeany</h3>
            </div>
            <div className="grow">
              <InfoButton />
            </div>
          </div>
          <div className="tw-grid sm:tw-flex tw-grid-cols-12">
            <div className="tw-order-1 sm:tw-order-12 tw-col-span-12 sm:tw-flex-grow">
              <div className="tw-mb-2 tw-mr-2">
                <Toolbar />
              </div>
              <div className="tw-mb-2 tw-mr-2">
                <StaffDisplay />
              </div>
            </div>
            <div className="tw-order-12 sm:tw-order-1 tw-col-span-12">
              <div className="tw-mb-2 tw-mr-2">
                <ViolinDisplay />
              </div>
            </div>
          </div>
          <div className="tw-text-sm tw-text-center tw-mr-3">
            By Boris Wong, Copyright 2022, All Rights Reserved
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
