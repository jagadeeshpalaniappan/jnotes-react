import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  AddItemForm,
  List,
  ListItem,
  SearchInput,
  AppCard,
  AppButton,
  AppModal,
  Loading,
  Error
} from "../../common/components";

import { fetchPosts } from "../redux/post.state";

function PostsContainer({ loading, error, posts, fetchPosts }) {
  useEffect(() => {
    // onInit:
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> PostContainer: </h3>
      </div>
      {loading ? (
        <Loading>Loading Posts...</Loading>
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <div>
          {posts && (
            <List>
              {posts.map(post => (
                <ListItem key={post.id} item={post} />
              ))}
            </List>
          )}
          {!(posts && posts.length > 0) && "No posts found"}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.postState.loading,
    error: state.postState.error,
    posts: state.postState.posts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsContainer);
