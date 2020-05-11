import axios from "axios";
import { apiGetPosts } from "./api/post.getPosts.action";
import { apiCreatePost } from "./api/post.createPost.action";
import { apiUpdatePost } from "./api/post.updatePost.action";
import { apiDeletePost } from "./api/post.deletePost.action";

import { SET_MODAL_POST } from "./post.actionTypes";

export const getPosts = () => {
  /* getPosts: can call any source (just keep it abstract)
      -getPosts (from API) 
      -getPosts (from IndexDB) 
      -getPosts (from Local Memory) 
  */

  return apiGetPosts();
};

export const createPostAction = post => {
  /* createPost: can call any source (just keep it abstract)
      -createPost (in API) 
      -createPost (in IndexDB) 
      -createPost (in Local Memory) 
  */
  return apiCreatePost(post);
};

export const updatePostAction = post => {
  /* updatePost: can call any source (just keep it abstract)
      -updatePost (in API) 
      -updatePost (in IndexDB) 
      -updatePost (in Local Memory) 
  */
  return apiUpdatePost(post);
};

export const deletePostAction = post => {
  /* deletePost: can call any source (just keep it abstract)
      -deletePost (in API) 
      -deletePost (in IndexDB) 
      -deletePost (in Local Memory) 
  */
  return apiDeletePost(post);
};

export const setModalPostAction = post => {
  return { type: SET_MODAL_POST, payload: post };
};
