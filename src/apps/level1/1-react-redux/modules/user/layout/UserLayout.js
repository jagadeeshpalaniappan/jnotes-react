import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatusBar from "../../common/components/StatusBar";

import { resetMutationStatusAction } from "../state/user.action";

const UserLayout = ({ mutationStatus, resetMutationStatus, children }) => {
  const handleClose = () => {
    resetMutationStatus();
  };
  return (
    <div className="container-fluid">
      <StatusBar status={mutationStatus} onClose={handleClose} />
      {children}
    </div>
  );
};

UserLayout.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({
  mutationStatus: state.userState.mutationStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    resetMutationStatus: (user) => dispatch(resetMutationStatusAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);
