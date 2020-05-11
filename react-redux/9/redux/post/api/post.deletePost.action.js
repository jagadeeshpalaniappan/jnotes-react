import axios from "axios";
import {
  API_DELETE_POST_START,
  API_DELETE_POST_SUCCESS,
  API_DELETE_POST_FAILURE
} from "../post.actionTypes";

import { apiGetPosts } from "./post.getPosts.action";

// ACTION-CREATORS:
export const apiDeletePostStartAction = () => {
  return {
    type: API_DELETE_POST_START
  };
};

export const apiDeletePostSuccessAction = posts => {
  return {
    type: API_DELETE_POST_SUCCESS,
    payload: posts
  };
};

export const apiDeletePostFailureAction = error => {
  return {
    type: API_DELETE_POST_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const apiDeletePost = post => {
  return dispatch => {
    console.log("apiDeletePostStartAction:", post);

    dispatch(apiDeletePostStartAction());

    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then(response => {
        // SUCCESS:
        console.log("apiDeletePostSuccessAction:", response);
        const post = response.data;
        dispatch(apiDeletePostSuccessAction(post));
        dispatch(apiGetPosts({ reload: true }));
      })
      .catch(error => {
        // FAILURE:
        console.log("apiDeletePostFailureAction:", error);
        dispatch(apiDeletePostFailureAction(error.message));
      });
  };
};
