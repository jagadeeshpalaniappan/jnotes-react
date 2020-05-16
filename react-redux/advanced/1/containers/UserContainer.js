import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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

// import { UserFormContainer } from "../../common/container/UserFormContainer";

import UserDetails from "./UserDetails";

import {
  setUserSearchKeywordAction,
  setModalUserAction,
  getUsersAction,
  createUserAction,
  updateUserAction,
  deleteUserAction
} from "../redux/user/user.action";

import { STATUS_TYPES, MODE } from "../../common/constants";

const GET_USERS = gql`
  {
    users {
      data {
        id
        name
        username
        email
        phone
        website
      }
    }
  }
`;

const getStatus = ({ loading, error }) => {
  if (loading) {
    return { type: STATUS_TYPES.LOADING, msg: "Loading Users..." };
  } else if (error) {
    return {
      type: STATUS_TYPES.FAILURE,
      msg: "Problem while getting users",
      more: error
    };
  } else {
    return { type: STATUS_TYPES.SUCCESS, msg: "" };
  }
};

function UserList({ openModal }) {
  // GRAPHQL
  const { loading, error, data } = useQuery(GET_USERS);
  console.log("UserList:", { loading, error, data });
  const users = (data && data.users.data) || [];
  const status = getStatus({ loading, error });

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
  // modalUser,
  searchKeyword,
  // setModalUser,
  searchUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}) {
  console.log("UsersContainer:");

  const [modalUser, setModalUser] = useState(null); // state: modal is opened or not
  const [isModalOpen, setModalOpen] = useState(false); // state: modal is opened or not
  const [mode, setMode] = useState(MODE.READ);

  const openModal = user => {
    console.log("openModal: user", user);
    setModalUser(user || null);
    setModalOpen(true);
  };

  const handleCancel = () => {
    console.log("handleCancel:");
    setModalOpen(false);
    setModalUser(null);
  };

  const handleAdd = () => {
    console.log("handleAdd:");
    setMode(MODE.CREATE);
    openModal(null);
  };

  const handleEdit = (user) => {
    console.log("handleAdd:");
    setMode(MODE.READ);
    openModal(user);
  };

  const handleSearch = (e, keyword) => {
    console.log("SearchUser: keyword:", keyword);
  };

  return (
    <div className="col-sm">
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> UserContainer: </h3>
        <AppButton color="primary" onClick={handleAdd}>
          Add User
        </AppButton>
      </div>

      <SearchInput onSearch={handleSearch} className="my-3" />

      <UserList openModal={handleEdit} />

      <AppModal isOpen={isModalOpen} toggle={handleCancel}>
        <AppCard>
          <UserDetails mode={mode} userId={modalUser && modalUser.id} />
        </AppCard>
      </AppModal>
    </div>
  );
}

const getFilteredUsers = (users, keyword) => {
  console.log("getFilteredUsers:", { users, keyword });

  if (keyword && keyword.length > 0 && users && users.length > 0) {
    const searchKey = keyword && keyword.toLowerCase();
    const searchResults = users.filter(user => {
      return Object.values(user).some(
        item =>
          item &&
          typeof item === "string" &&
          item.toLowerCase().startsWith(searchKey)
      );
    });
    console.log("getFilteredUsers: searchResults:", searchResults);
    return searchResults;
  }

  console.log("getFilteredUsers: nokeyword or users:", { users, keyword });
  return users;
};

const mapStateToProps = state => {
  return {
    status: state.userState.users.status,
    users: state.userState.users.data,
    // users: getFilteredUsers(
    //   state.userState.users.data,
    //   state.userState.searchKeyword
    // ),
    modalUser: state.userState.modalUser,
    searchKeyword: state.userState.searchKeyword
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setModalUser: user => dispatch(setModalUserAction(user)),
    searchUser: user => dispatch(setUserSearchKeywordAction(user)),
    getUsers: () => dispatch(getUsersAction()),
    createUser: user => dispatch(createUserAction(user)),
    updateUser: user => dispatch(updateUserAction(user)),
    deleteUser: user => dispatch(deleteUserAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
