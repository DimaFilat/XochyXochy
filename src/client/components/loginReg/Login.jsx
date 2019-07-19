import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { loginAC } from '../../Actions/action';

export default class Login extends Component {
  state = {};

  render() {
    const { redirect, email, password } = this.state;
    if (redirect) {
      return <Redirect to="/todo" />;
    }
    return (
      <div>
        <Col sm={{ size: 3, offset: 4 }}>
          <Form className="form-login mt-5">
            <h1>Login</h1>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                className="input"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={this.inputHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Enter Password"
                value={password}
                onChange={this.inputHandler}
              />
            </FormGroup>
            <Button
              className="mt-5"
              block
              color="primary"
              onClick={e => {
                e.preventDefault();
                this.fetchUserData(this.state);
              }}
            >
              Sign In
            </Button>{' '}
          </Form>
          <p className="lead mt-4">
            No Account?
            <Link to="/register">Register</Link>
          </p>
        </Col>
      </div>
    );
  }
}
