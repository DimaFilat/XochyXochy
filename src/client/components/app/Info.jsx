import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MainPageCarousel from './MainPageCarousel';
import UserAccount from '../user/UserAccount';
import Upload from '../uploadPhoto/UploadPhoto';
import './style.css';

export default function Info() {
  return (
    <div>
      <br />
      <Row>
        <Col className="roundEdge" xs="7">
          <MainPageCarousel />
        </Col>
        <Col xs="5">
          <h1 className="fontTitle">
            Xochy Xochy - это удобный сервис для создания Wish-list
            <br />
          </h1>
          <br />
          <h2 className="fontTitle">
            {' '}
            Создавайте, делитесь с друзьями и получайте только нужные подарки!
          </h2>
        </Col>
      </Row>
      <br />
      {/* <Row>
        <Col>NEXT HOLIDAY SPACE</Col>
      </Row> */}
    </div>
  );
}
