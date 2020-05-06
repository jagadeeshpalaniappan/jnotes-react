import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  AddItemForm,
  List,
  ListItem,
  SearchInput,
  AppCard,
  AppButton,
  AppModal
} from "../../common/components";

import { PostFormContainer } from "../../common/container";

import {
  addPostAction,
  editPostAction,
  deletePostAction
} from "../redux/post.state";

const PostContainer = ({ posts, addPost, editPost, deletePost }) => {
  // visiblePosts:
  const [visiblePosts, setVisiblePosts] = useState(null);
  useEffect(() => {
    console.log("posts - changed", posts);
    setVisiblePosts(posts);
  }, [posts, setVisiblePosts]);

  // visiblePosts:
  const [isModalOpen, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setSelectedPost(null);
  };

  // selectedPost:
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSave = (e, post) => {
    console.log("AddPost:", post);
    closeModal();
    if (post && post.id) {
      editPost(post);
    } else {
      addPost(post);
    }
  };

  const handleEdit = (e, post) => {
    console.log("handleEdit:", post);
    setSelectedPost(post);
    openModal();
  };

  const handleDelete = (e, post) => {
    console.log("DeletePost:", post);
    deletePost(post);
  };

  const handleSearch = (e, keyword) => {
    console.log("SearchPost: keyword:", keyword);
    const searchKey = keyword && keyword.toLowerCase();
    const searchResults = posts.filter(post => {
      return Object.values(post).some(item =>
        item.toLowerCase().startsWith(searchKey)
      );
    });

    console.log("SearchPost: searchResults:", searchResults);
    setVisiblePosts(searchResults);
  };

  return (
    <div>
      <div className="d-flex mt-3">
        <h3 className="flex-grow-1 m-0"> PostContainer: </h3>
        <AppButton color="primary" onClick={openModal}>
          Add Post
        </AppButton>
      </div>

      <AppModal isOpen={isModalOpen} toggle={closeModal}>
        <AppCard>
          <PostFormContainer
            post={selectedPost}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </AppCard>
      </AppModal>

      <SearchInput onSearch={handleSearch} className="my-3" />
      {visiblePosts && (
        <List>
          {visiblePosts.map(post => (
            <ListItem
              key={post.id}
              item={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
