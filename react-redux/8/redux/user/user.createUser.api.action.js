import axios from "axios";
import {
  API_CREATE_USER_START,
  API_CREATE_USER_SUCCESS,
  API_CREATE_USER_FAILURE
} from "./user.actionTypes";

// ACTION-CREATORS:
export const apiCreateUserStartAction = () => {
  return {
    type: API_CREATE_USER_START
  };
};

export const apiCreateUserSuccessAction = users => {
  return {
    type: API_CREATE_USER_SUCCESS,
    payload: users
  };
};

export const apiCreateUserFailureAction = error => {
  return {
    type: API_CREATE_USER_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const apiCreateUser = user => {
  return dispatch => {
    console.log("apiCreateUserStartAction:", user);

    dispatch(apiCreateUserStartAction());
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        title: "foo",
        body: "bar",
        userId: 1
      })
      .then(response => {
        // SUCCESS:
        console.log("apiCreateUserSuccessAction:", response);
        const user = response.data;
        dispatch(apiCreateUserSuccessAction(user));
      })
      .catch(error => {
        // FAILURE:
        console.log("apiCreateUserFailureAction:", error);
        dispatch(apiCreateUserFailureAction(error.message));
      });
  };
};
