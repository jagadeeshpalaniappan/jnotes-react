import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem, AppCard } from "../../components";

import { addPost } from "../redux";

const PostContainer = ({ posts, myAddPost }) => {
  const handleAdd = (e, post) => {
    console.log("AddUser:", post);
    myAddPost(post);
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
    myAddPost: post => dispatch(addPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
