import { v4 as uuidv4 } from "uuid";
import axios from "axios";

//--------------------------------- Action -----------------------------------

// ACTION-TYPES:

const API_GET_POSTS_START = "API_GET_POSTS_START";
const API_GET_POSTS_SUCCESS = "API_GET_POSTS_SUCCESS";
const API_GET_POSTS_FAILURE = "API_GET_POSTS_FAILURE";

// ACTION-CREATORS:
export const apiGetPostsStartAction = () => {
  return {
    type: API_GET_POSTS_START
  };
};

export const apiGetPostsSuccessAction = posts => {
  return {
    type: API_GET_POSTS_SUCCESS,
    payload: posts
  };
};

export const apiGetPostsFailureAction = error => {
  return {
    type: API_GET_POSTS_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetPosts = () => {
  return dispatch => {
    dispatch(apiGetPostsStartAction());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        // response.data is the posts
        const posts = response.data;
        dispatch(apiGetPostsSuccessAction(posts));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(apiGetPostsFailureAction(error.message));
      });
  };
};

export const getPosts = () => {
  /* getPosts: can call any source (just keep it abstract)
      -getPosts (from API) 
      -getPosts (from IndexDB) 
      -getPosts (from Local Memory) 
  */

  return apiGetPosts();
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
    case API_GET_POSTS_START:
      return {
        ...postState,
        loading: true
      };
    case API_GET_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: ""
      };
    case API_GET_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload
      };
    default:
      return postState;
  }
};
