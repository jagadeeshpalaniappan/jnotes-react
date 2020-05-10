import {
  API_GET_USERS_START,
  API_GET_USERS_SUCCESS,
  API_GET_USERS_FAILURE
} from "./user.actionTypes";

// REDUCER:
const initialUserState = {
  loading: false,
  error: null,
  users: []
};

export const userReducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case API_GET_USERS_START:
      return {
        ...userState,
        loading: true
      };
    case API_GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ""
      };
    case API_GET_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return userState;
  }
};
