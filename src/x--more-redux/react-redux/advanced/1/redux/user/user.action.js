import axios from "axios";

// Minimalistic Approach :: (I personally dont like this approach)
// import { apiGetUsersAction, apiCreateUserAction, apiUpdateUserAction, apiDeleteUserAction } from "./api/user.all.api.action";

// Recommended Approach (I personally like this approach)
import { apiGetUsersAction } from "./api/user.getUsers.action";
import { apiCreateUserAction } from "./api/user.createUser.action";
import { apiUpdateUserAction } from "./api/user.updateUser.action";
import { apiDeleteUserAction } from "./api/user.deleteUser.action";

import { SET_MODAL_USER, SET_USER_SEARCH_KEYWORD } from "./user.actionTypes";

// LOCAL-ACTIONS:

export const setModalUserAction = user => {
  return { type: SET_MODAL_USER, payload: user };
};

export const setUserSearchKeywordAction = keyword => {
  return { type: SET_USER_SEARCH_KEYWORD, payload: keyword };
};


// API-ACTIONS:

export const getUsersAction = () => {
  return apiGetUsersAction();
};

export const createUserAction = user => {
  return apiCreateUserAction(user);
};

export const updateUserAction = user => {
  return apiUpdateUserAction(user);
};

export const deleteUserAction = user => {
  return apiDeleteUserAction(user);
};
