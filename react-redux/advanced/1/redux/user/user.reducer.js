import {
  API_GET_USERS_START,
  API_GET_USERS_SUCCESS,
  API_GET_USERS_FAILURE,
  API_CREATE_USER_START,
  API_CREATE_USER_SUCCESS,
  API_CREATE_USER_FAILURE,
  API_UPDATE_USER_START,
  API_UPDATE_USER_SUCCESS,
  API_UPDATE_USER_FAILURE,
  API_DELETE_USER_START,
  API_DELETE_USER_SUCCESS,
  API_DELETE_USER_FAILURE,
  SET_MODAL_USER,
  SET_USER_SEARCH_KEYWORD
} from "./user.actionTypes";

import { STATUS_TYPES } from "../../../common/constants";

// REDUCER:
const initialUserState = {
  users: {
    data: [],
    status: {
      type: null,
      msg: ""
    }
  },
  modalUser: {
    data: {},
    status: {
      type: null,
      msg: ""
    }
  }
};

export const userReducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case SET_MODAL_USER:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          data: action.payload,
          status: {
            type: null,
            msg: ""
          }
        }
      };
    case SET_USER_SEARCH_KEYWORD:
      return {
        ...userState,
        searchKeyword: action.payload
      };
    case API_GET_USERS_START:
      return {
        ...userState,
        users: {
          ...userState.users,
          status: {
            type: STATUS_TYPES.LOADING,
            msg:
              action.payload.config && action.payload.config.reload
                ? "Reloading Users.."
                : "Loading Users..."
          }
        }
      };
    case API_GET_USERS_SUCCESS:
      return {
        ...userState,
        users: {
          ...userState.users,
          data: action.payload.users,
          status: {
            type: STATUS_TYPES.SUCCESS
          }
        }
      };
    case API_GET_USERS_FAILURE:
      return {
        ...userState,
        users: {
          ...userState.users,
          status: {
            type: STATUS_TYPES.FAILURE,
            msg:
              action.payload.config && action.payload.config.reload
                ? "Problem while reloading users."
                : "Problem while getting users",
            more: action.payload.error
          }
        }
      };
    case API_CREATE_USER_START:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          status: {
            type: STATUS_TYPES.LOADING,
            msg: "Creating User..."
          }
        }
      };
    case API_CREATE_USER_SUCCESS:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          data: action.payload,
          status: {
            type: STATUS_TYPES.SUCCESS,
            msg: "User Created Successfully"
          }
        }
      };
    case API_CREATE_USER_FAILURE:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          data: null,
          status: {
            type: STATUS_TYPES.FAILURE,
            msg: "User Creation Failed",
            more: action.payload
          }
        }
      };
    case API_UPDATE_USER_START:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          status: {
            type: STATUS_TYPES.LOADING,
            msg: "Updating User..."
          }
        }
      };
    case API_UPDATE_USER_SUCCESS:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          data: action.payload,
          status: {
            type: STATUS_TYPES.SUCCESS,
            msg: "User Updated Successfully"
          }
        }
      };
    case API_UPDATE_USER_FAILURE:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          status: {
            type: STATUS_TYPES.FAILURE,
            msg: "User Updation Failed",
            more: action.payload
          }
        }
      };
    case API_DELETE_USER_START:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          status: {
            type: STATUS_TYPES.LOADING,
            msg: "Deleting User..."
          }
        }
      };
    case API_DELETE_USER_SUCCESS:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          data: action.payload,
          status: {
            type: STATUS_TYPES.SUCCESS,
            msg: "User Deleted Successfully"
          }
        }
      };
    case API_DELETE_USER_FAILURE:
      return {
        ...userState,
        modalUser: {
          ...userState.modalUser,
          status: {
            type: STATUS_TYPES.FAILURE,
            msg: "User Deletion Failed",
            more: action.payload
          }
        }
      };
    default:
      return userState;
  }
};
