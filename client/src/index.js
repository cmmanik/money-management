import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css";
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store';
import * as Types from './store/actions/actionsType'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/authHead';
const token = localStorage.getItem('auth_token')
setAuthToken(token)
if(token) {
    const decodeUser = jwtDecode(token)
    store.dispatch({type:Types.SET_USER, payload:{user:decodeUser}})
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
