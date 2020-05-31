import React, { useEffect } from "react";
import { connect } from "react-redux";
import { UsersToolbar, UsersList } from "../components";
import { StatusBar } from "../../../components";
import { getUsersAction } from "../../../state/user/user.action";

// const users = [{ id: 101, name: "Jag1" }];

const Users = ({ users, status, searchKeyword, getUsers }) => {
  useEffect(() => {
    // onInit:
    getUsers();
  }, []);

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

// export default Users;

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
