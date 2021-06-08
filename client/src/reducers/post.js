import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  GET_POST,
  GET_POSTF,
  GET_POSTTAG,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_LIKES

} from '../actions/types';

const initialState = {
  posts: [],
  postf: [],
  posttag:[],
  post: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
      case GET_POSTF:
      return {
        ...state,
        postf: [payload, ...state.postf],
        loading: false
      };

    case GET_POSTTAG:
      return {
        ...state,
        posttag: payload,
        loading: false
      };  
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,

      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
   
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === payload.id ? { ...post, likes: payload.likes } : post
          ),
          loading: false
        };
    case ADD_COMMENT:
      return {
          ...state,
          post: { ...state.post, comments: payload },
          loading: false
        };
    case REMOVE_COMMENT:
      return {
          ...state,
          post: {
            ...state.post,
            comments: state.post.comments.filter(
              (comment) => comment._id !== payload
            )
          },
          loading: false
        };
    
    default:
      return state;
  }
}


