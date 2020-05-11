import axios from "axios";
import {
  API_CREATE_POST_START,
  API_CREATE_POST_SUCCESS,
  API_CREATE_POST_FAILURE
} from "../post.actionTypes";


import { apiGetPosts } from "./post.getPosts.action";


// ACTION-CREATORS:
export const apiCreatePostStartAction = () => {
  return {
    type: API_CREATE_POST_START
  };
};

export const apiCreatePostSuccessAction = posts => {
  return {
    type: API_CREATE_POST_SUCCESS,
    payload: posts
  };
};

export const apiCreatePostFailureAction = error => {
  return {
    type: API_CREATE_POST_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const apiCreatePost = post => {
  return dispatch => {
    console.log("apiCreatePostStartAction1:", post);

    dispatch(apiCreatePostStartAction());

    const reqBody = {
      name: post.name,
      email: post.email,
      age: post.age
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", reqBody)
      .then(response => {
        // SUCCESS:
        console.log("apiCreatePostSuccessAction:", response);
        const post = response.data;
        dispatch(apiCreatePostSuccessAction(post));
        dispatch(apiGetPosts({ reload: true }));
      })
      .catch(error => {
        // FAILURE:
        console.log("apiCreatePostFailureAction:", error);
        dispatch(apiCreatePostFailureAction(error.message));
      });
  };
};
