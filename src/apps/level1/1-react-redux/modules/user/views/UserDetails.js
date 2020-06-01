import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingIndicator from "../../common/components/LoadingIndicator";
import StatusBar from "../../common/components/StatusBar";
import { getUserAction, deleteUserAction } from "../state/user.action";
import UserDetailsToolbar from "../components/UserDetailsToolbar";
import UserLayout from "../layout/UserLayout";

function UserDetails({ user, status, getUser, deleteUser }) {
  let { id } = useParams();

  useEffect(() => {
    // onInit:
    getUser({ id });
  }, [id, getUser]);

  const handleDelete = () => {
    deleteUser(user);
  };

  return (
    <UserLayout
      title="User"
      actions={
        <UserDetailsToolbar
          user={user}
          status={status}
          onDelete={handleDelete}
        />
      }
    >
      <LoadingIndicator status={status} />
      {user && Object.keys(user).length > 0 && (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </UserLayout>
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
