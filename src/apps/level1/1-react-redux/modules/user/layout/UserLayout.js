import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatusBar from "../../common/components/StatusBar";

import { resetMutationStatusAction } from "../state/user.action";

const UserLayout = ({
  children,
  title,
  actions,
  mutationStatus,
  resetMutationStatus,
}) => {
  const handleClose = () => {
    resetMutationStatus();
  };
  return (
    <div className="container-fluid">
      <StatusBar status={mutationStatus} onClose={handleClose} />
      <div>
        <div className="d-flex align-items-center my-3">
          <h3 className="flex-grow-1 m-0">{title}</h3>
          {actions}
        </div>
      </div>
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
