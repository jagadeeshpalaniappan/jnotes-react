import axios from "axios";

// Minimalistic Approach :: (I personally dont like this approach)
// import { apiGetPostsAction, apiCreatePostAction, apiUpdatePostAction, apiDeletePostAction } from "./api/post.all.api.action";

// Recommended Approach (I personally like this approach)
import { apiGetPostsAction } from "./api/post.getPosts.action";
import { apiCreatePostAction } from "./api/post.createPost.action";
import { apiUpdatePostAction } from "./api/post.updatePost.action";
import { apiDeletePostAction } from "./api/post.deletePost.action";

import { SET_MODAL_POST, SET_POST_SEARCH_KEYWORD } from "./post.actionTypes";

// LOCAL-ACTIONS:

export const setModalPostAction = post => {
  return { type: SET_MODAL_POST, payload: post };
};

export const setPostSearchKeywordAction = keyword => {
  return { type: SET_POST_SEARCH_KEYWORD, payload: keyword };
};


// API-ACTIONS:

export const getPostsAction = () => {
  return apiGetPostsAction();
};

export const createPostAction = post => {
  return apiCreatePostAction(post);
};

export const updatePostAction = post => {
  return apiUpdatePostAction(post);
};

export const deletePostAction = post => {
  return apiDeletePostAction(post);
};
