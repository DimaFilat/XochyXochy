import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

export class WishListItem extends Component {
  render() {
    return (
      <div>
      <Container>
        <Row>
            <Col xs="4">Photo</Col>
            <Col xs="1"></Col>
            <Col xs="7">
              <Row>Название</Row>
              <Row>Цена</Row>
              <Row>Кто скинулся</Row>
              <Row>Описание</Row>
            </Col>
          </Row>

        <div>
        <Button outline color="info">Зарезервировать</Button>{' '}
        <Button outline color="warning">Скинуться</Button>{' '}
        <Button outline color="danger">Купить</Button>
      </div>
      </Container>
      </div>
    );
  }
}

export default WishListItem;
