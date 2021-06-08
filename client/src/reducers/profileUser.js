import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE,GET_PROFILEID,GET_PROFILEIDU, CLEAR_PROFILE } from "../actions/types";

const initialState ={
    profileUId: null,
    profileCId: null,
    profileUser: null,
    loading: true,
    error :{}
}

export default function(state = initialState,action){
    const { type, payload} = action;
    switch(type){
        case GET_PROFILE:
        case  UPDATE_PROFILE:    
            return{
                ...state,
                profileUser: payload,
                loading: false
            };
        case GET_PROFILEID:
            return{
                ...state,
                profileCId: payload,
                loading: false
            };  
        case GET_PROFILEIDU:
            return{
                ...state,
                profileUId: payload,
                loading: false
                };           
        case CLEAR_PROFILE:
            return{
                ...state,
                profileUser: null,
                loading: false
                }     

        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            } ;  
        default:
            return state;    
    
    }
}