import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class UserSmallWishList extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="4">Photo</Col>
            <Col>
              <Row>Item Name</Row>
              <Row>Item Price</Row>
            </Col>
            <Col xs="2">
              <Row>Reserve</Row>
              <Row>Buy</Row>
              <Row>Group</Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
