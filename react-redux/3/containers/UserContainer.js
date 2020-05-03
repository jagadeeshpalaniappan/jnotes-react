import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem } from "../../components";

import {
  addUserAction,
  editUserAction,
  deleteUserAction
} from "../redux/user.state";

const UserContainer = ({ users, addUser, editUser, deleteUser }) => {
  const handleAdd = name => {
    console.log("AddUser:", name);
    addUser({ name });
  };

  const handleEdit = (e, user) => {
    console.log("EditUser:", user);
    editUser(user);
  };

  const handleDelete = (e, user) => {
    console.log("DeleteUser:", user);
    deleteUser(user);
  };

  return (
    <div>
      <h3> UserContainer: </h3>
      <AddItemForm onAdd={handleAdd} />
      {users && (
        <List>
          {users.map(user => (
            <ListItem item={user} onEdit={handleEdit} onDelete={handleDelete} />
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
    addUser: user => dispatch(addUserAction(user)),
    editUser: user => dispatch(editUserAction(user)),
    deleteUser: user => dispatch(deleteUserAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
