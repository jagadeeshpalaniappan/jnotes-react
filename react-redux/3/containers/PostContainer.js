import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem, AppCard } from "../../common/components";

import {
  addPostAction,
  editPostAction,
  deletePostAction
} from "../redux/post.state";

const PostContainer = ({ posts, addPost, editPost, deletePost }) => {
  const handleAdd = (e, post) => {
    console.log("AddPost:", post);
    addPost(post);
  };

  const handleEdit = (e, post) => {
    console.log("EditPost:", post);
    editPost(post);
  };

  const handleDelete = (e, post) => {
    console.log("DeletePost:", post);
    deletePost(post);
  };

  return (
    <div className="mt-5">
      <h2 className="my-3">PostContainer: </h2>

      <h5 className="my-3">Add Post: </h5>
      <AppCard>
        <AddItemForm onAdd={handleAdd} />
      </AppCard>

      <h5 className="my-3">Posts List: </h5>
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
    addPost: post => dispatch(addPostAction(post)),
    editPost: post => dispatch(editPostAction(post)),
    deletePost: post => dispatch(deletePostAction(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
