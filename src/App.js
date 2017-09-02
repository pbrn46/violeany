import React, { Component } from 'react'

// Components
import InfoButton from './infoButton'
import StaffDisplay from './staffDisplay'
import ViolinDisplay from './violinDisplay'
import ViolinPlayer from './violinPlayer'

// Styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid App">
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
            <ViolinPlayer />
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
    )
  }
}

export default App
