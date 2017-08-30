import React, { Component } from 'react'

// Components
import ViolinDisplay from './violinDisplay'
import ViolinPlayer from './violinPlayer'

// Styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container App">
        <ViolinPlayer />
        <ViolinDisplay />
      </div>
    )
  }
}

export default App
