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
import { GET_USER, DELETE_USER } from "../graphql";

import { getStatus, UserDetails } from "./UserComponents";
import { StatusBar } from "../../common/components";


const GET_STATUS_MSG = {
  loading: "Loading User...",
  error: "Problem while getting user",
  success: "User loaded successfully!"
};
const DELETE_STATUS_MSG = {
  loading: "Loading User...",
  error: "Problem while getting user",
  success: "User loaded successfully!"
};

const GetUserDetails = ({ userId, setMode }) => {
  console.log("GetUserDetails:", { userId });

  if (!userId) return null;

  // --------------------------- GRAPHQL ---------------------------
  // GET_USER:
  const variables = { id: userId };
  const queryStatus = useQuery(GET_USER, { variables });

  // DELETE_USER:
  const [deleteUser, deleteStatus] = useMutation(DELETE_USER);

  console.log("GetUserDetails: query:", queryStatus);
  console.log("GetUserDetails: deleteStatus:", deleteStatus);
  // --------------------------- LOCAL ---------------------------

  const user = (queryStatus.data && queryStatus.data.user) || {};

  // --------------------------- STATE ---------------------------

  const [statusMode, setStatusMode] = useState(STATUS_MODE.GET);

  // --------------------------- Fns ---------------------------

  const handleDelete = () => {
    console.log("UserDetailsContainer:: handleDelete: user:", user);
    setStatusMode(STATUS_MODE.DELETE);
    const variables = { id: userId };
    deleteUser({ variables });
  };

  // --------------------------- Render ---------------------------
  const hideDetailPage =
    queryStatus.loading ||
    deleteStatus.loading ||
    (deleteStatus.data && deleteStatus.data.deleteUser);

  return (
    <div>
      <StatusBar
        status={getStatus(
          {
            loading: queryStatus.loading,
            error: queryStatus.error,
            success: queryStatus.data && !!queryStatus.data.createUser
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
          DELETE_STATUS_MSG
        )}
      />

      {!hideDetailPage && (
        <UserDetails
          user={user}
          hideActions={deleteStatus.loading}
          onEdit={() => setMode(MODE.UPDATE)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default GetUserDetails;
