import {
  API_GET_POSTS_START,
  API_GET_POSTS_SUCCESS,
  API_GET_POSTS_FAILURE,
  API_CREATE_POST_START,
  API_CREATE_POST_SUCCESS,
  API_CREATE_POST_FAILURE,
  API_UPDATE_POST_START,
  API_UPDATE_POST_SUCCESS,
  API_UPDATE_POST_FAILURE,
  API_DELETE_POST_START,
  API_DELETE_POST_SUCCESS,
  API_DELETE_POST_FAILURE,
  SET_MODAL_POST
} from "./post.actionTypes";

import { STATUS_TYPES } from "../../types";

// REDUCER:
const initialPostState = {
  posts: {
    data: [],
    status: {
      type: null,
      msg: ""
    }
  },
  modalPost: {
    data: {},
    status: {
      type: null,
      msg: ""
    }
  }
};

export const postReducer = (postState = initialPostState, action) => {
  switch (action.type) {
    case SET_MODAL_POST:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          data: action.payload,
          status: {
            type: null,
            msg: ""
          }
        }
      };
    case API_GET_POSTS_START:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          status: {
            type: STATUS_TYPES.LOADING,
            msg:
              action.payload.config && action.payload.config.reload
                ? "Reloading Posts.."
                : "Loading Posts..."
          }
        }
      };
    case API_GET_POSTS_SUCCESS:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          data: action.payload.posts,
          status: {
            type: STATUS_TYPES.SUCCESS
          }
        }
      };
    case API_GET_POSTS_FAILURE:
      return {
        ...postState,
        posts: {
          ...postState.posts,
          status: {
            type: STATUS_TYPES.FAILURE,
            msg:
              action.payload.config && action.payload.config.reload
                ? "Problem while reloading posts."
                : "Problem while getting posts",
            more: action.payload.error
          }
        }
      };
    case API_CREATE_POST_START:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          status: {
            type: STATUS_TYPES.LOADING,
            msg: "Creating Post..."
          }
        }
      };
    case API_CREATE_POST_SUCCESS:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          data: action.payload,
          status: {
            type: STATUS_TYPES.SUCCESS,
            msg: "Post Created Successfully"
          }
        }
      };
    case API_CREATE_POST_FAILURE:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          data: null,
          status: {
            type: STATUS_TYPES.FAILURE,
            msg: "Post Creation Failed",
            more: action.payload
          }
        }
      };
    case API_UPDATE_POST_START:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          status: {
            type: STATUS_TYPES.LOADING,
            msg: "Updating Post..."
          }
        }
      };
    case API_UPDATE_POST_SUCCESS:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          data: action.payload,
          status: {
            type: STATUS_TYPES.SUCCESS,
            msg: "Post Updated Successfully"
          }
        }
      };
    case API_UPDATE_POST_FAILURE:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          status: {
            type: STATUS_TYPES.FAILURE,
            msg: "Post Updation Failed",
            more: action.payload
          }
        }
      };
    case API_DELETE_POST_START:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          status: {
            type: STATUS_TYPES.LOADING,
            msg: "Deleting Post..."
          }
        }
      };
    case API_DELETE_POST_SUCCESS:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          data: action.payload,
          status: {
            type: STATUS_TYPES.SUCCESS,
            msg: "Post Deleted Successfully"
          }
        }
      };
    case API_DELETE_POST_FAILURE:
      return {
        ...postState,
        modalPost: {
          ...postState.modalPost,
          status: {
            type: STATUS_TYPES.FAILURE,
            msg: "Post Deletion Failed",
            more: action.payload
          }
        }
      };
    default:
      return postState;
  }
};
