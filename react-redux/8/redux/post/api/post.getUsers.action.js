import axios from "axios";
import {
  API_GET_USERS_START,
  API_GET_USERS_SUCCESS,
  API_GET_USERS_FAILURE
} from "../user.actionTypes";

// ACTION-CREATORS:
export const apiGetUsersStartAction = config => {
  return {
    type: API_GET_USERS_START,
    payload: { config }
  };
};

export const apiGetUsersSuccessAction = (config, users) => {
  return {
    type: API_GET_USERS_SUCCESS,
    payload: { config, users }
  };
};

export const apiGetUsersFailureAction = (config, error) => {
  return {
    type: API_GET_USERS_FAILURE,
    payload: { config, error }
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetUsers = config => {
  return dispatch => {
    dispatch(apiGetUsersStartAction(config));
    const url = `https://jsonplaceholder.typicode.com/users`;
    axios
      .get(url)
      .then(response => {
        // response.data is the users
        const users = response.data;
        dispatch(apiGetUsersSuccessAction(config, users));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(apiGetUsersFailureAction(config, error.message));
      });
  };
};
