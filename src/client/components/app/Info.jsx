import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import User from '../user/User';
import WishListItem from '../user/wishListItem';
import MainPageCarousel from './MainPageCarousel';
import UserAccount from '../user/UserAccount';

export default function Info(props) {
  return (
    <div>
      <Row>
        <Col xs="7">
          <MainPageCarousel />
        </Col>
        <Col xs="5">
          <h3>Xochy Xochy это ...</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
      
    </div>
  );
}
