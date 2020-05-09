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

import { getUsers } from "../redux/user.state";

function UsersContainer({ loading, error, users, getUsers }) {
  useEffect(() => {
    // onInit:
    getUsers();
  }, []);


  return (
    <div className="col-sm">
      <div className="d-flex my-3">
        <h3 className="flex-grow-1 m-0"> UserContainer: </h3>
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
    getUsers: () => dispatch(getUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
