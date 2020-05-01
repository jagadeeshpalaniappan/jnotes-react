import React from "react";
import { connect } from "react-redux";

import { AddItemForm } from "../components";

import { addPost } from "../redux";

const UserContainer = ({ users, myAddPost }) => {
  const handleAdd = userName => {
    console.log("AddUser:", userName);
    myAddPost(userName);
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
    myAddPost: name => dispatch(addPost({ name: name }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
