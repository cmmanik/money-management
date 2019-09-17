import { combineReducers } from 'redux'
import authReducer from './authReducer';
import transactionReducers from './transactionReducers';

const rootReducrs = combineReducers({
    auth:authReducer,
    transaction:transactionReducers
})

export default rootReducrs;