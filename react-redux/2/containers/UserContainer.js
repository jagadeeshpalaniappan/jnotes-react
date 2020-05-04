import React from "react";
import { connect } from "react-redux";

import { AddItemForm, List, ListItem, AppCard } from "../../common/components";

import { addUser } from "../redux";

const UserContainer = ({ users, myAddUser }) => {
  const handleAdd = (e, user) => {
    console.log("AddUser:", user);
    myAddUser(user);
  };
  return (
    <div className="mt-3">
      <h2 className="my-3">UserContainer: </h2>

      <h5 className="my-3">Add User: </h5>
      <AppCard>
        <AddItemForm onAdd={handleAdd} />
      </AppCard>

      <h5 className="my-3">User List: </h5>
      <div className="mt-3">
        {users && (
          <List>
            {users.map(user => (
              <ListItem
                item={user}
              />
            ))}
          </List>
        )}
        {!(users && users.length > 0) && "No users found"}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.userState.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    myAddUser: user => dispatch(addUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
