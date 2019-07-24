/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import Upload from '../uploadPhoto/UploadPhoto';

export default class AddItem extends Component {
  state = {
    img: '',
    wishItem: '',
    price: '',
    picLink: ''
  };

  render() {
    const productImage = this.state.img;
    return (
      <div>
        <Form>
          <FormGroup row>
            <Label sm={2}>Wish Item</Label>
            <Col sm={10}>
              <Input
                type="text"
                id="wishitem"
                value={this.state.wishItem}
                onChange={e => {
                  this.setState({ wishItem: e.target.value });
                }}
                name="title"
                placeholder="What would you like for your next big date?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Price</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="price"
                value={this.state.price}
                onChange={e => {
                  this.setState({ price: e.target.value });
                }}
                id="price"
                placeholder="Who much do you think it will cost?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Link</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="linkInput"
                placeholder="Where can we find this item?"
              />
              <button
                type="button"
                onClick={async e => {
                  e.preventDefault();
                  const itemUrl = document.getElementById('linkInput').value;
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
                  this.setState({
                    img: data.picFileName,
                    price: data.scrapeFunc.price,
                    wishItem: data.scrapeFunc.title,
                    picLink: data.scrapeFunc.pictureUrl
                  });
                }}
              >
                Submit
              </button>
              <div id="pic-place">
                {productImage && (
                  <img
                    alt=""
                    src={`http://localhost:9090/src/server/public/${productImage}`}
                  />
                )}
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Picture Link</Label>
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
            <Label sm={2}>Description</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="description"
                placeholder="Can you tell us and your friends why do you want this item?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleFile" sm={2}>
              Pic
            </Label>
            <Col sm={10}>
              <Upload />
              {/* <Input type="file" name="file" id="exampleFile" /> */}
              {/* <FormText color="muted">
                Make sure not to send us a picture that is too large.
              </FormText> */}
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button onClick={this.props.addNewItem}>
                Add a gift for you ;)
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
