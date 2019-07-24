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

export default class AddItem extends Component {
  render() {
    return (
      <div>
        <Form>
          <FormGroup row>
            <Label sm={2}>Wish Item</Label>
            <Col sm={10}>
              <Input
                type="text"
                id="wishitem"
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
                onClick={e => {
                  e.preventDefault();
                  let itemUrl = document.getElementById('linkInput').value;
                  (async () => {
                    let response = await fetch('/users/ozonParser', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        url: itemUrl
                      })
                    });
                    let data = await response.json();
                    document.getElementById('wishitem').value = data.title;
                    document.getElementById('price').value = data.price;
                    document.getElementById('pictureUrl').value =
                      data.pictureUrl;
                  })();
                }}
              >
                Submit
              </button>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Picture Link</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="pictureUrl"
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
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Make sure not to send us a picture that is too large.
              </FormText>
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
