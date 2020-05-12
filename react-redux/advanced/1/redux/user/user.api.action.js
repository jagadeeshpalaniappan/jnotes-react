

import { apiGetUsersAction } from "./user.getUsers.action";
import { getUsers, createUser, updateUser, deleteUser } from "../../../service/user.service";

export const apiStartAction = () => {
  return {
    type: API_CREATE_USER_START
  };
};

export const apiSuccessAction = users => {
  return {
    type: API_CREATE_USER_SUCCESS,
    payload: users
  };
};

export const apiFailureAction = error => {
  return {
    type: API_CREATE_USER_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:

export const apiGetUsersAction = config => async dispatch => {
  try {
    dispatch(apiGetUsersStartAction(config));
    const response = await getUsers();
    dispatch(apiGetUsersSuccessAction(config, response.data));  // users = response.data
  } catch (e) {
    dispatch(apiGetUsersFailureAction(config, e.message));
  }
};


export const apiCreateUser = user => async dispatch => {
  try {
    dispatch(apiCreateUserStartAction());
    const response = await createUser(user);
    dispatch(apiCreateUserSuccessAction(response.data)); // user = response.data
    dispatch(apiGetUsersAction({ reload: true }));
  } catch (e) {
    dispatch(apiCreateUserFailureAction(error.message));
  }
};


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
