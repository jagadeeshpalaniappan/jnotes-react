import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { StatusBar } from "../../common/components";
import { getUserAction, deleteUserAction } from "../state/user.action";
import UserDetailsToolbar from "../components/UserDetailsToolbar";
import { STATUS_TYPES } from "../../common/constants";
import { API_DELETE_USER_SUCCESS } from "../state/user.actionTypes";

function UserDetails({ user, status, getUser, deleteUser }) {
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    // onInit:
    getUser({ id });
  }, [id, getUser]);

  const handleDelete = () => {
    deleteUser(user);
  };

  const gotoUsersPage = useCallback(() => {
    history.push(`/users/`);
  }, [history]);

  useEffect(() => {
    console.log("user-changed", status);
    if (status && status.code === API_DELETE_USER_SUCCESS) {
      setTimeout(() => gotoUsersPage(), 3000);
    }
  }, [status, gotoUsersPage]);

  return (
    <div className="container-fluid">
      <StatusBar status={status} />
      {status.type !== STATUS_TYPES.LOADING && (
        <>
          <UserDetailsToolbar
            user={user}
            status={status}
            onDelete={handleDelete}
          />
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("UserDetails", state);
  return {
    user: state.userState.user.data,
    status: state.userState.user.status,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUserAction(user)),
    deleteUser: (user) => dispatch(deleteUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
