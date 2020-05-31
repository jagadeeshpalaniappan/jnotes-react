import { v4 as uuidv4 } from "uuid";
import axios from "axios";

//--------------------------------- Action -----------------------------------

// ACTION-TYPES:

const API_GET_USERS_START = "API_GET_USERS_START";
const API_GET_USERS_SUCCESS = "API_GET_USERS_SUCCESS";
const API_GET_USERS_FAILURE = "API_GET_USERS_FAILURE";

// ACTION-CREATORS:
export const apiGetUsersStartAction = () => {
  return {
    type: API_GET_USERS_START
  };
};

export const apiGetUsersSuccessAction = users => {
  return {
    type: API_GET_USERS_SUCCESS,
    payload: users
  };
};

export const apiGetUsersFailureAction = error => {
  return {
    type: API_GET_USERS_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:

export const apiGetUsersAction = () => {
  return dispatch => {
    dispatch(apiGetUsersStartAction());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        // response.data is the users
        const users = response.data;
        dispatch(apiGetUsersSuccessAction(users));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(apiGetUsersFailureAction(error.message));
      });
  };
};

export const getUsersAction = () => {
  /* getUsersAction: can call any source (just keep it abstract)
      -getUsersAction (from API) 
      -getUsersAction (from IndexDB) 
      -getUsersAction (from Local Memory) 
  */

  return apiGetUsersAction();
};


//--------------------------------- Reducer -----------------------------------

// REDUCER:
const initialUserState = {
  loading: false,
  error: null,
  users: []
};

export const userReducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case API_GET_USERS_START:
      return {
        ...userState,
        loading: true
      };
    case API_GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ""
      };
    case API_GET_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return userState;
  }
};
