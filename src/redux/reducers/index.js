import { combineReducers } from 'redux'
import counter from './counter'
import login from './Login'
import role from './role'

export default combineReducers({
  counter, login, role
})
