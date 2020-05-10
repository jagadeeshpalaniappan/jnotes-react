import {API_GET_POSTS_START, API_GET_POSTS_SUCCESS, API_GET_POSTS_FAILURE} from './post.action'

// REDUCER:
const initialPostState = {
  loading: false,
  error: null,
  posts: []
};

export const postReducer = (postState = initialPostState, action) => {
  switch (action.type) {
    case API_GET_POSTS_START:
      return {
        ...postState,
        loading: true
      };
    case API_GET_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: ""
      };
    case API_GET_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload
      };
    default:
      return postState;
  }
};
