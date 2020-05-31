import {
  API_DELETE_POST_START,
  API_DELETE_POST_SUCCESS,
  API_DELETE_POST_FAILURE
} from "../post.actionTypes";

import { apiGetPostsAction } from "./post.getPosts.action";
import { deletePost } from "../../../service/post.service";

// ACTION-CREATORS:
export const apiDeletePostStartAction = () => {
  return {
    type: API_DELETE_POST_START
  };
};

export const apiDeletePostSuccessAction = post => {
  return {
    type: API_DELETE_POST_SUCCESS
  };
};

export const apiDeletePostFailureAction = error => {
  return {
    type: API_DELETE_POST_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const apiDeletePostAction = post => async dispatch => {
  try {
    dispatch(apiDeletePostStartAction());
    const data = await deletePost(post);
    if (data) {
      // SUCCESS
      dispatch(apiDeletePostSuccessAction(data));
      dispatch(apiGetPostsAction({ reload: true }));
    } else {
      // FAILURE
      throw { message: "Failed to Delete" };
    }
  } catch (e) {
    // FAILURE
    dispatch(apiDeletePostFailureAction(e.message));
  }
};
