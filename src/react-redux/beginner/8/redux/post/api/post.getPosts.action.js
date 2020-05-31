import axios from "axios";
import {
  API_GET_POSTS_START,
  API_GET_POSTS_SUCCESS,
  API_GET_POSTS_FAILURE
} from "../post.actionTypes";

// ACTION-CREATORS:
export const apiGetPostsStartAction = config => {
  return {
    type: API_GET_POSTS_START,
    payload: { config }
  };
};

export const apiGetPostsSuccessAction = (config, posts) => {
  return {
    type: API_GET_POSTS_SUCCESS,
    payload: { config, posts }
  };
};

export const apiGetPostsFailureAction = (config, error) => {
  return {
    type: API_GET_POSTS_FAILURE,
    payload: { config, error }
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetPosts = config => {
  return dispatch => {
    dispatch(apiGetPostsStartAction(config));
    const url = `https://jsonplaceholder.typicode.com/posts`;
    axios
      .get(url)
      .then(response => {
        // response.data is the posts
        const posts = response.data;
        dispatch(apiGetPostsSuccessAction(config, posts));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(apiGetPostsFailureAction(config, error.message));
      });
  };
};
