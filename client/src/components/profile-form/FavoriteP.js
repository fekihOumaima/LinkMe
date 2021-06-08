import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from '../Posts/PostItem';
import { getPosts } from '../../actions/post';

const Postsf = ({  post: { postf, loading } }) => {
  
  return (
    
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-heart " aria-hidden="true"/> Your Favorite Posts
      </p>
      
      <div className="posts">
        {postf.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Postsf.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps)(Postsf);
