import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MainPageCarousel from './MainPageCarousel';
import './style.css';

export default function Info(props) {
  state = {
    nextDate: ''
  };

  // async componentDidMount() {
  //   let data = await fetch("https://api.chucknorris.io/jokes/random");
  //   let result = await data.json();
  //   console.log(result);
  //   this.setState({ data:  result });
  // }

  
  
  return (
    <div>
      <br />
      <Row>
        <Col className="roundEdge" xs="7">
          <MainPageCarousel />
        </Col>
        <Col xs="5">
          <h1 className="fontTitle">Xochy Xochy это ...</h1>
          <p className="fontText">
            Повседневная практика показывает, что укрепление и развитие
            структуры требуют от нас анализа направлений прогрессивного
            развития. Значимость этих проблем настолько очевидна, что постоянный
            количественный рост и сфера нашей активности обеспечивает широкому
            кругу (специалистов) участие в формировании дальнейших направлений
            развития. Разнообразный и богатый опыт укрепление и развитие
            структуры способствует подготовки и реализации позиций, занимаемых
            участниками в отношении поставленных задач. Не следует, однако
            забывать, что постоянное информационно-пропагандистское обеспечение
            нашей деятельности обеспечивает широкому кругу (специалистов)
            участие в формировании соответствующий условий активизации.
            Товарищи! реализация намеченных плановых заданий способствует
            подготовки и реализации систем массового участия.
          </p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>NEXT HOLIDAY SPACE</Col>
      </Row>
    </div>
  );
}
