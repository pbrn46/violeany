import { Provider } from 'react-redux'
import { store } from "./redux/store"

import './App.css'
import { Main } from "./Main"

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

export default function App() {
  return <Provider store={store}>
    <Main />
  </Provider>
}
