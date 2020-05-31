import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { StatusBar } from "../../../components";
import {
  getUserAction,
  deleteUserAction,
} from "../../../state/user/user.action";
import UserDetailsToolbar from "../components/UserDetailsToolbar";

function UserDetails({ user, status, getUser, deleteUser }) {
  let { id } = useParams();
  useEffect(() => {
    // onInit:
    getUser({ id });
  }, []);

  const handleDelete = () => {
    deleteUser(user);
  };

  return (
    <div className="container-fluid">
      <StatusBar status={status} />
      <UserDetailsToolbar user={user} status={status} onDelete={handleDelete} />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

UserDetails.propTypes = {};

const mapStateToProps = (state) => {
  console.log("UserDetails", state);
  return {
    status: state.userState.user.status,
    user: state.userState.user.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUserAction(user)),
    deleteUser: (user) => dispatch(deleteUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
