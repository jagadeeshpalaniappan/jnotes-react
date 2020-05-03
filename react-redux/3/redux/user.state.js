
import { v4 as uuidv4 } from "uuid";

//--------------------------------- Action -----------------------------------

// ACTION-TYPES:
const ADD_USER = "ADD_USER";

// ACTION-CREATORS:
export const addUser = user => {
  return { type: ADD_USER, payload: { id: uuidv4(), ...user } };
};


//--------------------------------- Reducer -----------------------------------

// REDUCER:
const initialUserState = {
  users: []
};

export const userReducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...userState, users: [...userState.users, action.payload] };
    default:
      return userState;
  }
};