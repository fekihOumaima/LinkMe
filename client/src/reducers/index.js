import { combineReducers} from 'redux';
import alert from './alert';
import authUser from './authUser';
import authCompany from './authCompany';
import profileCompany from './profileCompany';
import profileUser from './profileUser';
import post from './post';



export default combineReducers({
  alert,
  authUser, 
  authCompany,
  profileCompany,
  profileUser,
  post


});