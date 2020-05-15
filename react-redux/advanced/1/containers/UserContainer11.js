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

import { UserFormContainer } from "../../common/container/UserFormContainer";

import {
  setUserSearchKeywordAction,
  setModalUserAction,
  getUsersAction,
  createUserAction,
  updateUserAction,
  deleteUserAction
} from "../redux/user/user.action";

import { STATUS_TYPES } from "../../common/constants";

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
  status,
  users: usersRedux,
  modalUser,
  searchKeyword,
  setModalUser,
  searchUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}) {
  console.log("UsersContainer: users,searchKeyword:", { users, searchKeyword });

  const { loading, error, data } = useQuery(GET_USERS);
  console.log('GQL:'{loading, error, data});
  const users = data && data.users.data || [];

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

  const handleSearch = (e, keyword) => {
    console.log("SearchUser: keyword:", keyword);
    searchUser(keyword);

    // const searchKey = keyword && keyword.toLowerCase();
    // const searchResults = users.filter(user => {
    //   return Object.values(user).some(item =>
    //     item.toLowerCase().startsWith(searchKey)
    //   );
    // });

    // console.log("SearchUser: searchResults:", searchResults);
    // setVisibleUsers(searchResults);
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

      <UserList status={status} users={users} openModal={openModal} />

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
