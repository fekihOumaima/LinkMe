import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profileUId: {
    cv,
    location,
    image,
    social,
    user: { name }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={`/uploads/${image}`} alt="" />
      <h1 className="large">{name}</h1>
      <p>{location ? <span>{location}</span> : null}</p>
      <p>{cv ? <span>{cv}</span> : null}</p>
      <div className="icons my-1">
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profileUId: PropTypes.object.isRequired
};

export default ProfileTop;
