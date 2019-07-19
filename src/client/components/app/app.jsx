import React, { Component } from 'react';

import Type from 'prop-types';
import Menu from '../headerMenu/Menu';
import { Container, Row, Col } from 'reactstrap';
import { Switch, Route, Link } from 'react-router-dom';
import FacebookAuth from '../facebookAuth/FacebookAuth';

import { Login, Reg } from '../loginReg';
import Info from './Info';

export default class App extends Component {
  static propTypes = {
    appName: Type.string
  };

  static defaultProps = {
    appName: 'Default App Name'
  };

  componentDidMount() {
    const fetchFunc = async () => {
      const res = await fetch('/test');
      console.log(res);
      return res;
    };
    fetchFunc();
  }

  render() {
    return (
      <div>
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
                path="/login"
                render={() => {
                  return (
                    <div>
                      <Login />
                      <FacebookAuth />
                    </div>
                  );
                }}
              />
              <Route
                exact
                path="/reg"
                render={() => {
                  return <Reg />;
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
