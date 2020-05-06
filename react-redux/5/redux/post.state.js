
import { v4 as uuidv4 } from "uuid";

//--------------------------------- Action -----------------------------------

// ACTION-TYPES:
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";


export const UNDO_POST = "UNDO_POST";
export const REDO_POST = "REDO_POST";

// ACTION-CREATORS:
export const addPostAction = post => {
  return { type: ADD_POST, payload: { id: uuidv4(), ...post } };
};


export const editPostAction = post => {
  return { type: EDIT_POST, payload: { id: uuidv4(), ...post } };
};

export const deletePostAction = post => {
  return { type: DELETE_POST, payload: { id: uuidv4(), ...post } };
};


export const undoPostAction = () => {
  return { type: UNDO_POST };
};

export const redoPostAction = () => {
  return { type: REDO_POST };
};



//--------------------------------- Reducer -----------------------------------

// REDUCER:
const initialPostState = {
  posts: []
};

export const postReducer = (postState = initialPostState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...postState, posts: [...postState.posts, action.payload] };

       case EDIT_POST:
      return {
        ...postState,
        posts: postState.posts.map(post =>
          post.id === action.payload.id ? { ...post, ...action.payload } : post
        )
      };
    case DELETE_POST:
      return {
        ...postState,
        posts: postState.posts.filter(post => post.id !== action.payload.id)
      };
    default:
      return postState;
  }
};