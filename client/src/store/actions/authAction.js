import axios from 'axios';
import * as Types from './actionsType'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../utils/authHead';
export const register = (user, history) => dispatch =>  {
    axios.post('/api/users/regiester', user)
        .then(response => {
            dispatch({type:Types.SET_ERROR, payload:{errors:{}}})
            history.push('/login')
        })
        .catch(err => {
            dispatch({type:Types.SET_ERROR, payload:{errors:err.response.data}})
        })
}

export const login = (user, history) => dispatch => {
    axios.post('/api/users/login', user)
        .then(response => {
            const token = response.data.token;
            setAuthToken(token)
            localStorage.setItem('auth_token', token)
            const decode = jwtDecode(token)
            dispatch({type:Types.SET_USER, payload:{user:decode}})
           history.push('/')
        })
        .catch(err => {
            dispatch({type:Types.SET_ERROR, payload:{errors:err.response.data}})
            console.log(err);
        })
}

export const logout = history => dispatch => {
    localStorage.removeItem('auth_token');
    history.push('/login')
    dispatch({type:Types.SET_USER, payload:{user:{}}})
}