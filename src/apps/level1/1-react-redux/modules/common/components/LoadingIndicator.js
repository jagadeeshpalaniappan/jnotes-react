import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";

function LoadingIndicator({ status }) {
  return (
    <>
      {status.msg && (
        <div className="align-items-center d-flex justify-content-center my-5">
          <Spinner style={{ width: "3rem", height: "3rem" }} type="grow" />
          <div className="ml-2">{status.msg}</div>
        </div>
      )}
    </>
  );
}

LoadingIndicator.propTypes = {
  status: PropTypes.object.isRequired,
};

export default LoadingIndicator;
