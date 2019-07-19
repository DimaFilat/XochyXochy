import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default function UserSmallWishList(props) {
  const { id, title, img, rating, price, description, active, reserve } = props;
  
  return (
    <div key={id}>
      <Container>
        <Row>
          <Col xs="4">Photo</Col>
          <Col>
            <Row>{title}</Row>
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
