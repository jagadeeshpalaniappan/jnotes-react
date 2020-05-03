
import { v4 as uuidv4 } from "uuid";

//--------------------------------- User -----------------------------------

// ############### Action: ###############

// ACTION-TYPES:
const ADD_USER = "ADD_USER";

// ACTION-CREATORS:
export const addUser = user => {
  return { type: ADD_USER, payload: { id: uuidv4(), ...user } };
};

// ############### Reducer: ###############

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


//--------------------------------- Post -----------------------------------



// ############### Action: ###############

// ACTION-TYPES:
const ADD_POST = "ADD_POST";

// ACTION-CREATORS:
export const addPost = post => {
  return { type: ADD_POST, payload: { id: uuidv4(), ...post } };
};


// ############### Reducer: ###############

// REDUCER:
const initialPostState = {
  posts: []
};

export const postReducer = (postState = initialPostState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...postState, posts: [...postState.posts, action.payload] };
    default:
      return postState;
  }
};