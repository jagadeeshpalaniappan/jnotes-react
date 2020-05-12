import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
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

import {
  Alert,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { NavLink as RRNavLink } from "react-router-dom";
import { STATUS_TYPES, MODE } from "../constants";

export const AppHeaderWithRoutes = ({ title, secondaryTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">{title}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <NavbarText className="mr-auto">{secondaryTitle}</NavbarText>
        <Nav navbar>
          <NavItem>
            <NavLink to="/users" activeClassName="active" tag={RRNavLink}>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/posts" tag={RRNavLink}>
              Posts
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Jagadeesh Palaniappan
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

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

export const AppButton = props => {
  return <Button {...props} />;
};

export const AppModal = props => {
  return <Modal {...props} />;
};

export const SearchInput = ({ onSearch, ...rest }) => {
  const handleChange = e => {
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
              key =>
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
            <AppButton color="link" onClick={e => onEdit(e, item)}>
              Edit
            </AppButton>
          )}
          {onDelete && (
            <AppButton color="link" onClick={e => onDelete(e, item)}>
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

export function StatusBar({ status }) {
  let color = "light";
  if (status && status.type === STATUS_TYPES.LOADING) {
    color = "primary";
  } else if (status && status.type === STATUS_TYPES.FAILURE) {
    color = "danger";
  } else if (status && status.type === STATUS_TYPES.SUCCESS) {
    color = "success";
  }
  return (
    <>
      {status && status.msg && (
        <Alert color={color}>
          {status.msg} {status.more && `:: ${status.more}`}
        </Alert>
      )}
    </>
  );
}
