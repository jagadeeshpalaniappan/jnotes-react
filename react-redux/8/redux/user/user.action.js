import axios from "axios";
import { apiGetUsers } from "./user.getUsers.api.action";
import { apiCreateUser } from "./user.createUser.api.action";

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

export const updateeUserAction = user => {
  /* createUser: can call any source (just keep it abstract)
      -createUser (in API) 
      -createUser (in IndexDB) 
      -createUser (in Local Memory) 
  */
  return apiCreateUser(user);
};

export const setModalUserAction = user => {
  return { type: SET_MODAL_USER, payload: user };
};
