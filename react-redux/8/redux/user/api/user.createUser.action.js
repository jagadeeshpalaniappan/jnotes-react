import axios from "axios";
import {
  API_CREATE_USER_START,
  API_CREATE_USER_SUCCESS,
  API_CREATE_USER_FAILURE
} from "../user.actionTypes";

import { apiGetUsers } from "./user.getUsers.action";

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

    const reqBody = {
      name: user.name,
      email: user.email,
      age: user.age
    };

    axios
      .post("https://jsonplaceholder.typicode.com/users", reqBody)
      .then(response => {
        // SUCCESS:
        console.log("apiCreateUserSuccessAction:", response);
        const user = response.data;
        dispatch(apiCreateUserSuccessAction(user));
        dispatch(apiGetUsers({ reload: true }));
      })
      .catch(error => {
        // FAILURE:
        console.log("apiCreateUserFailureAction:", error);
        dispatch(apiCreateUserFailureAction(error.message));
      });
  };
};
