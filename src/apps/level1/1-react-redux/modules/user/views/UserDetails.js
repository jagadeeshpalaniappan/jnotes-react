import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getUserAction } from "../../../state/user/user.action";

function UserDetails({ user, getUser }) {
  let { id } = useParams();
  useEffect(() => {
    // onInit:
    getUser({ id });
  }, []);
  return (
    <div>
      <h2>UserDetails</h2>
      <p>userId:{id}</p>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
