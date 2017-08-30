import React, { Component } from 'react'

// Components
import StaffDisplay from './staffDisplay'
import ViolinDisplay from './violinDisplay'
import ViolinPlayer from './violinPlayer'

// Styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid App">
        <h3>Violeany</h3>
        <div className="row no-gutters">
          <div className="col-12 col-md order-1 order-md-12">
            <div className="mb-2 mr-2">
            <ViolinPlayer />
            </div>
            <div className="mb-2 mr-2">
            <StaffDisplay />
            </div>
          </div>
          <div className="col-12 col-md-auto order-12 order-md-1">
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
