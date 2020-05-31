import React, { useState } from "react";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "../../../../../designsystem";
import UserDeleteModal from "./UserDeleteModal";
import { STATUS_TYPES } from "../../../constants";

const UserDetailsToolbar = ({ user, status, onDelete }) => {
  const [delModalOpen, setDelModalOpen] = useState(false);
  const openDeleteModal = () => setDelModalOpen(true);
  const closeDeleteModal = () => setDelModalOpen(false);

  const deleteSuccess = status.msg === "User Deleted Successfully";
  return (
    <div className="d-flex align-items-center my-3">
      <h3 className="flex-grow-1 m-0">User</h3>
      {!deleteSuccess && (
        <>
          <Button tag={NavLink} to={`/users`} className="ml-2">
            Back
          </Button>
          <Button
            className="ml-2"
            onClick={openDeleteModal}
            disabled={status.type === STATUS_TYPES.LOADING}
          >
            Delete
          </Button>
          <Button
            tag={NavLink}
            to={`/users/edit/${user.id}`}
            color="primary"
            className="ml-2"
            disabled={status.type === STATUS_TYPES.LOADING}
          >
            Edit
          </Button>
          <UserDeleteModal
            item={user}
            isOpen={delModalOpen}
            onOk={() => {
              closeDeleteModal();
              onDelete();
            }}
            onCancel={closeDeleteModal}
          />
        </>
      )}
      {deleteSuccess && (
        <Button tag={NavLink} to={`/users`}>
          Back
        </Button>
      )}
    </div>
  );
};

UserDetailsToolbar.propTypes = {};

export default UserDetailsToolbar;
