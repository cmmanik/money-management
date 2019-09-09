import { createStore, compose, applyMiddleware } from 'redux'
import rootReducrs from "./reducers/rootReducers";
import thunk from 'redux-thunk';
const middleware = [thunk];
const composeInhencer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducrs, composeInhencer(
    applyMiddleware(...middleware)
))

export default store;