import { v4 as uuidv4 } from "uuid";

//--------------------------------- Action -----------------------------------

// ACTION-TYPES:
const ADD_USER = "ADD_USER";
const EDIT_USER = "EDIT_USER";
const DELETE_USER = "DELETE_USER";

// ACTION-CREATORS:
export const addUserAction = user => {
  return { type: ADD_USER, payload: { id: uuidv4(), ...user } };
};

export const editUserAction = user => {
  return { type: EDIT_USER, payload: { id: uuidv4(), ...user } };
};

export const deleteUserAction = user => {
  return { type: DELETE_USER, payload: { id: uuidv4(), ...user } };
};

//--------------------------------- Reducer -----------------------------------

// REDUCER:
const initialUserState = {
  users: []
};

export const userReducer = (userState = initialUserState, action) => {
  console.log("userReducer: userState:", userState);
  switch (action.type) {
    case ADD_USER:
      return { ...userState, users: [...userState.users, action.payload] };
    case EDIT_USER:
      return {
        ...userState,
        users: userState.users.map(user =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        )
      };
    case DELETE_USER:
      return {
        ...userState,
        users: userState.users.filter(user => user.id !== action.payload.id)
      };
    default:
      return userState;
  }
};
