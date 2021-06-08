import axios from 'axios';
import {setAlert} from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT, 
    CLEAR_PROFILE
} from './types';

import setAuthToken from '../utils/setAuthToken';

//Load Company
export const loadCompany = () => async dispatch =>{

    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'));
    

    try {
        
        const res= await axios.get('http://localhost:5000/api/authCompany');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        });
        
    }
}
}



// Register Company
export const registerCompany = ({ name , email , password})=> async dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'

        }
    };


const body = JSON.stringify({name,email,password});
try{
    const res = await axios.post('http://localhost:5000/api/company',body,config);

    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    });
}catch(err){
    const errors = err.response.data.errors;
   
   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }

    dispatch({
        type: REGISTER_FAIL
    });
}
}

// Login Company 
export const loginCompany = (email , password)=> async dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'

        }
    };


const body = {email,password};
try{
    const res = await axios.post('http://localhost:5000/api/authCompany',body,config);

    dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    });
    dispatch (
        loadCompany()
    );

}catch(err){
    const errors = err.response.data.errors;
   
   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }

    dispatch({
        type: LOGIN_FAIL
    });
}
}


//LOGOUT / clear Profile
export const logoutCompany = () => dispatch =>{
    dispatch({ type: LOGOUT});
    

}