import React from "react";
import { UsersToolbar, UsersTable } from "../components";

const Users = () => {
  return (
    <div className="container-fluid">
      <UsersToolbar />
      <div>
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
