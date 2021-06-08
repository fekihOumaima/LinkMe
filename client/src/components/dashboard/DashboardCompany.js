import React , {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import DashboardActionC from './DashboardActionC'
import Spinner from"../../components/layout/Spinner";
import { getCurrentProfile  , deleteAccount} from '../../actions/profileCompany';

const DashbordCompany = ({ getCurrentProfile , deleteAccount, authCompany:{company},profileCompany:{profileCompany,loading}}) => {
    
    useEffect(()=> {
        getCurrentProfile();
    },[getCurrentProfile]);
    

    
    return loading && profileCompany === null ?  (<Spinner/>) : 
    (<Fragment>
        <h1 className="large text-primary">Profile</h1>
        <p className="lead">
           <i className="fas fa-user"></i> Welcome {company && company.name } 
        </p>
        
        { profileCompany !== null ? (
            <Fragment> 
                <DashboardActionC /> 
                <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button> </div>
            </Fragment>)
            : 
            (
            <Fragment>
              <p>You have not yet setup a profile , please add some info</p>
              <Link to='/create-profileC' className="btn btn-primary my-1">
              Create Profile
              </Link>
              
            </Fragment>)
        }
        </Fragment>
    );
}

DashbordCompany.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   authCompany: PropTypes.func.isRequired,
   profileCompany: PropTypes.object.isRequired,
   deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    authCompany: state.authCompany,
    profileCompany: state.profileCompany
})

export default connect(mapStateToProps,{ getCurrentProfile,deleteAccount}) (DashbordCompany);
