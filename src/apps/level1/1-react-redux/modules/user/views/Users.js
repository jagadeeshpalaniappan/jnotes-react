import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StatusBar } from "../../common/components";
import { getUsersAction } from "../state/user.action";

import UsersList from "../components/UsersList";
import UsersToolbar from "../components/UsersToolbar";

// const users = [{ id: 101, name: "Jag1" }];

const Users = ({ users, status, searchKeyword, getUsers }) => {
  useEffect(() => {
    // onInit:
    getUsers();
  }, [getUsers]);

  return (
    <div className="container-fluid">
      <UsersToolbar />
      <div>
        <StatusBar status={status} />
        <UsersList users={users} />
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    status: state.userState.users.status,
    users: state.userState.users.data,
    // users: getFilteredUsers(
    //   state.userState.users.data,
    //   state.userState.searchKeyword
    // ),
    searchKeyword: state.userState.searchKeyword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // searchUser: (user) => dispatch(setUserSearchKeywordAction(user)),
    getUsers: () => dispatch(getUsersAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
