import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { v4 as uuidv4 } from "uuid";

// Example: Blog App (BlogPosts, Users)

// ################################ User [CRUD] ##################################
//---------------------------------User: Action-----------------------------------

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
const deleteUser = userId => {
  return { type: DELETE_USER, payload: userId };
};

const deleteUserAndDependentPosts = userId => {
  return dispatch => {
    // 1. should delete the user by id
    dispatch(deleteUser(userId));
    // 2. should delete the post by userId
    dispatch(deletePostByUserId(userId));
  };
};

//---------------------------------User: Reducer-----------------------------------

const initialStateForUsers = {
  users: []
};

const userReducer = (state = initialStateForUsers, action) => {
  console.log("# userReducer:: action:", action);

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

// ############################### Blog Post [CRUD] #################################
//---------------------------------Post: Action-----------------------------------

// ACTION-TYPES:
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const DELETE_POST_BY_USERID = "DELETE_POST_BY_USERID";

// ACTION-CREATORS:
const addPost = post => {
  return { type: ADD_POST, payload: { id: uuidv4(), ...post } };
};
const updatePost = post => {
  return { type: UPDATE_POST, payload: post };
};
const deletePost = postId => {
  return { type: DELETE_POST, payload: postId };
};

const deletePostByUserId = userId => {
  return { type: DELETE_POST_BY_USERID, payload: userId };
};

//---------------------------------Post: Reducer-----------------------------------

const initialStateForPosts = {
  posts: []
};

const postReducer = (state = initialStateForPosts, action) => {
  console.log("# postReducer:: action:", action);

  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case DELETE_POST_BY_USERID:
      return {
        ...state,
        posts: state.posts.filter(post => post.userId !== action.payload)
      };
    default:
      return state;
  }
};

//---------------------------------ROOT: Reducer-----------------------------------

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer
});

//---------------------------------Store-----------------------------------

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log("#### Initial State: ", store.getState());
const unsubscribeFn = store.subscribe(() =>
  console.log("#### Updated State: ", store.getState())
);

// ############## User [CRUD]

// ADD_USER;
store.dispatch(addUser({ name: "Jagadeesh" }));
store.dispatch(addUser({ name: "Sundar" }));

// ############## Blog Post [CRUD]

// ADD_POST: 'user0'
const user0 = store.getState().userState.users[0];
store.dispatch(addPost({ title: "Jag's Fist Blog", userId: user0.id }));
store.dispatch(addPost({ title: "Jag's Second Blog", userId: user0.id }));

// ADD_POST" 'user1'
const user1 = store.getState().userState.users[1];
store.dispatch(addPost({ title: "Sundar's Fist Blog", userId: user1.id }));

// DELETE_USER: (also should delete posts created by the same user)
const user0 = store.getState().userState.users[0];
store.dispatch(deleteUserAndDependentPosts(user0.id));

unsubscribeFn();
