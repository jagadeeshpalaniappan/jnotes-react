
import { v4 as uuidv4 } from "uuid";

//--------------------------------- Action -----------------------------------

// ACTION-TYPES:
const ADD_POST = "ADD_POST";

// ACTION-CREATORS:
export const addPost = post => {
  return { type: ADD_POST, payload: { id: uuidv4(), ...post } };
};


//--------------------------------- Reducer -----------------------------------

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