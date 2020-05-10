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

import { UserFormContainer } from "../../common/container/UserFormContainer";

import {
  getUsers,
  createUserAction,
  updateUserAction,
  setModalUserAction
} from "../redux/user/user.action";

function UserList({ loading, error, users }) {
  if (loading) {
    return <Loading>Loading Users...</Loading>;
  } else if (error) {
    return <Error>{error}</Error>;
  } else if (users && users.length > 0) {
    return (
      <List>
        {users.map(user => (
          <ListItem key={user.id} item={user} />
        ))}
      </List>
    );
  } else {
    return "No users found";
  }
}

function UsersContainer({
  users,
  modalUser,
  getUsers,
  createUser,
  updateUser,
  setModalUser
}) {
  console.log("UserFormContainer:", users);

  useEffect(() => {
    // onInit:
    getUsers();
  }, []);

  // isModalOpen:
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = user => {
    setModalUser(user || null);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalUser(null);
  };

  const handleSave = (e, user) => {
    console.log("AddUser:", user);
    if (user && user.id) {
      updateUser(user);
    } else {
      createUser(user);
    }
  };

  return (
    <div className="col-sm">
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> UserContainer: </h3>
        <AppButton color="primary" onClick={() => openModal()}>
          Add User
        </AppButton>
      </div>

      <UserList
        loading={users.loading}
        error={users.error}
        users={users.data}
      />

      <AppModal isOpen={isModalOpen} toggle={closeModal}>
        <AppCard>
          <UserFormContainer
            loading={modalUser.loading}
            error={modalUser.error}
            user={modalUser.data}
            onSave={handleSave}
            onCancel={closeModal}
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
    getUsers: () => dispatch(getUsers()),
    createUser: user => dispatch(createUserAction(user)),
    updateUser: user => dispatch(updateUserAction(user)),
    setModalUser: user => dispatch(setModalUserAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
