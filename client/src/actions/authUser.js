import axios from 'axios';
import {setAlert} from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from './types';

import setAuthToken from '../utils/setAuthToken';

//Load User 
export const loadUser = () => async dispatch =>{

    const config = {
        headers:{
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')

        }
    };

    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'));

    try {
        
        
        const res= await axios.get('http://localhost:5000/api/authUser',config);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
        
    }
}
}

// Register User 
export const registerUser = ({ name , email , password})=> async dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'

        }
    };


const body = JSON.stringify({name,email,password});
try{
    const res = await axios.post('http://localhost:5000/api/users',body,config);

    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    });

    dispatch (
        loadUser()
    );

}catch(err){
    const errors = err.response.data.errors;
   
   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
       console.log("error");
    }

    dispatch({
        type: REGISTER_FAIL
    });
}
}


// Login User 
export const loginUser = ( email , password)=> async dispatch => {
    console.log(email,password);
    const config = {
        headers:{
            'Content-Type': 'application/json'

        }
    };


const body = {email,password};
try{
    const res = await axios.post('http://localhost:5000/api/authUser',body,config);
    
    dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    });

    
    dispatch (
        loadUser()
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
export const logoutUser = () => dispatch =>{
    dispatch({ type: LOGOUT});

}
