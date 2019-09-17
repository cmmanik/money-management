import * as Types from '../actions/actionsType';

const init = {
    isAurienticated:false,
    redirect:false,
    user:{},
    errors:{}
}

const authReducer = (state=init, action) => { 
    switch (action.type) {
        case Types.SET_USER: {
            return {
                user:action.payload.user,
                redirect:true,
                isAurienticated:Object.keys(action.payload.user).length !== 0,
                errors:{}
            }
        }
        case Types.LOGOUT_USER : {
            return {
                user:action.payload.user,
                redirect:false,
                isAurienticated:Object.keys(action.payload.user).length !== 0,
                errors:{}
            }
        }
        case Types.SET_ERROR: {
            return {
                ...state,
                errors:action.payload.errors
            }
        }    
    
        default: return state;
    }
}

export default authReducer;