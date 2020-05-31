import React from "react";
import PropTypes from "prop-types";

import { List } from "../../common/components";
import UserListItem from "./UserListItem";

const UserList = ({ users }) => {
  return (
    <div>
      {users && users.length > 0 && (
        <List>
          {users.map((user) => (
            <UserListItem key={user.id} item={user} action />
          ))}
        </List>
      )}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
