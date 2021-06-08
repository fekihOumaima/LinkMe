import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost ,getPostF} from '../../actions/post';
//import { getProfileById} from '../../actions/profileCompany';




const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  getPostF,
  post: { _id, text, name, image, tags,likes, comments, company, date },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profileCompany/${company}`}>
        <img className="round-img" src={`/uploads/${image}`}  alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">{tags}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>

        { showActions && 
        <Fragment>

          <button
            onClick={() => {addLike(_id); 
              getPostF(_id)}}
            type="button"
            className="btn btn-light">
            <i className="fas fa-thumbs-up" />
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light">
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to ={`/posts/${_id}`} className="btn btn-primary">
          Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
           </Link>
          {/* {!authCompany.loading && company === authCompany.company._id  (
            <button
            //   onClick={() => deletePost(_id)}
              type="button"
              className="btn btn-danger">
              <i className="fas fa-times" />
            </button>
          )} */}
        </Fragment>
      }
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  getPostF: PropTypes.func.isRequired,

  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  authComany: state.authCompany
});

export default connect(mapStateToProps, { addLike, removeLike,getPostF, /*deletePost*/ })(
  PostItem
);
