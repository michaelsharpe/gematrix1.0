import { combineReducers } from 'redux'
import numerals from 'reducers/numerals'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  numerals,
  routing: routerReducer
})

export default rootReducer
