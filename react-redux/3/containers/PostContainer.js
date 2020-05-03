import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem } from "../../components";

import { addPost } from "../redux/post.state";

const PostContainer = ({ posts, myAddPost }) => {
  const handleAdd = userName => {
    console.log("AddUser:", userName);
    myAddPost(userName);
  };

  const handleEdit = (e, item) => {
    console.log("EditUser:", item);
    // myAddUser(userName);
  };

  const handleDelete = (e, item) => {
    console.log("DeleteUser:", item);
    // myAddUser(userName);
  };

  return (
    <div>
      <h3> PostContainer: </h3>
      <AddItemForm onAdd={handleAdd} />

      {posts && (
        <List>
          {posts.map(post => (
            <ListItem item={post} onEdit={handleEdit} onDelete={handleDelete} />
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
