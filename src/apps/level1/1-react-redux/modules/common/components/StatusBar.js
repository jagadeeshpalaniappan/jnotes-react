import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

import { STATUS_TYPES } from "../constants";

function StatusBar({ status, onClose, timeout }) {
  const [visible, setVisible] = useState(true);
  const onDismiss = useCallback(() => {
    setVisible(false);
    onClose();
  }, [onClose]);

  let color = "light";
  if (status.type === STATUS_TYPES.LOADING) {
    color = "primary";
  } else if (status.type === STATUS_TYPES.FAILURE) {
    color = "danger";
  } else if (status.type === STATUS_TYPES.SUCCESS) {
    color = "success";
  }

  useEffect(() => {
    let myTimer = null;
    if (status.type === STATUS_TYPES.SUCCESS) {
      // call: onDismiss after '1000ms'
      myTimer = setTimeout(onDismiss, timeout);
    }
    return () => {
      if (myTimer) {
        // clears: myTimer (setTimeout) when component unmount
        clearTimeout(myTimer);
      }
    };
  }, [status.type, onDismiss, timeout]);

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
  timeout: PropTypes.number,
};
StatusBar.defaultProps = {
  timeout: 6000,
};

export default StatusBar;
