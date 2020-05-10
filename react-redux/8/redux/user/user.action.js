import axios from "axios";
import { apiGetUsers } from "./user.getUsers.api.action";

export const getUsers = () => {
  /* getUsers: can call any source (just keep it abstract)
      -getUsers (from API) 
      -getUsers (from IndexDB) 
      -getUsers (from Local Memory) 
  */

  return apiGetUsers();
};
