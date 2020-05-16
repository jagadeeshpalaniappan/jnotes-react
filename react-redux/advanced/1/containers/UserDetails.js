


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


const UserDetails = ({ userId, mode }) => {
  console.log("UserDetails:", { userId, mode });

  const [currMode, setMode] = useState(mode);
  const [currUserId, setUserId] = useState(userId);

  console.log("currUserId", currUserId);

  switch (currMode) {
    case MODE.CREATE:
      return <CreateUserDetails setMode={setMode} setUserId={setUserId} />;
    case MODE.UPDATE:
      return <UpdateUserDetails userId={currUserId} setMode={setMode} />;
    default:
      return <GetUserDetails userId={currUserId} setMode={setMode} />;
  }
};

export default UserDetails;
