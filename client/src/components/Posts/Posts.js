import React, { Fragment, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link  } from 'react-router-dom';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';
import Search from '../profile-form/Search';

var tab=[];
const Posts = ({ getPosts,post: { posts,posttag, loading } }) => {
  useEffect(() => {
     getPosts();
    }, [getPosts]);
  const [tagData, settagData] = useState({
      posttag:[]
   });  
  if(posttag.length==0){
   tab=posts;
  }else{
    tab=posttag;
  }
  return (
    
    <Fragment>
      <Link className="btn btn-light my-1" to="/dashboardCompany">
          Go Back
        </Link>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
       <Search />
      
      {posttag.length == 0 ? (
        <Fragment>
        <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
        </div>
        </Fragment>
      ) : (
        <Fragment>
        <div className="posts">
         {posttag.map((post) => (

          <PostItem key={post._id} post={post} />
        ))}
        </div>
        </Fragment>
      )}
    </Fragment>
  )
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts})(Posts);
