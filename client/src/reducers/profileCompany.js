import { GET_PROFILE, PROFILE_ERROR ,CLEAR_PROFILE,GET_PROFILEID,GET_PROFILEIDU} from "../actions/types";

const initialState ={
    profileUId: null,
    profileCId: null,
    profileCompany: null,
    loading: true,
    error :{}
}

export default function(state = initialState,action){
    const { type, payload} = action;
    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profileCompany: payload,
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
                
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            } ;  
        case CLEAR_PROFILE:
            return{
                ...state,
                profileCompany: null,
                loading: false
            }    
        default:
            return state;    
    
    }
}