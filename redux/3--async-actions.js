import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

// Example: Blog App (BlogPosts, Users)

// ################################ User [CRUD] ##################################
//---------------------------------User: Action-----------------------------------

// ACTION-TYPES:

// FETCH_USERS
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// ACTION-CREATORS:
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        // response.data is the users
        const users = response.data.map(user => ({
          id: user.id,
          name: user.name
        }));
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

//---------------------------------User: Reducer-----------------------------------

const initialStateForUsers = {
  loading: false,
  users: null,
  error: null
};

const userReducer = (state = initialStateForUsers, action) => {
  console.log("# userReducer:: action:", action, state);
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      console.log("# FETCH_USERS_SUCCESS:", [...action.payload]);
      return {
        ...state,
        loading: false,
        users: [...action.payload],
        error: null
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

//---------------------------------ROOT: Reducer-----------------------------------

const rootReducer = combineReducers({
  userState: userReducer
});

//---------------------------------Store-----------------------------------

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log("#### Initial State: ", store.getState());
const unsubscribeFn = store.subscribe(() =>
  console.log("#### Updated State: ", store.getState())
);

// ############## User [CRUD]

// FETCH_USERS
store.dispatch(fetchUsers());

// store.dispatch(addUser({ name: "Sundar" }));

// // UPDATE_USER:
// const user1 = store.getState().userState.users[0];
// store.dispatch(updateUser({ ...user1, name: "Jagadeesh Palaniappan" }));

// // DELETE_USER:
// store.dispatch(deleteUser(user1.id));

// unsubscribeFn();
