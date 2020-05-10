import axios from "axios";
import {
  API_UPDATE_USER_START,
  API_UPDATE_USER_SUCCESS,
  API_UPDATE_USER_FAILURE
} from "./user.actionTypes";

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
export const apiUpdateUser = user => {
  return dispatch => {
    console.log("apiUpdateUserStartAction:", user);

    dispatch(apiUpdateUserStartAction());

    const reqBody = {
      name: user.name,
      email: user.email,
      age: user.age
    };

    axios
      .put("https://jsonplaceholder.typicode.com/users", reqBody)
      .then(response => {
        // SUCCESS:
        console.log("apiUpdateUserSuccessAction:", response);
        const user = response.data;
        dispatch(apiUpdateUserSuccessAction(user));
      })
      .catch(error => {
        // FAILURE:
        console.log("apiUpdateUserFailureAction:", error);
        dispatch(apiUpdateUserFailureAction(error.message));
      });
  };
};
