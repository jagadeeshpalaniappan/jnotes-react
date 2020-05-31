import {
  API_GET_POSTS_START,
  API_GET_POSTS_SUCCESS,
  API_GET_POSTS_FAILURE
} from "../post.actionTypes";

import { getPosts } from "../../../service/post.service";

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
export const apiGetPostsAction = config => async dispatch => {
  try {
    dispatch(apiGetPostsStartAction(config));
    const response = await getPosts();
    dispatch(apiGetPostsSuccessAction(config, response.data));  // posts = response.data
  } catch (e) {
    dispatch(apiGetPostsFailureAction(config, e.message));
  }
};
