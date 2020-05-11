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

import { UserFormContainer } from "../../common/container/UserFormContainer";

import {
  setModalUserAction,
  getUsers,
  createUserAction,
  updateUserAction,
  deleteUserAction
} from "../redux/user/user.action";

import { STATUS_TYPES } from "../types";

function UserList({ status, users, openModal }) {
  // const isLoading = () => status && status.type === STATUS_TYPES.LOADING;
  return (
    <>
      <StatusBar status={status} />
      {users && users.length > 0 && (
        <List>
          {users.map(user => (
            <ListItem
              key={user.id}
              item={user}
              tag="button"
              action
              onClick={() => openModal(user)}
            />
          ))}
        </List>
      )}
    </>
  );
}

function UsersContainer({
  users,
  modalUser,
  setModalUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}) {
  console.log("UsersContainer: users", users);

  useEffect(() => {
    // onInit:
    getUsers();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false); // state: modal is opened or not
  const [editMode, setEditMode] = useState(false); // state: editMode or not

  const openModal = user => {
    setModalUser(user || null);
    setModalOpen(true);
  };

  const handleCancel = () => {
    console.log("handleCancel:");
    setModalOpen(false);
    setEditMode(false);
    setModalUser(null);
  };

  const handleSave = (e, user) => {
    console.log("AddUser:", user);
    if (user && user.id) {
      updateUser(user);
      setEditMode(false);
    } else {
      createUser(user);
      setEditMode(false);
    }
  };
  const handleAdd = () => {
    console.log("handleAdd:");
    setEditMode(true);
    openModal(null);
  };
  const handleEdit = user => {
    console.log("handleEdit:", user);
    setEditMode(true);
  };
  const handleDelete = user => {
    console.log("handleDelete:", user);
    deleteUser(user);
  };

  return (
    <div className="col-sm">
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> UserContainer: </h3>
        <AppButton color="primary" onClick={handleAdd}>
          Add User
        </AppButton>
      </div>

      <UserList
        status={users.status}
        users={users.data}
        openModal={openModal}
      />

      <AppModal isOpen={isModalOpen} toggle={handleCancel}>
        <AppCard>
          <UserFormContainer
            status={modalUser.status}
            user={modalUser.data}
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
    users: state.userState.users,
    modalUser: state.userState.modalUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setModalUser: user => dispatch(setModalUserAction(user)),
    getUsers: () => dispatch(getUsers()),
    createUser: user => dispatch(createUserAction(user)),
    updateUser: user => dispatch(updateUserAction(user)),
    deleteUser: user => dispatch(deleteUserAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
