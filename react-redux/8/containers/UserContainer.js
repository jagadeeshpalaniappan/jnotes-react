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

import { getUsers, createUserAction } from "../redux/user/user.action";

function UsersContainer({
  users,
  createdUser,
  getUsers,
  createUser,
  // updateUser
}) {
  
  console.log("UserFormContainer:", users);

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
    if (user && user.id) {
      // updateUser(user);
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
        if (users.loading) {
          return <Loading>Loading Users...</Loading>;
        } else if (users.error) {
          return <Error>{users.error}</Error>;
        } else if (users.data && users.data.length > 0) {
          return (
            <List>
              {users.data.map(user => (
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
            userStatus={createdUser}
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
    createdUser: state.userState.createdUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    createUser: user => dispatch(createUserAction(user)),
    // updateUser: user => dispatch(updateUserAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
