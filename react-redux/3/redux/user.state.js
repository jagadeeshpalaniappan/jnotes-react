
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
const initialStateForUsers = {
  users: []
};

export const userReducer = (state = initialStateForUsers, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};