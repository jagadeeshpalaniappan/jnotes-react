import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

import { userReducer, addUser } from "./redux";
import { AddItemForm } from "../components";

// Example: Blog App (BlogPosts, Users)

const UserContainer = ({ users, myAddUser }) => {
  const handleAdd = userName => {
    console.log("AddUser:", userName);
    myAddUser(userName);
  };
  return (
    <div>
      <h3> User Module: </h3>
      <AddItemForm onAdd={handleAdd} />
      <ul>
        {users &&
          users.map(user => (
            <li key={user.id}>
              {user.name} [{user.id}]
            </li>
          ))}
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

const rootReducer = combineReducers({
  userState: userReducer
});
const store = createStore(rootReducer);

//--------------------------------- React -----------------------------------

const App = () => {
  return (
    <Provider store={store}>
      <div>
        My App1
        <UserContainerRdxConnected />
      </div>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));
