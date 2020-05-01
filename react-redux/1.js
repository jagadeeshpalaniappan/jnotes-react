import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

import { AddItemForm } from "./components";

// Example: Blog App (BlogPosts, Users)

//---------------------------------/ Redux -----------------------------------

// ############### User: ###############

// ACTION-TYPES:
const ADD_USER = "ADD_USER";

// ACTION-CREATORS:
const addUser = user => {
  return { type: ADD_USER, payload: { id: uuidv4(), ...user } };
};

// REDUCER:
const initialStateForUsers = {
  users: []
};

const userReducer = (state = initialStateForUsers, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

// ############### Post: ###############

// ACTION-TYPES:
const ADD_POST = "ADD_POST";

// ACTION-CREATORS:
const addPost = post => {
  return { type: ADD_POST, payload: { id: uuidv4(), ...post } };
};

// REDUCER:
const initialStateForPosts = {
  posts: []
};

const postReducer = (state = initialStateForPosts, action) => {
  console.log("# postReducer:: action:", action);

  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer
});
const store = createStore(rootReducer);

//---------------------------------/ Redux -----------------------------------

//--------------------------------- React -----------------------------------

const UserContainer = ({ users, myAddUser }) => {
  const handleAdd = userName => {
    console.log("AddUser:", userName);
    myAddUser(userName);
  };
  return (
    <div>
      <h3> User: </h3>
      <AddItemForm onAdd={handleAdd} />
      <ul>
        {users && users.map(user => <li key={user.id}> {user.name} </li>)}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.userState.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    myAddUser: name => dispatch(addUser({ name: name }))
  };
};

const UserContainerRdxConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);

// --------------------------------

const App = () => {
  return (
    <Provider store={store}>
      <div>
        My App
        <UserContainerRdxConnected />
        <UserContainer />
      </div>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));

//--------------------------------- /React -----------------------------------
