import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUserAction } from "../state/user.action";
import UserForm from "../components/UserForm";
import UserLayout from "../layout/UserLayout";

function CreateUser({ mutationStatus, createUser }) {
  const handleSave = (e, newUser) => {
    createUser(newUser);
  };

  return (
    <UserLayout title="Create User">
      <UserForm status={mutationStatus} onSave={handleSave} />
    </UserLayout>
  );
}

CreateUser.propTypes = {
  mutationStatus: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("CreateUser", state);
  return {
    mutationStatus: state.userState.mutationStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
