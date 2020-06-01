import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoadingIndicator from "../../common/components/LoadingIndicator";
import { getUsersAction } from "../state/user.action";

import UsersList from "../components/UsersList";
import UsersToolbar from "../components/UsersToolbar";
import UserLayout from "../layout/UserLayout";
import SearchInput from "../../common/components/SearchInput";

// const users = [{ id: 101, name: "Jag1" }];

const Users = ({ users, status, searchKeyword, getUsers }) => {
  useEffect(() => {
    // onInit:
    getUsers();
  }, [getUsers]);

  return (
    <UserLayout title="Users" actions={<UsersToolbar />}>
      <div className="my-3">
        <SearchInput placeholder="Search user" />
      </div>
      <LoadingIndicator status={status} />
      <UsersList users={users} />
    </UserLayout>
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
