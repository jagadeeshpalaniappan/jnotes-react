import React from "react";
import PropTypes from "prop-types";

import { List, ListItem } from "../../../components";

const UserList = (props) => {
  const { users, ...rest } = props;
  return (
    <div>
      {users && users.length > 0 && (
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              item={user}
              tag="button"
              action
              onClick={() => console.log(user)}
            />
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
