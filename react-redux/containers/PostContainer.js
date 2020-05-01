import React from "react";
import { connect } from "react-redux";

import { AddItemForm } from "../components";

import { addPost } from "../redux";

const PostContainer = ({ posts, myAddUser }) => {
  const handleAdd = userName => {
    console.log("AddUser:", userName);
    myAddUser(userName);
  };
  return (
    <div>
      <h3> Post Module: </h3>
      <AddItemForm onAdd={handleAdd} />
      <ul>
        {posts &&
          posts.map(user => (
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
    posts: state.postState.posts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    myPostUser: name => dispatch(addPost({ name: name }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
