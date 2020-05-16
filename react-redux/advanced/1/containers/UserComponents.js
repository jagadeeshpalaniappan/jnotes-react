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
import { STATUS_TYPES, MODE, STATUS_MODE } from "../../common/constants";


const STATUS_MSG = {
  GET_USER: {
    loading: "Loading User...",
    error: "Problem while getting user",
    success: "User loaded successfully!"
  },
  UPDATE_USER: {
    loading: "Updating User...",
    error: "Problem while updating user",
    success: "User updated successfully!"
  },
  DELETE_USER: {
    loading: "Deleting User...",
    error: "Problem while deleting user",
    success: "User deleted successfully!"
  }
};

const getStatus = ({ loading, error, success }, msg) => {
  console.log("getStatus:", { loading, error, success, msg });
  let status = null;
  if (loading) {
    status = { type: STATUS_TYPES.LOADING, msg: msg.loading };
  } else if (error) {
    status = {
      type: STATUS_TYPES.FAILURE,
      msg: msg.error,
      more: error
    };
  } else if (success) {
    status = { type: STATUS_TYPES.SUCCESS, msg: msg.success };
  }

  console.log("getStatus:", { status });
  return status;
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

export const UserDetails = ({ user, hideActions, onEdit, onDelete }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = (e, user) => {
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <UserDetailsHeader
        mode={MODE.READ}
        user={user}
        hideActions={hideActions}
        onEdit={onEdit}
        onDelete={openDeleteModal}
      />
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <ConfirmDeleteModal
        item={user}
        isOpen={isDeleteModalOpen}
        onOk={() => {
          closeDeleteModal();
          onDelete();
        }}
        onCancel={closeDeleteModal}
      />
    </>
  );
};

export const UserDetailsStatus = ({
  mode,
  queryStatus,
  updateStatus,
  deleteStatus
}) => {
  let status = null;
  let msg = null;
  switch (mode) {
    case STATUS_MODE.CREATE:
      status = {
        loading: updateStatus.loading,
        error: updateStatus.error,
        success: updateStatus.data && !!deleteStatus.data.updateUser
      };
      msg = STATUS_MSG.UPDATE_USER;
      break;
    case STATUS_MODE.UPDATE:
      status = {
        loading: updateStatus.loading,
        error: updateStatus.error,
        success: updateStatus.data && !!updateStatus.data.updateUser
      };
      msg = STATUS_MSG.UPDATE_USER;
      break;
    case STATUS_MODE.DELETE:
      status = {
        loading: deleteStatus.loading,
        error: deleteStatus.error,
        success: deleteStatus.data && !!deleteStatus.data.deleteUser
      };
      msg = STATUS_MSG.DELETE_USER;
      break;
    case STATUS_MODE.GET:
      status = {
        loading: queryStatus.loading,
        error: queryStatus.error
      };
      msg = STATUS_MSG.GET_USER;
      break;
  }

  return (
    <>
      <StatusBar status={getStatus(status, msg)} />
    </>
  );
};

export const EditUser = ({ user, hideActions, onSave, onCancel }) => {
  console.log("UserDetailsContainer:", { user });
  const [formVal, setFormVal] = useState({});
  useEffect(() => {
    console.log("user - changed", user);
    setFormVal(user || {});
  }, [user]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onSave(formVal);
    },
    [formVal, setFormVal, onSave]
  );

  const handleCancel = e => {
    console.log("UserDetailsContainer:: handleCancel: formVal:", formVal);
    setFormVal({});
    onCancel();
  };

  return (
    <div>
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
            value={formVal.age || ""}
            onChange={e => setFormVal({ ...formVal, age: e.target.value })}
          />
        </FormGroup>

        {!hideActions && (
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              color="secondary"
              className="mr-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {user && user.id ? "Update User" : "Create User"}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};


