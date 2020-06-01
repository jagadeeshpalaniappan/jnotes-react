import React from "react";
import {
  Alert,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Modal,
  Input,
  Card,
  Container,
  Spinner,
} from "reactstrap";

import { STATUS_TYPES } from "../constants";

export const AppCard = ({ children }) => {
  return <Card body>{children}</Card>;
};

export const AppContainer = ({ children }) => {
  return (
    <Container body className="mt-3">
      <div className="row">{children}</div>
    </Container>
  );
};

export const AppButton = (props) => {
  return <Button {...props} />;
};

export const AppModal = (props) => {
  return <Modal {...props} />;
};

export const SearchInput = ({ onSearch, ...rest }) => {
  const handleChange = (e) => {
    // TODO: handle debounce
    onSearch(e, e.target.value);
  };
  return (
    <Input
      type="text"
      name="searchItem"
      placeholder="Search..."
      onChange={handleChange}
      {...rest}
    />
  );
};

export const ListItem = ({ item, onEdit, onDelete, ...rest }) => {
  return (
    <ListGroupItem {...rest}>
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
          <ListGroupItemText>
            {Object.keys(item).map(
              (key) =>
                ["id", "name"].indexOf(key) === -1 &&
                typeof item[key] === "string" && (
                  <span key={key}>
                    {" #"}
                    {key}: {item[key]}
                  </span>
                )
            )}
          </ListGroupItemText>
        </div>
        <div>
          {onEdit && (
            <AppButton color="link" onClick={(e) => onEdit(e, item)}>
              Edit
            </AppButton>
          )}
          {onDelete && (
            <AppButton color="link" onClick={(e) => onDelete(e, item)}>
              Delete
            </AppButton>
          )}
        </div>
      </div>
    </ListGroupItem>
  );
};

export const List = ({ children }) => {
  return <ListGroup>{children}</ListGroup>;
};
