import axios from "axios";
import {
  API_DELETE_USER_START,
  API_DELETE_USER_SUCCESS,
  API_DELETE_USER_FAILURE
} from "./user.actionTypes";

// ACTION-CREATORS:
export const apiDeleteUserStartAction = () => {
  return {
    type: API_DELETE_USER_START
  };
};

export const apiDeleteUserSuccessAction = users => {
  return {
    type: API_DELETE_USER_SUCCESS,
    payload: users
  };
};

export const apiDeleteUserFailureAction = error => {
  return {
    type: API_DELETE_USER_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const apiDeleteUser = user => {
  return dispatch => {
    console.log("apiDeleteUserStartAction:", user);

    dispatch(apiDeleteUserStartAction());

    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      .then(response => {
        // SUCCESS:
        console.log("apiDeleteUserSuccessAction:", response);
        const user = response.data;
        dispatch(apiDeleteUserSuccessAction(user));
      })
      .catch(error => {
        // FAILURE:
        console.log("apiDeleteUserFailureAction:", error);
        dispatch(apiDeleteUserFailureAction(error.message));
      });
  };
};
