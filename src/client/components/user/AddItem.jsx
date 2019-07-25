/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import Upload from '../uploadPhoto/UploadPhoto';
import { connect } from 'react-redux';
import { fetchThunk, sessionCheckThunk } from '../../redux/actions/users';
import Spin from '../spinner/Spinner'


class AddItem extends Component {

  state = {
    img: '',
    title: '',
    price: '',
    picLink: '',
    description: '',
    loading: false
  };

  componentDidMount = async () => {
    await this.props.fetchCheckAuth();
  };

  addItemInfo = async event => {
    event.preventDefault();
    console.log('Submit', this.state);
    console.log('location', this.props.location);
    const newItemPath = this.props.location +'newItem'
    console.log(newItemPath)
    this.props.fetchNewItem(this.state, newItemPath)

    

  };

  render() {
    // console.log('!!! ADD_ITEM ', this.state);

    const productImage = this.state.img;
    return (
      <div>
        <Form>
          <FormGroup row>
            <Label sm={2}>Желаемый подарок</Label>
            <Col sm={10}>
              <Input
                type="text"
                id="title"
                value={this.state.title}
                onChange={e => {
                  this.setState({ title: e.target.value });
                }}
                name="title"
                placeholder="Какой подарок вы хотите?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Цена</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="price"
                value={this.state.price}
                onChange={e => {
                  this.setState({ price: e.target.value });
                }}
                id="price"
                placeholder="Сколько это стоит?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Ссылка</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="linkInput"
                placeholder="Где это можно купить?"
              />
              <button
                type="button"
                onClick={async e => {
                  e.preventDefault();
                  const itemUrl = document.getElementById('linkInput').value;
                  this.setState({
                    loading: true
                  });
                  const response = await fetch('/users/ozonParser', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      url: itemUrl
                    })
                  });
                  const data = await response.json();
                  console.log('!!!!', data);
                  this.setState({

                    img: data.result.picFileName,
                    price: data.result.price + ' ₽',
                    title: data.result.title,
                    picLink: data.result.pictureUrl,
                    loading: false
                  });
                }}
              >
                Submit
              </button>
              <div id="pic-place">
                {productImage && (
                  <img
                    alt=""
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                    src={`http://localhost:9090/src/server/public/${productImage}`}
                  />
                )}

                {this.state.loading ? <Spin /> : ''}
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Ссылка на картинку</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="pictureUrl"
                value={this.state.picLink}
                onChange={e => {
                  this.setState({ picLink: e.target.value });
                }}
                placeholder="How does it look?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Описание подарка</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="description"
                placeholder="Почему вы хотите этот товар?"
                onChange={e => {
                  this.setState({ description: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleFile" sm={2}>
              Картинка
            </Label>
            <Col sm={10}>
              <Upload />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button
                type="submit"
                onClick={e => {
                  this.props.addNewItem(e);
                  this.addItemInfo(e);
                }}
              >
                Добавить подарок
              </Button>
              <Button onClick={this.props.addNewItem}>В другой раз</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNewItem: (data, newItemPath) =>
      dispatch(fetchThunk(data, newItemPath)),
    fetchCheckAuth: () => dispatch(sessionCheckThunk())
  };
};

const mapStateToProps = state => {
  return {
    user: state.usersReducer.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem);
