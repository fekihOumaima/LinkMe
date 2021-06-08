import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
// import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profileUser';

const ProfileUser = ({ getProfileById, profileUser: { profileUId },authCompany, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
console.log(profileUId);
  return (
    <Fragment>
      {profileUId === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn btn-light">
            Back To Posts
          </Link>
          <div className="profile-grid my-1">
            <ProfileTop profileUId={profileUId} />
            <ProfileAbout profileUId={profileUId} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profileUId.experience.length > 0 ? (
                <Fragment>
                  {profileUId.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profileUId.education.length > 0 ? (
                <Fragment>
                  {profileUId.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileUser.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profileUser: PropTypes.object.isRequired,
  authCompany: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  profileUser: state.profileUser,
  authCompany: state.authCompany,

});

export default connect(mapStateToProps, { getProfileById })(ProfileUser);
