import axios from "axios";
import {
  API_UPDATE_POST_START,
  API_UPDATE_POST_SUCCESS,
  API_UPDATE_POST_FAILURE,
} from "../post.actionTypes";

import { apiGetPostsAction } from "./post.getPosts.action";
import { updatePost } from "../../../service/post.service";

// ACTION-CREATORS:
export const apiUpdatePostStartAction = () => {
  return {
    type: API_UPDATE_POST_START,
  };
};

export const apiUpdatePostSuccessAction = (posts) => {
  return {
    type: API_UPDATE_POST_SUCCESS,
    payload: posts,
  };
};

export const apiUpdatePostFailureAction = (error) => {
  return {
    type: API_UPDATE_POST_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiUpdatePostAction = (post) => async (dispatch) => {
  try {
    dispatch(apiUpdatePostStartAction());
    const response = await updatePost(post);
    dispatch(apiUpdatePostSuccessAction(response.data)); // post = response.data
    dispatch(apiGetPostsAction({ reload: true }));
  } catch (e) {
    dispatch(apiUpdatePostFailureAction(e.message));
  }
};
