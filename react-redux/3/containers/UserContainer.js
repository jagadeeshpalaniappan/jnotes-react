import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem, AppCard } from "../../components";

import {
  addUserAction,
  editUserAction,
  deleteUserAction
} from "../redux/user.state";

const UserContainer = ({ users, addUser, editUser, deleteUser }) => {
  const handleAdd = (e, user) => {
    console.log("AddUser:", user);
    addUser(user);
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
              <ListItem
                item={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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
    addUser: user => dispatch(addUserAction(user)),
    editUser: user => dispatch(editUserAction(user)),
    deleteUser: user => dispatch(deleteUserAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
