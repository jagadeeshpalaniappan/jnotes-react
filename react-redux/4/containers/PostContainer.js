import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem, AppCard } from "../../components";

import {
  addPostAction,
  editPostAction,
  deletePostAction
} from "../redux/post.state";

const PostContainer = ({ posts, addPost, editPost, deletePost }) => {
  const handleAdd = name => {
    console.log("AddPost:", name);
    addPost({ name });
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
    <div>
      <h3> PostContainer: </h3>

      <AppCard>
        <AddItemForm onAdd={handleAdd} />
      </AppCard>

      <AppCard>
        {posts && (
          <List>
            {posts.map(post => (
              <ListItem
                item={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </List>
        )}

        {!(posts && posts.length > 0) && "No posts found"}
      </AppCard>
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
