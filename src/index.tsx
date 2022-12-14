import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
// import { applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { Provider } from 'react-redux'
import './index.css'
import App from './App'

// import reducer from './redux/reducers'



// var store = new configureStore(
//   reducer,
//   applyMiddleware(thunk)
// )

// ReactDOM.render(
//   <Provider store={store}><App /></Provider>,
//   document.getElementById('root'))

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<App />)