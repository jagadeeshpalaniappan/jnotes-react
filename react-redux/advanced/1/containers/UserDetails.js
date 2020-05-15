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

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { ConfirmDeleteModal } from "../../common/container/ConfirmDeleteModal";
import { AppButton, StatusBar } from "../../common/components";
import { STATUS_TYPES, MODE } from "../../common/constants";

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      phone
      website
    }
  }
`;


const getStatus = ({ loading, error }) => {
  if (loading) {
    return { type: STATUS_TYPES.LOADING, msg: "Loading User..." };
  } else if (error) {
    return {
      type: STATUS_TYPES.FAILURE,
      msg: "Problem while getting user",
      more: error
    };
  } else {
    return { type: STATUS_TYPES.SUCCESS, msg: "" };
  }
};

export const UserFormHeader = ({ mode, user, status, onEdit, onDelete }) => {
  switch (mode) {
    case MODE.READ:
      return (
        <div className="d-flex my-3">
          <h3 className="flex-grow-1 m-0">User</h3>
          {!(status && status.type === STATUS_TYPES.LOADING) && (
            <>
              <AppButton outline color="primary" onClick={() => onEdit(user)}>
                Edit
              </AppButton>
              <AppButton
                outline
                color="danger"
                onClick={() => onDelete(user)}
                className="ml-2"
              >
                Delete
              </AppButton>
            </>
          )}
        </div>
      );
    case MODE.EDIT:
      return (
        <div className="d-flex my-3">
          <h3 className="flex-grow-1 m-0">Edit User</h3>
        </div>
      );
    default:
      return <h3 className="flex-grow-1 m-0">Create User</h3>;
  }
};

export const UserDetails11 = ({
  userId,
  status,
  editMode,
  onCancel,
  onSave,
  onEdit,
  onDelete
}) => {
  console.log("UserDetails:", { status, userId });

  if (!userId) return null;

  // --------------------------- GRAPHQL
  const variables = { id: userId };
  const { loading, error, data } = useQuery(GET_USER, { variables });

  console.log("UserDetails:", { loading, error, data });
  const user = (data && data.user) || {};
  const status = getStatus({ loading, error });
  // ---------------------------

  const [formVal, setFormVal] = useState({});

  useEffect(() => {
    console.log("user - changed", user);
    setFormVal(user || {});
  }, [user]);

  const handleSubmit = useCallback(
    e => {
      console.log("UserDetails:: handleSubmit: formVal:", formVal);
      e.preventDefault();
      onSave(e, formVal);
      setFormVal({});
    },
    [formVal, setFormVal, onSave]
  );

  const handleCancel = e => {
    console.log("UserDetails:: handleCancel: formVal:", formVal);
    setFormVal({});
    onCancel();
  };

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = (e, user) => {
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = e => {
    console.log("UserDetails:: handleDelete: user:", user);
    setDeleteConfirmed(true);
    closeDeleteModal();
    onDelete(user);
  };

  return (
    <div>
      <StatusBar status={status} />

      {!(deleteConfirmed && status.type === STATUS_TYPES.SUCCESS) && (
        <>
          <UserFormHeader
            mode={
              editMode ? (user && user.id ? MODE.EDIT : MODE.CREATE) : MODE.READ
            }
            user={user}
            status={status}
            onEdit={onEdit}
            onDelete={openDeleteModal}
          />

          <Form onSubmit={handleSubmit}>
            {/* <p> {JSON.stringify(formVal)} </p> */}

            {user && user.id && (
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
            <FormGroup>
              <label htmlFor="name">Name:</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formVal.name || ""}
                disabled={!editMode}
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
                value={formVal.email || ""}
                disabled={!editMode}
                onChange={e =>
                  setFormVal({ ...formVal, email: e.target.value })
                }
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
                disabled={!editMode}
                onChange={e => setFormVal({ ...formVal, age: e.target.value })}
              />
            </FormGroup>

            {editMode && (
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
                  {user && user.id ? "Update User" : "Create User"}
                </Button>
              </div>
            )}
          </Form>
        </>
      )}

      <ConfirmDeleteModal
        item={user}
        isOpen={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

// UserDetails.propTypes = {
//   userId: PropTypes.string.isRequired
// };

