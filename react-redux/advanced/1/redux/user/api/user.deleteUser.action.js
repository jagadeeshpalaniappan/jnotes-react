import axios from "axios";
import {
  API_DELETE_USER_START,
  API_DELETE_USER_SUCCESS,
  API_DELETE_USER_FAILURE
} from "../user.actionTypes";

import { apiGetUsersAction } from "./user.getUsers.action";
import { deleteUser } from "../../../service/user.service";

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
export const apiDeleteUser = user => async dispatch => {
  try {
    dispatch(apiDeleteUserStartAction());
    const response = await deleteUser(user);
    dispatch(apiDeleteUserSuccessAction(response.data)); // user = response.data
    dispatch(apiGetUsersAction({ reload: true }));
  } catch (e) {
    dispatch(apiDeleteUserFailureAction(e.message));
  }
};
