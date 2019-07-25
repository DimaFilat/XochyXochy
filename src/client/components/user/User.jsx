import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserSmallWishList from './UserSmallWishList';
import { Image } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';

export default class User extends Component {
  state = {
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
              {this.state.wishItem
                ? this.state.wishItem.map((element, index) => (
                    <UserSmallWishList
                      id={index}
                      key={index}
                      title={element.title}
                      img={element.img}
                      rating={element.rating}
                      price={element.price}
                      description={element.description}
                      active={element.active}
                      reserve={element.reserve}
                    />
                  ))
                : 'loading'}
            </Col>
            <Col xs="1"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
