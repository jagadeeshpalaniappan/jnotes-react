import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormText,
  Card,
  Container
} from "reactstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { STATUS_MODE, MODE } from "../../common/constants";
import { GET_USER, UPDATE_USER } from "../graphql";

import { UserDetailsStatus, EditUser } from "./UserComponents";

const STATUS_MSG = {
  GET_USER: {
    loading: "Loading User...",
    error: "Problem while getting user",
    success: "User loaded successfully!"
  },
  UPDATE_USER: {
    loading: "Updating User...",
    error: "Problem while updating user",
    success: "User updated successfully!"
  },
  DELETE_USER: {
    loading: "Deleting User...",
    error: "Problem while deleting user",
    success: "User deleted successfully!"
  }
};

const UpdateUserDetails = ({ userId, setMode }) => {
  console.log("UpdateUserDetails:");

  // --------------------------- GRAPHQL ---------------------------
  // GET_USER:
  const variables = { id: userId };
  const queryStatus = useQuery(GET_USER, { variables });

  // UPDATE_USER:
  const [updateUser, updateStatus] = useMutation(UPDATE_USER);

  // --------------------------- LOCAL ---------------------------
  console.log("UpdateUserDetails:", { queryStatus });

  const user = (queryStatus.data && queryStatus.data.user) || {};

  // --------------------------- Fns ---------------------------
  const handleSave = updatedUser => {
    console.log("UpdateUserDetails:: handleSave: updatedUser:", updatedUser);
    const variables = {
      id: updatedUser.id,
      input: {
        name: updatedUser.name,
        username: updatedUser.email,
        email: updatedUser.email
      }
    };
    updateUser({ variables });
  };

  // --------------------------- Render ---------------------------

  return (
    <div>
      <UserDetailsStatus mode={STATUS_MODE.GET} queryStatus={queryStatus} />
      <UserDetailsStatus
        mode={STATUS_MODE.UPDATE}
        updateStatus={updateStatus}
      />

      <EditUser
        user={user}
        hideActions={updateStatus.loading}
        onSave={handleSave}
        onCancel={() => setMode(MODE.READ)}
      />
    </div>
  );
};

export default UpdateUserDetails;
