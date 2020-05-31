import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StatusBar } from "../../common/components";
import { createUserAction } from "../state/user.action";
import UserForm from "../components/UserForm";

function CreateUser({ status, createUser }) {
  const handleSave = (e, newUser) => {
    createUser(newUser);
  };
  return (
    <div className="container-fluid">
      <StatusBar status={status} />
      <h3 className="flex-grow-1 m-0">Create User</h3>

      <UserForm status={status} onSave={handleSave} />
    </div>
  );
}

CreateUser.propTypes = {
  status: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("CreateUser", state);
  return {
    status: state.userState.user.status,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
