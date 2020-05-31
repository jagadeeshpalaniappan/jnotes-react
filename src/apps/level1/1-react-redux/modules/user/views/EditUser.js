import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

function EditUser(props) {
  let { id } = useParams();
  return (
    <div>
      <h2>EditUser</h2>
      <p>userId:{id}</p>
    </div>
  );
}

EditUser.propTypes = {};

export default EditUser;
