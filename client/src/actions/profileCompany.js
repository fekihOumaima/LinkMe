import axios from 'axios';
import { setAlert} from './alert';

import {
    GET_PROFILE,
    GET_PROFILEID,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from'./types';


//Get current company profile 
export const getCurrentProfile = () => async dispatch => {
    try{

        const res = await axios.get('http://localhost:5000/api/profileCompany/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    }catch(err){

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}


// Get profile by ID
export const getProfileById = (companyId) => async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profileCompany/company/${companyId}`);
  
      dispatch({
        type: GET_PROFILEID,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Create or update profile

export const createProfileC = (FormData, history,edit = false)=> async dispatch =>{

    try {
        const config ={
            Headers:{
                
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            }
        }

        const res = await axios.post('http://localhost:5000/api/profileCompany', FormData,config)
   
   
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        
        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created'));
        if(!edit){
            history.push('/dashboardCompany');
        }


    } catch (err) {
        const errors = err.response.data.errors;
   
        if(errors){
          errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

 // Delete account & profile
 export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete('http://localhost:5000/api/profileCompany');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
  
        dispatch(setAlert('Your account has been permanently deleted'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };