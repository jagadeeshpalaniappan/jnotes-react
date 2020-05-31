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
  StatusBar,
} from "../../common/components";

import { PostFormContainer } from "../../common/container/PostFormContainer";

import {
  setPostSearchKeywordAction,
  setModalPostAction,
  getPostsAction,
  createPostAction,
  updatePostAction,
  deletePostAction,
} from "../redux/post/post.action";

// import { STATUS_TYPES } from "../../common/constants";

function PostList({ status, posts, openModal }) {
  // const isLoading = () => status && status.type === STATUS_TYPES.LOADING;
  return (
    <>
      <StatusBar status={status} />
      {posts && posts.length > 0 && (
        <List>
          {posts.map((post) => (
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
  status,
  posts,
  modalPost,
  searchKeyword,
  setModalPost,
  searchPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
}) {
  console.log("PostsContainer: posts,searchKeyword:", { posts, searchKeyword });

  useEffect(() => {
    // onInit:
    getPosts();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false); // state: modal is opened or not
  const [editMode, setEditMode] = useState(false); // state: editMode or not

  const openModal = (post) => {
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
  const handleEdit = (post) => {
    console.log("handleEdit:", post);
    setEditMode(true);
  };
  const handleDelete = (post) => {
    console.log("handleDelete:", post);
    deletePost(post);
  };

  const handleSearch = (e, keyword) => {
    console.log("SearchPost: keyword:", keyword);
    searchPost(keyword);

    // const searchKey = keyword && keyword.toLowerCase();
    // const searchResults = posts.filter(post => {
    //   return Object.values(post).some(item =>
    //     item.toLowerCase().startsWith(searchKey)
    //   );
    // });

    // console.log("SearchPost: searchResults:", searchResults);
    // setVisiblePosts(searchResults);
  };

  return (
    <div className="col-sm">
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> PostContainer: </h3>
        <AppButton color="primary" onClick={handleAdd}>
          Add Post
        </AppButton>
      </div>

      <SearchInput onSearch={handleSearch} className="my-3" />

      <PostList status={status} posts={posts} openModal={openModal} />

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

const getFilteredPosts = (posts, keyword) => {
  console.log("getFilteredPosts:", { posts, keyword });

  if (keyword && keyword.length > 0 && posts && posts.length > 0) {
    const searchKey = keyword && keyword.toLowerCase();
    const searchResults = posts.filter((post) => {
      return Object.values(post).some(
        (item) =>
          item &&
          typeof item === "string" &&
          item.toLowerCase().startsWith(searchKey)
      );
    });
    console.log("getFilteredPosts: searchResults:", searchResults);
    return searchResults;
  }

  console.log("getFilteredPosts: nokeyword or posts:", { posts, keyword });
  return posts;
};

const mapStateToProps = (state) => {
  return {
    status: state.postState.posts.status,
    // posts: state.postState.posts.data,
    posts: getFilteredPosts(
      state.postState.posts.data,
      state.postState.searchKeyword
    ),
    modalPost: state.postState.modalPost,
    searchKeyword: state.postState.searchKeyword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setModalPost: (post) => dispatch(setModalPostAction(post)),
    searchPost: (post) => dispatch(setPostSearchKeywordAction(post)),
    getPosts: () => dispatch(getPostsAction()),
    createPost: (post) => dispatch(createPostAction(post)),
    updatePost: (post) => dispatch(updatePostAction(post)),
    deletePost: (post) => dispatch(deletePostAction(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
