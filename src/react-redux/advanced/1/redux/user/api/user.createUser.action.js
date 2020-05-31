import axios from "axios";
import {
  API_CREATE_USER_START,
  API_CREATE_USER_SUCCESS,
  API_CREATE_USER_FAILURE,
} from "../user.actionTypes";

import { apiGetUsersAction } from "./user.getUsers.action";
import { createUser } from "../../../service/user.service";

// ACTION-CREATORS:
export const apiCreateUserStartAction = () => {
  return {
    type: API_CREATE_USER_START,
  };
};

export const apiCreateUserSuccessAction = (users) => {
  return {
    type: API_CREATE_USER_SUCCESS,
    payload: users,
  };
};

export const apiCreateUserFailureAction = (error) => {
  return {
    type: API_CREATE_USER_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiCreateUserAction = (user) => async (dispatch) => {
  try {
    console.log("apiCreateUserAction: INIT");
    dispatch(apiCreateUserStartAction());
    const response = await createUser(user);
    dispatch(apiCreateUserSuccessAction(response.data)); // user = response.data
    dispatch(apiGetUsersAction({ reload: true }));
  } catch (e) {
    console.log("apiCreateUserAction: ERR");
    dispatch(apiCreateUserFailureAction(e.message));
  }
};
