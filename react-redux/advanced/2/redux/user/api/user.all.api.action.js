import { apiGetUsersAction } from "./user.getUsers.action";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../../../service/user.service";

export const apiStartAction = ({ type, ...args }) => {
  return { type: `API_${type}_START`, ...args };
};

export const apiSuccessAction = ({ type, ...args }) => {
  return { type: `API_${type}_SUCCESS`, ...args };
};

export const apiFailureAction = ({ type, ...args }) => {
  return { type: `API_${type}_FAILURE`, ...args };
};

// ASYCN-ACTION-CREATORS:
const GET_USERS = "GET_USERS";
export const apiGetUsersAction = (config) => async dispatch => {
  try {
    dispatch(apiStartAction({ type: GET_USERS, payload: { config } }));
    const response = await getUsers();
    const payload = { config, users: response.data };
    dispatch(apiSuccessAction({ type: GET_USERS, payload }));
  } catch (e) {
    const payload = { config, error: e.message };
    dispatch(apiFailureAction({ type: GET_USERS, payload }));
  }
};

const CREATE_USER = "CREATE_USER";
export const apiCreateUserAction = user => async dispatch => {
  try {
    dispatch(apiStartAction({ type: CREATE_USER }));
    const response = await createUser(user);
    dispatch(apiSuccessAction({ type: CREATE_USER, payload: response.data })); // user = response.data
    dispatch(apiGetUsersAction({ reload: true }));
  } catch (e) {
    dispatch(apiFailureAction({ type: CREATE_USER, payload: e.message }));
  }
};

const UPDATE_USER = "UPDATE_USER";
export const apiUpdateUserAction = user => async dispatch => {
  try {
    dispatch(apiStartAction({ type: UPDATE_USER }));
    const response = await updateUser(user);
    dispatch(apiSuccessAction({ type: UPDATE_USER, payload: response.data })); // user = response.data
    dispatch(apiGetUsersAction({ reload: true }));
  } catch (e) {
    dispatch(apiFailureAction({ type: UPDATE_USER, payload: e.message }));
  }
};

const DELETE_USER = "DELETE_USER";
export const apiDeleteUserAction = user => async dispatch => {
  try {
    dispatch(apiStartAction({ type: DELETE_USER }));
    const response = await deleteUser(user);
    dispatch(apiSuccessAction({ type: DELETE_USER, payload: response.data })); // user = response.data
    dispatch(apiGetUsersAction({ reload: true }));
  } catch (e) {
    dispatch(apiFailureAction({ type: DELETE_USER, payload: e.message }));
  }
};
