import {
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    REGISTER_FAIL
} from '../actions/types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticatedC: null,
    Loading: true,
    company: null
} 
export default function(state = initialState, action){
    const { type, payload} = action;
    
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticatedC: true,
                Loading: false,
                company:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticatedC: true,
                Loading: false
            }


        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                    company: null
      };


        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:    
        
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticatedC: false,
                Loading: false
            }
            
                
            
        
        default:
            return state;
                  

    }
}