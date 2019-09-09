import axios from 'axios';
import * as Types from './actionsType'

export const register = (user, history) => dispatch =>  {
    axios.post('/api/users/regiester', user)
        .then(response => {
            dispatch({type:Types.SET_USER, payload:{errors:{}}})
            history.push('/login')
        })
        .catch(err => {
            dispatch({type:Types.SET_ERROR, payload:{errors:err.response.data}})
        })
}