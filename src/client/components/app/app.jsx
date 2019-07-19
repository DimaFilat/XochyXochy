import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import Menu from '../headerMenu/Menu';
import { Login, Reg } from '../loginReg';
import Info from './Info';

export default class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="1">1</Col>
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
                  path="/users/login"
                  render={() => {
                    return <Login />;
                  }}
                />
                <Route
                  exact
                  path="/users/reg"
                  render={() => {
                    return <Reg />;
                  }}
                />
              </Switch>
            </Col>
            <Col xs="1">3</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
