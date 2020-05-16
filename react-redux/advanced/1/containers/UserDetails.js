


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

import { MODE } from "../../common/constants";

import CreateUserDetails from "./CreateUserDetails";
import UpdateUserDetails from "./UpdateUserDetails";
import GetUserDetails from "./GetUserDetails";


export const UserDetailsContainer = ({ userId, mode }) => {
  console.log("UserDetailsContainer:", { userId, mode });

  const [currMode, setMode] = useState(mode);

  switch (currMode) {
    case MODE.CREATE:
      return <CreateUserDetails setMode={setMode} />;
    case MODE.UPDATE:
      return <UpdateUserDetails userId={userId} setMode={setMode} />;
    default:
      return <GetUserDetails userId={userId} setMode={setMode} />;
  }
};
