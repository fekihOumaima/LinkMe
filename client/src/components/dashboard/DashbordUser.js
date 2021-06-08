import React ,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getCurrentProfile , deleteAccount} from '../../actions/profileUser';
import Spinner from"../../components/layout/Spinner";
import DashboardActionU from './DashboardActionU'
import Experience from './Experience'
import Education from './Education'

const DashbordUser = ({  getCurrentProfile,deleteAccount, authUser:{user},profileUser:{profileUser,loading}}) => {
    
    useEffect(()=> {
        getCurrentProfile();
    }, [getCurrentProfile]);
    
    return loading && profileUser === null ?  (<Spinner/>) : 
    (<Fragment>
        <h1 className="large text-primary">Profile</h1>
        <p className="lead">
           <i className="fas fa-user"></i> Welcome {user && user.name } 
        </p>
        
        { profileUser !== null ? (
            <Fragment> 
              <DashboardActionU /> 
              <Experience experience={profileUser.experience}/> 
              <Education education={profileUser.education}/> 
              <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
            </Fragment>)
            : 
            (
            <Fragment>
              <p>You have not yet setup a profile , please add some info</p>
              <Link to='/create-profileU' className="btn btn-primary my-1">
              Create Profile
              </Link>
            </Fragment>)
        }
        </Fragment>
    );
}

DashbordUser.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
    profileUser: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
 }
 
 const mapStateToProps = state => ({
     authUser: state.authUser,
     profileUser: state.profileUser
 })

export default connect(mapStateToProps,{ getCurrentProfile,deleteAccount}) (DashbordUser);
