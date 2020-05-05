import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "redux-undo";

import {
  AddItemForm,
  List,
  ListItem,
  SearchInput,
  AppCard,
  AppButton,
  AppModal
} from "../../common/components";

import { UserFormContainer, ConfirmDeleteModal } from "../../common/container";

import {
  addUserAction,
  editUserAction,
  deleteUserAction
} from "../redux/user.state";

const UserContainer = ({ users, addUser, editUser, deleteUser }) => {
  // visibleUsers:
  const [visibleUsers, setVisibleUsers] = useState(null);
  useEffect(() => {
    console.log("users - changed", users);
    setVisibleUsers(users);
  }, [users, setVisibleUsers]);

  // isModalOpen:
  const [isModalOpen, setModal] = useState(false);
  const openModal = user => {
    setSelectedUser(user);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setSelectedUser(null);
  };

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = (e, user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  // selectedUser:
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSave = (e, user) => {
    console.log("AddUser:", user);
    closeModal();
    if (user && user.id) {
      editUser(user);
    } else {
      addUser(user);
    }
  };

  const handleEdit = (e, user) => {
    console.log("handleEdit:", user);
    openModal(user);
  };

  const handleDelete = (e, user) => {
    console.log("DeleteUser:", selectedUser);
    deleteUser(selectedUser);
    closeDeleteModal();
  };

  const handleSearch = (e, keyword) => {
    console.log("SearchUser: keyword:", keyword);
    const searchKey = keyword && keyword.toLowerCase();
    const searchResults = users.filter(user => {
      return Object.values(user).some(item =>
        item.toLowerCase().startsWith(searchKey)
      );
    });

    console.log("SearchUser: searchResults:", searchResults);
    setVisibleUsers(searchResults);
  };

  return (
    <div>
      <div className="d-flex mt-3">
      
        <div className="d-flex mt-3">
          <AppButton color="primary" onClick={() => openModal()}>
            Add User
          </AppButton>
        </div>

        <h3 className="flex-grow-1 m-0"> UserContainer: </h3>
        <AppButton color="primary" onClick={() => openModal()}>
          Add User
        </AppButton>
      </div>
      <SearchInput onSearch={handleSearch} className="my-3" />
      {visibleUsers && (
        <List>
          {visibleUsers.map(user => (
            <ListItem
              key={user.id}
              item={user}
              onEdit={handleEdit}
              onDelete={openDeleteModal}
            />
          ))}
        </List>
      )}
      {!(users && users.length > 0) && "No users found"}

      <ConfirmDeleteModal
        item={selectedUser}
        isOpen={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
      />

      <AppModal isOpen={isModalOpen} toggle={closeModal}>
        <AppCard>
          <UserFormContainer
            user={selectedUser}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </AppCard>
      </AppModal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.userState.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUserAction(user)),
    editUser: user => dispatch(editUserAction(user)),
    deleteUser: user => dispatch(deleteUserAction(user)),
    undoUserState: ActionCreators.undo,
    redoUserState: ActionCreators.redo
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
