import { createStore, combineReducers } from "redux";
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

//---------------------------------User: Reducer-----------------------------------

const initialStateForUsers = {
  users: []
};

const userReducer = (state = initialStateForUsers, action) => {
  console.log("# userReducer:: action:", action)

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

//---------------------------------Post: Reducer-----------------------------------

const initialStateForPosts = {
  posts: []
};

const postReducer = (state = initialStateForPosts, action) => {
  console.log("# postReducer:: action:", action)

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
    default:
      return state;
  }
};



//---------------------------------ROOT: Reducer-----------------------------------

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer,
})


//---------------------------------Store-----------------------------------

const store = createStore(rootReducer);
console.log("#### Initial State: ", store.getState());
const unsubscribeFn = store.subscribe(() =>
  console.log("#### Updated State: ", store.getState())
);


// ############## User [CRUD]

// ADD_USER;
store.dispatch(addUser({ name: "Jagadeesh" }));
store.dispatch(addUser({ name: "Sundar" }));

// UPDATE_USER:
const user1 = store.getState().userState.users[0];
store.dispatch(updateUser({ ...user1, name: "Jagadeesh Palaniappan" }));

// DELETE_USER:
store.dispatch(deleteUser(user1.id));


// ############## Blog Post [CRUD]

// ADD_POST;
store.dispatch(addPost({ title: "My Fist Blog" }));
store.dispatch(addPost({ title: "My Second Blog" }));

// UPDATE_POST:
const post1 = store.getState().postState.posts[0];
store.dispatch(updatePost({ ...post1, title: "My Fist Blog --updated" }));

// DELETE_POST:
store.dispatch(deletePost(post1.id));

unsubscribeFn();
