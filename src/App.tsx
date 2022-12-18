import { Provider } from 'react-redux'
import { store } from "./redux/store"

import './App.css'
import { Main } from "./Main"

export default function App() {
  return <Provider store={store}>
    <Main />
  </Provider>
}
