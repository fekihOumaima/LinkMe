import axios from 'axios';
import { setAlert} from './alert';

import {
    GET_PROFILE,
    GET_PROFILEIDU,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE
} from'./types';

//Get current user profile 
export const getCurrentProfile = () => async dispatch => {
    try{

        const res = await axios.get('http://localhost:5000/api/profileUser/me');

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
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profileUser/user/${userId}`);

    dispatch({
      type: GET_PROFILEIDU,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
  })
  }
};

// Create or update profile

export const createProfileU = (FormData, history,edit = false)=> async dispatch =>{

    try {
        const config ={
            Headers:{
              'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            }
        }

        const res = await axios.post('http://localhost:5000/api/profileUser', FormData,config)
   
   
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        
        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created','success'));
        if(!edit){
            history.push('/dashboardCondidate');
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

//Add Experience 
export const addExperience = (FormData,history) => async dispatch =>{
    try {
        const config ={
            Headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('http://localhost:5000/api/profileUser/experience', FormData,config)
   
        console.log(res.data);
   
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        }) 

         dispatch(setAlert('Experience Added','success'));
        history.push('/dashboardCondidate');
        


    } catch (err) {
       
      console.log(err)
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

//Add Education
export const addEducation = (FormData,history) => async dispatch =>{
    try {
        const config ={
            Headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('http://localhost:5000/api/profileUser/education', FormData,config)
        
   
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        
        dispatch(setAlert('Education Added','success'));
        history.push('/dashboardCondidate');
        


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

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/profileUser/experience/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/profileUser/education/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Delete account & profile
  export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete('http://localhost:5000/api/profileUser');
  
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