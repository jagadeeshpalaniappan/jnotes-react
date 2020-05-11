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
  Error,
  StatusBar
} from "../../common/components";

import { PostFormContainer } from "../../common/container/PostFormContainer";

import {
  setModalPostAction,
  getPosts,
  createPostAction,
  updatePostAction,
  deletePostAction
} from "../redux/post/post.action";

import { STATUS_TYPES } from "../types";

function PostList({ status, posts, openModal }) {
  // const isLoading = () => status && status.type === STATUS_TYPES.LOADING;
  return (
    <>
      <StatusBar status={status} />
      {posts && posts.length > 0 && (
        <List>
          {posts.map(post => (
            <ListItem
              key={post.id}
              item={post}
              tag="button"
              action
              onClick={() => openModal(post)}
            />
          ))}
        </List>
      )}
    </>
  );
}

function PostsContainer({
  posts,
  modalPost,
  setModalPost,
  getPosts,
  createPost,
  updatePost,
  deletePost
}) {
  console.log("PostsContainer: posts:", posts);

  useEffect(() => {
    // onInit:
    getPosts();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false); // state: modal is opened or not
  const [editMode, setEditMode] = useState(false); // state: editMode or not

  const openModal = post => {
    setModalPost(post || null);
    setModalOpen(true);
  };

  const handleCancel = () => {
    console.log("handleCancel:");
    setModalOpen(false);
    setEditMode(false);
    setModalPost(null);
  };

  const handleSave = (e, post) => {
    console.log("AddPost:", post);
    if (post && post.id) {
      updatePost(post);
      setEditMode(false);
    } else {
      createPost(post);
      setEditMode(false);
    }
  };
  const handleAdd = () => {
    console.log("handleAdd:");
    setEditMode(true);
    openModal(null);
  };
  const handleEdit = post => {
    console.log("handleEdit:", post);
    setEditMode(true);
  };
  const handleDelete = post => {
    console.log("handleDelete:", post);
    deletePost(post);
  };

  return (
    <div className="col-sm">
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> PostContainer: </h3>
        <AppButton color="primary" onClick={handleAdd}>
          Add Post
        </AppButton>
      </div>

      <PostList
        status={posts.status}
        posts={posts.data}
        openModal={openModal}
      />

      <AppModal isOpen={isModalOpen} toggle={handleCancel}>
        <AppCard>
          <PostFormContainer
            status={modalPost.status}
            post={modalPost.data}
            editMode={editMode}
            onSave={handleSave}
            onCancel={handleCancel}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </AppCard>
      </AppModal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.postState.posts,
    modalPost: state.postState.modalPost
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setModalPost: post => dispatch(setModalPostAction(post)),
    getPosts: () => dispatch(getPosts()),
    createPost: post => dispatch(createPostAction(post)),
    updatePost: post => dispatch(updatePostAction(post)),
    deletePost: post => dispatch(deletePostAction(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsContainer);
