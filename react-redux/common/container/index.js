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




export const UserFormContainer = ({ user, onCancel, onSave }) => {
  const [formVal, setFormVal] = useState({});
  useEffect(() => {
    console.log("user - changed", user);
    setFormVal(user || {});
  }, [user]);

  const handleSubmit = useCallback(e => {
    console.log("UserFormContainer:: handleSubmit: formVal:", formVal);
    e.preventDefault();
    onSave(e, formVal);
    setFormVal({});
  }, [formVal, setFormVal, onSave]);

  const handleCancel = e => {
    console.log("UserFormContainer:: handleCancel: formVal:", formVal);
    setFormVal({});
    onCancel();
  };

  return (
    <div>
      {user ? <h3>Edit User</h3> : <h3>Create User</h3>}
      <Form onSubmit={handleSubmit}>
        <p> {JSON.stringify(formVal)} </p>
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


export const PostFormContainer = ({ post, onCancel, onSave }) => {
  const [formVal, setFormVal] = useState({});
  useEffect(() => {
    console.log("post - changed", post);
    setFormVal(post || {});
  }, [post]);

  const handleSubmit = useCallback(e => {
    console.log("UserFormContainer:: handleSubmit: formVal:", formVal);
    e.preventDefault();
    onSave(e, formVal);
    setFormVal({});
  }, [formVal, setFormVal, onSave]);

  const handleCancel = e => {
    console.log("UserFormContainer:: handleCancel: formVal:", formVal);
    setFormVal({});
    onCancel();
  };

  return (
    <div>
      {post ? <h3>Edit Post</h3> : <h3>Create Post</h3>}
      <Form onSubmit={handleSubmit}>
        <p> {JSON.stringify(formVal)} </p>
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
