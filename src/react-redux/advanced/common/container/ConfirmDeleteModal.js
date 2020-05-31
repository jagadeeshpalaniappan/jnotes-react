import React from "react";
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

import { AppModal, AppCard } from "../../common/components";

export const ConfirmDeleteModal = ({ item, onOk, onCancel, ...rest }) => {
  return (
    <AppModal toggle={onCancel} {...rest}>
      <AppCard>
        <h3>Confirm Delete</h3>
        <p>
          Are you sure do you want to delete <b>{item && item.name}</b> ?
        </p>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onOk(e, item);
          }}
        >
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              color="secondary"
              className="mr-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" color="danger">
              Delete
            </Button>
          </div>
        </Form>
      </AppCard>
    </AppModal>
  );
};
