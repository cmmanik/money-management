import { combineReducers } from 'redux'
import authReducer from './authReducer';

const rootReducrs = combineReducers({
    auth:authReducer
})

export default rootReducrs;