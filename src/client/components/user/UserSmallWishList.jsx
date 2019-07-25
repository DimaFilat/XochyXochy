import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Image, List, Button } from 'semantic-ui-react';

export default function UserSmallWishList(props) {
  const { id, title, img, rating, price, description, active, reserve } = props;

  return (
    <div key={id}>
      <List.Item>
        <List.Content>
          <Container>
            <Row>
              <Col xs="4">
                <Image src={`http://localhost:9090/${img}`} size="tiny" />
              </Col>
              <Col>
                <Row>{title}</Row>
                <Row>{price}</Row>
                <Row>{description}</Row>
              </Col>
              <Col xs="2">
                <Button>Edit</Button>
              </Col>
            </Row>
          </Container>
        </List.Content>
      </List.Item>
    </div>
  );
}
