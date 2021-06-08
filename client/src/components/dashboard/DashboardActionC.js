import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActionC = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profileC' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/create-post' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Create Post
      </Link>
    </div>
  );
};

export default DashboardActionC;