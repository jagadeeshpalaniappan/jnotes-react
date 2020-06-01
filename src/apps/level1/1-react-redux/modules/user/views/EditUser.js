import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { getUserAction, updateUserAction } from "../state/user.action";
import UserLayout from "../layout/UserLayout";
import UserForm from "../components/UserForm";

function EditUser({ user, status, mutationStatus, getUser, updateUser }) {
  let { id } = useParams();
  useEffect(() => {
    // onInit:
    getUser({ id });
  }, [id, getUser]);

  const handleSave = (e, updatedUser) => {
    updateUser(updatedUser);
  };

  return (
    <UserLayout title="Edit User">
      <LoadingIndicator status={status} />
      {user && Object.keys(user).length > 0 && (
        <>
          <UserForm user={user} status={mutationStatus} onSave={handleSave} />
        </>
      )}
    </UserLayout>
  );
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("EditUser", state);
  return {
    mutationStatus: state.userState.mutationStatus,
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
