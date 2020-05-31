import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

function UserDetails(props) {
  let { id } = useParams();
  return (
    <div>
      <h2>UserDetails</h2>
      <p>userId:{id}</p>
    </div>
  );
}

UserDetails.propTypes = {};

export default UserDetails;
