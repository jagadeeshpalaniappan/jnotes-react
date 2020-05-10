import axios from "axios";
import { apiGetUsers } from "./user.getUsers.api.action";
import { apiCreateUser } from "./user.createUser.api.action";
import { apiUpdateUser } from "./user.updateUser.api.action";
import { apiDeleteUser } from "./user.deleteUser.api.action";

import { SET_MODAL_USER } from "./user.actionTypes";

export const getUsers = () => {
  /* getUsers: can call any source (just keep it abstract)
      -getUsers (from API) 
      -getUsers (from IndexDB) 
      -getUsers (from Local Memory) 
  */

  return apiGetUsers();
};

export const createUserAction = user => {
  /* createUser: can call any source (just keep it abstract)
      -createUser (in API) 
      -createUser (in IndexDB) 
      -createUser (in Local Memory) 
  */
  return apiCreateUser(user);
};

export const updateUserAction = user => {
  /* updateUser: can call any source (just keep it abstract)
      -updateUser (in API) 
      -updateUser (in IndexDB) 
      -updateUser (in Local Memory) 
  */
  return apiUpdateUser(user);
};

export const deleteUserAction = user => {
  /* deleteUser: can call any source (just keep it abstract)
      -deleteUser (in API) 
      -deleteUser (in IndexDB) 
      -deleteUser (in Local Memory) 
  */
  return apiDeleteUser(user);
};

export const setModalUserAction = user => {
  return { type: SET_MODAL_USER, payload: user };
};
