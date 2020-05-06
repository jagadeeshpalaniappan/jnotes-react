import { v4 as uuidv4 } from "uuid";
import axios from "axios";

//--------------------------------- Action -----------------------------------

// ACTION-TYPES:

const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

// ACTION-CREATORS:
export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST
  };
};

export const fetchPostsSuccess = posts => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  };
};

export const fetchPostsFailure = error => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        // response.data is the posts
        const posts = response.data;
        dispatch(fetchPostsSuccess(posts));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchPostsFailure(error.message));
      });
  };
};

//--------------------------------- Reducer -----------------------------------

// REDUCER:
const initialPostState = {
  loading: false,
  error: null,
  posts: []
};

export const postReducer = (postState = initialPostState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...postState,
        loading: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: ""
      };
    case FETCH_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload
      };
    default:
      return postState;
  }
};
