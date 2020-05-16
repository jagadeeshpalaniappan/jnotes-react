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
import { useQuery, useMutation } from "@apollo/react-hooks";

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

const UPDATE_USER = gql`
  mutation($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

const getStatusForQuery = ({ loading, error, success }) => {
  if (loading) {
    return { type: STATUS_TYPES.LOADING, msg: "Loading User..." };
  } else if (error) {
    return {
      type: STATUS_TYPES.FAILURE,
      msg: "Problem while getting user",
      more: error
    };
  } else if (success) {
    return { type: STATUS_TYPES.SUCCESS, msg: "User loaded successfully!" };
  } else {
    return null;
  }
};

const getStatusForDelete = ({ loading, error, success }) => {
  console.log("getStatusForDelete:", { loading, error, success });
  if (loading) {
    return { type: STATUS_TYPES.LOADING, msg: "Deleting User..." };
  } else if (error) {
    return {
      type: STATUS_TYPES.FAILURE,
      msg: "Problem while deleting user",
      more: error
    };
  } else if (success) {
    return { type: STATUS_TYPES.SUCCESS, msg: "Deleted successfully!" };
  } else {
    return null;
  }
};

export const UserDetailsHeader = ({
  mode,
  user,
  hideActions,
  onEdit,
  onDelete
}) => {
  switch (mode) {
    case MODE.READ:
      return (
        <div className="d-flex my-3">
          <h3 className="flex-grow-1 m-0">User</h3>
          {!hideActions && (
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

export const UserDetails = ({
  userId,
  editMode,
  onCancel,
  onSave,
  onEdit,
  onDelete
}) => {
  console.log("UserDetails:", { userId });

  if (!userId) return null;

  // --------------------------- GRAPHQL ---------------------------
  // GET_USER:
  const variables = { id: userId };
  const queryStatus = useQuery(GET_USER, { variables });
  const user = (queryStatus.data && queryStatus.data.user) || {};

  // DELETE_USER:
  const [deleteUser, deleteStatus] = useMutation(DELETE_USER);

  console.log("UserDetails: query:", queryStatus);
  console.log("UserDetails: deleteStatus:", deleteStatus);
  // --------------------------- STATE ---------------------------

  const [editMode, setEditMode] = useState(false); // state: editMode or not
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // --------------------------- Fns ---------------------------

  const openDeleteModal = (e, user) => {
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const deleteConfirmed = e => {
    console.log("UserDetails:: deleteConfirmed: user:", user);
    setDeleteConfirmed(true);
    closeDeleteModal();

    const variables = { id: userId };
    deleteUser({ variables });
  };

  // --------------------------- Render ---------------------------

  return (
    <div>
      <StatusBar
        status={getStatusForQuery({
          loading: queryStatus.loading,
          error: queryStatus.error
        })}
      />
      <StatusBar
        status={getStatusForDelete({
          loading: deleteStatus.loading,
          error: deleteStatus.error,
          success:
            deleteStatus && deleteStatus.data && deleteStatus.data.deleteUser
        })}
      />
      <UserDetailsHeader
        mode={
          editMode ? (user && user.id ? MODE.EDIT : MODE.CREATE) : MODE.READ
        }
        user={user}
        hideActions={deleteStatus.loading}
        onEdit={onEdit}
        onDelete={openDeleteModal}
      />
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <ConfirmDeleteModal
        item={user}
        isOpen={isDeleteModalOpen}
        onOk={deleteConfirmed}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export const EditUserDetails = ({
  userId,
  editMode,
  onCancel,
  onSave,
  onEdit,
  onDelete
}) => {
  console.log("UserDetails:", { status, userId });

  if (!userId) return null;

  // --------------------------- GRAPHQL ---------------------------
  const variables = { id: userId };
  const { loading, error, data } = useQuery(GET_USER, { variables });

  console.log("UserDetails:", { loading, error, data });
  const user = (data && data.user) || {};
  const status = getStatus({ loading, error });
  // ---------------------------

  const {
    loading: mutationLoading,
    error: mutationError,
    data: mutationData
  } = useMutation(UPDATE_USER);
  const [updateUser, { data }] = useMutation(UPDATE_USER);

  console.log("UserDetails:", { mutationLoading, mutationError, mutationData });
  // --------------------------- GRAPHQL ---------------------------

  const [formVal, setFormVal] = useState({});
  useEffect(() => {
    console.log("user - changed", user);
    setFormVal(user || {});
  }, [user]);

  const handleSave = (e, user) => {
    console.log("handleSave:", user);
    if (user && user.id) {
      console.log("updateUser:", user);
      const variables = {
        id: user.id,
        input: {
          name: user.name,
          username: user.email,
          email: user.email
        }
      };
      updateUser({ variables });
      setEditMode(false);
    } else {
      console.log("createUser:", user);
      createUser(user);
      setEditMode(false);
    }
  };

  const handleSubmit = useCallback(
    e => {
      console.log("UserDetails:: handleSubmit: formVal:", formVal);
      e.preventDefault();
      handleSave(e, formVal);
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

  const deleteConfirmed = e => {
    console.log("UserDetails:: deleteConfirmed: user:", user);
    setDeleteConfirmed(true);
    closeDeleteModal();
    onDelete(user);
  };

  return (
    <div>
      <StatusBar status={status} />

      {!(deleteConfirmed && status.type === STATUS_TYPES.SUCCESS) && (
        <>
          <UserDetailsHeader
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
        onOk={deleteConfirmed}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};
