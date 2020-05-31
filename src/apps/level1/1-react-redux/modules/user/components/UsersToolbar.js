import React from "react";
// import PropTypes from "prop-types";
import { useRouteMatch, NavLink } from "react-router-dom";
import { Button } from "../../../../../designsystem";
import SearchInput from "../../common/components/SearchInput";

const UsersToolbar = (props) => {
  let { path } = useRouteMatch();
  return (
    <div>
      <div className="d-flex align-items-center my-3">
        <h3 className="flex-grow-1 m-0">Users</h3>
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
      <div className="my-3">
        <SearchInput placeholder="Search user" />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {};

export default UsersToolbar;
