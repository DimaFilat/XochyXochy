import React, { Component } from 'react';
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
  Media,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap';
import { Switch, Route, Link } from 'react-router-dom';

export default class Menu extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            Home
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/users/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/users/reg">
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/users/:id">
                  Account Page
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/users/logout">
                  Logout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/ArtiomOganesyan/XochyXochy">
                  Our Project
                </NavLink>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>

                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
