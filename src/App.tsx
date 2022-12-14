import React, { Component } from 'react'
import { Provider } from 'react-redux'

import InfoButton from './infoButton'
import Toolbar from './toolbar'
import StaffDisplay from './staffDisplay'
import ViolinDisplay from './violinDisplay'
import ViolinPlayer from './violinPlayer'

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
        <div className="container-fluid App">
          <ViolinPlayer />

          <div className="row no-gutters align-items-center">
            <div className="col-auto">
              <h3>Violeany</h3>
            </div>
            <div className="col">
              <InfoButton />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-12 col-sm order-1 order-sm-12">
              <div className="mb-2 mr-2">
                <Toolbar />
              </div>
              <div className="mb-2 mr-2">
                <StaffDisplay />
              </div>
            </div>
            <div className="col-12 col-sm-auto order-12 order-sm-1">
              <div className="mb-2 mr-2">
                <ViolinDisplay />
              </div>
            </div>
          </div>
          <div className="small text-center mr-3">
            By Boris Wong, Copyright 2017, All Rights Reserved
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
