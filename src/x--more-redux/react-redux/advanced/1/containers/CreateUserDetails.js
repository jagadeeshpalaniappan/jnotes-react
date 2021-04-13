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
  Container,
} from "reactstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { STATUS_MODE, MODE } from "../../common/constants";
import { CREATE_USER } from "../graphql";

import { getStatus, EditUser } from "./UserComponents";
import { StatusBar } from "../../common/components";

const STATUS_MSG = {
  loading: "Creating User...",
  error: "Problem while creating user",
  success: "User created successfully!",
};

const CreateUserDetails = ({ setMode, setUserId }) => {
  console.log("CreateUserDetailsContainer:");

  // --------------------------- GRAPHQL ---------------------------
  // CREATE_USER:
  const [createUser, createStatus] = useMutation(CREATE_USER, {
    onCompleted(resp) {
      console.log("CreateUserDetailsContainer:onCompleted", resp.createUser);
      setMode(MODE.READ);
      setUserId(resp.createUser.id - 10);
    },
    onError(err) {
      console.log("CreateUserDetailsContainer:onError", err);
    },
  });

  // --------------------------- Fns ---------------------------

  const handleSave = (updatedUser) => {
    console.log("UserDetailsContainer:: handleSave: updatedUser:", updatedUser);
    const variables = {
      input: {
        name: updatedUser.name,
        username: updatedUser.email,
        email: updatedUser.email,
      },
    };
    createUser({ variables });
  };

  // --------------------------- Render ---------------------------

  return (
    <div>
      <StatusBar
        status={getStatus(
          {
            loading: createStatus.loading,
            error: createStatus.error,
            success: createStatus.data && !!createStatus.data.createUser,
          },
          STATUS_MSG
        )}
      />

      <EditUser
        hideActions={createStatus.loading}
        onSave={handleSave}
        onCancel={() => setMode(MODE.READ)}
      />
    </div>
  );
};

export default CreateUserDetails;
