import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { Button } from "../../../../../designsystem";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import StatusBar from "../../common/components/StatusBar";
import { STATUS_TYPES } from "../../common/constants";
import { getUserAction, updateUserAction } from "../state/user.action";
import UserLayout from "../layout/UserLayout";

function EditUser({ user, status, mutationStatus, getUser, updateUser }) {
  let { id } = useParams();
  useEffect(() => {
    // onInit:
    getUser({ id });
  }, [id, getUser]);

  const handleSave = () => {
    const updatedUser = { ...user, name: user.name + "111" }; // TODO: handle form
    updateUser(updatedUser);
  };
  return (
    <UserLayout>
      <LoadingIndicator status={status} />

      {user && Object.keys(user).length > 0 && (
        <>
          <h3 className="flex-grow-1 m-0">Edit User</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>

          <div className="d-flex justify-content-end align-items-center my-3">
            <Button
              tag={NavLink}
              to={`/users/${id}`}
              className="ml-2"
              disabled={mutationStatus.type === STATUS_TYPES.LOADING}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="ml-2"
              onClick={handleSave}
              disabled={mutationStatus.type === STATUS_TYPES.LOADING}
            >
              Save
            </Button>
          </div>
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
