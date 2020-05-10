

import axios from "axios";

// ACTION-TYPES:
export const API_GET_USERS_START = "API_GET_USERS_START";
export const API_GET_USERS_SUCCESS = "API_GET_USERS_SUCCESS";
export const API_GET_USERS_FAILURE = "API_GET_USERS_FAILURE";

// ACTION-CREATORS:
export const apiGetUsersStartAction = () => {
  return {
    type: API_GET_USERS_START
  };
};

export const apiGetUsersSuccessAction = users => {
  return {
    type: API_GET_USERS_SUCCESS,
    payload: users
  };
};

export const apiGetUsersFailureAction = error => {
  return {
    type: API_GET_USERS_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:

export const apiGetUsers = () => {
  return dispatch => {
    dispatch(apiGetUsersStartAction());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        // response.data is the users
        const users = response.data;
        dispatch(apiGetUsersSuccessAction(users));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(apiGetUsersFailureAction(error.message));
      });
  };
};

export const getUsers = () => {
  /* getUsers: can call any source (just keep it abstract)
      -getUsers (from API) 
      -getUsers (from IndexDB) 
      -getUsers (from Local Memory) 
  */

  return apiGetUsers();
};
