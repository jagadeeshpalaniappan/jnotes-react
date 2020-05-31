import {
  API_GET_USERS_START,
  API_GET_USERS_SUCCESS,
  API_GET_USERS_FAILURE,
} from "../user.actionTypes";

import { getUsers } from "../../service/user.service";

// ACTION-CREATORS:
export const apiGetUsersStartAction = (config) => {
  return {
    type: API_GET_USERS_START,
    payload: { config },
  };
};

export const apiGetUsersSuccessAction = (config, users) => {
  return {
    type: API_GET_USERS_SUCCESS,
    payload: { config, users },
  };
};

export const apiGetUsersFailureAction = (config, error) => {
  return {
    type: API_GET_USERS_FAILURE,
    payload: { config, error },
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetUsersAction = (config) => async (dispatch) => {
  try {
    dispatch(apiGetUsersStartAction(config));
    const response = await getUsers();
    dispatch(apiGetUsersSuccessAction(config, response));
  } catch (e) {
    dispatch(apiGetUsersFailureAction(config, e.message));
  }
};
