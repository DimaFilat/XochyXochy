import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Image, List, Button, Divider } from 'semantic-ui-react';
import Delete from '../buttons/Delete';
import Edit from '../buttons/Edit';
import Share from '../buttons/Share';
import Reserve from '../buttons/Reserve';

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
                  src={`http://localhost:9090/src/server/public/${img}`}
                  size="tiny"
                />
              </Col>
              <Col>
                <Row>{title}</Row>
                <Row>{price}</Row>
                <Row>{description}</Row>
              </Col>
              <Col>
                <Delete />
                <Share />
                <Reserve />
              </Col>
              {/* <Col xs="2">
                <Button>Редактировать</Button>
              </Col> */}
            </Row>
          </Container>
          <Divider />
        </List.Content>
      </List.Item>
    </div>
  );
}
