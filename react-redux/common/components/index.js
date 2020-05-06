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
  NavbarText
} from "reactstrap";

export const AppHeader = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">{title}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <NavbarText className="mr-auto">(React Redux App)</NavbarText>
        <Nav navbar>
          <NavItem>
            <NavLink href="#">Users</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Posts</NavLink>
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
      <div class="row">{children}</div>
    </Container>
  );
};

export const AppButton = props => {
  return <Button {...props} />;
};

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const AppModal = props => {
  return <Modal {...props} />;
};

export const AddItemForm = ({ toggle, onAdd }) => {
  const [formVal, setFormVal] = useState({});

  const handleSubmit = e => {
    console.log("handleSubmit: formVal:", formVal);
    e.preventDefault();
    onAdd(e, formVal);
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          onClick={toggle}
        >
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Add
        </Button>
      </div>
    </Form>
  );
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

export const ListItem = ({ item, onEdit, onDelete }) => {
  return (
    <ListGroupItem>
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

export const Loading = ({ children }) => {
  return (
    <div className="text-center text-primary">
      <span>{children}</span>
    </div>
  );
};

export const Error = ({ children }) => {
  return (
    <div className="text-center text-danger">
      <span>{children}</span>
    </div>
  );
};
