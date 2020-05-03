import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem } from "../../components";

import { addUser } from "../redux";

const UserContainer = ({ users, myAddUser }) => {
  const handleAdd = userName => {
    console.log("AddUser:", userName);
    myAddUser(userName);
  };
  return (
    <div>
      <h3> User Module: </h3>
      <AddItemForm onAdd={handleAdd} />
      {users && (
        <List>
          {users.map(user => (
            <ListItem item={user} />
          ))}
        </List>
      )}
      {!(users && users.length > 0) && "No users found"}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
