import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'

import reducer from './reducers'

window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Popper = require('popper.js')
require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap')


var store = new createStore(
  reducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'))
