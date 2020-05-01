
import { v4 as uuidv4 } from "uuid";

//--------------------------------- Action -----------------------------------

// ############### User: ###############

// ACTION-TYPES:
const ADD_USER = "ADD_USER";

// ACTION-CREATORS:
export const addUser = user => {
  return { type: ADD_USER, payload: { id: uuidv4(), ...user } };
};



// ############### Post: ###############

// ACTION-TYPES:
const ADD_POST = "ADD_POST";

// ACTION-CREATORS:
const addPost = post => {
  return { type: ADD_POST, payload: { id: uuidv4(), ...post } };
};


//--------------------------------- Reducer -----------------------------------

// ############### User: ###############


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


// ############### Post: ###############

// REDUCER:
const initialStateForPosts = {
  posts: []
};

export const postReducer = (state = initialStateForPosts, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};