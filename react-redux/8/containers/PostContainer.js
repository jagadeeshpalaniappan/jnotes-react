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


import { getPosts } from "../redux/post/post.action";

function PostsContainer({ loading, error, posts, getPosts }) {
  useEffect(() => {
    // onInit:
    getPosts();
  }, []);


  return (
    <div className="col-sm">
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> PostContainer: </h3>
      </div>

      {(() => {
        if (loading) {
          return <Loading>Loading Posts...</Loading>;
        } else if (error) {
          return <Error>{error}</Error>;
        } else if (posts && posts.length > 0) {
          return (
            <List>
              {posts.map(post => (
                <ListItem key={post.id} item={post} />
              ))}
            </List>
          );
        } else {
          return "No posts found";
        }
      })()}
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
    getPosts: () => dispatch(getPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsContainer);
