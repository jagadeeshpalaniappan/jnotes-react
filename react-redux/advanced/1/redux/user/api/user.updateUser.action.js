import axios from "axios";
import {
  API_UPDATE_USER_START,
  API_UPDATE_USER_SUCCESS,
  API_UPDATE_USER_FAILURE
} from "../user.actionTypes";

import { apiGetUsersAction } from "./user.getUsers.action";
import { updateUser } from "../../../service/user.service";

// ACTION-CREATORS:
export const apiUpdateUserStartAction = () => {
  return {
    type: API_UPDATE_USER_START
  };
};

export const apiUpdateUserSuccessAction = users => {
  return {
    type: API_UPDATE_USER_SUCCESS,
    payload: users
  };
};

export const apiUpdateUserFailureAction = error => {
  return {
    type: API_UPDATE_USER_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const apiUpdateUser = user => async dispatch => {
  try {
    dispatch(apiUpdateUserStartAction());
    const response = await updateUser(user);
    dispatch(apiUpdateUserSuccessAction(response.data)); // user = response.data
    dispatch(apiGetUsersAction({ reload: true }));
  } catch (e) {
    dispatch(apiUpdateUserFailureAction(error.message));
  }
};
