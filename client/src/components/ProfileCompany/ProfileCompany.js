import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from '../ProfileCompany/ProfileTop';
import ProfileAbout from '../ProfileCompany/ProfileAbout';

import { getProfileById } from '../../actions/profileCompany';

const ProfileCompany = ({ getProfileById,profileCompany:{profileCId},authUser, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  console.log(profileCId);
  return (
    <Fragment>
      {profileCId === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn btn-light">
            Back To Posts
          </Link>
          <div className="profile-grid my-1">
            <ProfileTop profileCId={profileCId} />
            <ProfileAbout profileCId={profileCId} />
            
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileCompany.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profileCompany: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileCompany: state.profileCompany,
  authUser: state.authUser
});

export default connect(mapStateToProps, { getProfileById })(ProfileCompany);
