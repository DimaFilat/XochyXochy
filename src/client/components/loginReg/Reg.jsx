/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchThunk } from '../../redux/actions/users';

class Reg extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    redirect: false
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
          <Form className=" form-login mt-5">
            <h1 text="center mb-3 mt-10">Регистрация</h1>
            <FormGroup>
              <Label for="name">Ваше имя</Label>
              <Input
                name="name"
                value={name}
                onChange={this.inputHandler}
                placeholder="Ваше имя"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Электронная почта</Label>
              <Input
                className="input"
                type="text"
                name="email"
                placeholder="Электронная почта"
                value={email}
                onChange={this.inputHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Пароль</Label>
              <Input
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={this.inputHandler}
              />
            </FormGroup>
            <Button
              color="danger"
              className="mt-5 regLoginForm"
              block
              color="primary"
              onClick={e => {
                e.preventDefault();
                const user = {
                  name: this.state.name,
                  email: this.state.email,
                  password: this.state.password
                };

                this.props.fetchAuth(user, pathname);
                !this.props.auth
                  ? this.props.history.push('/users/profile')
                  : null;
              }}
            >
              Зарегистрироваться
            </Button>
          </Form>
          <p className="lead mt-4">
            Have An Account?
            <Link to="/users/signin"> Войти</Link>
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
  return { ...state.userReducer };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reg);
