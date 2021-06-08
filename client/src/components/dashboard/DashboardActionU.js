import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActionU = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profileU' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Add Education
      </Link>
      <Link to='/post-favoris' className='btn btn-light'>
        <i className="fas fa-heart text-primary" aria-hidden="true" /> Favorite Posts
      </Link>
     
    </div>
  );
};

export default DashboardActionU;