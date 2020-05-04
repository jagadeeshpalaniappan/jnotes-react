import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  AddItemForm,
  List,
  ListItem,
  SearchInput,
  Card
} from "../../components";

import {
  addUserAction,
  editUserAction,
  deleteUserAction
} from "../redux/user.state";

const UserContainer = ({ users, addUser, editUser, deleteUser }) => {
  const [visibleUsers, setVisibleUsers] = useState(null);

  useEffect(() => {
    console.log("users - changed", users);
    setVisibleUsers(users);
  }, [users, setVisibleUsers]);

  const handleAdd = name => {
    console.log("AddUser:", name);
    addUser({ name });
  };

  const handleEdit = (e, user) => {
    console.log("EditUser:", user);
    editUser(user);
  };

  const handleDelete = (e, user) => {
    console.log("DeleteUser:", user);
    deleteUser(user);
  };

  const handleSearch = (e, keyword) => {
    console.log("SearchUser: keyword:", keyword);
    const searchKey = keyword && keyword.toLowerCase();
    const searchResults = users.filter(user => {
      const userValues = Object.values(user).map(item => item.toLowerCase());

      console.log("SearchUser: userValues:", userValues);

      const userValuesSet = new Set(userValues);

      console.log("SearchUser: userValuesSet:", userValuesSet);
      return userValuesSet.has(searchKey);
    });

    console.log("SearchUser: searchResults:", searchResults);
    setVisibleUsers(searchResults);
  };

  return (
    <div>
      <h3> UserContainer: </h3>
      <Card>
        <AddItemForm onAdd={handleAdd} />
      </Card>

      <Card>
        <SearchInput onSearch={handleSearch} />
        {visibleUsers && (
          <List>
            {visibleUsers.map(user => (
              <ListItem
                item={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </List>
        )}

        {!(users && users.length > 0) && "No users found"}
      </Card>
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
    addUser: user => dispatch(addUserAction(user)),
    editUser: user => dispatch(editUserAction(user)),
    deleteUser: user => dispatch(deleteUserAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
