import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOutThunk } from '../../redux/actions/users';

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
import { Switch, Route, Link, Redirect } from 'react-router-dom';

class Menu extends Component {
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
    const { fetchLogOut } = this.props;
    const { auth } = this.props.usersReducer;
    // const { name } = this.props.usersReducer.user;
    const styleName = {
      color: '#e7526c'
    };
    const userLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/users/signup">
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/users/signin">
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );
    const questLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink style={styleName} tag={Link} to="/users/profile/:id">
            {name}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={e => {
              e.preventDefault();
              fetchLogOut();
            }}
            tag={Link}
            to="/users/logout/"
          >
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );
    return (
      <div>
        {!auth ? <Redirect to="/" /> : null}
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            Home
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            {!auth ? userLinks : questLinks}
            <Nav navbar>
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
const mapStateToProps = state => {
  return { ...state };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchLogOut: () => dispatch(logOutThunk())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
