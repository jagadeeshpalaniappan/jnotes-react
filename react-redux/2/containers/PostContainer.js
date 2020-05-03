import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem } from "../../components";

import { addPost } from "../redux";

const PostContainer = ({ posts, myAddPost }) => {
  const handleAdd = userName => {
    console.log("AddUser:", userName);
    myAddPost(userName);
  };
  return (
    <div>
      <h3> Post Module: </h3>
      <AddItemForm onAdd={handleAdd} />
      {posts && (
        <List>
          {posts.map(post => (
            <ListItem item={post} />
          ))}
        </List>
      )}
      {!(posts && posts.length > 0) && "No posts found"}
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
    myAddPost: name => dispatch(addPost({ name: name }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
