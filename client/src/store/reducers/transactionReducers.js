import * as Types from '../actions/actionsType';
const transactionReducers = (state=[], action) => {
    switch (action.type) {
        case Types.LOAD_TRANSCTION: {
            let state = [...action.payload.transactions]
            return state;
        }
        case Types.CREATE_TRANSCTION : {
            let state = [...action.payload.transactions]
            return  state;
        }
        case Types.REMOVE_TRANSCTION : {
            let transactions = [...state];
            transactions = transactions.filter(trans => trans._id !== action.payload.transactionId)
            return transactions;
        }
        case Types.UPDATE_TRNSCTION : {
            let allTranstions = [...state]
            return allTranstions.map(trans => {
                if(trans._id === action.payload.updatTransction._id ) {
                    return action.payload.updatTransction
                }
                return trans
            })
        }
        default: return state;
    }
}
export default transactionReducers;