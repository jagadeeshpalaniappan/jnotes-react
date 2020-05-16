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

import { EditUser } from "./UserComponents";
import { StatusBar } from "../../common/components";

const GET_STATUS_MSG = {
  loading: "Loading User...",
  error: "Problem while getting user",
  success: "User loaded successfully!"
};
const UPDATE_STATUS_MSG = {
  loading: "Updating User...",
  error: "Problem while updating user",
  success: "User updated successfully!"
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
      <StatusBar
        status={getStatus(
          {
            loading: createStatus.loading,
            error: createStatus.error,
            success: createStatus.data && !!createStatus.data.createUser
          },
          GET_STATUS_MSG
        )}
      />
      <StatusBar
        status={getStatus(
          {
            loading: deleteStatus.loading,
            error: deleteStatus.error,
            success: deleteStatus.data && !!deleteStatus.data.deleteUser
          },
          UPDATE_STATUS_MSG
        )}
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
