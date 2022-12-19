import { combineReducers } from "redux"
import { configReducer } from "./reducers/config"
import { statusReducer } from "./reducers/status"

export const rootReducer = combineReducers({
  config: configReducer,
  status: statusReducer,
})
