import React, {Fragment} from 'react';
import { Link} from 'react-router-dom';
import { connect , useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authUser';
import { logoutCompany} from '../../actions/authCompany';




export const Navbar = ({loading, logoutCompany, logoutUser}) => {

  

  const authLinksCompany = (
    <ul>
        
        <li><Link to="/dashboardCompany">
        <i className="fas fa-user"></i>{' '}
        <span className='hide-sm'>Profile</span></Link></li>
        <li>
          <a  onClick={logoutCompany} href='#!'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className='hide-sm'>Logout</span>
          </a>
        </li>
    
      </ul>
  );
  const authLinksUser = (
    <ul>
        
        <li><Link to="/dashboardCondidate">
        <i className="fas fa-user"></i>{' '}
        <span className='hide-sm'>Profile</span></Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li>
          <a  onClick={logoutUser} href='#!'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className='hide-sm'>Logout</span>
          </a>
        </li>
    
      </ul>
  );
  
  const guestLinks = (
    <ul>
        <li><Link to="/Register">Sign Up</Link></li>
        <li><Link to="/Login">Login</Link></li>
    </ul>
  ) ; 

//<img id="logo" src="../../img/logo.gif" />
  const {isAuthenticated} = useSelector(state=> state.authUser);
  const {isAuthenticatedC} = useSelector(state=> state.authCompany);
  const auth ={isAuthenticatedC,isAuthenticated,loading};

    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> LinkMe</Link>
      </h1>

      {/* { !loading && (<Fragment>{ isAuthenticatedC ? authLinksCompany  : guestLinks}</Fragment>)} */}
      {  !loading && (<Fragment>{ (isAuthenticated || isAuthenticatedC) ? authLinksUser  : guestLinks}</Fragment>)} 
    </nav>
    )
}

Navbar.propTypes ={
  logoutUser: PropTypes.func.isRequired,
  logoutCompany: PropTypes.func.isRequired,
  
}


const mapStateToProps = state =>({
  auth: state.auth
});


export default connect(mapStateToProps, { logoutUser , logoutCompany}) (Navbar);
