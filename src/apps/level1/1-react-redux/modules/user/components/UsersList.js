import React from "react";
import PropTypes from "prop-types";

const UserList = (props) => {
  const { className, users, ...rest } = props;
  return (
    <div>
      <h2>UserList</h2>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
