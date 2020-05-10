import {
  API_GET_USERS_START,
  API_GET_USERS_SUCCESS,
  API_GET_USERS_FAILURE,
  API_CREATE_USER_START,
  API_CREATE_USER_SUCCESS,
  API_CREATE_USER_FAILURE
} from "./user.actionTypes";

// REDUCER:
const initialUserState = {
  users: { loading: false, error: null, data: [] },
  updatedUser: { loading: false, error: null, data: {} }
};

export const userReducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case API_GET_USERS_START:
      return {
        ...userState,
        users: { ...userState.users, loading: true }
      };
    case API_GET_USERS_SUCCESS:
      return {
        ...userState,
        users: {
          ...userState.users,
          loading: false,
          error: "",
          data: action.payload
        }
      };
    case API_GET_USERS_FAILURE:
      return {
        ...userState,
        users: {
          ...userState.users,
          loading: false,
          error: action.payload,
          data: []
        }
      };
    case API_CREATE_USER_START:
      return {
        ...userState,
        updatedUser: { ...userState.updatedUser, loading: true, error: null }
      };
    case API_CREATE_USER_SUCCESS:
      return {
        ...userState,
        updatedUser: {
          ...userState.updatedUser,
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case API_CREATE_USER_FAILURE:
      return {
        ...userState,
        updatedUser: {
          ...userState.updatedUser,
          loading: false,
          error: action.payload,
          data: null
        }
      };
    default:
      return userState;
  }
};
