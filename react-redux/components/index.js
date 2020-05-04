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
    <Container body className="m-1">
      {children}
    </Container>
  );
};

export const AppButton = props => {
  return <Button {...props} />;
};

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AppModal = ({ buttonLabel, className }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const AddItemForm = ({ onAdd }) => {
  const [value, setValue] = useState("");
  return (
    <Form>
      <FormGroup>
        <label htmlFor="name">Name:</label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </FormGroup>

      <Button type="submit" color="primary">
        Add
      </Button>
    </Form>
  );
};

export const SearchInput = ({ onSearch }) => {
  const handleChange = e => {
    // TODO: handle debounce
    onSearch(e, e.target.value);
  };
  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <Button>oo</Button>
      </InputGroupAddon>
      <Input
        type="text"
        name="searchItem"
        placeholder="Search..."
        style={{ width: "100%" }}
        onChange={handleChange}
      />
    </InputGroup>
  );
};

export const ListItem = ({ item, onEdit, onDelete }) => {
  return (
    <ListGroupItem>
      <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
      <ListGroupItemText>{item.id}</ListGroupItemText>
      {
        <div>
          {onEdit && <button onClick={e => onEdit(e, item)}>Edit</button>}
          {onDelete && <button onClick={e => onDelete(e, item)}>Delete</button>}
        </div>
      }
    </ListGroupItem>
  );
};

export const List = ({ children }) => {
  return <ListGroup>{children}</ListGroup>;
};
