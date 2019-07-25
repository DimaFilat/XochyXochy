import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOutThunk } from '../../redux/actions/users';
// import {menu, textColor} from './style';
import './style.css';
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
    // console.log(this.props.usersReducer.user);

    const { isOpen } = this.state;
    const { fetchLogOut } = this.props;
    const { auth } = this.props.usersReducer;

    // const { name } = this.props.usersReducer.user;
    const styleName = {
      color: '#e7526c'
    };
    const { name, _id } = this.props.usersReducer.user;
    // const inlineStyle = {
    //   backgroundColor: '#75706f',
    //   color: '#8b0002'
    // };
    // const textColor = { color: '#8b0002' };
    const userLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink  className="menuButton" tag={Link} to="/users/signup">
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="menuButton" tag={Link} to="/users/signin">
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );

    const questLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
<<<<<<< HEAD
          <NavLink style={styleName} tag={Link} to="/users/profile/">
=======
          <NavLink
            className="menuButton"
            style={styleName}
            tag={Link}
            to="/users/profile/:id"
          >
>>>>>>> 697f3365a142d3477cd97ce38afd8a19cd93fe3a
            {this.props.usersReducer.user.name}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="menuButton"
            onClick={e => {
              e.preventDefault();
              fetchLogOut();
            }}
            tag={Link}
            to="/users/signout/"
          >
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );

    console.log(this.props);
    return (
      <div className='noPadding'>
        {!auth ? <Redirect to="/" /> : null}
        <Navbar className="menu" light expand="md">
          <NavbarBrand className="menuButton" tag={Link} to="/">
            Home
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            {!auth ? userLinks : questLinks}
            <Nav navbar>
              <NavItem>
                <NavLink
                  className="menuButton"
                  href="https://github.com/ArtiomOganesyan/XochyXochy"
                >
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
