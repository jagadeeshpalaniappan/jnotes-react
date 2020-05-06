import { v4 as uuidv4 } from "uuid";
import axios from "axios";

//--------------------------------- Action -----------------------------------

// ACTION-TYPES:

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// ACTION-CREATORS:
export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

// ASYCN-ACTION-CREATORS:
export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        // response.data is the users
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
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
    case FETCH_USERS_REQUEST:
      return {
        ...userState,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ""
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return userState;
  }
};
