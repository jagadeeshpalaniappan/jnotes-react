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
  Container
} from "reactstrap";

import { Loading, Error } from "../../common/components";

export const UserFormContainer = ({
  loading,
  error,
  user,
  onCancel,
  onSave
}) => {
  console.log("UserFormContainer:", { loading, error, user });
  const [formVal, setFormVal] = useState({});

  useEffect(() => {
    console.log("user - changed", user);
    setFormVal(user || {});
  }, [user]);

  const handleSubmit = useCallback(
    e => {
      console.log("UserFormContainer:: handleSubmit: formVal:", formVal);
      e.preventDefault();
      onSave(e, formVal);
      setFormVal({});
    },
    [formVal, setFormVal, onSave]
  );

  const handleCancel = e => {
    console.log("UserFormContainer:: handleCancel: formVal:", formVal);
    setFormVal({});
    onCancel();
  };

  return (
    <div>
      {loading && <Loading>Creating User...</Loading>}
      {error && <Error> {error} </Error>}
      {user && user.id ? <h3>Edit User</h3> : <h3>Create User</h3>}
      <Form onSubmit={handleSubmit}>
        <p> {JSON.stringify(formVal)} </p>

        {user && user.id && (
          <FormGroup>
            <label htmlFor="userId">ID:</label>
            <Input
              type="text"
              id="userId"
              name="id"
              value={formVal.id}
              disabled
            />
          </FormGroup>
        )}
        <FormGroup>
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formVal.name}
            onChange={e => setFormVal({ ...formVal, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email:</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={formVal.email}
            onChange={e => setFormVal({ ...formVal, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="age">Age:</label>
          <Input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={formVal.age}
            onChange={e => setFormVal({ ...formVal, age: e.target.value })}
          />
        </FormGroup>

        <div className="d-flex justify-content-end">
          <Button
            type="button"
            color="secondary"
            className="mr-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};
