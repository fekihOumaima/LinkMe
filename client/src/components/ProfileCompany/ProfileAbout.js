import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profileCId: {
    bio,
    company: { name }
  }
}) => (
  <div className='profile-about bg-light '>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
  </div>
);

ProfileAbout.propTypes = {
  profileCId: PropTypes.object.isRequired
};



export default ProfileAbout;
