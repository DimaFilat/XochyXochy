import React, { Component } from "react";
import Type from "prop-types";
import Menu from "../headerMenu/Menu";
import { Container, Row, Col } from "reactstrap";
import { Switch, Route, Link } from "react-router-dom";
import { Login, Reg } from "../loginReg";
import Info from "./Info";

export default class App extends Component {
  static propTypes = {
    appName: Type.string
  };

  static defaultProps = {
    appName: "Default App Name"
  };

  componentDidMount() {
    const fetchFunc = async () => {
      const res = await fetch("/test");
      console.log(res);
      return res;
    };
    fetchFunc();
  }

  render() {
    const { appName } = this.props;
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
                  path="/login"
                  render={() => {
                    return <Login />;
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
            <Col xs="1">3</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
