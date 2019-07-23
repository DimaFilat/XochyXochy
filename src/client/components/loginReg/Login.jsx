import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import FacebookAuth from '../facebookAuth/FacebookAuth'
import { fetchThunk } from '../../redux/actions/users';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { loginAC } from '../../Actions/action';

class Login extends Component {
  state = { email: '', password: '', redirect: false };

  inputHandler = async e => {
    e.preventDefault();
    await this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { pathname } = this.props.location;
    const { redirect, email, password } = this.state;
    if (redirect) {
      return <Redirect to="/users/profile" />;
    }
    return (
      <div>
        <Col sm={{ size: 4, offset: 4 }}>
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
                this.props.fetchAuth(this.state, pathname);
                this.props.history.push('/users/profile/:id');
              }}
            >
              Sign In
            </Button>
          </Form>
          {/* <FacebookAuth /> */}
          <p className="lead mt-4">
            No Account?
            <Link to="/register">Register</Link>
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
  return { ...state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
