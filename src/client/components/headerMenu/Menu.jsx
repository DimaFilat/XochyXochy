import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOutThunk } from '../../redux/actions/users';
import SearchBar from './Search-bar';
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
  CardFooter,
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
          <NavLink className="menuButton" tag={Link} to="/users/signup">
            Регистрация
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="menuButton" tag={Link} to="/users/signin">
            Войти
          </NavLink>
        </NavItem>
      </Nav>
    );

    const questLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink
            className="menuButton"
            style={styleName}
            tag={Link}
            to={`/users/profile/${_id}`}
          >
            {name}
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
            Выйти
          </NavLink>
        </NavItem>
      </Nav>
    );
    return (
      <div className="noPadding">
        {console.log('pppppp', this.props.usersReducer.user)}
        {/* {!auth ? <Redirect to="/" /> : null} */}
        <Navbar className="menu" light expand="md">
          <NavbarBrand className="menuButton" tag={Link} to="/">
            <span className="logo">
              <a href="/">
                <img src="http://localhost:9090/src/server/public/logo/logo1.png" height="50" width="195" alt="text here" />
              </a>
            </span>
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
                  Ссылка на проект
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <SearchBar />
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
