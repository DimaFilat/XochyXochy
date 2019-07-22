import React, { Component } from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Menu from '../headerMenu/Menu';

import { sessionCheckThunk } from '../../redux/actions/users';
// import FacebookAuth from '../facebookAuth/FacebookAuth';
import { Login, Reg } from '../loginReg';
import Info from './Info';
import UploadPhoto from '../uploadPhoto/UploadPhoto';
import UserAccount from '../user/UserAccount';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchCheckAuth();
  };

  render() {
    return (
      <div className="body">
        <Row>
          <Col xs="1"></Col>
          <Col>
            <div>
              <Menu />
            </div>

            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return <Info />;
                }}
              />
              <Route
                exact
                path="/upload"
                render={props => {
                  return <UploadPhoto {...props} />;
                }}
              />
              <Route
                exact
                path="/users/login"
                render={props => {
                  return <Login {...props} />;
                }}
              />
              <Route
                exact
                path="/users/reg"
                render={props => {
                  return <Reg {...props} />;
                }}
              />
              <Route
                exact
                path="/users/profile/:id"
                render={props => {
                  return <UserAccount {...props} />;
                }}
              />
            </Switch>
          </Col>
          <Col xs="1"></Col>
        </Row>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCheckAuth: () => dispatch(sessionCheckThunk())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
