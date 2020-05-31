import { createStore } from "redux";
import { v4 as uuidv4 } from "uuid";

//---------------------------------Action-----------------------------------

// ACTION:
// { type: 'ADD_USER', payload: { name: "Jagadeesh" } }
// { type: 'UPDATE_USER', payload: { id: 101, name: "Jagadeesh Palaniappan" } }
// { type: 'DELETE_USER', payload: { id: 101 } }

// NOTES:
// Action is a simple obj that has a 'type' property
// Since 'Action' is any javascript obj, developers can introduce a bug easily
// For e.g. 'ADD_USER' action is called from multiple places, but developer modified the obj in only one place, this can easily bring defects.
// This can avoided, if we use helper fn to create an 'ACTION' // that fn is called 'ACTION-CREATORS'

// ACTION-TYPES:
const ADD_USER = "ADD_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

// ACTION-CREATORS:
const addUser = user => {
  return { type: ADD_USER, payload: { id: uuidv4(), ...user } };
};
const updateUser = user => {
  return { type: UPDATE_USER, payload: user };
};
const deleteUser = userId => {
  return { type: DELETE_USER, payload: userId };
};

//---------------------------------Reducer-----------------------------------

const initialState = {
  users: []
};

const rootReducer = (state = initialState, action) => {
  console.log("# rootReducer:: action:", action)

  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        )
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    default:
      return state;
  }
};

//---------------------------------Store-----------------------------------

const store = createStore(rootReducer);
console.log("#### Initial State: ", store.getState());
const unsubscribeFn = store.subscribe(() =>
  console.log("#### Updated State: ", store.getState())
);

// ADD_USER;
store.dispatch(addUser({ name: "Jagadeesh" }));
store.dispatch(addUser({ name: "Sundar" }));

// UPDATE_USER:
const user1 = store.getState().users[0];
store.dispatch(updateUser({ ...user1, name: "Jagadeesh Palaniappan" }));

// DELETE_USER:
store.dispatch(deleteUser(user1.id));

unsubscribeFn();
