import React, { Component } from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import UserSmallWishList from './UserSmallWishList';
import { Image } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';

export default class User extends Component {
  state = {
    user: [
      { name: 'Jack', nextCelebration: 'Next Big Date' },
      { name: 'Mike', nextCelebration: 'Next Big Date' },
      { name: 'London', nextCelebration: 'Next Big Date' },
      { name: 'Willium', nextCelebration: 'Next Big Date' }
    ],
    wishItem: [
      {
        title: 'Cart',
        img: 'https://image.flaticon.com/icons/png/512/149/149071.png',
        rating: '3',
        price: '1500',
        description: 'I always dreamed of this thing.',
        messenger: [
          { userId: '123123', text: 'some text' },
          { userId: '122211', text: 'some more text' }
        ],
        active: true,
        reserve: false
      }
    ]
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="4">
              <Image
                src="https://image.flaticon.com/icons/png/512/149/149071.png"
                size="small"
              />
            </Col>
            <Col xs="1"></Col>
            <Col xs="7">
              <br />
              <Row>
                <h4>{this.state.user[3].name}</h4>
              </Row>
              <br />
              <Row>
                <h5>{this.state.user[3].nextCelebration}</h5>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xs="1"></Col>
            <Col xs="10">
              <UserSmallWishList />
            </Col>
            <Col xs="1"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
