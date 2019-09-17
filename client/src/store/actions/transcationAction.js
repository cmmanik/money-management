import * as Types from './actionsType';
import axios from 'axios'

export const loadTransction = user => dispatch => {
    axios.get('/api/transction')
        .then(response => {
            dispatch({type:Types.LOAD_TRANSCTION, payload:{transactions:response.data}})
        })
        .catch(err => {
            console.log(err)
        })
}

export const addTransction = tran => dispatch => {
    axios.post('/api/transction', tran)
        .then(response => {
            dispatch({type:Types.CREATE_TRANSCTION, payload:{transactions:response.data}})
        })
        .catch(err => {
            console.log(err)
        })
}

export const removeTransction = id => dispatch => {
    axios.delete(`/api/transction/${id}`)
        .then(response => {
            dispatch({type:Types.REMOVE_TRANSCTION, payload:{transactionId:id}})
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateTransction = (transactions, id) => dispatch => {
    axios.put(`/api/transction/${id}`, transactions)
        .then(response => {
            dispatch({type:Types.UPDATE_TRNSCTION, payload:{updatTransction:response.data._doc}})
        })
        .catch(err => {
            console.log(err)
        })
}