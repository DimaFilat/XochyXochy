import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Image, List } from 'semantic-ui-react';

export default function UserSmallWishList(props) {
  const { id, title, img, rating, price, description, active, reserve } = props;

  return (
    <div key={id}>
      <List.Item>
        <List.Content>
          <Container>
            <Row>
              <Col xs="4">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7q5XvrW1W-6OkJdXaUUmnrX1R0QO1W6Ms2AreAFUWJt8m-Gj7"
                  size="tiny"
                />
              </Col>
              <Col>
                <Row>{title}</Row>
                <Row>{price}</Row>
                <Row>{description}</Row>
              </Col>
              <Col xs="2">Edit</Col>
            </Row>
          </Container>
        </List.Content>
      </List.Item>
    </div>
  );
}
