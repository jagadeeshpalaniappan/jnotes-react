import {
  API_GET_USER_START,
  API_GET_USER_SUCCESS,
  API_GET_USER_FAILURE,
} from "../user.actionTypes";

import { getUser } from "../../service/user.service";

// ACTION-CREATORS:
export const apiGetUserStartAction = () => {
  return {
    type: API_GET_USER_START,
  };
};

export const apiGetUserSuccessAction = (user) => {
  return {
    type: API_GET_USER_SUCCESS,
    payload: user,
  };
};

export const apiGetUserFailureAction = (error) => {
  return {
    type: API_GET_USER_FAILURE,
    payload: error,
  };
};

// ASYCN-ACTION-CREATORS:
export const apiGetUserAction = (user) => async (dispatch) => {
  try {
    dispatch(apiGetUserStartAction());
    const data = await getUser(user);
    dispatch(apiGetUserSuccessAction(data));
  } catch (e) {
    dispatch(apiGetUserFailureAction(e.message));
  }
};
