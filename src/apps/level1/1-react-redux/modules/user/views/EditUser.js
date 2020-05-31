import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { Button } from "../../../../../designsystem";
import { StatusBar } from "../../../components";
import { STATUS_TYPES } from "../../../constants";
import {
  getUserAction,
  updateUserAction,
} from "../../../state/user/user.action";

function EditUser({ user, status, getUser, updateUser }) {
  let { id } = useParams();
  useEffect(() => {
    // onInit:
    getUser({ id });
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, name: user.name + "111" }; // TODO: handle form
    updateUser(updatedUser);
  };
  return (
    <div className="container-fluid">
      <StatusBar status={status} />
      <h3 className="flex-grow-1 m-0">Edit User</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="d-flex justify-content-end align-items-center my-3">
        <Button
          tag={NavLink}
          to={`/users/${id}`}
          className="ml-2"
          disabled={status.type === STATUS_TYPES.LOADING}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          className="ml-2"
          onClick={handleSave}
          disabled={status.type === STATUS_TYPES.LOADING}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

EditUser.propTypes = {};

const mapStateToProps = (state) => {
  console.log("EditUser", state);
  return {
    status: state.userState.user.status,
    user: state.userState.user.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUserAction(user)),
    updateUser: (user) => dispatch(updateUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
