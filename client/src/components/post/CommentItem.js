import React ,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';
import { getProfileById } from '../../actions/profileUser';


const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date },
  authUser,
  profileUser: {profileUId},
  deleteComment,
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(user);
   }, [getProfileById]);
  return (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profileUser/${user}`}>
        {/* <img className="round-img" src={`/uploads/${profileUId.image}`} alt="" /> */}
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>
      {!authUser.loading && user === authUser.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
)};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  profileUser: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  profileUser: state.profileUser,
  profileUId: state.profileUser,

});

export default connect(mapStateToProps, { deleteComment,getProfileById })(CommentItem);
