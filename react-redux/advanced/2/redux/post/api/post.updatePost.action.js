import axios from "axios";
import {
  API_UPDATE_POST_START,
  API_UPDATE_POST_SUCCESS,
  API_UPDATE_POST_FAILURE
} from "../post.actionTypes";

import { apiGetPosts } from "./post.getPosts.action";

// ACTION-CREATORS:
export const apiUpdatePostStartAction = () => {
  return {
    type: API_UPDATE_POST_START
  };
};

export const apiUpdatePostSuccessAction = posts => {
  return {
    type: API_UPDATE_POST_SUCCESS,
    payload: posts
  };
};

export const apiUpdatePostFailureAction = error => {
  return {
    type: API_UPDATE_POST_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const apiUpdatePost = post => {
  return dispatch => {
    console.log("apiUpdatePostStartAction:", post);

    dispatch(apiUpdatePostStartAction());

    const reqBody = {
      id: post.id,
      name: post.name,
      email: post.email,
      age: post.age
    };

    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, reqBody)
      .then(response => {
        // SUCCESS:
        console.log("apiUpdatePostSuccessAction:", response);
        const post = response.data;
        dispatch(apiUpdatePostSuccessAction(post));
        dispatch(apiGetPosts({ reload: true }));
      })
      .catch(error => {
        // FAILURE:
        console.log("apiUpdatePostFailureAction:", error);
        dispatch(apiUpdatePostFailureAction(error.message));
      });
  };
};
