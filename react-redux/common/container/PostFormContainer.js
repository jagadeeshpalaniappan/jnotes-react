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

import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { AppButton, StatusBar } from "../../common/components";
import { STATUS_TYPES, MODE } from "../types";

export const PostFormHeader = ({ mode, post, onEdit, onDelete }) => {
  switch (mode) {
    case MODE.READ:
      return (
        <div className="d-flex my-3">
          <h3 className="flex-grow-1 m-0">{post && post.title}</h3>
          <AppButton outline color="primary" onClick={() => onEdit(post)}>
            Edit
          </AppButton>
          <AppButton outline color="danger" onClick={() => onDelete(post)} className="ml-2">
            Delete
          </AppButton>
        </div>
      );
    case MODE.EDIT:
      return (
        <div className="d-flex my-3">
          <h3 className="flex-grow-1 m-0">Edit Post</h3>
        </div>
      );
    default:
      return <h3 className="flex-grow-1 m-0">Create Post</h3>;
  }
};

export const PostFormContainer = ({
  status,
  post,
  editMode,
  onCancel,
  onSave,
  onEdit,
  onDelete
}) => {
  console.log("PostFormContainer:", { status, post });
  const [formVal, setFormVal] = useState({});

  useEffect(() => {
    console.log("post - changed", post);
    setFormVal(post || {});
  }, [post]);

  const handleSubmit = useCallback(
    e => {
      console.log("PostFormContainer:: handleSubmit: formVal:", formVal);
      e.preventDefault();
      onSave(e, formVal);
      setFormVal({});
    },
    [formVal, setFormVal, onSave]
  );

  const handleCancel = e => {
    console.log("PostFormContainer:: handleCancel: formVal:", formVal);
    setFormVal({});
    onCancel();
  };

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = (e, post) => {
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = e => {
    console.log("PostFormContainer:: handleDelete: post:", post);
    setDeleteConfirmed(true);
    closeDeleteModal();
    onDelete(post);
  };

  return (
    <div>
      <StatusBar status={status} />

      {!(deleteConfirmed && status.type === STATUS_TYPES.SUCCESS) &&  (
        <>
          <PostFormHeader
            mode={
              editMode ? (post && post.id ? MODE.EDIT : MODE.CREATE) : MODE.READ
            }
            post={post}
            onEdit={onEdit}
            onDelete={openDeleteModal}
          />

          <Form onSubmit={handleSubmit}>
            {/* <p> {JSON.stringify(formVal)} </p> */}

            {post && post.id && (
              <FormGroup>
                <label htmlFor="postId">ID:</label>
                <Input
                  type="text"
                  id="postId"
                  name="id"
                  value={formVal.id}
                  disabled
                />
              </FormGroup>
            )}
            <FormGroup>
              <label htmlFor="title">Title:</label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Name"
                value={formVal.title}
                disabled={!editMode}
                onChange={e => setFormVal({ ...formVal, title: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="body">Body:</label>
              <Input
                type="text"
                id="body"
                name="body"
                placeholder="Email"
                value={formVal.body}
                disabled={!editMode}
                onChange={e =>
                  setFormVal({ ...formVal, body: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="userId">UserId:</label>
              <Input
                type="number"
                id="userId"
                name="userId"
                placeholder="Age"
                value={formVal.userId}
                disabled={!editMode}
                onChange={e => setFormVal({ ...formVal, userId: e.target.value })}
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
                  {post && post.id ? "Update Post" : "Create Post"}
                </Button>
              </div>
            )}
          </Form>
        </>
      )}

      <ConfirmDeleteModal
        item={post}
        isOpen={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};
