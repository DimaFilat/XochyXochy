/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchThunk } from '../../redux/actions/users';

class Reg extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    redirect: false,
    errors: []
  };

  inputHandler = async e => {
    e.preventDefault();
    await this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { pathname } = this.props.location;
    const { redirect, email, password, name, password2 } = this.state;
    if (redirect) {
      return <Redirect to="/users/profile" />;
    }
    return (
      <div>
        <Col sm={{ size: 4, offset: 4 }}>
          <Form className="form-login mt-5">
            <h1 text="center mb-3 mt-10">Register</h1>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                name="name"
                value={name}
                onChange={this.inputHandler}
                placeholder="Enter Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                className="input"
                type="text"
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
                placeholder="Enter Password"
                value={password}
                onChange={this.inputHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Confirm Password</Label>
              <Input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={password2}
                onChange={this.inputHandler}
              />
            </FormGroup>
            <Button
              className="mt-5"
              block
              color="primary"
              onClick={e => {
                e.preventDefault();
                this.props.fetchAuth(this.state, pathname);
                
              }}
            >
              Sign In
            </Button>
          </Form>
          <p className="lead mt-4">
            Have An Account?
            <Link to="/users/login">Login</Link>
          </p>
        </Col>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchAuth: (data, path) => dispatch(fetchThunk(data, path))
  };
};
const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reg);
