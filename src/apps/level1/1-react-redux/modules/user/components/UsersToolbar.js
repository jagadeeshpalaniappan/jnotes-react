import React from "react";
// import PropTypes from "prop-types";
import { useRouteMatch, NavLink } from "react-router-dom";
import { Button } from "../../../../../designsystem";
import SearchInput from "../../common/components/SearchInput";

const UsersToolbar = ({ resetUser }) => {
  let { path } = useRouteMatch();
  return (
    <div className="d-flex align-items-center">
      <Button className="ml-2">Import</Button>
      <Button className="ml-2">Export</Button>
      <Button className="ml-2">Delete All</Button>
      <Button
        tag={NavLink}
        to={`${path}/create`}
        color="primary"
        className="ml-2"
      >
        Add User
      </Button>
    </div>
  );
};

UsersToolbar.propTypes = {};

export default UsersToolbar;
