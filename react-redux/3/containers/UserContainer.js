import React from "react";
import { connect } from "react-redux";

import { AddItemForm } from "../../components";

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
      <ul>
        {users &&
          users.map(user => (
            <li key={user.id}>
              <span>{user.name} -- [{user.id}]</span>
              <button>Edit</button>
              <button>Delete</button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
