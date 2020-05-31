import React from "react";
// import PropTypes from "prop-types";
import { useRouteMatch, NavLink, useHistory } from "react-router-dom";
import { Button } from "../../../../../designsystem";
import SearchInput from "../../common/components/SearchInput";

const UsersToolbar = ({ resetUser }) => {
  let { path } = useRouteMatch();
  let history = useHistory();

  const gotoCreateUser = () => {
    resetUser();
    history.push(`/users/create`);
  };

  return (
    <div>
      <div className="d-flex align-items-center my-3">
        <h3 className="flex-grow-1 m-0">Users</h3>
        <Button className="ml-2">Import</Button>
        <Button className="ml-2">Export</Button>
        <Button className="ml-2">Delete All</Button>
        <Button className="ml-2" onClick={() => gotoCreateUser()}>
          New user
        </Button>
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
