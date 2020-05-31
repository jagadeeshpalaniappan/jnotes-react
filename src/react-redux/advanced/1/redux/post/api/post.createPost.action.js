import axios from "axios";
import {
  API_CREATE_POST_START,
  API_CREATE_POST_SUCCESS,
  API_CREATE_POST_FAILURE,
} from "../post.actionTypes";

import { apiGetPostsAction } from "./post.getPosts.action";
import { createPost } from "../../../service/post.service";

// ACTION-CREATORS:
export const apiCreatePostStartAction = () => {
  return {
    type: API_CREATE_POST_START,
  };
};

export const apiCreatePostSuccessAction = (posts) => {
  return {
    type: API_CREATE_POST_SUCCESS,
    payload: posts,
  };
};

export const apiCreatePostFailureAction = (error) => {
  return {
    type: API_CREATE_POST_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiCreatePostAction = (post) => async (dispatch) => {
  try {
    dispatch(apiCreatePostStartAction());
    const response = await createPost(post);
    dispatch(apiCreatePostSuccessAction(response.data)); // post = response.data
    dispatch(apiGetPostsAction({ reload: true }));
  } catch (e) {
    dispatch(apiCreatePostFailureAction(e.message));
  }
};
