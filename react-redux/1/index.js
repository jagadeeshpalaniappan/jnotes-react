import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

import { userReducer, addUser } from "./redux";
import { AddItemForm, AppCard, AppHeader, AppContainer, List, ListItem } from "../components";

// Example: Blog App (BlogPosts, Users)

const UserContainer = ({ users, myAddUser }) => {
  const handleAdd = (e, user) => {
    console.log("AddUser:", user);
    myAddUser(user);
  };
  return (
    <div className="mt-3">
      <h2 className="my-3">UserContainer: </h2>

      <h5 className="my-3">Add User: </h5>
      <AppCard>
        <AddItemForm onAdd={handleAdd} />
      </AppCard>

      <h5 className="my-3">User List: </h5>
      <div className="mt-3">
        {users && (
          <List>
            {users.map(user => (
              <ListItem item={user} />
            ))}
          </List>
        )}
        {!(users && users.length > 0) && "No users found"}
      </div>
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
    myAddUser: user => dispatch(addUser(user))
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
      <AppHeader title="My App 1" />
      <AppContainer>
        <UserContainerRdxConnected />
      </AppContainer>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));
