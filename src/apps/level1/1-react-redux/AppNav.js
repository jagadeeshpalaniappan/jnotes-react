import React, { useState } from "react";
import {
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
  Collapse,
} from "reactstrap";

import { NavLink as RRNavLink } from "react-router-dom";

const AppNav = ({ title, secondaryTitle }) => {
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

export default AppNav;
