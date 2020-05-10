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

import { UserFormContainer } from "../../common/container";

import { getUsers, createUserAction } from "../redux/user/user.action";

function UsersContainer({ loading, error, users, getUsers, createUser, updateUser }) {
  useEffect(() => {
    // onInit:
    getUsers();
  }, []);

  // selectedUser:
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleSave = (e, user) => {
    console.log("AddUser:", user);
    closeModal();
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

      {(() => {
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
      })()}

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
}

const mapStateToProps = state => {
  return {
    loading: state.userState.loading,
    error: state.userState.error,
    users: state.userState.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    createUser: user => dispatch(createUserAction(user)),
    updateUser: user => dispatch(updateUserAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
