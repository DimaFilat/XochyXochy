import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import FacebookAuth from '../facebookAuth/FacebookAuth';
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
    const { auth, user } = this.props.usersReducer;
    const { email, password } = this.state;

    return (
      <div>
        {console.log('>>>>>>>>>>>>>>>>>>>', this.props.usersReducer.user._id)}
        {/* {console.log(this.props.usersReducer)} */}
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
              onClick={async e => {
                e.preventDefault();
                const user1 = { email, password };
                await this.props.fetchAuth(user1, pathname);
                !auth
                  ? this.props.history.push(`/users/profile/${user._id}`)
                  : null;
              }}
            >
              Sign In
            </Button>
          </Form>
          {/* <FacebookAuth /> */}
          <p className="lead mt-4">
            No Account?
            <Link to="/users/signup">Register</Link>
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
