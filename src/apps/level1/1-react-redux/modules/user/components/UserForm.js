import React, { useState, useEffect, useRef, useCallback } from "react";
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
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { STATUS_TYPES } from "../../common/constants";

function UserForm({ user, status, onSave }) {
  console.log("UserFormContainer:", { user });
  const [formVal, setFormVal] = useState({});

  useEffect(() => {
    console.log("user - changed", user);
    setFormVal(user || {});
  }, [user]);

  const handleSubmit = useCallback(
    (e) => {
      console.log("UserFormContainer:: handleSubmit: formVal:", formVal);
      e.preventDefault();
      onSave(e, formVal);
    },
    [formVal, onSave]
  );

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* <p> {JSON.stringify(formVal)} </p> */}

        {/* {user && user.id && (
          <FormGroup>
            <label htmlFor="userId">ID:</label>
            <Input
              type="text"
              id="userId"
              name="id"
              value={formVal.id || ""}
              disabled
            />
          </FormGroup>
        )}
         */}
        <FormGroup>
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formVal.name || ""}
            onChange={(e) => setFormVal({ ...formVal, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email:</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={formVal.email || ""}
            onChange={(e) => setFormVal({ ...formVal, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="age">Age:</label>
          <Input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={formVal.age || ""}
            onChange={(e) => setFormVal({ ...formVal, age: e.target.value })}
          />
        </FormGroup>

        <div className="d-flex justify-content-end align-items-center my-3">
          <Button
            tag={NavLink}
            to={user && user.id ? `/users/${user.id}` : `/users`}
            className="ml-2"
            disabled={status.type === STATUS_TYPES.LOADING}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            className="ml-2"
            disabled={status.type === STATUS_TYPES.LOADING}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

UserForm.propTypes = {
  user: PropTypes.object,
  status: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UserForm;
