import { push } from "connected-react-router";
import {
  API_CREATE_USER_START,
  API_CREATE_USER_SUCCESS,
  API_CREATE_USER_FAILURE,
} from "../user.actionTypes";

import { apiGetUsersAction } from "./user.getUsers.action";
import { createUser } from "../../service/user.service";

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
    dispatch(apiCreateUserStartAction());
    const data = await createUser(user);
    dispatch(apiCreateUserSuccessAction(data));
    dispatch(push(`/users/${data.id}`));
  } catch (e) {
    dispatch(apiCreateUserFailureAction(e.message));
  }
};
