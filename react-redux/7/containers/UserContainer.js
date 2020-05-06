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

import { fetchUsers } from "../redux/user.state";

function UsersContainer({ loading, error, users, fetchUsers }) {
  useEffect(() => {
    // onInit:
    fetchUsers();
  }, []);

  return (
    <div className="col-sm">
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> UserContainer: </h3>
      </div>
      {loading ? (
        <Loading>Loading Users...</Loading>
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <div>
          {users && (
            <List>
              {users.map(user => (
                <ListItem key={user.id} item={user} />
              ))}
            </List>
          )}
          {!(users && users.length > 0) && "No users found"}
        </div>
      )}
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
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
