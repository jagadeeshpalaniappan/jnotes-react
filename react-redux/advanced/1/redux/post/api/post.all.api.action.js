import { apiGetPostsAction } from "./post.getPosts.action";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost
} from "../../../service/post.service";

export const apiStartAction = ({ type, ...args }) => {
  return { type: `API_${type}_START`, ...args };
};

export const apiSuccessAction = ({ type, ...args }) => {
  return { type: `API_${type}_SUCCESS`, ...args };
};

export const apiFailureAction = ({ type, ...args }) => {
  return { type: `API_${type}_FAILURE`, ...args };
};

// ASYCN-ACTION-CREATORS:
const GET_POSTS = "GET_POSTS";
export const apiGetPostsAction = (config) => async dispatch => {
  try {
    dispatch(apiStartAction({ type: GET_POSTS, payload: { config } }));
    const response = await getPosts();
    const payload = { config, posts: response.data };
    dispatch(apiSuccessAction({ type: GET_POSTS, payload }));
  } catch (e) {
    const payload = { config, error: e.message };
    dispatch(apiFailureAction({ type: GET_POSTS, payload }));
  }
};

const CREATE_POST = "CREATE_POST";
export const apiCreatePostAction = post => async dispatch => {
  try {
    dispatch(apiStartAction({ type: CREATE_POST }));
    const response = await createPost(post);
    dispatch(apiSuccessAction({ type: CREATE_POST, payload: response.data })); // post = response.data
    dispatch(apiGetPostsAction({ reload: true }));
  } catch (e) {
    dispatch(apiFailureAction({ type: CREATE_POST, payload: e.message }));
  }
};

const UPDATE_POST = "UPDATE_POST";
export const apiUpdatePostAction = post => async dispatch => {
  try {
    dispatch(apiStartAction({ type: UPDATE_POST }));
    const response = await updatePost(post);
    dispatch(apiSuccessAction({ type: UPDATE_POST, payload: response.data })); // post = response.data
    dispatch(apiGetPostsAction({ reload: true }));
  } catch (e) {
    dispatch(apiFailureAction({ type: UPDATE_POST, payload: e.message }));
  }
};

const DELETE_POST = "DELETE_POST";
export const apiDeletePostAction = post => async dispatch => {
  try {
    dispatch(apiStartAction({ type: DELETE_POST }));
    const response = await deletePost(post);
    dispatch(apiSuccessAction({ type: DELETE_POST, payload: response.data })); // post = response.data
    dispatch(apiGetPostsAction({ reload: true }));
  } catch (e) {
    dispatch(apiFailureAction({ type: DELETE_POST, payload: e.message }));
  }
};
