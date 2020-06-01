import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

import { STATUS_TYPES } from "../constants";

function StatusBar({ status, onClose }) {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => {
    setVisible(false);
    onClose();
  };
  let color = "light";
  if (status.type === STATUS_TYPES.LOADING) {
    color = "primary";
  } else if (status.type === STATUS_TYPES.FAILURE) {
    color = "danger";
  } else if (status.type === STATUS_TYPES.SUCCESS) {
    color = "success";
  }
  return (
    <>
      {status.msg && (
        <Alert
          color={color}
          isOpen={visible}
          toggle={status.type === STATUS_TYPES.LOADING ? null : onDismiss}
        >
          {status.msg} {status.more && `:: ${status.more}`}
        </Alert>
      )}
    </>
  );
}

StatusBar.propTypes = {
  status: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default StatusBar;
