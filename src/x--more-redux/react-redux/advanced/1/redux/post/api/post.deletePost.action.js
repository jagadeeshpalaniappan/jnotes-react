import axios from "axios";
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
    type: API_DELETE_POST_SUCCESS,
    payload: post
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
    const response = await deletePost(post);
    dispatch(apiDeletePostSuccessAction(response.data)); // post = response.data
    dispatch(apiGetPostsAction({ reload: true }));
  } catch (e) {
    dispatch(apiDeletePostFailureAction(e.message));
  }
};
